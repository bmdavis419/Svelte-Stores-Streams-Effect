<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="flex min-h-screen w-full flex-col bg-neutral-900 text-neutral-50">
	<nav class="flex w-full items-center gap-4 bg-neutral-950 px-6 py-4">
		<a href="/">Home</a>
		<a href="/store">Store</a>
		<a href="/store-with-api">Store with API</a>
		<a href="/context">Context</a>
	</nav>
	{@render children()}
	<footer class="flex w-full items-center justify-center bg-neutral-950 px-6 py-4">
		<p>
			by <a href="https://x.com/bmdavis419" target="_blank">Ben Davis</a>,
			<a href="https://github.com/bmdavis419/Svelte-Stores-Streams-Effect" target="_blank"
				>source code</a
			>
		</p>
	</footer>
</div>
