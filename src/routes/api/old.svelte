<script lang="ts">
	import { vehicleStore } from '$lib/stores/storeIndexedDB';

	import { Bar } from 'svelte-chartjs';
	import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
	const config = {
		backgroundColor: [
			'rgba(255, 134,159,0.4)',
			'rgba(98,  182, 239,0.4)',
			'rgba(255, 218, 128,0.4)',
			'rgba(113, 205, 205,0.4)',
			'rgba(170, 128, 252,0.4)',
			'rgba(255, 177, 101,0.4)'
		],
		borderWidth: 2,
		borderColor: [
			'rgba(255, 134, 159, 1)',
			'rgba(98,  182, 239, 1)',
			'rgba(255, 218, 128, 1)',
			'rgba(113, 205, 205, 1)',
			'rgba(170, 128, 252, 1)',
			'rgba(255, 177, 101, 1)'
		]
	};

	const MONO = $vehicleStore.filter((o) => {
		const val: any = o;
		return val.typeMotorisation === 'MONO' && val.idEnergie > 0 && val.idEnergie !== 10;
	}).length;

	const MONO_ELEC = $vehicleStore.filter((o) => {
		const val: any = o;
		return val.typeMotorisation === 'MONO' && val.idEnergie == 10;
	}).length;

	const HYBRIDE_RECHARGEABLE = $vehicleStore.filter((o) => {
		const val: any = o;
		return val.typeMotorisation === 'HYBRIDE_RECHARGEABLE';
	}).length;

	const AUTRE_MOTORISATION = $vehicleStore.filter((o) => {
		const val: any = o;
		return (
			val.typeMotorisation !== 'HYBRIDE_RECHARGEABLE' &&
			val.typeMotorisation !== 'MONO' &&
			val.typeMotorisation !== 'UNDEFINED'
		);
	}).length;

	const UNDEFINED = $vehicleStore.filter((o) => {
		const val: any = o;
		return val.typeMotorisation === 'UNDEFINED' || !(val.idUniteConsommation > 0) || !(val.valeurConsommation > 0);
	}).length;

	const dataMotorisation = {
		labels: [
			'MONO : ' + MONO,
			'MONO ELEC : ' + MONO_ELEC,
			'HYBRIDE_RECHARGEABLE : ' + HYBRIDE_RECHARGEABLE,
			'AUTRE MOTORISATION : ' + AUTRE_MOTORISATION,
			'?? UNDEFINED ?? : ' + UNDEFINED
		],
		datasets: [
			{
				label: 'FV Motorisation',
				data: [MONO, MONO_ELEC, HYBRIDE_RECHARGEABLE, AUTRE_MOTORISATION, UNDEFINED],
				...config
			}
		]
	};

	const MONO_OK = $vehicleStore.filter((o) => {
		const val: any = o;
		return (
			val.typeMotorisation === 'MONO' &&
			val.idEnergie !== 10 &&
			(val.idUniteConsommation === 1 || val.idUniteConsommation === 2) &&
			val.valeurConsommation > 0
		);
	}).length;

	const MONO_CONSO_UNIT_UNDEFINED = $vehicleStore.filter((o) => {
		const val: any = o;
		return val.typeMotorisation === 'MONO' && val.idEnergie !== 10 && val.idUniteConsommation === 'UNDEFINED';
	}).length;

	const MONO_CONSO_UNIT_KO = $vehicleStore.filter((o) => {
		const val: any = o;
		return (
			val.typeMotorisation === 'MONO' &&
			val.idEnergie !== 10 &&
			val.idUniteConsommation !== 'UNDEFINED' &&
			val.idUniteConsommation !== 1 &&
			val.idUniteConsommation !== 2
		);
	}).length;

	const MONO_CONSO_VALUE_KO = $vehicleStore.filter((o) => {
		const val: any = o;
		return (
			val.typeMotorisation === 'MONO' &&
			val.idEnergie !== 10 &&
			(val.idUniteConsommation === 1 || val.idUniteConsommation == 2) &&
			!(val.valeurConsommation > 0)
		);
	}).length;

	const dataMono = {
		labels: [
			'MONO_OK : ' + MONO_OK,
			'MONO_CONSO_UNIT_UNDEFINED : ' + MONO_CONSO_UNIT_UNDEFINED,
			'MONO_CONSO_UNIT_KO : ' + MONO_CONSO_UNIT_KO,
			'MONO_CONSO_VALUE_KO : ' + MONO_CONSO_VALUE_KO
		],
		datasets: [
			{
				label: 'FV Mono (non électrique)',
				data: [MONO_OK, MONO_CONSO_UNIT_UNDEFINED, MONO_CONSO_UNIT_KO, MONO_CONSO_VALUE_KO],
				backgroundColor: [
					'rgba(98,  182, 239,0.4)',
					'rgba(255, 134,159,0.4)',
					'rgba(255, 134,159,0.4)',
					'rgba(255, 134,159,0.4)'
				],
				borderWidth: 2,
				borderColor: [
					'rgba(98,  182, 239, 1)',
					'rgba(255, 134, 159, 1)',
					'rgba(255, 134, 159, 1)',
					'rgba(255, 134, 159, 1)'
				]
			}
		]
	};

	const MONO_ELEC_OK = $vehicleStore.filter((o) => {
		const val: any = o;
		return (
			val.typeMotorisation === 'MONO' &&
			val.idEnergie === 10 &&
			(val.idUniteConsommation === 3 || val.idUniteConsommation === 4) &&
			val.valeurConsommation > 0
		);
	}).length;

	const MONO_ELEC_CONSO_UNIT_UNDEFINED = $vehicleStore.filter((o) => {
		const val: any = o;
		return val.typeMotorisation === 'MONO' && val.idEnergie === 10 && val.idUniteConsommation === 'UNDEFINED';
	}).length;

	const MONO_ELEC_CONSO_UNIT_KO = $vehicleStore.filter((o) => {
		const val: any = o;
		return (
			val.typeMotorisation === 'MONO' &&
			val.idEnergie === 10 &&
			val.idUniteConsommation !== 3 &&
			val.idUniteConsommation !== 4 &&
			val.valeurConsommation > 0
		);
	}).length;

	const MONO_ELEC_CONSO_VALUE_KO = $vehicleStore.filter((o) => {
		const val: any = o;
		return (
			val.typeMotorisation === 'MONO' &&
			val.idEnergie === 10 &&
			(val.idUniteConsommation === 3 || val.idUniteConsommation === 4) &&
			!(val.valeurConsommation > 0)
		);
	}).length;

	const dataElectric = {
		labels: [
			'MONO_ELEC_OK : ' + MONO_ELEC_OK,
			'MONO_ELEC_CONSO_UNIT_UNDEFINED : ' + MONO_ELEC_CONSO_UNIT_UNDEFINED,
			'MONO_ELEC_CONSO_UNIT_KO : ' + MONO_ELEC_CONSO_UNIT_KO,
			'MONO_ELEC_CONSO_VALUE_KO :' + MONO_ELEC_CONSO_VALUE_KO
		],
		datasets: [
			{
				label: 'FV Mono (électrique)',
				data: [MONO_ELEC_OK, MONO_ELEC_CONSO_UNIT_UNDEFINED, MONO_ELEC_CONSO_UNIT_KO, MONO_ELEC_CONSO_VALUE_KO],
				backgroundColor: [
					'rgba(98,  182, 239,0.4)',
					'rgba(255, 134,159,0.4)',
					'rgba(255, 134,159,0.4)',
					'rgba(255, 134,159,0.4)'
				],
				borderWidth: 2,
				borderColor: [
					'rgba(98,  182, 239, 1)',
					'rgba(255, 134, 159, 1)',
					'rgba(255, 134, 159, 1)',
					'rgba(255, 134, 159, 1)'
				]
			}
		]
	};

	const HYBRIDE_RECHARGEABLE_OK = $vehicleStore.filter((o) => {
		const val: any = o;
		return (
			val.typeMotorisation === 'HYBRIDE_RECHARGEABLE' &&
			val.idEnergie > 0 &&
			val.idEnergie !== 10 &&
			(val.valeurConsommation === 1 || val.valeurConsommation === 2) &&
			!(val.valeurConsommation > 0)
		);
	}).length;

	const HYBRIDE_RECHARGEABLE_KO = $vehicleStore.filter((o) => {
		const val: any = o;
		return val.typeMotorisation === 'HYBRIDE_RECHARGEABLE';
	}).length;

	const dataHR = {
		labels: [
			'HYBRIDE_RECHARGEABLE_OK : ' + HYBRIDE_RECHARGEABLE_OK,
			'HYBRIDE_RECHARGEABLE_KO : ' + HYBRIDE_RECHARGEABLE_KO
		],
		datasets: [
			{
				label: 'FV Hybride',
				data: [HYBRIDE_RECHARGEABLE_OK, HYBRIDE_RECHARGEABLE_KO],
				backgroundColor: ['rgba(98,  182, 239,0.4)', 'rgba(255, 134,159,0.4)'],
				borderWidth: 2,
				borderColor: ['rgba(98,  182, 239, 1)', 'rgba(255, 134, 159, 1)']
			}
		]
	};

	const listeKO = $vehicleStore
		.filter((o) => {
			let val: any = o;
			return (
				val.typeMotorisation === 'MONO' &&
				val.idEnergie !== 10 &&
				val.idUniteConsommation !== 'UNDEFINED' &&
				val.idUniteConsommation !== 1 &&
				val.idUniteConsommation !== 2
			);
		})
		.map((o) => {
			let val: any = o;
			return val.immatriculation;
		});
</script>

<o-title-bar class="title-bar">
	<h1 class="display-4">Conformité des fiches véhicules</h1>
</o-title-bar>

<Bar height="30" data={dataMotorisation} options={{ responsive: true, maintainAspectRatio: true }} />
<Bar height="30" data={dataMono} options={{ responsive: true, maintainAspectRatio: true }} />
{listeKO}
<Bar height="30" data={dataElectric} options={{ responsive: true, maintainAspectRatio: true }} />
<Bar height="30" data={dataHR} options={{ responsive: true, maintainAspectRatio: true }} />
