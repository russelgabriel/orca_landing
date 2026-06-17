<script lang="ts">
	import { nav } from '$lib/data/content';
	import Logo from '../primitives/Logo.svelte';
	import Button from '../primitives/Button.svelte';

	let scrolled = $state(false);
	let open = $state(false);

	function onScroll() {
		scrolled = window.scrollY > 16;
	}
</script>

<svelte:window onscroll={onScroll} />

<header class="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3">
	<nav
		class="flex w-full max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-300 {scrolled
			? 'border border-line bg-surface/85 shadow-[0_10px_30px_-20px_rgba(0,40,110,0.4)] backdrop-blur-md'
			: 'border border-transparent'}"
	>
		<Logo />

		<div class="hidden items-center gap-1 md:flex">
			{#each nav as item (item.href)}
				<a
					href={item.href}
					class="rounded-lg px-3.5 py-2 text-sm text-ink-60 transition-colors hover:bg-ink/[0.04] hover:text-ink"
				>
					{item.label}
				</a>
			{/each}
		</div>

		<div class="hidden items-center gap-2 md:flex">
			<Button href="#contact" variant="ghost" size="md">For investors</Button>
			<Button href="#contact" variant="primary" size="md">Book a demo</Button>
		</div>

		<button
			class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-ink/[0.04] md:hidden"
			onclick={() => (open = !open)}
			aria-label="Toggle menu"
			aria-expanded={open}
		>
			<svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2">
				{#if open}
					<path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
				{:else}
					<path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
				{/if}
			</svg>
		</button>
	</nav>
</header>

{#if open}
	<div class="fixed inset-x-0 top-[4.5rem] z-40 px-4 md:hidden">
		<div class="card flex flex-col gap-1 p-3">
			{#each nav as item (item.href)}
				<a
					href={item.href}
					onclick={() => (open = false)}
					class="rounded-lg px-4 py-3 text-sm text-ink-60 hover:bg-ink/[0.04] hover:text-ink"
				>
					{item.label}
				</a>
			{/each}
			<div class="mt-2 grid grid-cols-2 gap-2">
				<Button href="#contact" variant="secondary" size="md">Investors</Button>
				<Button href="#contact" variant="primary" size="md">Book a demo</Button>
			</div>
		</div>
	</div>
{/if}
