<script lang="ts">
	export let icomoon: string;
	export let label: string;
	export let ariaLabel: string;
</script>

<span class="d-flex align-items-center flex-column" aria-label="filter by {ariaLabel}">
	<i class="of-{icomoon}" role="img" aria-hidden="true" title={ariaLabel} />
	<input type="checkbox" class="btn-check visually-hidden" id="btncheck-{icomoon}" autocomplete="off" />
	<label class="tag" for="btncheck-{icomoon}">
		<span class="nav-link">{label}</span>
	</label>
</span>

<style>
	i {
		float: left;
	}

	label {
		display: inline-block;
		margin: auto;
	}
</style>
