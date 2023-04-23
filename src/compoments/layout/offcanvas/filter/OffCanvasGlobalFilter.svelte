<script lang="ts">
	import translate from '@/lib/utils/translate';
	import DataTable from '@/compoments/common/table/DataTable.svelte';
	import GlobalFilter from './GlobalFilter.svelte';
	import { vehicleStore, driverStore, entityStore } from '@/lib/stores/storeIndexedDB';
	import OffCanvasContainer from '../OffCanvasContainer.svelte';
	import OffCanvasContent from '../OffCanvasContent.svelte';

	export let callbackFunction: (e: any) => void;

	// Gestion des listes
	const configEntities = {
		storeRows: entityStore,
		headers: ['id', 'nom']
	};

	const configVehicles = {
		storeRows: vehicleStore,
		headers: [
			{ label: 'id', key: 'id' },
			{ label: translate('fleet.vehicle.immat'), key: 'immatriculation' },
			{ label: translate('fleet.vehicle.desc'), key: 'description' },
			{ label: translate('fleet.vehicle.motorisation.type'), key: 'typeMotorisation' },
			{ label: translate('fleet.vehicle.category'), key: 'categorie' }
		]
	};

	const configDrivers = {
		storeRows: driverStore,
		headers: ['id', 'idNom', 'idPrenom', 'email']
	};
</script>

<OffCanvasContainer id="transfersal-filter-offcanvas">
	<OffCanvasContent 
		id="offcanvasGlobalFilterSelected"
		position="start"
		title="Sélection"
		on:notify={callbackFunction}
	/>

	<OffCanvasContent id="offcanvasGlobalFilter" title="Gestion du filtre globale" on:notify={callbackFunction}>
		<GlobalFilter />
	</OffCanvasContent>

	<OffCanvasContent id="offcanvasEntities" title="Filtrer les entités" on:notify={callbackFunction}>
		<DataTable {...configEntities} />
	</OffCanvasContent>

	<OffCanvasContent id="offcanvasVehicles" title="Filtrer les véhicules" on:notify={callbackFunction}>
		<DataTable {...configVehicles} />
	</OffCanvasContent>

	<OffCanvasContent id="offcanvasDrivers" title="Filtrer les chauffeurs" on:notify={callbackFunction}>
		<DataTable {...configDrivers} />
		<DataTable {...configDrivers} selectedRows={configDrivers.storeRows} />
	</OffCanvasContent>
</OffCanvasContainer>
