<script lang="ts">
	import { competitive, business } from '$lib/data/content';
	import { reveal } from '$lib/actions/reveal';
	import SectionHeading from '../primitives/SectionHeading.svelte';
</script>

<section class="section relative border-y border-line bg-surface/50">
	<div class="container-x">
		<SectionHeading eyebrow={competitive.eyebrow} note="focus + timing" title={competitive.heading} />

		<div class="mt-12 grid gap-5 md:grid-cols-3">
			{#each competitive.cards as card, i (card.title)}
				<div use:reveal={{ delay: i * 0.08 }} class="card card-hover h-full p-6">
					<div class="hairline mb-4"></div>
					<h4 class="text-lg font-bold text-ink">{card.title}</h4>
					<p class="mt-3 text-sm text-ink-60">{card.body}</p>
				</div>
			{/each}
		</div>

		<!-- business model on gradient -->
		<div
			use:reveal={{ delay: 0.1 }}
			class="grad rounded-card mt-6 grid gap-8 p-8 lg:grid-cols-2 lg:items-center"
		>
			<div>
				<span class="font-mono text-[11px] font-medium tracking-[0.1em] text-white/80 uppercase">
					{business.eyebrow}
				</span>
				<h3 class="mt-2 text-2xl font-bold text-white sm:text-3xl">{business.heading}</h3>
				<p class="mt-3 text-sm text-white/85 sm:text-base">{business.body}</p>
			</div>
			<ul class="flex flex-col gap-3">
				{#each business.points as point (point)}
					<li class="flex items-start gap-3">
						<span class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
							<svg viewBox="0 0 24 24" class="h-3 w-3" fill="none" stroke="currentColor" stroke-width="3">
								<path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
							</svg>
						</span>
						<span class="text-sm text-white/90">{point}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
