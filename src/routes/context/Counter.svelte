<script lang="ts">
	import { getCounterState } from './CounterState.svelte';

	const counterState = getCounterState();
</script>

<div class="flex flex-col items-center gap-4 rounded-lg bg-neutral-800 p-6 shadow-sm">
	<div class="flex gap-4">
		<button
			class="rounded bg-neutral-700 px-4 py-2 text-neutral-100 transition-colors hover:bg-neutral-600"
			onclick={counterState.increment}
		>
			Increment
		</button>
		<button
			class="rounded bg-neutral-700 px-4 py-2 text-neutral-100 transition-colors hover:bg-neutral-600"
			onclick={counterState.decrement}
		>
			Decrement
		</button>
	</div>
	<p class="text-2xl font-bold text-neutral-100">{counterState.count}</p>
</div>
