<script lang="ts">
	import { httpStoreOcean } from '$lib/stores/storeOceanApi';
	import { onMount } from 'svelte';
	import Input from '@/compoments/common/forms/Input.svelte';
	import CardSimple from '@/compoments/common/card/SimpleCard.svelte';
	import { vehicleStore, addVehicles } from './storeVehicle';
	import DataTable from '@/compoments/common/table/DataTable.svelte';
	import axios from 'axios';

	let fetched = false;
	let loading = false;
	let loadingDelai = 0;
	let loadingMessage = '';
	async function addDot() {
		while (loading) {
			loadingMessage += '.';
			await new Promise((resolve) => setTimeout(resolve, 1000));
			loadingDelai++;
		}
	}

	$: if (loading) {
		loadingDelai = 0;
		addDot(); // appeler la fonction asynchrone
	} else {
		loadingMessage = ''; // effacer le message de chargement
	}

	let server: string = 'https://v3.oceansystem.com/ocean/restapi';
	let apidocs = 'https://v3.oceansystem.com/ocean/restapi/api-docs';
	let docs = new Map();

	let swagger = 'https://v3.oceansystem.com/ocean/apidocs';
	let swaggerSpec: any;

	$: selectedEndPoint = '/vehicule_engin/vehicles';
	let path = 'vehicule_engin/vehicles?customerId=12597';
	let customerId: number = 12597;
	let vehImmat: string = 'EV-508-RS';
	let dateDebut: string = '2023-03-31T05:00:00.000Z';
	let dateFin: string = '2023-03-31T19:00:00.000Z';
	let login: string = 'jilari';
	let password: string = '';
	let token: string = '';

	let data: any[];
	$: if (vehicleStore) {
		data = $vehicleStore ?? [];
		if (data.length > 0) {
			fetched = true;
		}
	}

	let httpStore = httpStoreOcean(server);
	httpStore.subscribe((responseData: any) => {
		if (!isEmpty(responseData) && !responseData.token) {
			data = responseData;
		}
	});

	function isEmpty(obj: Object) {
		for (var prop in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, prop)) {
				return false;
			}
		}

		return JSON.stringify(obj) === JSON.stringify({});
	}

	let authenticate = async () => {
		return await httpStore.action('post', 'auth/authenticate?login=jilari&password=C%40rn2par0l3');
	};

	// ---- FIN AUTHENTIFICATION

	async function handleSearch() {
		loading = true;
		const success = await httpStore.action(
			'get',
			selectedEndPoint + '?customerId=' + customerId + '&immatriculation=' + vehImmat
		);

		fetched = true;
		loading = false;
		if (success) addVehicles(data);
	}

	async function handleSearchAll() {
		loading = true;
		const success = await httpStore.action('get', path);
		fetched = true;
		loading = false;
		if (success) addVehicles(data);
	}

	async function handleSearchPositions() {
		loading = true;
		const success = await httpStore.action(
			'get',
			'positions/search?byStorageDate=false' +
				'&customerId=' +
				customerId +
				'&immatriculation=' +
				vehImmat +
				'&startDate=' +
				dateDebut +
				'&endDate=' +
				dateFin
		);
		fetched = true;
		loading = false;
	}

	const operation = (path: string) => {
		const operation = docs.get(path);
		return operation?.get || operation?.post || operation?.delete || operation?.update || operation?.put || {};
	};

	const initSwaggerClient = async () => {
		const response = await axios.get(apidocs).then(
			(response) => {
				console.log(response.data.paths);
				// Création d'une Map vide
				docs = new Map();

				// Boucle sur les clés de l'objet et ajout de chaque clé et valeur à la Map
				Object.keys(response.data.paths).forEach(function (key) {
					docs.set(key, response.data.paths[key]);
				});

				// Affichage de la Map résultante
				console.log(docs);
			},
			(error) => {
				console.log(error);
			}
		);

		return response;
	};

	onMount(async () => {
		// initialisation swagger client
		const swaggerClient = await initSwaggerClient();

		// Si vous avez déjà un token enregistré, vous pouvez le récupérer ici
		// et le stocker dans la variable "token".
	});
</script>

<div style="" class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
	<div class="offcanvas-header">
		<h5 class="offcanvas-title" id="offcanvasTopLabel">Offcanvas top</h5>
		<button type="button" class="btn-close" data-bs-dismiss="offcanvas">
			<span class="visually-hidden">Close</span>
		</button>
	</div>
	<div class="offcanvas-body">...</div>
