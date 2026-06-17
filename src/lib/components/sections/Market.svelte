<script lang="ts">
	import { market } from '$lib/data/content';
	import { reveal } from '$lib/actions/reveal';
	import SectionHeading from '../primitives/SectionHeading.svelte';
	import Counter from '../primitives/Counter.svelte';
</script>

<section id="market" class="section relative scroll-mt-24">
	<div class="container-x">
		<SectionHeading
			eyebrow={market.eyebrow}
			note="no incumbent"
			title={market.heading}
			subtitle={market.body}
		/>

		<div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each market.counters as c, i (c.label)}
				<div use:reveal={{ delay: i * 0.08 }} class="card card-hover p-6">
					<div class="hairline mb-4"></div>
					<p class="wm text-[44px] text-brand sm:text-5xl">
						<Counter value={c.value} prefix={c.prefix} suffix={c.suffix} plain={c.plain} />
					</p>
					<p class="mt-3 text-sm text-ink-60">{c.label}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
