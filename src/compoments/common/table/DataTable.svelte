<script>
	export let headers = [];
	export let rows = [];
</script>

<table class="table table-striped table-hover">
	<thead>
		<tr>
			{#each headers as header}
				<th scope="col">{header}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each rows as row, rowIndex}
			<tr>
				{#each headers as header}
					<td>{row[header]}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
