<script lang="ts">
	import Lazy from '../common/Lazy.svelte';

	export let id: string;
	export let title = 'Body bébé personnalisé';
	export let summary =
		'Ce body est disponible en manches longues Laissez votre inspiration menée la danse avec ce body personnalisé manche courte au gré de votre imagination.';
	export let price = '11,99€';
	export let img = 'https://www.bebe-abord.com/2642-home_default/body-bebe-personnalisable-manches-courtes.jpg';
</script>

<div class="align-self-stretch p-2 col-12 col-md-6 col-xl-4 col-xxl-3">
	<article class="card">
		<a href="/products/{id}">
			<Lazy height={320} offset={0} fadeOption={{ delay: 100, duration: 100 }}>
				<!-- svelte-ignore a11y-invalid-attribute -->

				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					class="product-img lazy"
					src={img}
					alt="body personnalise manche courte texte et photo"
					width="320"
					height="320"
				/>
			</Lazy>
		</a>
		<div class="card-body">
			<span class="card-title display-2">{title}</span>
			<p class="card-text text-truncate">{summary}</p>
			<p class="price card-text fw-bold display-4 text-muted">{price}</p>
		</div>
	</article>
</div>

<style>
	img {
		margin: auto;
	}
	article {
		height: 100%;
		width: 100%;
	}
	.card-body {
		height: 8rem;
	}

	.price {
		height: 2rem;
		position: absolute;
		bottom: 0rem;
	}
</style>
