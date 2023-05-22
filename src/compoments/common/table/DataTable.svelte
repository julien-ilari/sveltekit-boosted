<script lang="ts">
	import translate from '@/lib/utils/translate';
	import { onDestroy, createEventDispatcher, afterUpdate } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let headers: [{ label: string; key: string }] | any; // Les en-têtes de colonnes de la table

	export let storeRows: Writable<any[]> = writable([]); // Toutes les lignes
	export let selectedRows: Writable<any[]> = writable([]); // Les lignes actuellement sélectionnées
	export let displayedRows: Writable<Array<any>> = writable([]); // Les lignes actuellement affichées
	let filteredRows: any[] = [];

	const rowsPerPage = 10;
	$: currentPage = 1;
	let first = 0;
	let last = 10;
	$: totalRecords = $storeRows.length; // Calcul du nombre total de records */

	// Le texte de recherche, sous forme d'expression régulière
	let filterRegex: RegExp;
	$: if (filterRegex) {
		displayRows();
	}

	afterUpdate(() => {
		displayRows();
	});

	/* Logique pour que la sélection des lignes reste cohérente lors du filtrage des résultats */
	$: allVisibleSelected =
		$selectedRows.length > 0 &&
		$displayedRows.map((row: any) => $selectedRows.find((r: any) => r.id === row.id) !== undefined).every(Boolean);

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

	// Cette fonction gère la sélection/désélection d'une ligne, en fonction de son id
	function toggle(row: any) {
		return toggleSelected(row.id);
	}
	function toggleSelected(rowId: string) {
		// Mise à jour de la sélection
		selectedRows.update((rows: any) => {
			const row = rows.find((item: any) => item.id === rowId);
			if (row) {
				// retire
				return rows.filter((o: any) => o.id !== rowId);
			} else {
				// ajoute
				return [...rows, $displayedRows.find((item: any) => item.id === rowId)];
			}
		});
	}

	// Cette fonction gère l'affichage des lignes, en fonction des critères de filtrage et de pagination
	function displayRows() {
		filteredRows = $storeRows.filter((row) => {
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

	// Cette fonction gère le passage à la page suivante de la pagination
	function nextPage() {
		if (currentPage < Math.ceil($storeRows.length / rowsPerPage)) {
			currentPage++;
		}
	}

	// Cette fonction gère le retour à la page précédente de la pagination
	function previousPage() {
		if (currentPage > 1) {
			currentPage--;
		}
	}

	// Cette fonction met à jour l'expression régulière de filtrage en fonction de l'entrée de l'utilisateur
	function updateFilter(event: any) {
		let filterValue = event?.target?.value.replace(/\*/g, '.*').replace(/\|/g, '|') ?? '';
		filterRegex = new RegExp(filterValue, 'i');
		currentPage = 1;
		// displayRows();
	}

	// Cette fonction vérifie si une ligne est sélectionnée
	function isSelected(row: any) {
		return $selectedRows.map((r) => r.id).includes(row.id);
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
	<div class="d-flex mb-2">
		<nav aria-label="buttons navigation datatable">
			<div class="pagination m-0">
				<span class="page-item {currentPage <= 1 ? 'disabled' : ''}">
					<button class="page-link" on:click={previousPage}>{translate('datatable.previous')}</button>
				</span>
				<span class="page-item {currentPage >= Math.ceil(filteredRows.length / rowsPerPage) ? 'disabled' : ''}">
					<button class="page-link" on:click={nextPage}>{translate('datatable.next')}</button>
				</span>
			</div>
		</nav>

		<div>
			<button type="button" class="btn btn-link" on:click={() => selectedRows.set([])}>Clear Selection</button>

			<button on:click={dispatchSelectEvent} class="btn btn-primary">{translate('action.validate')}</button>
			<button type="button" class="btn-close" data-bs-dismiss="offcanvas" style="position: absolute;top: 0;right:0px">
				<span class="visually-hidden">Close</span>
			</button>
		</div>
	</div>

	<fieldset disabled={$storeRows.length === 0 ? true : false}>
		<input
			type="text"
			class="form-control"
			aria-label={translate('datatable.search')}
			placeholder="{translate('datatable.search')}..."
			on:input={updateFilter}
		/>
		<p>
			{#if $displayedRows.length > 0}
				{translate('datatable.display')
					.replace('%1', `${first + 1}`)
					.replace('%2', `${last}`)
					.replace('%3', `${totalRecords}`)}
			{:else}
				Pas de données à afficher
			{/if}
		</p>
	</fieldset>
</div>
{#if $displayedRows.length === 0}
	<img class="d-none d-md-block" alt="no data" src="images/no_data.jpg" width="100%" height="400pt" />
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
					{#each $displayedRows as row (row.id)}
						<tr>
							<td style="    max-width: 5rem;">
								<div class="form-check form-switch">
									<input
										aria-label="Select row {row.id}"
										class="form-check-input"
										type="checkbox"
										role="switch"
										id="check{row.id}"
										checked={isSelected(row)}
										on:change={() => toggle(row)}
									/>
								</div>
							</td>
							{#each headers as header}
								<td>{row[header.key ?? header]}</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
{/if}
