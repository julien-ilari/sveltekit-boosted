<script>
	export let value = undefined;
	export let label = undefined;
	export let required = 'false';
	export let col = '12';
	export let help = '';
</script>

<div class="col-xl-{col} mt-2">
	{#if label}
		<label for="form-input" class="form-label is-required">{label}</label>
		<button
			type="button"
			class="form-helper"
			data-bs-toggle="tooltip"
			data-bs-placement="top"
			data-bs-title="Help for text area"
		>
			<span class="visually-hidden">{help}</span>
		</button>
	{/if}
	<input
		id="form-input"
		aria-labelledby="websiteLabel websiteFeedback"
		bind:value
		class="form-control form-control-sm"
		{required}
	/>
</div>
