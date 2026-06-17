import { animate } from 'motion';
import type { Action } from 'svelte/action';

type RevealOptions = {
	y?: number;
	delay?: number;
	duration?: number;
	once?: boolean;
};

/**
 * Scroll-triggered reveal. Fades + lifts an element into view when it enters
 * the viewport. Respects prefers-reduced-motion.
 */
export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options) => {
	const { y = 24, delay = 0, duration = 0.7, once = true } = options ?? {};

	const prefersReduced =
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (prefersReduced) {
		node.style.opacity = '1';
		return;
	}

	node.style.opacity = '0';
	node.style.willChange = 'opacity, transform';
	node.style.transform = `translateY(${y}px)`;

	let done = false;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					animate(
						node,
						{ opacity: 1, transform: 'translateY(0px)' },
						{ duration, delay, ease: [0.22, 1, 0.36, 1] }
					);
					done = true;
					if (once) observer.unobserve(node);
				} else if (!once && !done) {
					node.style.opacity = '0';
					node.style.transform = `translateY(${y}px)`;
				}
			}
		},
		{ threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
