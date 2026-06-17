<script lang="ts">
	import { animate } from 'motion';

	type Props = {
		value: number;
		prefix?: string;
		suffix?: string;
		duration?: number;
		plain?: boolean;
	};

	let { value, prefix = '', suffix = '', duration = 1.6, plain = false }: Props = $props();

	let display = $state(0);
	let started = false;

	function run(node: HTMLElement) {
		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReduced) {
			display = value;
			return;
		}
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting && !started) {
						started = true;
						animate(0, value, {
							duration,
							ease: [0.16, 1, 0.3, 1],
							onUpdate: (v) => (display = v)
						});
						observer.unobserve(node);
					}
				}
			},
			{ threshold: 0.4 }
		);
		observer.observe(node);
		return { destroy: () => observer.disconnect() };
	}

	const formatted = $derived(
		plain ? Math.round(display).toString() : Math.round(display).toLocaleString()
	);
</script>

<span use:run>{prefix}{formatted}{suffix}</span>
