<script lang="ts">
	import Nav from '$lib/components/sections/Nav.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import Credibility from '$lib/components/sections/Credibility.svelte';
	import Problem from '$lib/components/sections/Problem.svelte';
	import Modules from '$lib/components/sections/Modules.svelte';
	import Simulator from '$lib/components/Simulator.svelte';
	import HowItWorks from '$lib/components/sections/HowItWorks.svelte';
	import WhyNow from '$lib/components/sections/WhyNow.svelte';
	import Market from '$lib/components/sections/Market.svelte';
	import Competitive from '$lib/components/sections/Competitive.svelte';
	import Company from '$lib/components/sections/Company.svelte';
	import Contact from '$lib/components/sections/Contact.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';
</script>

<Nav />
<main class="relative overflow-x-hidden">
	<Hero />
	<Credibility />
	<Problem />
	<Modules />
	<Simulator />
	<HowItWorks />
	<WhyNow />
	<Market />
	<Competitive />
	<Company />
	<Contact />
</main>
<Footer />
