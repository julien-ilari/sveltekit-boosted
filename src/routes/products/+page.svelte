<script lang="ts">
	import translate from '$lib/utils/translate';
	import HeaderTitle from '@/compoments/layout/HeaderTitle.svelte';
	import Article from '@/compoments/shop/Article.svelte';

	export let data: any;

	const items = data.products;
	const i18n = data.i18n;
</script>

<HeaderTitle title={translate('page.title', i18n)} />

{#if items?.length > 0}
	<div class="d-flex flex-wrap">
		{#each items as item (item._id)}
			<Article id={item._id} title={item.name} summary={item.description} price="{item.price}€" img={item.image} />
		{/each}
	</div>
{:else if items === undefined}
	<span>
		{JSON.stringify(items)}
	</span>
{/if}
<br /><br /><br />
