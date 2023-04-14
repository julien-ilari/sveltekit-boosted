<script>
	export let title = 'Unknown title';
	export let cssClass = '';
	export let bodyColor = '';
</script>

<article class="card mb-2">
	<div class="card-header">
		<h3 style="margin:0" class="display-5">
			{title}
		</h3>
	</div>

	<div class="card-body p-2 {cssClass} bg-{bodyColor}">
		<slot>
			<span class="missing">Unknown body</span>
		</slot>
	</div>
</article>
