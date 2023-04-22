<script lang="ts">
	export let id: string;
</script>

<!-- Modal -->
<div class="modal modal-xl fade" {id} tabindex="-1" aria-labelledby="{id}Label" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title h5" id="{id}Label">Modal title</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal"
					><span class="visually-hidden">Close</span></button
				>
			</div>
			<div class="modal-body">
				<slot />
			</div>
			<div class="modal-footer">
				<slot name="modal-footer" />
			</div>
		</div>
	</div>
</div>
