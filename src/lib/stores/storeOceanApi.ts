import { writable, type Writable } from 'svelte/store';
import axios, { type RawAxiosRequestConfig } from 'axios';
import CryptoJS from 'crypto-js';
export interface Data<T> {
	type?: string;
	id?: string;
	attributes?: T;
	relationships?: any;
}

export interface ErrorJsonAPI {
	message?: string;
	status?: number;
	errorCode?: string;
}

export interface HttpStoreOcean {
	subscribe: (run: (value: any, token?: string) => void) => () => void;
	unsubscribe: () => void;
	action: (method: 'get' | 'post' | 'delete', path: string, config?: RawAxiosRequestConfig<any>) => Promise<boolean>;
	updateToken: (token: string) => void;
	getToken: () => string;
}

function decodeToken(encodedToken: string, passphrase: string): string {
	const bytes = CryptoJS.AES.decrypt(encodedToken, passphrase);
	const originalToken = bytes.toString(CryptoJS.enc.Utf8);
	return originalToken;
}

// Fonction pour vérifier le token d'authentification
function verifyToken() {
	const token = localStorage.getItem('token') ? decodeToken(localStorage.getItem('token') ?? '', 'c1d62263d4') : '';
	// encode
	return token;
}

// Get token from localStorage or set it to an empty string
let tokenStored: Writable<string> = writable(verifyToken());

export function httpStoreOcean(baseUrl: string): HttpStoreOcean {
	let store: Writable<any> = writable([]);
	let headers: any;

	// subscribe to tokenStored changes
	tokenStored.subscribe((newToken: string) => {
		headers = {
			Accept: 'application/json;charset=utf-8',
			'Content-Type': 'application/json',
			'X-Auth-Token': newToken
		};
	});

	let unsubscribe: () => void;

	async function action(method: 'get' | 'post' | 'delete', path: string, config?: RawAxiosRequestConfig<any>) {
		// Validate method
		if (!['get', 'post', 'put', 'delete'].includes(method)) {
			throw new Error(`Invalid method: ${method}`);
		}
		// Validate path
		if (!path || typeof path !== 'string') {
			throw new Error(`Invalid path: ${path}`);
		}
		// Validate config
		if (config && typeof config !== 'object') {
			throw new Error(`Invalid config: ${config}`);
		}
		try {
			const response = await axios[method](`${baseUrl}${path}`, {
				...config,
				headers: { ...headers }
			});

			// update du token si présent dans la réponse
			if (response.data?.token) {
				updateToken(response.data.token);
			}

			store.set(response.data);
			return true;
		} catch (error: any) {
			if (error.response) {
				const status = error.response.status;
				const { oceanStatus, message } = error.response.data;

				store.set({ messageCode: oceanStatus, message, status });

				if (error.response.status === 401) {
					// redirect to login page
				} else if (error.response.status === 422) {
					// display validation error message
				}
			} else {
				store.set({ message: error.message });
			}
			return false;
		}
	}

	// Fonction pour créer/mettre à jour un token d'authentification
	function updateToken(xAuthToken: string) {
		const token = encodeToken(xAuthToken, 'c1d62263d4');
		localStorage.setItem('token', token);
		tokenStored.set(xAuthToken);
	}

	function getToken() {
		return verifyToken();
	}

	function encodeToken(token: string, passphrase: string): string {
		const ciphertext = CryptoJS.AES.encrypt(token, passphrase);
		return ciphertext.toString();
	}

	return {
		subscribe: (run: (value: any, token?: string) => void) => {
			unsubscribe = store.subscribe((value: any) => {
				const token = getToken();
				run(value, token);
			});
			return unsubscribe;
		},
		unsubscribe: () => unsubscribe && unsubscribe(),
		action,
		updateToken,
		getToken
	};
}
