<script lang="ts">
	import { httpStoreOcean } from '$lib/stores/storeOceanApi';
	import { onMount } from 'svelte';
	import Input from '@/compoments/common/forms/Input.svelte';
	import CardSimple from '@/compoments/common/card/SimpleCard.svelte';
	import { vehicleStore, addEntitiesVehiclesDrivers } from '../../lib/stores/storeIndexedDB';
	import DataTable from '@/compoments/common/table/DataTable.svelte';
	import axios from 'axios';
	import { writable } from 'svelte/store';
	import Modal from '@/compoments/common/modals/Modal.svelte';

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

	$: server = 'https://v3.oceansystem.com/ocean/restapi';
	$: apidocs = `${server}/api-docs`;
	$: docs = new Map();
	$: if (apidocs) {
		data.set([]);
		initSwaggerClient();
	}

	$: swagger = `${server}/apidocs`;
	let swaggerSpec: any;

	$: selectedEndPoint = '/vehicule_engin/vehicles';
	$: path = '/vehicule_engin/vehicles?customerId=12597';

	let customerId: number = 12597;
	let vehImmat: string = 'EV-508-RS';
	let dateDebut: string = '2023-03-31T05:00:00.000Z';
	let dateFin: string = '2023-03-31T19:00:00.000Z';

	const data = writable<any[]>([]);
	$: if (vehicleStore && !fetched && $vehicleStore.length > 0) {
		data.set($vehicleStore);
		fetched = true;
	}

	$: httpStore = httpStoreOcean(server);
	$: if (server) {
		httpStore.subscribe((responseData: any) => {
			if (!isEmpty(responseData) && !responseData.token) {
				console.log(responseData);
				data.set(responseData);
			}
		});
	}

	function isEmpty(obj: Object) {
		for (var prop in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, prop)) {
				return false;
			}
		}

		return JSON.stringify(obj) === JSON.stringify({});
	}

	// ---- FIN AUTHENTIFICATION

	async function handleSearch() {
		loading = true;
		const success = await httpStore.action(
			'get',
			selectedEndPoint + '?customerId=' + customerId + '&immatriculation=' + vehImmat
		);
		if (success) addEntitiesVehiclesDrivers($data);
		fetched = true;
		loading = false;
	}

	async function handleSearchAll() {
		loading = true;
		const success = await httpStore.action('get', path);
		fetched = true;
		loading = false;
		if (success) addEntitiesVehiclesDrivers($data);
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

<o-title-bar>
	<h1 class="display-4">Les Web Services (offre Data)</h1>
</o-title-bar>
<div>
	<a href={apidocs} rel="noreferrer" target="_blank" class="btn btn-link" download="true"> Document api </a>
	<a href={swagger} rel="noreferrer" target="_blank" class="btn btn-link" download="true"> swagger </a>
</div>

<div class="m-1 p-2 row">
	<div class="col-12">
		<div class="row">
			<h2>Lancer une requête ({operation(selectedEndPoint).summary ?? 'Sélectionner une opération'})</h2>
			<div class="pl-3">
				<p class="display-6">
					<span>
						Une explication détaillée de chaque web service est fournie ainsi que les prérequis pour son exécution.
					</span>
				</p>
			</div>
			<div class="d-flex flex-row align-items-top gap-1">
				<div class="col-9 row">
					<div class="mb-2 col-6">
						<label for="serveur" class="form-label">Serveur</label>
						<select id="serveur" bind:value={server} class="form-select form-select-sm">
							<option selected>Choisissez un serveur</option>
							<option value="https://v3.oceansystem.com/ocean/restapi">production</option>
							<option value="https://dev.dev.interne.ocean.fr/ocean/restapi">développemnt</option>
						</select>
					</div>

					<div class="mb-2 col-6">
						<label for="selectedEndPoint" class="form-label">Opération</label>
						<select id="selectedEndPoint" bind:value={selectedEndPoint} class="form-select form-select-sm">
							<option selected>Choisissez une opération</option>
							{#each [...docs] as [key, value], index}
								<option value={key}>{key}</option>
							{/each}
						</select>
					</div>
					<div class="row">
						<Input col="3" label="customer Id" bind:value={customerId} required="true" />

						<Input col="3" label="Immatriculation" bind:value={vehImmat} />
						<Input col="3" label="date début" bind:value={dateDebut} />
						<Input col="3" label="date fin" bind:value={dateFin} />
					</div>
				</div>
			</div>
			<div>
				<button class="btn btn-primary" on:click={handleSearch}>Search vehicle !</button>
				<button class="btn btn-primary" on:click={handleSearchAll}>Search all vehicles !</button>
				<button class="btn btn-primary" on:click={handleSearchPositions}>Search positions !</button>
			</div>
		</div>
	</div>
	<div class="col-12">
		<CardSimple title="Données">
			<DataTable headers={['id', 'immatriculation', 'description', 'typeMotorisation', 'categorie']} rows={$data} />
		</CardSimple>
	</div>
</div>

<style>
</style>
