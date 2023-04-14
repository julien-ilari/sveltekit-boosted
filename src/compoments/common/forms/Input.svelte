<script>
	export let value = undefined;
	export let label = 'undefined';
	export let required = 'false';
	export let col = '12';

	function handleChange(event) {
		value = event.detail.value;
	}
</script>

<o-input {label} {value} on:change={handleChange} {required} class="col-{col}" />
