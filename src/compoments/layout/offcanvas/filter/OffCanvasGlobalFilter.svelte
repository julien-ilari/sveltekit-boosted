<script lang="ts">
	import translate from '@/lib/utils/translate';
	import DataTable from '@/compoments/common/table/DataTable.svelte';
	import GlobalFilter from './GlobalFilter.svelte';
	import { vehicleStore, driverStore, entityStore } from '@/lib/stores/storeIndexedDB';
	import OffCanvasContainer from '../OffCanvasContainer.svelte';
	import OffCanvasContent from '../OffCanvasContent.svelte';
	import SelectionFilter from './SelectionFilter.svelte';
	import { writable } from 'svelte/store';

	export let callbackFunction: (e: any) => void;

	// Gestion des listes
	const configEntities = {
		storeRows: entityStore,
		selectedRows: writable([]),
		headers: ['id', 'nom']
	};

	const configVehicles = {
		storeRows: vehicleStore,
		selectedRows: writable([]),
		headers: [
			{ label: 'id', key: 'id' },
			{ label: translate('fleet.vehicle.immat'), key: 'immatriculation' },
			{ label: translate('fleet.vehicle.desc'), key: 'description' },
			{ label: translate('fleet.vehicle.motorisation.type'), key: 'typeMotorisation' },
			{ label: translate('fleet.vehicle.category'), key: 'categorieVehiculeEcoConduite	' }
		]
	};

	const configDrivers = {
		storeRows: driverStore,
		headers: ['id', 'idNom', 'idPrenom', 'email'],
		selectedRows: writable([])
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
		<SelectionFilter>
			<DataTable
				headers={configEntities.headers}
				storeRows={configEntities.selectedRows}
				selectedRows={configEntities.selectedRows}
			/>
		</SelectionFilter>
		<DataTable {...configEntities} />
	</OffCanvasContent>

	<OffCanvasContent id="offcanvasVehicles" title="Filtrer les véhicules" on:notify={callbackFunction}>
		<SelectionFilter>
			<DataTable
				headers={configVehicles.headers}
				storeRows={configVehicles.selectedRows}
				selectedRows={configVehicles.selectedRows}
			/>
		</SelectionFilter>
		<DataTable {...configVehicles} />
	</OffCanvasContent>

	<OffCanvasContent id="offcanvasDrivers" title="Filtrer les chauffeurs" on:notify={callbackFunction}>
		<SelectionFilter>
			<DataTable
				headers={configDrivers.headers}
				storeRows={configDrivers.selectedRows}
				selectedRows={configDrivers.selectedRows}
			/>
		</SelectionFilter>
		<DataTable {...configDrivers} />
	</OffCanvasContent>
</OffCanvasContainer>
