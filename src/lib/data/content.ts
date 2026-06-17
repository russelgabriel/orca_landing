// All marketing copy in one place. Grounded in the Orca Health (working name was
// "SpecLink") product brief. Figures are synthetic — no real PHI / CMS data.

export const brand = {
	name: 'Orca Health',
	short: 'Orca',
	tagline: 'The operating layer for CMS CARA',
	demoEmail: 'partners@orca.health',
	investorEmail: 'investors@orca.health'
};

export const nav = [
	{ label: 'Product', href: '#product' },
	{ label: 'Why now', href: '#why-now' },
	{ label: 'How it works', href: '#how' },
	{ label: 'Market', href: '#market' },
	{ label: 'Company', href: '#company' }
];

export const hero = {
	eyebrow: 'Built for the CMS LEAD model · CARA',
	titleLead: 'The operating layer for',
	titleAccent: "CMS's CARA",
	subtitle:
		"CMS's 4i platform is the plumbing for episode-based risk. Orca Health is the modeling, contracting, and specialist-engagement layer on top of it — so LEAD ACOs can actually operate CARA, not just submit it.",
	primaryCta: 'Become a design partner',
	secondaryCta: 'For investors',
	stats: [
		{ value: 'Jan 2028', label: 'First CARA episodes trigger' },
		{ value: '~18 mo', label: 'Buying window, no incumbent' },
		{ value: '4i', label: 'The platform we layer on top of' }
	]
};

export const credibility = {
	heading: 'Purpose-built around the LEAD RFA — not retrofitted',
	badges: [
		'CMS LEAD Model',
		'4i CARA Module',
		'EBCM Methodology',
		'Global Risk Option',
		'Preferred Providers',
		'PECOS Verified',
		'Q484 Quality',
		'EBRA Authoring'
	]
};

export const problem = {
	eyebrow: 'The gap',
	heading: 'CMS built the plumbing. Not the operating system.',
	body: "CMS's 4i platform owns episode definitions, parameter submission, eligibility and PECOS verification, and reconciliation. What it deliberately omits is everything that makes those mechanics usable. That gap is the product.",
	gaps: [
		{
			title: 'No pre-signing modeling',
			body: '4i collects parameters and reconciles after the fact. Nobody models the settlement outcome before an ACO signs. This is our strongest, whitespace feature.'
		},
		{
			title: 'No real contract',
			body: 'CMS collects only an attestation that an EBRA exists — never the agreement itself. We author, version, and store the real contract, kept in sync with 4i.'
		},
		{
			title: 'No specialist visibility',
			body: '4i is ACO-facing. Preferred Providers get nothing real-time, so the risk arrangement they signed is invisible to the people driving the spend.'
		},
		{
			title: 'No cross-episode analytics',
			body: 'Drift detection, cost decomposition, and portfolio decisions all happen in spreadsheets today — if they happen at all.'
		}
	]
};

export const modules = [
	{
		tag: 'Flagship',
		title: 'CARA Scenario Simulator',
		body: "Model the ACO's settlement outcome at different target prices, discounts, and performance adjustments — before signing. Answers the question that paralyzes ACOs: what target price keeps the specialist engaged without blowing my benchmark?",
		featured: true
	},
	{
		tag: 'Contracting',
		title: 'EBRA Authoring & Management',
		body: 'Author the real agreement around CMS episode definitions. Track version, effective date, and recoupment-delegation clauses — synced to the 4i attestation.'
	},
	{
		tag: 'Analytics',
		title: 'Episode Tracker & Cost Decomposition',
		body: 'Every episode, every Preferred Provider, every delta vs. target — decomposed to the SNF days, implant SKUs, and readmissions driving overruns.'
	},
	{
		tag: 'Engagement',
		title: 'Specialist Performance',
		body: 'Scorecards and peer leaderboards today; a specialist-facing portal on the roadmap so providers see their own standing in real time.'
	},
	{
		tag: 'Roadmap',
		title: 'Alerts & Reconciliation Forecaster',
		body: 'Real-time drift alerts plus a year-end settlement projection — a tax calculator for CARA, 14 months before CMS reconciles.'
	}
];

export const timeline = [
	{
		date: 'Mar 2026',
		title: 'LEAD RFA released',
		body: 'CMS opens applications. The CARA contracting model becomes concrete. No purpose-built vendor exists.',
		state: 'past'
	},
	{
		date: '2027',
		title: 'ACOs sign the LPACA',
		body: 'ACOs receive CMS target-price reports and decide how to construct episodes. The buying decision happens here.',
		state: 'now'
	},
	{
		date: 'End 2027',
		title: 'Episode parameters submitted',
		body: 'ACOs submit target prices, discounts, and performance adjustments in 4i and attest to executed EBRAs.',
		state: 'next'
	},
	{
		date: 'Jan 1, 2028',
		title: 'Episodes start triggering',
		body: 'CARA goes live. Reconciliation follows 12–18 months later. By then, the tooling decision is locked.',
		state: 'future'
	}
];

export const knobs = [
	{ name: 'Target price', detail: 'Negotiated, risk-adjusted, per episode. The central number.' },
	{ name: 'Discount / premium', detail: 'Negotiated range against the target price.' },
	{ name: 'Performance adjustment', detail: 'Quality-to-dollars link, CMS-bounded 10%–100%.' },
	{ name: 'Quality measure(s)', detail: '≥1; default Q484, or other MIPS-comparable.' }
];

