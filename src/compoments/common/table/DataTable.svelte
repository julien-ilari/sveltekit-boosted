<script lang="ts">
	import translate from '@/lib/utils/translate';
	import { onDestroy, createEventDispatcher } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let headers: [{ label: string; key: string }] | any; // Les en-têtes de colonnes de la table

	// Les lignes actuellement affichées, en fonction des critères de filtrage et de pagination
	const displayedRows: Writable<Array<any>> = writable([]);
	// Les lignes actuellement sélectionnées
	const selectedRows: Writable<Array<any>> = writable([]);

	let rows: [] = []; // Les données des lignes de la table
	$: totalRecords = rows.length; // Calcul du nombre total de records */

	const rowsPerPage = 10;
	let currentPage = 1;
	let first = 0;
	let last = 10;

	/* Logique pour que la sélection des lignes reste cohérente lors du filtrage des résultats */
	$: displayedIndices = $displayedRows.map((_: any, i: number) => first + i);
	$: visibleSelected = $displayedRows.map(
		(row: any) => $selectedRows.find((selectedRow: any) => selectedRow.id === row.id) !== undefined
	);
	$: allVisibleSelected = $displayedRows.length > 0 && visibleSelected.every(Boolean);
	$: {
		if (
			allVisibleSelected &&
			!$selectedRows.some((selectedRow: any) => displayedIndices.indexOf(selectedRow.id) === -1)
		) {
			const selectedIds = $selectedRows.map((row: any) => row.id);
			const newSelection: any = [
				...selectedIds,
				...displayedIndices.filter((index: number) => selectedIds.indexOf(index) === -1)
			];
			selectedRows.set(newSelection.map((id: number) => rows.find((row: any) => row.id === id)));
		}
		if (
			!allVisibleSelected &&
			$selectedRows.some((selectedRow: any) => displayedIndices.indexOf(selectedRow.id) !== -1)
		) {
			const selectedIds = $selectedRows.map((row: any) => row.id);
			const newSelection: any = selectedIds.filter((id: number) => displayedIndices.indexOf(id) === -1);
			selectedRows.set(newSelection.map((id: any) => rows.find((row: any) => row.id === id)));
		}
	}

	let filterRegex: RegExp; // Le texte de recherche, sous forme d'expression régulière

	// Cette fonction gère la sélection/désélection de toutes les lignes affichées
	function toggleAll() {
		if ($displayedRows.length > 0) {
			const allDisplayedSelected = $displayedRows.every((row: any) => $selectedRows.some((r: any) => r.id === row.id));
			if (allDisplayedSelected) {
				// Tous les éléments affichés sont déjà sélectionnés, on les retire tous de la sélection
				selectedRows.set($selectedRows.filter((r: any) => !$displayedRows.includes(r)));
			} else {
				// On ajoute tous les éléments affichés à la sélection, sans doublons
				const newSelectedRows = [...new Set([...$selectedRows, ...$displayedRows])];
				selectedRows.set(newSelectedRows);
			}
		}
	}

	// Cette fonction gère la sélection/désélection d'une ligne, en fonction de son indice
	function toggleSelected(rowIndex: number) {
		const selectedItem: any = $displayedRows[rowIndex];

		selectedRows.update((selected: any) => {
			const isPresent = selected.map((o: any) => o.id).includes(selectedItem.id);
			if (isPresent) {
				return selected.filter((o: any) => o.id !== selectedItem.id);
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

		if (first === undefined || last === undefined) {
			first = 1;
			last = rowsPerPage;
		}

		first = (currentPage - 1) * rowsPerPage;
		last = Math.min(first + rowsPerPage, filteredRows.length);

		displayedRows.set(filteredRows.slice(first, last));
	}

	export let storeRows: Writable<[]>;
	storeRows.subscribe((values: []) => {
		rows = values;
		displayRows();
	});

	// Cette fonction gère le passage à la page suivante de la pagination
	function nextPage() {
		if (currentPage < Math.ceil(rows.length / rowsPerPage)) {
			currentPage++;
			displayRows();
		}
	}

	// Cette fonction gère le retour à la page précédente de la pagination
	function previousPage() {
		if (currentPage > 1) {
			currentPage--;
			displayRows();
		}
	}

	// Cette fonction met à jour l'expression régulière de filtrage en fonction de l'entrée de l'utilisateur
	function updateFilter(event: any) {
		let filterValue = event?.target?.value.replace(/\*/g, '.*').replace(/\|/g, '|') ?? '';
		filterRegex = new RegExp(filterValue, 'i');
		currentPage = 1;
		displayRows();
	}

	// Cette fonction vérifie si une ligne est sélectionnée
	function isSelected(row: any) {
		return $selectedRows.some((r: any) => r.id === row.id);
	}

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
</script>

<div class="p-0">
	<nav aria-label="buttons navigation datatable">
		<div class="pagination m-0">
			<span class="page-item {currentPage === 1 ? 'disabled' : ''}">
				<button class="page-link" on:click={previousPage}>{translate('datatable.previous')}</button>
			</span>
			<span class="page-item {currentPage === Math.ceil(rows.length / rowsPerPage) ? 'disabled' : ''}">
				<button class="page-link" on:click={nextPage}>{translate('datatable.next')}</button>
			</span>
		</div>
	</nav>

	<div class="my-2">
		<button type="button" class="btn btn-link" on:click={() => selectedRows.set([])}>Clear Selection</button>

		<button
			class="btn btn-link"
			data-bs-toggle="offcanvas"
			data-bs-target="#offcanvasGlobalFilterSelected"
			aria-controls="offcanvasGlobalFilterSelected">Voir Sélection</button
		>

		<button
			on:click={dispatchSelectEvent}
			data-bs-toggle="offcanvas"
			data-bs-target="#offcanvasGlobalFilterSelected"
			aria-controls="offcanvasGlobalFilterSelected"
			class="btn btn-primary">Valider Sélection</button
		>
	</div>

	<div>
		<input
			type="text"
			class="form-control"
			aria-label={translate('datatable.search')}
			placeholder="{translate('datatable.search')}..."
			on:input={updateFilter}
		/>
		<p>
			{translate('datatable.display')
				.replace('%1', `${first}`)
				.replace('%2', `${last}`)
				.replace('%3', `${totalRecords}`)}
		</p>
	</div>
</div>
{#if $displayedRows.length === 0}
	<img class="d-none d-md-block" alt="no data" src="images/no_data.jpg" width="100%" height="100%" />
{:else}
	<div class="table-responsive-md">
		<div class="col-12">
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
									checked={allVisibleSelected}
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
										checked={$selectedRows.map((r) => r.id).includes(row.id)}
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
		</div>
	</div>
{/if}
