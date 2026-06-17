<script lang="ts">
	import { timeline } from '$lib/data/content';
	import { reveal } from '$lib/actions/reveal';
	import SectionHeading from '../primitives/SectionHeading.svelte';

	const dot: Record<string, string> = {
		past: 'bg-surface border-ink-40',
		now: 'bg-brand border-brand',
		next: 'bg-brand-lite border-brand-lite',
		future: 'bg-surface border-brand'
	};
</script>

<section id="why-now" class="section relative scroll-mt-24">
	<div class="container-x">
		<SectionHeading
			eyebrow="Why now"
			note="~18 mo window"
			title="An 18-month window, on a CMS-set clock"
			subtitle="The buying decision happens in 2026–2027, before episodes ever trigger. No CARA-specific vendor exists yet."
		/>

		<div class="mt-14">
			<div class="relative">
				<div
					class="absolute top-3 left-3 hidden h-px bg-line md:block"
					style="width: calc(100% - 1.5rem);"
				></div>

				<div class="grid gap-8 md:grid-cols-4">
					{#each timeline as item, i (item.date)}
						<div use:reveal={{ delay: i * 0.1 }} class="relative flex flex-col gap-3">
							<span class="block h-6 w-6 rounded-full border-2 {dot[item.state]}"></span>
							<div class="card card-hover p-5">
								<p class="font-mono text-[11px] font-medium tracking-[0.08em] text-brand uppercase">
									{item.date}
								</p>
								<h4 class="mt-1.5 text-base font-bold text-ink">{item.title}</h4>
								<p class="mt-1.5 text-sm text-ink-60">{item.body}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
