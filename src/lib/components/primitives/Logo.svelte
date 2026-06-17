<script lang="ts">
	import OrcaMark from './OrcaMark.svelte';

	type Props = {
		class?: string;
		reversed?: boolean;
		size?: number;
		/** monogram = badge replaces the "O" in Orca; lockup = badge + full "Orca" */
		mode?: 'lockup' | 'monogram';
	};

	let { class: klass = '', reversed = false, size = 30, mode = 'lockup' }: Props = $props();
</script>

<a href="#top" class="group inline-flex items-center gap-2.5 {klass}" aria-label="Orca Health home">
	<OrcaMark
		{size}
		disc={reversed ? '#fff' : undefined}
		knock={reversed ? '#0a0e14' : undefined}
		class="transition-transform duration-300 group-hover:-translate-y-px"
	/>
	{#if mode === 'monogram'}
		<span class="wm text-xl {reversed ? 'text-white' : 'text-ink'}">rca</span>
	{:else}
		<span class="wm text-xl {reversed ? 'text-white' : 'text-ink'}">
			Orca <span class={reversed ? 'text-white/55' : 'text-ink-40'}>Health</span>
		</span>
	{/if}
</a>