export const howItWorks = [
	{
		step: '01',
		title: 'Model before you sign',
		body: 'Pull EBCM episode definitions and CMS target-price data into the simulator. Test target prices, discounts, and performance adjustments until the economics work for both sides.'
	},
	{
		step: '02',
		title: 'Author the real EBRA',
		body: "Generate the actual agreement around CMS's episode construction. Submit parameters and attest in 4i — Orca keeps your executed contract in sync with what CMS holds."
	},
	{
		step: '03',
		title: 'Operate the arrangement',
		body: 'Track every episode against target in real time, decompose cost drivers, surface drift early, and forecast your settlement long before CMS reconciles.'
	}
];

export const market = {
	eyebrow: 'Market',
	heading: 'A category with no incumbent, on a CMS-set clock',
	body: 'CARA is available only to LEAD ACOs in the Global Risk Option — a focused, sophisticated cohort, and our entire initial TAM. CMS has stated CARA can scale to other total-cost-of-care contexts. If it extends to MSSP, the market multiplies — and the first purpose-built CARA tool is the category incumbent.',
	counters: [
		{ value: 2028, label: 'Year CARA episodes begin', prefix: '', suffix: '', plain: true },
		{ value: 476, label: 'MSSP ACOs in the expansion path', prefix: '', suffix: '', plain: false },
		{ value: 10, label: 'Year LEAD model horizon (2027–2036)', prefix: '', suffix: 'yr', plain: false },
		{ value: 0, label: 'CARA-specific vendors today', prefix: '', suffix: '', plain: false }
	]
};

export const competitive = {
	eyebrow: 'Why we win',
	heading: 'Defensible on focus and timing',
	cards: [
		{
			title: 'vs. Arcadia & Innovaccer',
			body: "Population-health and claims platforms. CARA is an adjacent contracting and episode-economics workflow they'd have to bolt on or acquire. We're the layer that plugs in via API — they keep the ACO relationship, we own the specialist-risk vertical."
		},
		{
			title: 'vs. "just use 4i"',
			body: 'Our real competitor. We win by doing the pre-signing modeling, contract authoring, specialist engagement, and analytics that 4i deliberately leaves out.'
		},
		{
			title: 'vs. Excel & email',
			body: "The status quo, and it breaks past ~8–10 contracts. One analyst manages 30+ specialist arrangements on Orca versus a handful in spreadsheets."
		}
	]
};

export const business = {
	eyebrow: 'Business model',
	heading: 'We only win when the ACO wins',
	body: 'Base SaaS fee covers the platform. A performance share — a small slice of net CARA-attributable savings — aligns us to reconciled dollars, not checkbox features. No performance fee in loss years.',
	points: [
		'Base platform fee per ACO — a floor, not the profit center.',
		'Performance share of net CARA-attributable savings, capped so it never dominates the board conversation.',
		'Year-one per-contract fallback while the attribution methodology hardens.'
	]
};

export const team = {
	eyebrow: 'Company',
	heading: 'A two-founder team against an 18-month window',
	members: [
		{
			name: 'Founding CTO',
			role: 'Product & Engineering',
			body: 'Owns the product, architecture, and build — from the v0 dashboard to the production platform.'
		},
		{
			name: 'Founding COO',
			role: 'GTM & Operations',
			body: 'Owns market validation, customer development, partnerships, and the path to design partners.'
		}
	],
	advisors: [
		'Former ACO COO / CFO — operational credibility and warm intros.',
		'Specialist-side leader — clinical legitimacy and the provider perspective.',
		'CMS-policy expert — RFA interpretation and model-evolution insight.'
	]
};

// Synthetic episode set mirroring the published EBCM list (matches the MVP mock data).
export const episodes = [
	{ id: 'joint', name: 'Joint Replacement', target: 28500 },
	{ id: 'spine', name: 'Spine Surgery', target: 34200 },
	{ id: 'hip', name: 'Hip Fracture', target: 22100 },
	{ id: 'cardiac', name: 'Cardiac Cath', target: 18200 },
	{ id: 'copd', name: 'COPD Management', target: 14500 },
	{ id: 'falls', name: 'Falls Prevention', target: 9800 }
];

export const finalCta = {
	heading: 'Two ways to get involved',
	partner: {
		title: 'ACOs & specialty groups',
		body: 'Become a design partner. Free pilot, weekly feedback, direct influence over the roadmap — and CARA tooling before your competitors have it.',
		cta: 'Become a design partner'
	},
	investor: {
		title: 'Investors',
		body: 'A category-defining wedge into CMS specialist risk, on a fixed regulatory clock. We share the thesis, the timeline, and the traction.',
		cta: 'Request the deck'
	}
};

export const footer = {
	disclaimer:
		'Orca Health is an independent company and is not affiliated with, endorsed by, or sponsored by CMS. All figures, episodes, and dashboards shown are synthetic and for illustration only — no protected health information is used.',
	columns: [
		{
			title: 'Product',
			links: [
				{ label: 'Scenario Simulator', href: '#product' },
				{ label: 'How it works', href: '#how' },
				{ label: 'Why now', href: '#why-now' }
			]
		},
		{
			title: 'Company',
			links: [
				{ label: 'Market', href: '#market' },
				{ label: 'Team', href: '#company' },
				{ label: 'Investors', href: '#contact' }
			]
		}
	]
};
