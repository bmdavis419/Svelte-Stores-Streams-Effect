<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="flex min-h-screen w-full flex-col bg-neutral-900 text-neutral-50">
	{@render children()}
</div>
