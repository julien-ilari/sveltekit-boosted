<script lang="ts">
	import OffCanvasContent from '../OffCanvasContent.svelte';
	import Authentification from './Authentification.svelte';
	import OffCanvasContainer from '../OffCanvasContainer.svelte';

	export let callbackFunction: (e: any) => void;
</script>

<OffCanvasContainer>
	<OffCanvasContent id="offcanvasLogin" title="Authentification" on:notify={callbackFunction}>
		<Authentification />
	</OffCanvasContent>
</OffCanvasContainer>
