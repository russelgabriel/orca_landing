<script lang="ts">
	import OrcaMark from './primitives/OrcaMark.svelte';

	const bars = [38, 52, 44, 61, 49, 72, 66, 80, 74, 88, 81, 95];

	const leaderboard = [
		{ name: 'Dr. Chen', spec: 'Orthopedics', pct: -9 },
		{ name: 'Dr. Nair', spec: 'Cardiology', pct: -6 },
		{ name: 'Dr. Zhao', spec: 'Orthopedics', pct: -3 },
		{ name: 'Dr. Torres', spec: 'Oncology', pct: 4 }
	];
</script>

<div class="relative mx-auto max-w-5xl">
	<!-- soft lift glow -->
	<div
		class="pointer-events-none absolute -inset-x-8 -bottom-8 -z-10 h-40 rounded-full opacity-50 blur-[70px]"
		style="background: radial-gradient(circle, rgba(46,151,255,0.25), transparent 70%);"
	></div>

	<div class="card overflow-hidden p-0 shadow-[0_40px_90px_-50px_rgba(0,40,110,0.5)]">
		<!-- top bar -->
		<div class="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
			<span class="inline-flex items-center gap-2.5">
				<OrcaMark size={26} />
				<span class="wm text-[17px] text-ink">Orca</span>
				<span
					class="ml-2 hidden rounded-md bg-bg px-2.5 py-1 font-mono text-[10.5px] tracking-[0.06em] text-ink-40 sm:inline-block"
				>
					GREENFIELD ACO · PY2027
				</span>
			</span>
			<span class="hidden items-center gap-5 text-[13px] text-ink-40 sm:flex">
				<b class="font-semibold text-ink">Overview</b>
				<span>Episodes</span>
				<span>Contracts</span>
			</span>
			<span class="h-6 w-6 rounded-full" style="background: var(--grad);"></span>
		</div>

		<div class="grid gap-4 p-4 sm:grid-cols-3 sm:p-5">
			<!-- main vital -->
			<div class="sm:col-span-2">
				<div class="rounded-[13px] border border-line p-4">
					<div class="flex items-start justify-between">
						<div>
							<p class="font-mono text-[10px] tracking-[0.09em] text-ink-40 uppercase">
								Net savings vs. target
							</p>
							<p class="wm mt-1.5 text-[34px] text-ink">
								$2.41M<span class="ml-1 text-sm font-medium text-ink-40">YTD</span>
							</p>
						</div>
						<span
							class="rounded-full bg-brand/10 px-2 py-1 font-mono text-[10px] font-medium text-brand"
						>
							+6.2%
						</span>
					</div>
					<!-- ECG-style sparkline -->
					<svg class="mt-3 h-12 w-full" viewBox="0 0 320 44" preserveAspectRatio="none" aria-hidden="true">
						<path
							d="M0 30 H46 l8 -2 5 6 7 -20 7 30 6 -14 H150 l8 -2 5 6 7 -20 7 30 6 -14 H320"
							fill="none"
							stroke="#0066CC"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>

				<!-- monthly bars -->
				<div class="mt-4 rounded-[13px] border border-line p-4">
					<div class="mb-3 flex items-center justify-between">
						<p class="font-mono text-[10px] tracking-[0.09em] text-ink-40 uppercase">
							Net savings by month
						</p>
						<span class="font-mono text-[10px] text-ink-40">vs. CMS target</span>
					</div>
					<div class="flex h-24 items-end gap-1.5">
						{#each bars as h, i (i)}
							<div class="flex-1 rounded-t" style="height: {h}%; background: var(--grad);"></div>
						{/each}
					</div>
				</div>
			</div>

			<!-- side -->
			<div class="flex flex-col gap-4">
				<div class="grid grid-cols-2 gap-3 sm:grid-cols-1">
					<div class="rounded-[13px] border border-line p-3.5">
						<p class="font-mono text-[10px] tracking-[0.09em] text-ink-40 uppercase">At-risk</p>
						<p class="wm mt-1 text-xl text-ink">37 <span class="text-xs font-medium text-ink-40">episodes</span></p>
					</div>
					<div class="rounded-[13px] border border-line p-3.5">
						<p class="font-mono text-[10px] tracking-[0.09em] text-ink-40 uppercase">Quality · Q484</p>
						<p class="wm mt-1 text-xl text-ink">94.1</p>
					</div>
				</div>

				<div class="rounded-[13px] border border-line p-4">
					<p class="font-mono text-[10px] tracking-[0.09em] text-ink-40 uppercase">Specialist leaderboard</p>
					<div class="mt-3 flex flex-col gap-2.5">
						{#each leaderboard as s (s.name)}
							<div class="flex items-center justify-between gap-2">
								<div class="min-w-0">
									<p class="truncate text-[13px] font-semibold text-ink">{s.name}</p>
									<p class="text-[11px] text-ink-40">{s.spec}</p>
								</div>
								<span class="wm text-sm {s.pct < 0 ? 'text-brand' : 'text-ink-40'}">
									{s.pct < 0 ? s.pct : `+${s.pct}`}%
								</span>
							</div>
						{/each}
					</div>
				</div>

				<div class="rounded-[13px] border border-brand/25 bg-brand/[0.06] p-3.5">
					<p class="font-mono text-[10px] font-medium tracking-[0.09em] text-brand uppercase">Drift alert</p>
					<p class="mt-1.5 text-[12px] text-ink-60">
						Joint Replacement trending +12% in month 2 — implant SKU mix.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
