import { writable, type Writable } from 'svelte/store';
import axios, { type RawAxiosRequestConfig } from 'axios';
import CryptoJS from 'crypto-js';

export interface Data<T> {
	type?: string;
	id?: string;
	attributes?: T;
	relationships?: any;
}

export interface CollectionJsonAPI<T> extends ErrorJsonAPI {
	data?: Data<T>[];
}

interface SingleJsonAPI<T> extends ErrorJsonAPI {
	included?: Array<Data<T>>;
	data?: Data<T>;
}

export interface ErrorJsonAPI {
	message?: string;
	status?: number;
	errorCode?: string;
}

export interface HttpStore<T> {
	subscribe: (run: (value: CollectionJsonAPI<T>) => void) => () => void;
	unsubscribe: () => void;
	action: (
		method: 'get' | 'post' | 'put' | 'patch' | 'delete',
		path: string,
		config?: RawAxiosRequestConfig<any>
	) => Promise<boolean>;
}

export interface HttpStoreOcean {
	subscribe: (run: (value: any) => void) => () => void;
	unsubscribe: () => void;
	action: (method: 'get' | 'post' | 'delete', path: string, config?: RawAxiosRequestConfig<any>) => Promise<boolean>;
	updateToken: (token: string) => void;
}

export function createHttpStoreOcean(baseUrl: string): HttpStoreOcean {
	const store: Writable<any> = writable({});
	let unsubscribe: () => void;

	// Get token from localStorage or set it to an empty string
	let token = verifyToken();
	const headers = {
		Accept: 'application/json;charset=utf-8',
		'Content-Type': 'application/json',
		'X-Auth-Token': token
	};

	async function action(method: 'get' | 'post' | 'delete', path: string, config?: RawAxiosRequestConfig<any>) {
		// Validate method
		if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) {
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
			const response = await axios[method](`${baseUrl}/${path}`, {
				...config,
				headers: { ...headers }
			});
			store.set(response.data);
			return true;
		} catch (error: any) {
			if (error.response) {
				const status = error.response.status;
				const { oceanStatus, message } = error.response.data;
				store.set({ messageCode: oceanStatus, message, status });
				if (error.response.status === 401) {
					// redirect to login page
				} else if (error.response.status === 422 && error.errorCode === 'validation_error') {
					// display validation error message
				}
			} else {
				store.set({ message: error.message });
			}
			return false;
		}
	}

	// Fonction pour vérifier le token d'authentification
	function verifyToken() {
		const token = localStorage.getItem('token') ? decodeToken(localStorage.getItem('token') ?? '', 'c1d62263d4') : '';
		// encode
		return token;
	}

	// Fonction pour créer/mettre à jour un token d'authentification
	function updateToken(xAuthToken: string) {
		token = encodeToken(xAuthToken, 'c1d62263d4');
		localStorage.setItem('token', token);
	}

	function encodeToken(token: string, passphrase: string): string {
		const ciphertext = CryptoJS.AES.encrypt(token, passphrase);
		return ciphertext.toString();
	}

	function decodeToken(encodedToken: string, passphrase: string): string {
		const bytes = CryptoJS.AES.decrypt(encodedToken, passphrase);
		const originalToken = bytes.toString(CryptoJS.enc.Utf8);
		return originalToken;
	}

	return {
		subscribe: (run: (value: any) => void) => {
			unsubscribe = store.subscribe(run);
			return unsubscribe;
		},
		unsubscribe: () => unsubscribe && unsubscribe(),
		action,
		updateToken
	};
}

export function createHttpStore<T>(baseUrl: string): HttpStore<T> {
	const store: Writable<CollectionJsonAPI<T>> = writable({});
	let unsubscribe: () => void;

	async function action(
		method: 'get' | 'post' | 'put' | 'patch' | 'delete',
		path: string,
		config?: RawAxiosRequestConfig<any>
	) {
		// Validate method
		if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) {
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
			const response = await axios[method](`${baseUrl}/${path}`, config);
			store.set(response.data);
			return true;
		} catch (error: any) {
			if (error.response) {
				const { status, data } = error.response;
				store.set({
					message: error.message,
					status,
					errorCode: data.errorCode
				});
				if (status === 401) {
					// redirect to login page
				} else if (status === 422 && data.errorCode === 'validation_error') {
					// display validation error message
				}
			} else {
				store.set({ message: error.message });
			}
			return false;
		}
	}

	return {
		subscribe: (run: (value: CollectionJsonAPI<T>) => void) => {
			unsubscribe = store.subscribe(run);
			return unsubscribe;
		},
		unsubscribe: () => unsubscribe && unsubscribe(),
		action
	};
}
