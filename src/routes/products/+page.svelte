<script lang="ts">
	import JsonViewCard from './../../compoments/common/card/JsonViewCard.svelte';
	import SimpleCard from "@/compoments/common/card/SimpleCard.svelte";
    import { httpStoreOcean, type HttpStoreOcean } from '$lib/stores/storeOceanApi';
	import { onMount } from "svelte";
    let httpStore: HttpStoreOcean;

    let data :[];
    httpStore = httpStoreOcean('https://api.web-maker.fr');
    httpStore.subscribe((responseData: any) => {
        data = responseData;
    });

    onMount(() => {
        httpStore.action('get', '/products')
    })

</script>

<o-title-bar>
	<h1 class="display-4">Catalogue</h1>
</o-title-bar>

<h2>Gestion des produits</h2>
<SimpleCard title="products">
   <JsonViewCard data={data}></JsonViewCard>
</SimpleCard>

<h2>Gestion des catégories</h2>
<SimpleCard title="categories">

    
</SimpleCard>

