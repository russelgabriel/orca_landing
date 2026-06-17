<script lang="ts">
	import { howItWorks, knobs } from '$lib/data/content';
	import { reveal } from '$lib/actions/reveal';
	import SectionHeading from '../primitives/SectionHeading.svelte';
</script>

<section id="how" class="section relative scroll-mt-24 border-y border-line bg-surface/50">
	<div class="container-x">
		<SectionHeading
			eyebrow="How it works"
			note="layer on 4i"
			title="A layer on top of 4i — not a replacement"
			subtitle="CMS's 4i owns episode definitions, submission, and reconciliation. Orca owns the work that makes them operable."
		/>

		<!-- 4i layer diagram -->
		<div
			use:reveal={{ delay: 0.05 }}
			class="mt-12 grid gap-3 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch"
		>
			<div class="grad rounded-card p-5">
				<p class="font-mono text-[10.5px] font-medium tracking-[0.1em] text-white/80 uppercase">
					Orca Health layer
				</p>
				<p class="mt-2 text-sm text-white/90">
					Modeling · EBRA authoring · specialist visibility · cross-episode analytics
				</p>
			</div>
			<div class="flex items-center justify-center py-2 lg:py-0">
				<svg viewBox="0 0 24 24" class="h-6 w-6 rotate-90 text-ink-40 lg:rotate-0" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M12 5v14M6 13l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</div>
			<div class="card flex flex-col justify-center p-5">
				<p class="font-mono text-[10.5px] font-medium tracking-[0.1em] text-ink-40 uppercase">
					CMS 4i platform
				</p>
				<p class="mt-2 text-sm text-ink-60">
					Episode definitions · parameter submission · PECOS · attestation · reconciliation
				</p>
			</div>
		</div>

		<!-- steps -->
		<div class="mt-12 grid gap-5 md:grid-cols-3">
			{#each howItWorks as step, i (step.step)}
				<div use:reveal={{ delay: i * 0.08 }} class="card card-hover p-6">
					<span class="wm text-sm text-brand">{step.step}</span>
					<h4 class="mt-3 text-lg font-bold text-ink">{step.title}</h4>
					<p class="mt-2 text-sm text-ink-60">{step.body}</p>
				</div>
			{/each}
		</div>

		<!-- the four knobs -->
		<div use:reveal={{ delay: 0.1 }} class="mt-12">
			<p class="mb-4 font-mono text-[11px] tracking-[0.1em] text-ink-40 uppercase">
				The four risk knobs the RFA actually defines
			</p>
			<div class="card grid gap-px overflow-hidden bg-line p-0 sm:grid-cols-2 lg:grid-cols-4">
				{#each knobs as knob (knob.name)}
					<div class="bg-surface p-5">
						<div class="hairline mb-3"></div>
						<p class="font-bold text-ink">{knob.name}</p>
						<p class="mt-1.5 text-xs text-ink-60">{knob.detail}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
