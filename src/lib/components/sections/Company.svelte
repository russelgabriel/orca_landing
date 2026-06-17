<script lang="ts">
	import { team } from '$lib/data/content';
	import { reveal } from '$lib/actions/reveal';
</script>

<section id="company" class="section relative scroll-mt-24">
	<div class="container-x">
		<div use:reveal class="flex flex-col gap-5">
			<div class="flex items-center gap-3.5">
				<h2 class="font-mono text-xs font-medium tracking-[0.14em] text-ink uppercase">{team.eyebrow}</h2>
				<span class="h-px flex-1 bg-line"></span>
				<span class="font-mono text-[11px] tracking-[0.08em] text-ink-40">2 founders</span>
			</div>
			<h3 class="max-w-2xl text-3xl font-bold text-balance text-ink sm:text-4xl md:text-[44px]">
				{team.heading}
			</h3>
		</div>

		<div class="mt-12 grid gap-5 lg:grid-cols-2">
			{#each team.members as member, i (member.name)}
				<div use:reveal={{ delay: i * 0.08 }} class="card card-hover h-full p-6">
					<div class="flex items-start gap-4">
						<span
							class="wm flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg text-white"
							style="background: var(--grad);"
						>
							{member.name.split(' ').map((w) => w[0]).join('')}
						</span>
						<div>
							<h4 class="text-lg font-bold text-ink">{member.name}</h4>
							<p class="font-mono text-[11px] tracking-[0.06em] text-brand uppercase">{member.role}</p>
							<p class="mt-2 text-sm text-ink-60">{member.body}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div use:reveal={{ delay: 0.12 }} class="card mt-6 p-8">
			<p class="font-mono text-[11px] tracking-[0.1em] text-ink-40 uppercase">
				Advisory bench we're building
			</p>
			<div class="mt-4 grid gap-4 sm:grid-cols-3">
				{#each team.advisors as advisor (advisor)}
					<div class="flex items-start gap-3">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-sm bg-brand"></span>
						<p class="text-sm text-ink-60">{advisor}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
