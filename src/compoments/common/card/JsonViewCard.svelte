<script>
	import CardSimple from '@/compoments/common/card/SimpleCard.svelte';
	import { empty } from 'svelte/internal';

	export let data;
</script>

<CardSimple
	title="JSON viewer"
	bodyColor={data && // 👈 null and undefined check
	Object.keys(data).length === 0 &&
	Object.getPrototypeOf(data) === Object.prototype
		? 'warning'
		: 'success'}
>
	<pre class="card-text d-flex" style=" font-size: 12px; font-weight: bold;">
        <code>{JSON.stringify(data, undefined, 2)?.trim()}</code>
    </pre>
</CardSimple>
