<script lang="ts">
	type Props = {
		size?: number | string;
		variant?: 'solid' | 'line';
		/** disc (body) colour — defaults to ink */
		disc?: string;
		/** countershade (knockout) colour — defaults to white */
		knock?: string;
		class?: string;
		float?: boolean;
	};

	let {
		size = 48,
		variant = 'solid',
		disc,
		knock,
		class: klass = '',
		float = false
	}: Props = $props();

	// unique clip id per instance so the countershade clips correctly
	const uid = `orca-${Math.random().toString(36).slice(2, 9)}`;

	const dim = $derived(typeof size === 'number' ? `${size}px` : size);
	const styleVars = $derived(
		[disc ? `--disc:${disc}` : '', knock ? `--knock:${knock}` : ''].filter(Boolean).join('; ')
	);
</script>

<svg
	viewBox="0 0 120 120"
	width={dim}
	height={dim}
	class="{float ? 'drop-shadow-[0_16px_30px_rgba(1,18,52,0.45)]' : ''} {klass}"
	style={styleVars}
	role="img"
	aria-label="Orca"
>
	<defs>
		<clipPath id={uid}><circle cx="60" cy="60" r="52" /></clipPath>
	</defs>

	{#if variant === 'line'}
		<circle cx="60" cy="60" r="51" fill="none" stroke="var(--disc, #0b0e12)" stroke-width="4.5" />
		<path
			d="M6 70 C30 83 50 85 64 79 C83 72 95 57 114 49"
			fill="none"
			stroke="var(--disc, #0b0e12)"
			stroke-width="4.5"
			stroke-linecap="round"
			clip-path="url(#{uid})"
		/>
		<ellipse
			cx="78"
			cy="44"
			rx="9"
			ry="5"
			transform="rotate(-20 78 44)"
			fill="none"
			stroke="var(--disc, #0b0e12)"
			stroke-width="3.5"
		/>
	{:else}
		<circle cx="60" cy="60" r="52" fill="var(--disc, #0b0e12)" />
		<path
			d="M4 70 C30 84 50 86 64 80 C84 72 96 56 116 48 L120 120 L0 120 Z"
			fill="var(--knock, #ffffff)"
			clip-path="url(#{uid})"
		/>
		<ellipse
			cx="78"
			cy="44"
			rx="11"
			ry="6.5"
			transform="rotate(-20 78 44)"
			fill="var(--knock, #ffffff)"
			clip-path="url(#{uid})"
		/>
	{/if}
</svg>
