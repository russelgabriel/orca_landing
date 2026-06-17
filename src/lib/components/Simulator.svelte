<script lang="ts">
	import { episodes } from '$lib/data/content';
	import { reveal } from '$lib/actions/reveal';

	// --- Inputs (synthetic, illustrative model) -----------------------------
	let episodeId = $state(episodes[0].id);
	let discount = $state(4); // % discount (+) / premium (−) to target
	let perfAdj = $state(60); // performance adjustment band, 10–100%
	let quality = $state(92); // expected quality attainment, %
	let efficiency = $state(-6); // actual FFS spend vs target, % (− = under)
	let volume = $state(60); // episodes per year

	const episode = $derived(episodes.find((e) => e.id === episodeId) ?? episodes[0]);

	// --- Model --------------------------------------------------------------
	const adjustedTarget = $derived(episode.target * (1 - discount / 100));
	const actualSpend = $derived(episode.target * (1 + efficiency / 100));
	const delta = $derived(adjustedTarget - actualSpend);
	const qualityFactor = $derived(Math.max(0, Math.min(1, quality / 100)));
	const share = $derived(perfAdj / 100);

	const specialistPerEpisode = $derived(
		delta >= 0 ? delta * share * qualityFactor : delta * share
	);
	const acoGrossPerEpisode = $derived(episode.target - actualSpend);
	const acoNetPerEpisode = $derived(acoGrossPerEpisode - specialistPerEpisode);

	const acoNetTotal = $derived(acoNetPerEpisode * volume);
	const specialistTotal = $derived(specialistPerEpisode * volume);

	const aligned = $derived(acoNetTotal > 0 && specialistTotal > 0);
	const verdict = $derived(
		aligned
			? 'Aligned — both the ACO and the specialist come out ahead.'
			: acoNetTotal > 0
				? 'ACO gains, but the specialist has little upside — engagement risk.'
				: specialistTotal > 0
					? 'Specialist is paid, but the ACO is over benchmark — renegotiate.'
					: 'Both sides are underwater at these terms.'
	);

	function money(n: number): string {
		const abs = Math.abs(n);
		const sign = n < 0 ? '−' : '';
		if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(2)}M`;
		if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(0)}K`;
		return `${sign}$${abs.toFixed(0)}`;
	}
</script>

