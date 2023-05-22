<script>
	export let title = undefined;
	export let cssClass = '';
	export let bodyColor = '';
</script>

<article class="card mb-2">
	<div class="card-header">
		<slot name="header">
			<h3 class="m-0 display-5">
				{title}
			</h3>
		</slot>
	</div>

	<div class="card-body p-2 {cssClass} bg-{bodyColor}">
		<slot>
			<span class="missing">Unknown body</span>
		</slot>
	</div>
</article>
