<script lang="ts">
	import { modules } from '$lib/data/content';
	import { reveal } from '$lib/actions/reveal';
	import SectionHeading from '../primitives/SectionHeading.svelte';

	const icons: Record<string, string> = {
		'CARA Scenario Simulator': 'M3 3v18h18 M7 14l3-4 3 3 4-6',
		'EBRA Authoring & Management': 'M8 4h8l3 3v13H5V4Z M14 4v4h4 M9 13h6 M9 16h4',
		'Episode Tracker & Cost Decomposition': 'M4 19V5 M4 19h16 M8 16v-5 M12 16V8 M16 16v-8',
		'Specialist Performance': 'M16 18v-2a4 4 0 0 0-8 0v2 M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
		'Alerts & Reconciliation Forecaster':
			'M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9 M13.7 21a2 2 0 0 1-3.4 0'
	};
</script>

<section id="product" class="section relative scroll-mt-24">
	<div class="container-x">
		<SectionHeading
			eyebrow="The product"
			note="5 modules"
			title="Everything 4i deliberately leaves out"
			subtitle="Five modules that turn CMS's submission plumbing into an arrangement you can actually operate."
		/>

		<div class="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 md:grid-rows-2">
			{#each modules as mod, i (mod.title)}
				<div
					use:reveal={{ delay: i * 0.06 }}
					class="card-hover relative overflow-hidden p-7 {mod.featured
						? 'grad rounded-card md:col-span-2 md:row-span-2'
						: 'card'}"
				>
					<div class="relative flex h-full flex-col">
						<div class="mb-5 flex items-center justify-between">
							<span
								class="flex h-11 w-11 items-center justify-center rounded-xl border {mod.featured
									? 'border-white/25 bg-white/10 text-white'
									: 'border-line text-brand'}"
							>
								<svg
									viewBox="0 0 24 24"
									class="h-5 w-5"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d={icons[mod.title]} />
								</svg>
							</span>
							<span
								class="rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.08em] uppercase {mod.featured
									? 'border-white/25 bg-white/10 text-white/85'
									: 'border-line text-ink-40'}"
							>
								{mod.tag}
							</span>
						</div>

						<h4
							class="font-bold {mod.featured ? 'text-2xl text-white sm:text-3xl' : 'text-lg text-ink'}"
						>
							{mod.title}
						</h4>
						<p
							class="mt-3 text-sm text-pretty {mod.featured
								? 'max-w-md text-white/80 sm:text-base'
								: 'text-ink-60'}"
						>
							{mod.body}
						</p>

						{#if mod.featured}
							<div class="mt-auto pt-6">
								<a
									href="#simulator"
									class="inline-flex items-center gap-2 text-sm font-semibold text-white transition-opacity hover:opacity-80"
								>
									Try the live simulator
									<svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.2">
										<path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
									</svg>
								</a>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
