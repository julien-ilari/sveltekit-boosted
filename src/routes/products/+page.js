import { error } from '@sveltejs/kit';
import axios from 'axios';

export const prerender = true;
export const ssr = false;

export async function load({ params }) {
	try {
		let response = await axios.get(`http://127.0.0.1:3000/products/${params.id ?? ''}`);

		return {
			i18n: [
				{
					key: 'page.title',
					values: { fr: 'Tous les produits' }
				}
			],
			products: response.data.data
		};
	} catch (e) {
		throw error(503, 'service indisponible');
	}
}
