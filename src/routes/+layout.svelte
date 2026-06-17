<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Orca Health — The operating layer for CMS CARA</title>
	<meta
		name="description"
		content="Orca Health is the modeling, contracting, and specialist-engagement layer on top of CMS's 4i CARA module — so LEAD ACOs can actually operate episode-based risk arrangements."
	/>
	<meta property="og:title" content="Orca Health — The operating layer for CMS CARA" />
	<meta
		property="og:description"
		content="Model, author, and manage CARA episode-based risk arrangements with specialists. Built for LEAD ACOs in the Global Risk Option."
	/>
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

{@render children()}
