<script>
	import translate from '@/lib/utils/translate';
	import { beforeUpdate, onDestroy, createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';

	export let headers = []; // Les en-têtes de colonnes de la table
	export let rows = []; // Les données des lignes de la table

	// Les lignes actuellement affichées, en fonction des critères de filtrage et de pagination
	const displayedRows = writable([]);
	// Les lignes actuellement sélectionnées
	const selectedRows = writable([]);

	let filterRegex = ''; // Le texte de recherche, sous forme d'expression régulière

	// Cette fonction gère la sélection/désélection de toutes les lignes affichées
	function toggleAll() {
		if ($displayedRows.length > 0) {
			const allDisplayedSelected = $displayedRows.every((row) => $selectedRows.some((r) => r.id === row.id));
			if (allDisplayedSelected) {
				// Tous les éléments affichés sont déjà sélectionnés, on les retire tous de la sélection
				selectedRows.set($selectedRows.filter((r) => !$displayedRows.includes(r)));
			} else {
				// On ajoute tous les éléments affichés à la sélection, sans doublons
				const newSelectedRows = [...new Set([...$selectedRows, ...$displayedRows])];
				selectedRows.set(newSelectedRows);
			}
		}
	}

	// Cette fonction gère la sélection/désélection d'une ligne, en fonction de son indice
	function toggleSelected(rowIndex) {
		const selectedItem = $displayedRows[rowIndex];

		selectedRows.update((selected) => {
			const isPresent = selected.map((o) => o.id).includes(selectedItem.id);
			if (isPresent) {
				return selected.filter((o) => o.id !== selectedItem.id);
			} else {
				return [...selected, selectedItem];
			}
		});
	}

	// Cette fonction gère l'affichage des lignes, en fonction des critères de filtrage et de pagination
	function displayRows() {
		let filteredRows = rows.filter((row) => {
			return Object.values(row).join().match(filterRegex);
		});

		let totalRows = filteredRows.length;
		if (totalRows === 0) {
			first = 0;
			last = 0;
			displayedRows.set([]);
			return;
		}

		first = (currentPage - 1) * rowsPerPage;
		last = Math.min(first + rowsPerPage, filteredRows.length);

		displayedRows.set(filteredRows.slice(first, last));
	}

	// Cette fonction gère le passage à la page suivante de la pagination
	function nextPage() {
		if (currentPage < Math.ceil(rows.length / rowsPerPage)) {
			currentPage++;
		}
		displayRows();
	}

	// Cette fonction gère le retour à la page précédente de la pagination
	function previousPage() {
		if (currentPage > 1) {
			currentPage--;
		}
		displayRows();
	}

	// Cette fonction met à jour l'expression régulière de filtrage en fonction de l'entrée de l'utilisateur
	function updateFilter(event) {
		let filterValue = event?.target?.value.replace(/\*/g, '.*').replace(/\|/g, '|') ?? '';
		filterRegex = new RegExp(filterValue, 'i');
		currentPage = 1;
		displayRows();
	}

	// Cette fonction vérifie si une ligne est sélectionnée
	function isSelected(row) {
		return $selectedRows.some((r) => r.id === row.id);
	}

	beforeUpdate(() => {
		// initialize selectedRows with all rows selected
		displayRows();
	});

	onDestroy(() => {
		// reset selectedRows when component is destroyed
		selectedRows.set([]);
		displayedRows.set([]);
	});

	const dispatch = createEventDispatcher();
	function dispatchSelectEvent() {
		dispatch('select', {
			rows: $selectedRows
		});
	}

	/* Logique pour que la sélection des lignes reste cohérente lors du filtrage des résultats */
	$: displayedIndices = $displayedRows.map((_, i) => first + i);
	$: visibleSelected = $displayedRows.map(
		(row) => $selectedRows.find((selectedRow) => selectedRow.id === row.id) !== undefined
	);
	$: allVisibleSelected = $displayedRows.length > 0 && visibleSelected.every(Boolean);
	$: {
		if (allVisibleSelected && !$selectedRows.some((selectedRow) => displayedIndices.indexOf(selectedRow.id) === -1)) {
			const selectedIds = $selectedRows.map((row) => row.id);
			const newSelection = [...selectedIds, ...displayedIndices.filter((index) => selectedIds.indexOf(index) === -1)];
			selectedRows.set(newSelection.map((id) => rows.find((row) => row.id === id)));
		}
		if (!allVisibleSelected && $selectedRows.some((selectedRow) => displayedIndices.indexOf(selectedRow.id) !== -1)) {
			const selectedIds = $selectedRows.map((row) => row.id);
			const newSelection = selectedIds.filter((id) => displayedIndices.indexOf(id) === -1);
			selectedRows.set(newSelection.map((id) => rows.find((row) => row.id === id)));
		}
	}

	let currentPage = 1;
	let rowsPerPage = 10;
	let first = 0;
	let last = 0;

	/* Calcul du nombre total de records */
	let totalRecords = rows.length;
</script>

{#if $displayedRows && totalRecords > 0}
	<div class="p-0">
		<nav aria-label="buttons navigation datatable">
			<div class="pagination m-0">
				<span class="page-item {currentPage === 1 ? 'disabled' : ''}">
					<button class="page-link" on:click={previousPage} href="#">{translate('datatable.previous')}</button>
				</span>
				<span class="page-item {currentPage === Math.ceil(rows.length / rowsPerPage) ? 'disabled' : ''}">
					<button class="page-link" on:click={nextPage} href="#">{translate('datatable.next')}</button>
				</span>
			</div>
		</nav>

		<div class="my-2">
			<button type="button" class="btn btn-link" on:click={() => selectedRows.set([])}>Clear Selection</button>

			<button class="btn btn-link"
			data-bs-toggle="offcanvas"
			data-bs-target="#offcanvasGlobalFilterSelected"
			aria-controls="offcanvasGlobalFilterSelected">Voir Sélection</button>

			<button on:click={dispatchSelectEvent} 
			data-bs-toggle="offcanvas"
			data-bs-target="#offcanvasGlobalFilterSelected"
			aria-controls="offcanvasGlobalFilterSelected"
			class="btn btn-primary">Valider Sélection</button>
			
			

		</div>

		<div>
			<input
				type="text"
				class="form-control"
				aria-label={translate('datatable.search')}
				placeholder="{translate('datatable.search')}..."
				on:input={updateFilter}
			/>
			<p>{translate('datatable.display').replace('%1', $displayedRows.length).replace('%2', totalRecords)}</p>
		</div>
	</div>
	{#if $displayedRows.length === 0}
		<img class="d-none d-md-block" alt="no data" src="images/no_data.jpg" width="300" height="350" />
	{:else}
		<div class="table-responsive-md">
			<div class="col-12" >
				<table class="table table-striped table-hover table-sm has-checkbox">
					<caption class="visually-hidden">group divided table</caption>
					<thead>
						<tr>
							<th scope="col">
								<div class="form-check">
									<input
										class="form-check-input"
										type="checkbox"
										id="customCheck"
										checked={$displayedRows.length > 0 && $displayedRows.every(isSelected)}
										on:change={toggleAll}
									/>
									<label class="form-check-label" for="customCheck">
										<span class="visually-hidden">Select all</span>
									</label>
								</div>
							</th>
							{#each headers as header}
								<th class="">{header.label ?? header}</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each $displayedRows as row, rowIndex}
							<tr>
								<td>
									<div class="form-check">
										<input
											class="form-check-input"
											type="checkbox"
											id="check{rowIndex}"
											checked={$selectedRows.map((row) => row.id).includes(row.id)}
											on:change={() => toggleSelected(rowIndex)}
										/>

										<label class="form-check-label" for="check{rowIndex}">
											<span class="visually-hidden">Select row {rowIndex}</span>
										</label>
									</div>
								</td>
								{#each headers as header, i}
									<td>{row[header.key ?? header]}</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>

				{first + 1}
				{translate('to', [], false)}
				{last}
				{translate('of', [], false)}
				{totalRecords}
			</div>
		</div>
	{/if}
{/if}
