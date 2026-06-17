<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	type Props = {
		eyebrow?: string;
		/** small mono note shown at the far right of the eyebrow rule */
		note?: string;
		title: string;
		subtitle?: string;
		align?: 'left' | 'center';
		onDark?: boolean;
	};

	let { eyebrow, note, title, subtitle, align = 'left', onDark = false }: Props = $props();
</script>

<div use:reveal class="flex flex-col gap-5">
	{#if eyebrow}
		<div class="flex items-center gap-3.5 {align === 'center' ? 'justify-center' : ''}">
			<h2
				class="font-mono text-xs font-medium tracking-[0.14em] uppercase {onDark
					? 'text-white'
					: 'text-ink'}"
			>
				{eyebrow}
			</h2>
			<span class="h-px flex-1 {onDark ? 'bg-white/15' : 'bg-line'} {align === 'center' ? 'max-w-24' : ''}"></span>
			{#if note}
				<span class="font-mono text-[11px] tracking-[0.08em] {onDark ? 'text-white/50' : 'text-ink-40'}">
					{note}
				</span>
			{/if}
		</div>
	{/if}

	<div class="flex max-w-2xl flex-col gap-4 {align === 'center' ? 'mx-auto text-center' : ''}">
		<h3
			class="text-3xl font-bold text-balance sm:text-4xl md:text-[44px] {onDark
				? 'text-white'
				: 'text-ink'}"
		>
			{title}
		</h3>
		{#if subtitle}
			<p class="text-base text-pretty sm:text-lg {onDark ? 'text-white/70' : 'text-ink-60'}">
				{subtitle}
			</p>
		{/if}
	</div>
</div>
