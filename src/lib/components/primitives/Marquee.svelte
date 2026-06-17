<script lang="ts">
	type Props = {
		items: string[];
	};
	let { items }: Props = $props();
	const doubled = $derived([...items, ...items]);
</script>

<div
	class="group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
>
	<div
		class="animate-marquee flex shrink-0 items-center gap-3 pr-3 group-hover:[animation-play-state:paused]"
	>
		{#each doubled as item, i (i)}
			<span
				class="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm whitespace-nowrap text-ink-60"
			>
				<span class="h-1.5 w-1.5 rounded-full bg-brand"></span>
				{item}
			</span>
		{/each}
	</div>
</div>
