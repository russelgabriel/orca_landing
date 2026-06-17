<script lang="ts">
	import { hero } from '$lib/data/content';
	import { reveal } from '$lib/actions/reveal';
	import Button from '../primitives/Button.svelte';
	import OrcaMark from '../primitives/OrcaMark.svelte';
	import DashboardMockup from '../DashboardMockup.svelte';
</script>

<section id="top" class="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
	<!-- soft clinical top glow -->
	<div
		class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px]"
		style="background: radial-gradient(120% 90% at 50% -10%, #EAF1FB 0%, rgba(245,246,249,0) 60%);"
	></div>

	<div class="container-x flex flex-col items-center text-center">
		<span
			use:reveal={{ y: 12 }}
			class="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] font-medium tracking-[0.1em] text-ink-60 uppercase sm:text-xs"
		>
			<OrcaMark size={16} />
			{hero.eyebrow}
		</span>

		<h1
			use:reveal={{ delay: 0.05 }}
			class="mt-7 max-w-4xl text-[40px] leading-[1.02] font-bold text-balance text-ink sm:text-6xl md:text-7xl"
		>
			{hero.titleLead}
			<span class="text-brand">{hero.titleAccent}</span>
		</h1>

		<p
			use:reveal={{ delay: 0.12 }}
			class="mt-6 max-w-2xl text-base text-pretty text-ink-60 sm:text-lg"
		>
			{hero.subtitle}
		</p>

		<div use:reveal={{ delay: 0.18 }} class="mt-9 flex flex-col items-center gap-3 sm:flex-row">
			<Button href="#contact" variant="primary" size="lg">
				{hero.primaryCta}
				<svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.2">
					<path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</Button>
			<Button href="#contact" variant="secondary" size="lg">{hero.secondaryCta}</Button>
		</div>

		<!-- stat strip -->
		<div
			use:reveal={{ delay: 0.24 }}
			class="card mt-12 grid w-full max-w-3xl grid-cols-1 divide-y divide-line overflow-hidden sm:grid-cols-3 sm:divide-x sm:divide-y-0"
		>
			{#each hero.stats as stat (stat.label)}
				<div class="flex flex-col items-center gap-1 px-4 py-5">
					<span class="wm text-2xl text-ink">{stat.value}</span>
					<span class="font-mono text-[10.5px] tracking-[0.06em] text-ink-40 uppercase">{stat.label}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- product preview -->
	<div use:reveal={{ delay: 0.3, y: 40 }} class="container-x mt-16 sm:mt-20">
		<DashboardMockup />
	</div>
</section>
