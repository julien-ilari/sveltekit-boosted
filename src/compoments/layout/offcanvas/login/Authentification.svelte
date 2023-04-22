<script lang="ts">
	import CardSimple from '@/compoments/common/card/SimpleCard.svelte';
	import Input from '@/compoments/common/forms/Input.svelte';
	import { httpStoreOcean } from '@/lib/stores/storeOceanApi';
	import { onMount } from 'svelte';

	let login = 'jilari';
	$: password = '';
	$: token = '';

	let httpStore = httpStoreOcean('https://v3.oceansystem.com/ocean/restapi');
	let authenticate = async () => {
		return await httpStore.action('post', `/auth/authenticate?login=jilari&password=${password}`);
	};

	let previousValue: [];
	onMount(() => {
		httpStore.subscribe((responseData: any, token?: string) => {
			token = token;
		});
	});
</script>

<CardSimple title="Web API - Gestion des accès">
	<p>Authentification préalable nécessaire et passage du token dans le header X-AUTH-TOKEN</p>
	<div>
		<b>Fonctionnalitées (API) :</b>
		<ul>
			<li>Modification du mot de passe,</li>
			<li>Réinitialisation du mode de passe,</li>
			<li>Gestion des autorisations aux fonctionnalités par utilisateur.</li>
		</ul>
	</div>

	<Input label="login" bind:value={login} required="true" />
	<Input label="password" bind:value={password} required="true" />
	<p>{httpStore.getToken()}</p>
	<button title="Authentification et enregistrement du token" class="btn btn-primary" on:click={authenticate}
		>Authenticate</button
	>
</CardSimple>
