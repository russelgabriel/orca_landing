<script lang="ts">
	import { footer, brand } from '$lib/data/content';
	import Logo from '../primitives/Logo.svelte';
</script>

<footer class="border-t border-line bg-surface">
	<div class="container-x py-14">
		<div class="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
			<div>
				<Logo />
				<p class="mt-4 max-w-sm text-sm text-ink-60">
					The modeling, contracting, and specialist-engagement layer on top of CMS's 4i CARA module.
				</p>
			</div>

			{#each footer.columns as col (col.title)}
				<div>
					<p class="font-mono text-[11px] tracking-[0.1em] text-ink-40 uppercase">{col.title}</p>
					<ul class="mt-4 flex flex-col gap-2.5">
						{#each col.links as link (link.label)}
							<li>
								<a href={link.href} class="text-sm text-ink-60 transition-colors hover:text-ink">
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<div class="mt-12 border-t border-line pt-8">
			<p class="max-w-3xl text-xs leading-relaxed text-ink-40">{footer.disclaimer}</p>
			<div class="mt-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
				<p class="font-mono text-[10.5px] tracking-[0.08em] text-ink-40 uppercase">
					© {new Date().getFullYear()} {brand.name} · Countershade system
				</p>
				<a href="mailto:{brand.demoEmail}" class="font-mono text-[11px] text-ink-40 hover:text-ink">
					{brand.demoEmail}
				</a>
			</div>
		</div>
	</div>
</footer>
