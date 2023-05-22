<script lang="ts">
	export let icomoon: string | undefined = undefined;
	export let title: string;
</script>

<header>
	<h2>
		<div class="d-flex align-items-center gap-2">
			<i class="of-{icomoon}" style="font-size: 1.8rem;" />
			<span>{title}</span>
		</div>
	</h2>
	<slot />
</header>

<style>
</style>
