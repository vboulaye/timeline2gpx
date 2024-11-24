<script lang="ts">
	let { id, label, value = $bindable(), ...props } = $props();
</script>

<div class="mb-6">
	<label for={id} class="mb-2 block text-sm font-medium text-gray-700">{label}</label>
	<input
		type="datetime"
		{id}
		bind:value
		class="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
	/>
</div>
