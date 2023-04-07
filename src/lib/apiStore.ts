import { writable, type Writable } from 'svelte/store';
import axios, { type RawAxiosRequestConfig } from 'axios';

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
