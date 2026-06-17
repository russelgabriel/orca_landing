<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		class?: string;
		hover?: boolean;
		children: Snippet;
	};

	let { class: klass = '', hover = true, children }: Props = $props();
</script>

<div class="card {hover ? 'card-hover' : ''} p-6 {klass}">
	{@render children()}
</div>
