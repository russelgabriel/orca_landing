<script lang="ts">
	import { finalCta, brand } from '$lib/data/content';
	import { reveal } from '$lib/actions/reveal';
	import Button from '../primitives/Button.svelte';
	import OrcaMark from '../primitives/OrcaMark.svelte';

	let name = $state('');
	let org = $state('');
	let email = $state('');
	let submitted = $state(false);

	function onSubmit(e: SubmitEvent) {
		e.preventDefault();
		// UI-only for now — wire to Resend / CRM later.
		// eslint-disable-next-line no-console
		console.log('Design partner inquiry', { name, org, email });
		submitted = true;
	}
</script>

<section id="contact" class="relative scroll-mt-24 px-4 py-12 sm:px-6">
	<div class="grad rounded-[28px] py-20 sm:py-28">
		<div class="container-x">
			<div use:reveal class="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
				<OrcaMark size={56} disc="#fff" knock="#0a0e14" float />
				<h2 class="text-3xl font-bold text-balance text-white sm:text-4xl md:text-5xl">
					{finalCta.heading}
				</h2>
				<p class="font-mono text-[11px] tracking-[0.14em] text-white/75 uppercase">
					Precision meets clarity
				</p>
			</div>

			<div class="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-2">
				<!-- design partner form -->
				<div use:reveal={{ delay: 0.05 }} class="card p-7">
					<h3 class="text-xl font-bold text-ink">{finalCta.partner.title}</h3>
					<p class="mt-2 text-sm text-ink-60">{finalCta.partner.body}</p>

					{#if submitted}
						<div class="mt-6 flex items-center gap-3 rounded-card border border-brand/25 bg-brand/[0.06] p-5">
							<span class="flex h-8 w-8 items-center justify-center rounded-full bg-brand/15 text-brand">
								<svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.5">
									<path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
							</span>
							<p class="text-sm text-ink">Thanks — we'll be in touch within two business days.</p>
						</div>
					{:else}
						<form class="mt-6 flex flex-col gap-3" onsubmit={onSubmit}>
							<input
								bind:value={name}
								required
								placeholder="Your name"
								class="rounded-[10px] border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink-40 focus:border-brand focus:bg-surface focus:outline-none"
							/>
							<input
								bind:value={org}
								required
								placeholder="ACO or organization"
								class="rounded-[10px] border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink-40 focus:border-brand focus:bg-surface focus:outline-none"
							/>
							<input
								bind:value={email}
								required
								type="email"
								placeholder="Work email"
								class="rounded-[10px] border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink-40 focus:border-brand focus:bg-surface focus:outline-none"
							/>
							<Button size="lg" class="mt-1 w-full">{finalCta.partner.cta}</Button>
						</form>
					{/if}
				</div>

				<!-- investor -->
				<div use:reveal={{ delay: 0.1 }} class="card flex flex-col justify-between p-7">
					<div>
						<div class="hairline mb-4"></div>
						<h3 class="text-xl font-bold text-ink">{finalCta.investor.title}</h3>
						<p class="mt-2 text-sm text-ink-60">{finalCta.investor.body}</p>
					</div>
					<div class="mt-6 flex flex-col gap-3">
						<Button
							href="mailto:{brand.investorEmail}?subject=Orca%20Health%20—%20investor%20interest"
							size="lg"
							variant="secondary"
							class="w-full"
						>
							{finalCta.investor.cta}
						</Button>
						<a href="mailto:{brand.investorEmail}" class="text-center font-mono text-[12px] text-ink-40 hover:text-ink">
							{brand.investorEmail}
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