</div>

<o-title-bar>
	<h1 class="display-4">Les Web Services (offre Data)</h1>
</o-title-bar>

<div class="m-1 p-2 row">
	<p class="display-6">
		<span>Une explication détaillée de chaque web service est fournie ainsi que les prérequis pour son exécution.</span>
		<br />
	</p>
	<div class="pl-3">
		<h2>Tématiques</h2>
		<ul>
			<li>Gestion des accès</li>
			<li>Gestion des missions</li>
			<li>Gestion des adresses de référence</li>
			<li>Gestion de la flotte</li>
			<li>Trajets et positions</li>
			<li>Boitiers non communicants</li>
			<li>Equipement auxiliaire</li>
			<li>Eco-Conduite</li>
		</ul>

		<button
			class="btn btn-primary"
			type="button"
			data-bs-toggle="offcanvas"
			data-bs-target="#offcanvasTop"
			aria-controls="offcanvasTop"
		>
			Toggle top offcanvas
		</button>
	</div>

	<div class="col-xxl-6">
		<CardSimple title="Infos. serveur" cssClass="row">
			<Input col="4" label="serveur" bind:value={server} required="true" />

			<div class="mb-2 col-6">
				<label for="selectedEndPoint" class="form-label">Opération</label>
				<select id="selectedEndPoint" bind:value={selectedEndPoint} class="form-select form-select-sm">
					<option selected>Choisissez une opération</option>
					{#each [...docs] as [key, value], index}
						<option value={key}>{key}</option>
					{/each}
				</select>
			</div>

			<Input col="2" label="customer Id" bind:value={customerId} required="true" />

			{#if selectedEndPoint}
				<p>{operation(selectedEndPoint).summary}</p>
				<br />
			{/if}
		</CardSimple>

		<CardSimple title="Web API - Gestion des accès">
			<p>Authentification préalable nécessaire et passage du token dans le header X-AUTH-TOKEN</p>
			<div>
				<b>Fonctionnalitées de API :</b>
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
			<a href={apidocs} rel="noreferrer" target="_blank" class="btn btn-link" download="true"> Document api </a>
			<a href={swagger} rel="noreferrer" target="_blank" class="btn btn-link" download="true"> swagger </a>
		</CardSimple>

		<CardSimple title="Données">
			<DataTable headers={['id', 'immatriculation', 'description', 'typeMotorisation', 'categorie']} rows={[]} />
		</CardSimple>
	</div>
	<div class="col-6">
		<CardSimple title="Lancement query" cssClass="row">
			<Input col="3" label="Immatriculation" bind:value={vehImmat} />
			<Input col="4" label="date début" bind:value={dateDebut} />
			<Input col="4" label="date début" bind:value={dateFin} />
			<div>
				<button class="btn btn-primary" on:click={handleSearch}>Search vehicle !</button>
				<button class="btn btn-primary" on:click={handleSearchAll}>Search all vehicles !</button>
				<button class="btn btn-primary" on:click={handleSearchPositions}>Search positions !</button>
			</div>
		</CardSimple>

		{#if loading}
			<CardSimple title="JSON viewer ({loadingDelai} sec)" bodyColor="secondary">
				<span>Recherche en-cours ({loadingDelai} sec) {loadingMessage}</span>
			</CardSimple>
		{:else if $httpStore.message}
			<p>Error ({loadingDelai} sec) : {JSON.stringify($httpStore, null, 3)}</p>
		{:else if fetched == true && data.length === 0}
			<CardSimple title="JSON viewer ({loadingDelai} sec)" bodyColor="warning">
				<div class="card-text">noData</div>
			</CardSimple>
		{:else if fetched === true}
			<CardSimple title="JSON viewer ({loadingDelai} sec)" bodyColor="success">
				{server}{path}?customerId&#61;{customerId} <br />
				<div class="mt-2">
					<svg role="img" width="1.6em" height="1.6em" fill="currentColor" aria-hidden="true" focusable="false">
						<use xlink:href="/docs/5.2/assets/img/boosted-sprite.svg#success" />
					</svg> <b>success !</b>
				</div>

				<pre class="card-text" style=" font-size: 18px; font-weight: bold;">
                        <br /><code>{JSON.stringify([], undefined, 3).trim()}</code>
                    </pre>
			</CardSimple>
		{/if}
	</div>
</div>

<style>
</style>