<section id="simulator" class="section relative scroll-mt-24">
	<div class="container-x">
		<div use:reveal class="mb-12 flex flex-col gap-5">
			<div class="flex items-center gap-3.5">
				<h2 class="font-mono text-xs font-medium tracking-[0.14em] text-ink uppercase">Flagship · live</h2>
				<span class="h-px flex-1 bg-line"></span>
				<span class="font-mono text-[11px] tracking-[0.08em] text-ink-40">interactive</span>
			</div>
			<div class="flex max-w-2xl flex-col gap-4">
				<h3 class="text-3xl font-bold text-balance text-ink sm:text-4xl md:text-[44px]">
					Model the settlement <span class="text-brand">before you sign</span>
				</h3>
				<p class="text-base text-pretty text-ink-60 sm:text-lg">
					Move the four CARA knobs and watch the outcome for both sides. This is the question that
					paralyzes ACOs — answered in seconds instead of spreadsheets.
				</p>
			</div>
		</div>

		<div use:reveal={{ delay: 0.1 }} class="grid gap-5 lg:grid-cols-5">
			<!-- Controls -->
			<div class="card p-6 lg:col-span-3">
				<div class="mb-6 flex flex-wrap items-center gap-2">
					<span class="mr-1 font-mono text-[11px] tracking-[0.08em] text-ink-40 uppercase">Episode</span>
					{#each episodes as ep (ep.id)}
						<button
							onclick={() => (episodeId = ep.id)}
							class="rounded-full border px-3 py-1.5 text-xs font-medium transition-colors {episodeId ===
							ep.id
								? 'border-brand bg-brand text-white'
								: 'border-line bg-surface text-ink-60 hover:border-ink-40'}"
						>
							{ep.name}
						</button>
					{/each}
				</div>

				<div class="grid gap-6 sm:grid-cols-2">
					<label class="flex flex-col gap-2">
						<span class="flex items-center justify-between text-sm text-ink-60">
							Discount / premium to target
							<span class="wm text-ink">{discount > 0 ? '+' : ''}{discount}%</span>
						</span>
						<input type="range" min="-8" max="15" step="1" bind:value={discount} />
						<span class="font-mono text-[10.5px] text-ink-40">
							Target {money(adjustedTarget)} vs CMS {money(episode.target)}
						</span>
					</label>

					<label class="flex flex-col gap-2">
						<span class="flex items-center justify-between text-sm text-ink-60">
							Performance adjustment
							<span class="wm text-ink">{perfAdj}%</span>
						</span>
						<input type="range" min="10" max="100" step="5" bind:value={perfAdj} />
						<span class="font-mono text-[10.5px] text-ink-40">CMS-bounded 10%–100%</span>
					</label>

					<label class="flex flex-col gap-2">
						<span class="flex items-center justify-between text-sm text-ink-60">
							Expected quality (Q484)
							<span class="wm text-ink">{quality}</span>
						</span>
						<input type="range" min="60" max="100" step="1" bind:value={quality} />
						<span class="font-mono text-[10.5px] text-ink-40">Gates the specialist's upside</span>
					</label>

					<label class="flex flex-col gap-2">
						<span class="flex items-center justify-between text-sm text-ink-60">
							Actual FFS vs target
							<span class="wm text-ink">{efficiency > 0 ? '+' : ''}{efficiency}%</span>
						</span>
						<input type="range" min="-20" max="20" step="1" bind:value={efficiency} />
						<span class="font-mono text-[10.5px] text-ink-40">Episode spend {money(actualSpend)}</span>
					</label>

					<label class="flex flex-col gap-2 sm:col-span-2">
						<span class="flex items-center justify-between text-sm text-ink-60">
							Annual episode volume
							<span class="wm text-ink">{volume}</span>
						</span>
						<input type="range" min="10" max="200" step="5" bind:value={volume} />
					</label>
				</div>
			</div>

			<!-- Outcome -->
			<div class="flex flex-col gap-4 lg:col-span-2">
				<div
					class="rounded-card border p-6 {acoNetTotal >= 0
						? 'border-brand/25 bg-brand/[0.06]'
						: 'border-amber-500/30 bg-amber-50'}"
				>
					<p class="font-mono text-[10.5px] tracking-[0.09em] text-ink-40 uppercase">
						ACO net impact vs benchmark
					</p>
					<p class="wm mt-1 text-[40px] {acoNetTotal >= 0 ? 'text-brand' : 'text-amber-600'}">
						{money(acoNetTotal)}
					</p>
					<p class="mt-1 text-xs text-ink-40">across {volume} {episode.name} episodes / yr</p>
				</div>

				<div class="grid grid-cols-2 gap-3">
					<div class="card p-4">
						<p class="font-mono text-[10px] tracking-[0.09em] text-ink-40 uppercase">Specialist recon.</p>
						<p class="wm mt-1 text-xl {specialistTotal >= 0 ? 'text-brand' : 'text-amber-600'}">
							{money(specialistTotal)}
						</p>
						<p class="mt-0.5 text-[11px] text-ink-40">{specialistTotal >= 0 ? 'paid to provider' : 'owed by provider'}</p>
					</div>
					<div class="card p-4">
						<p class="font-mono text-[10px] tracking-[0.09em] text-ink-40 uppercase">Per episode</p>
						<p class="wm mt-1 text-xl text-ink">{money(acoNetPerEpisode)}</p>
						<p class="mt-0.5 text-[11px] text-ink-40">ACO net</p>
					</div>
				</div>

				<div
					class="flex items-start gap-3 rounded-card border p-4 {aligned
						? 'border-brand/25 bg-brand/[0.06]'
						: 'border-amber-500/30 bg-amber-50'}"
				>
					<span
						class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full {aligned
							? 'bg-brand/15 text-brand'
							: 'bg-amber-500/15 text-amber-600'}"
					>
						<svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.5">
							{#if aligned}
								<path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
							{:else}
								<path d="M12 9v4M12 17h.01" stroke-linecap="round" />
							{/if}
						</svg>
					</span>
					<p class="text-sm {aligned ? 'text-ink' : 'text-amber-900'}">{verdict}</p>
				</div>

				<p class="font-mono text-[10px] tracking-[0.04em] text-ink-40">
					Illustrative model on synthetic data. Real reconciliation uses CMS's risk-adjusted EBCM
					formulas at Final Financial Settlement.
				</p>
			</div>
		</div>
	</div>
</section>
