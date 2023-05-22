<script lang="ts">
	import { addEntitiesVehiclesDrivers, openDB } from '$lib/stores/storeIndexedDB';
	import { httpStoreOcean, type HttpStoreOcean } from '$lib/stores/storeOceanApi';
	import Input from '@/compoments/common/forms/Input.svelte';
	import { onMount } from 'svelte';

	import JsonViewCard from '@/compoments/common/card/JsonViewCard.svelte';
	import axios from 'axios';
	import { writable, type Writable } from 'svelte/store';

	$: server = 'https://v3.oceansystem.com/ocean/restapi';
	$: swagger = `${server}/apidocs`;
	$: apidocs = `${server}/api-docs`;
	$: docs = new Map();

	$: searchResult = undefined;
	$: selectedEndPoint = '';
	$: operation = getOperation(selectedEndPoint);

	// let params = {
	// 	customerId: 12597, // flotte orange
	// 	period: {
	// 		start: '2023-03-31T05:00:00.000Z',
	// 		end: '2023-03-31T19:00:00.000Z'
	// 	},
	// 	vehicle: {
	// 		immat: 'EV-508-RS'
	// 	},
	// 	entity: {
	// 		id: undefined
	// 	},
	// 	driver: {
	// 		id: undefined
	// 	}
	// };

	$: customerId = 1150000477; //12597;
	$: vehImmat = 'FR-535-AD';
	$: dateDebut = '2023-05-02T08:23:38.000Z';
	$: dateFin = '2023-05-02T08:23:40.000Z';

	const data: Writable<[]> = writable([]);
	let httpStore: HttpStoreOcean;
	$: if (server) {
		httpStore = httpStoreOcean(server);
		httpStore.subscribe((responseData: any) => {
			searchResult = responseData;
			if (!isEmpty(responseData) && !responseData.token && !responseData.status) {
				data.set(responseData);
				addEntitiesVehiclesDrivers(responseData);
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

	async function handleSearch() {
		await httpStore.action(
			'get',
			selectedEndPoint +
				'?customerId=' +
				customerId +
				'&vehId=272523&date=10/05/2023' +
				'&immatriculation=' +
				vehImmat +
				'&immatsVeh=' +
				vehImmat +
				'&startDate=' +
				dateDebut +
				'&endDate=' +
				dateFin
		);
	}

	const getOperation = (path: string) => {
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

				// défaut
				selectedEndPoint = '/vehicule_engin/vehicles';

				// Affichage de la Map résultante
				console.log(docs);
			},
			(error) => {
				console.log(error);
			}
		);

		return response;
	};

	// let params = [{ name: '', type: '', description: '', required: 'false' }];
	// function addArrayItem(param: any) {
	// 	params = [...params, param];
	// }

	// <div class="row">
	// 					{#if operation?.parameters?.length > 0}
	// 						{#each operation?.parameters as param}
	// 							{#if param.type === 'array'}
	// 								<div class="col-xl-12 mt-2">
	// 									<!-- svelte-ignore a11y-label-has-associated-control -->
	// 									<label class="form-label is-required">{param.name}</label>
	// 									{#each params as _p}
	// 										<input class="form-control form-control-sm col-10" />

	// 										<button class="col-1" type="button" on:click={() => addArrayItem(param)}>-</button>
	// 										<button class="col-1" type="button" on:click={() => addArrayItem(param)}>+</button>
	// 									{/each}
	// 								</div>
	// 							{:else}
	// 								<Input col="3" label={param.name} required={param.required} help={param.description} />
	// 							{/if}
	// 						{/each}
	// 					{/if}
	// 				</div>

	onMount(() => {
		openDB('12597');
		initSwaggerClient();
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
			<h2>Lancer une requête ({operation.summary ?? 'Sélectionner une opération'})</h2>
			<div class="pl-3">
				<p class="display-6">
					<span>
						Une explication détaillée de chaque web service est fournie ainsi que les prérequis pour son exécution.
					</span>
				</p>
			</div>
			<div class="d-flex flex-row align-items-top gap-1">
				<div class="col-12">
					<div class="row">
						<div class="mb-2 col-xl-6">
							<label for="serveur" class="form-label">Serveur</label>
							<select id="serveur" bind:value={server} class="form-select form-select-sm">
								<option selected>Choisissez un serveur</option>
								<option value="https://v3.oceansystem.com/ocean/restapi">production</option>
								<option value="https://dev.dev.interne.ocean.fr/ocean/restapi">développemnt</option>
							</select>
						</div>

						<div class="mb-2 col-xl-6">
							<label for="selectedEndPoint" class="form-label">Opération</label>
							<select id="selectedEndPoint" bind:value={selectedEndPoint} class="form-select form-select-sm">
								<option selected>Choisissez une opération</option>
								{#each [...docs] as [key]}
									<option value={key}>{key}</option>
								{/each}
							</select>
						</div>
					</div>
					<div class="row">
						<Input col="3" label="customer Id" bind:value={customerId} required="true" />

						<Input col="3" label="Immatriculation" bind:value={vehImmat} />
						<Input col="3" label="date début" bind:value={dateDebut} />
						<Input col="3" label="date fin" bind:value={dateFin} />
					</div>
				</div>
			</div>
			<div class="mt-2 mb-2">
				<button class="btn btn-primary" on:click={handleSearch}>Valider</button>
			</div>
		</div>
	</div>

	<div class="mt-1">
		<JsonViewCard data={searchResult} />
	</div>
</div>

<style>
</style>
