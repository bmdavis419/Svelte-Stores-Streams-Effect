<script>
	import { ChatStateClass } from './ChatState.svelte';

	const chatState = new ChatStateClass();

	let message = $state('');
</script>

<div class="flex grow flex-col gap-4 bg-neutral-900 px-6 py-4 text-neutral-100">
	<div class="flex-1 space-y-4 overflow-y-auto">
		{#each chatState.messages as message}
			<div class="flex items-center gap-3" class:justify-end={message.role === 'user'}>
				{#if message.role === 'assistant'}
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500">
						<span class="text-sm font-medium">AI</span>
					</div>
				{/if}
				<div class="flex-1 rounded-lg bg-neutral-800 p-3">
					<p>{message.content}</p>
				</div>
				{#if message.role === 'user'}
					<div class="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500">
						<span class="text-sm font-medium">U</span>
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<form
		class="flex gap-3"
		onsubmit={(e) => {
			e.preventDefault();
			chatState.sendMessage(message);
			message = '';
		}}
	>
		<input
			type="text"
			bind:value={message}
			placeholder="Type your message..."
			class="flex-1 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
		/>
		<button class="gradient-button hover:cursor-pointer" type="submit"> Send </button>
	</form>
</div>

<style>
	.gradient-button {
		background: linear-gradient(to right, #0ea5e9, #f59e0b);
		border: none;
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		color: #fafafa;
		font-weight: 500;
		position: relative;
		z-index: 1;
	}

	.gradient-button::before {
		content: '';
		position: absolute;
		inset: 2px;
		background: #262626;
		border-radius: 0.4rem;
		z-index: -1;
	}

	.gradient-button:hover::before {
		background: #404040;
	}
</style>
