<script lang="ts">
	import { problem } from '$lib/data/content';
	import { reveal } from '$lib/actions/reveal';
	import SectionHeading from '../primitives/SectionHeading.svelte';
</script>

<section class="section relative">
	<div class="container-x">
		<SectionHeading
			eyebrow={problem.eyebrow}
			note="4i omits 4 things"
			title={problem.heading}
			subtitle={problem.body}
		/>

		<div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each problem.gaps as gap, i (gap.title)}
				<div use:reveal={{ delay: i * 0.08 }} class="card card-hover flex h-full flex-col gap-3 p-6">
					<span class="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-ink-40">
						<svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
							<path
								d="M12 9v4M12 17h.01M10.3 4.3 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</span>
					<h4 class="text-base font-bold text-ink">{gap.title}</h4>
					<p class="text-sm text-ink-60">{gap.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
