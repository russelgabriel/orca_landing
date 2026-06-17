<script lang="ts">
	import { credibility } from '$lib/data/content';
	import { reveal } from '$lib/actions/reveal';
	import Marquee from '../primitives/Marquee.svelte';
</script>

<section class="relative border-y border-line bg-surface/50 py-12">
	<div class="container-x">
		<p
			use:reveal
			class="mb-7 text-center font-mono text-[11px] tracking-[0.12em] text-ink-40 uppercase"
		>
			{credibility.heading}
		</p>
		<Marquee items={credibility.badges} />
	</div>
</section>
