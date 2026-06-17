<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		href?: string;
		variant?: 'primary' | 'secondary' | 'ghost' | 'onDark';
		size?: 'md' | 'lg';
		class?: string;
		children: Snippet;
		[key: string]: unknown;
	};

	let {
		href,
		variant = 'primary',
		size = 'md',
		class: klass = '',
		children,
		...rest
	}: Props = $props();

	const base =
		'group inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg';

	const sizes: Record<string, string> = {
		md: 'px-4 py-2.5 text-sm',
		lg: 'px-6 py-3.5 text-[15px]'
	};

	const variants: Record<string, string> = {
		primary:
			'bg-brand text-white shadow-[0_10px_24px_-12px_rgba(0,40,110,0.7)] hover:bg-brand-mid hover:-translate-y-0.5',
		secondary: 'bg-surface text-ink border border-line hover:border-ink-40 hover:-translate-y-0.5',
		ghost: 'text-ink-60 hover:text-ink hover:bg-ink/[0.04]',
		onDark: 'bg-white/10 text-white border border-white/20 backdrop-blur hover:bg-white/15'
	};

	const cls = $derived(`${base} ${sizes[size]} ${variants[variant]} ${klass}`);
</script>

{#if href}
	<a {href} class={cls} {...rest}>{@render children()}</a>
{:else}
	<button class={cls} {...rest}>{@render children()}</button>
{/if}
