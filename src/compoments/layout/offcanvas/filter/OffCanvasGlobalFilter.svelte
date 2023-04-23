<script lang="ts">
	import translate from '@/lib/utils/translate';
	import DataTable from '@/compoments/common/table/DataTable.svelte';
	import GlobalFilter from './GlobalFilter.svelte';
	import { vehicleStore, driverStore, entityStore } from '@/lib/stores/storeIndexedDB';
	import OffCanvasContainer from '../OffCanvasContainer.svelte';
	import OffCanvasContent from '../OffCanvasContent.svelte';

	export let callbackFunction: (e: any) => void;

	// Gestion des listes
	const entities = entityStore;
	const vehicles = vehicleStore;
	const drivers = driverStore;

	function handleSelect(event: any) {
		const selectedRows = event?.detail?.rows;
		// alert(JSON.stringify(selectedRows, null, 2));
		// do something with selected rows
	}
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
		<DataTable headers={['id', 'nom']} storeRows={entities} />
	</OffCanvasContent>

	<OffCanvasContent id="offcanvasVehicles" title="Filtrer les véhicules" on:notify={callbackFunction}>
		<DataTable
			on:select={handleSelect}
			headers={[
				{ label: 'id', key: 'id' },
				{ label: translate('fleet.vehicle.immat'), key: 'immatriculation' },
				{ label: translate('fleet.vehicle.desc'), key: 'description' },
				{ label: translate('fleet.vehicle.motorisation.type'), key: 'typeMotorisation' },
				{ label: translate('fleet.vehicle.category'), key: 'categorie' }
			]}
			storeRows={vehicles}
		/>
	</OffCanvasContent>

	<OffCanvasContent id="offcanvasDrivers" title="Filtrer les chauffeurs" on:notify={callbackFunction}>
		<DataTable
			headers={[
				'id',
				{ label: 'nom', key: 'nomInd' },
				{ label: 'prénom', key: 'prenomInd' },
				{ label: 'email', key: 'email' }
			]}
			storeRows={drivers}
		/>
	</OffCanvasContent>
</OffCanvasContainer>
