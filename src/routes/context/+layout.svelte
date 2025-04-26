<script>
	import { setCounterState } from './CounterState.svelte';

	const { children } = $props();

	setCounterState();
</script>

{@render children()}
