<script lang="ts">
	import { onMount } from 'svelte';

	let footer: any;

	export let updateLink: (event: any) => {};
	export let items = [
		{
			to: 'https://www.orange-business.com/fr/informations-legales',
			value: 'Terms and conditions'
		},
		{ to: '/', value: 'Privacy' },
		{ to: '/', value: 'Cookie policy' },
		{ to: '/', value: 'Accessibility statement' },
		{ to: '/', value: 'Become a reseller' }
	];

	function handleClick(event: any) {
		// Appeler la fonction updateLink fournie par l'utilisateur
		if (updateLink) {
			updateLink(event);
		}
	}

	onMount(() => {
		// Ajouter un gestionnaire d'événements onclick à l'élément du composant
		footer.addEventListener('click', handleClick);

		// Nettoyer le gestionnaire d'événements lorsque le composant est détruit
		return () => {
			footer.removeEventListener('click', handleClick);
		};
	});
</script>

<o-footer-legal-links bind:this={footer} copyright="web-maker 2023" {items} />
