<script>
	import CardSimple from '@/compoments/common/card/SimpleCard.svelte';

	export let data = [];
</script>

<CardSimple title="JSON viewer" bodyColor="success">
	<br />
	<div class="mt-2">
		<svg role="img" width="1.6em" height="1.6em" fill="currentColor" aria-hidden="true" focusable="false">
			<use xlink:href="/docs/5.2/assets/img/boosted-sprite.svg#success" />
		</svg> <b>success !</b>
	</div>

	<pre class="card-text" style=" font-size: 18px; font-weight: bold;">
            <br /><code>{JSON.stringify(data, undefined, 3).trim()}</code>
        </pre>
</CardSimple>
