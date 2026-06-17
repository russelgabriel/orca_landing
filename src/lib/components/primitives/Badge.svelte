<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		class?: string;
		onDark?: boolean;
		children: Snippet;
	};
	let { class: klass = '', onDark = false, children }: Props = $props();
</script>

<span
	class="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[11px] font-medium tracking-[0.1em] uppercase {onDark
		? 'border border-white/20 bg-white/10 text-white/80'
		: 'border border-line bg-surface text-ink-60'} {klass}"
>
	{@render children()}
</span>
