# SpecLink — Knowledge Transfer Brief

> **About this document**
> 
> This is the canonical knowledge base for SpecLink (working name) — a SaaS platform purpose-built for Accountable Care Organizations (ACOs) participating in the CMS LEAD model to manage CMS-Administered Risk Arrangements (CARA) with specialist providers.
> 
> Its purpose is twofold:
> 
> 1. **For Claude (or any AI collaborator):** to be re-ingested at the start of any new working session so the model picks up with full context — policy background, product design, technical decisions, business model, founding team, current status, and open questions — instead of re-deriving them from scratch.
> 2. **For a human reader (a co-founder, advisor, hire, or investor):** to get a complete, current snapshot of the company in a single document — what we're building, why, for whom, how, with what stack, against which competitors, on what timeline.
> 
> This document supersedes prior `.docx` versions. It is intended to be updated periodically as the project evolves. When in doubt, treat the most recent version as canonical.
> 
> **Naming note:** "SpecLink" is the working name. The founders are actively exploring stronger brand alternatives (likely a single short word + "Health"). The name is not locked in — references to "SpecLink" throughout this document should be read as references to the company-by-its-current-name.

---

## Contents

1. Policy Context — CMS LEAD & CARA 1A. LEAD/CARA Policy Reference
2. Product Concept — What SpecLink Does
3. Users & Buyers
4. Data Model & Domain Concepts
5. Technical Architecture
6. MVP Dashboard — What's Been Built
7. Business Model & Pricing
8. Competitive Landscape & Defensibility
9. Go-to-Market & Sales Motion
10. Founding Team & Company Formation
11. Roadmap & Next Steps
12. Open Questions & Risks
13. Glossary

---

## 1. Policy Context — CMS LEAD & CARA

### The LEAD Model

The **LEAD model** (Long-term Enhanced ACO Design) is a new CMS Innovation Center demonstration that runs **2027–2036**, nationwide and voluntary. It is the next generation of ACO programs, building on lessons from MSSP, ACO REACH, and BPCI Advanced.

**Key LEAD timeline milestones:**

- **March 31, 2026** — Request for Applications (RFA) released by CMS
- **Late Spring 2026** — Applications due
- **Summer 2026** — ACO selection announced
- **January 1, 2027** — LEAD model launch (first performance year)
- **January 1, 2028** — CARA arrangements launch (one full year after LEAD itself — this distinction matters)
- **2036** — Model concludes (10-year horizon)

### Risk Options Within LEAD

LEAD ACOs choose between two risk tracks:

- **Professional Risk Option** — limited downside, simpler arrangement, lower potential upside.
- **Global Risk Option** — full two-sided risk against a total cost of care benchmark, higher upside, higher downside exposure.

**Critical addressable-market constraint:** **CARA is only available to LEAD ACOs in the Global Risk Option.** This narrows the SpecLink TAM materially — we are selling to LEAD ACOs _in Global Risk_, not all LEAD participants. Expect this to be a smaller, more sophisticated cohort.

### Payment Architecture (RFA-accurate)

LEAD uses a layered prospective-payment system. All capitation amounts are derived from the ACO's Performance Year benchmark (the expected Medicare Part A + Part B total cost of care for aligned beneficiaries).

- **TCC (Total Care Capitation)** — broad prospective monthly payment covering _all_ services across participating provider types. Participant Providers take 100% fee reduction; Preferred Providers elect 1–100% (chosen by the ACO). Gives the ACO upfront cash flow and full management risk.
- **PCC (Primary Care Capitation)** — narrower capitation covering _only_ primary care services by primary care specialists. Two parts: **Base PCC** (approximates expected primary care cost) and **Enhanced PCC** (extra upfront infrastructure money = greater of [7% of benchmark − Base PCC] or [2% of benchmark]). Enhanced PCC is recouped at settlement, so it's an advance, not net-new money.
- **NPCC (Non-Primary Care Capitation)** — _new in LEAD._ True prospective capitation extending to non-primary-care services; the ACO bears gain/loss risk on it. Used to fund downstream arrangements with non-primary providers.
- **APO (Advanced Payment Option)** — carried over from ACO REACH. A pre-payment reconciled against actual FFS spend (not true capitation — it's a timing advance).

**Critical product constraint:** A specialist who elects **NPCC or APO may NOT participate in CARA** — the RFA states this directly, because it would interfere with CMS's ability to administer CARA episodes. Our contract logic must enforce this mutual exclusivity.

### CARA — CMS-Administered Risk Arrangements (RFA-accurate)

CARA is the mechanism inside LEAD that lets ACOs share episode-based risk with specialist providers (called **Preferred Providers**). It is built into CMS's **4i (4Innovation) platform** — this is the single most important thing to understand about the product landscape. Key mechanics:

- **Episode-based.** Risk is shared on defined clinical episodes built on the **EBCM (Episode-Based Cost Measure)** methodology — a CMS methodology already used in MIPS, measuring risk-adjusted total Medicare cost for a defined episode of care.
- **Only Preferred Providers are eligible.** Not Participant TINs. A Preferred Provider has a written agreement with the ACO, is verified via PECOS enrollment in 4i, and participates at the NPI level.
- **CARA-related costs flow into the ACO's Performance Year expenditures** at LEAD's Final Financial Settlement. CMS compares each episode's actual FFS payments against the negotiated, risk-adjusted **target price**. If the Preferred Provider's FFS payments fall _below_ target → they may receive a reconciliation payment. _Above_ target → they may owe a repayment.
- **CMS does NOT collect the EBRA itself.** CMS collects an _attestation_ that an EBRA exists. The actual agreement (terms, payment, recoupment delegation) lives outside 4i. If 4i data and the executed EBRA ever disagree, CMS uses the 4i-finalized data for reconciliation.
- **Two participation pathways:**
    - **Default Approach** — select a CMS-constructed EBCM episode as-is (cannot change trigger codes, length, exclusions). ACO still specifies negotiated target price, discount/premium, and performance adjustment.
    - **Maximal Flexibility ("Max Flex") Option** — ACO selects an EBCM type but defines its own episode construction (trigger codes, length, exclusions, etc.). Subject to CMS review/finalization in 4i.

### CARA Risk Parameters — What Actually Gets Negotiated (CORRECTED)

> **Important correction.** Earlier drafts of this brief modeled CARA risk using a BPCI-style **±20% episode stop-loss**. **That is wrong for CARA.** The RFA's episode-level risk knobs are different. The contract module must model THESE parameters:

1. **Target price** — negotiated per episode between ACO and Preferred Provider, risk-adjusted by CMS. The central number. Too high → ACO loses benchmark headroom; too low → specialist won't engage.
2. **Discount / premium to target price** — ACOs and specialists negotiate a discount or premium range against the target price per episode.
3. **Performance adjustment** — ties quality performance to the financial outcome. **Negotiated, bounded by CMS: minimum 10%, maximum 100%.** Full discretion within that band.
4. **Quality measure selection** — at least one. Default offered in 4i is **Q484** (Clinician & Clinician Group Risk-standardized Hospital Admission Rates for Patients with Multiple Chronic Conditions); ACOs may add "Other MIPS-comparable measure(s)" with uploaded specs. Multiple measures allowed per EBRA.

There is no episode-level ±20% cap in CARA. (The only "stop-loss" in LEAD is a _separate, ACO-level_ beneficiary outlier-protection mechanism — see below — not part of CARA contracts.)

### LEAD Stop-Loss (separate from CARA — do not conflate)

LEAD offers an **optional, ACO-level stop-loss** to both Global and Professional Risk ACOs. It protects against high-cost _individual beneficiary_ outliers via "residual-based reinsurance": CMS sets model-wide **attachment points** prospectively, adjusts them to each beneficiary using risk scores and the ACO's benchmark, and pays out on expenditure that exceeds the attachment point. An ACO electing it pays a PBPM charge against its benchmark. This is beneficiary-outlier protection for the ACO's overall TCOC — **not** an episode-level cap on CARA contracts. SpecLink's contract module should not model CARA episodes as having a ±20% stop-loss.

### CARA Timeline (RFA-accurate — note the staging)

- **2027** — ACOs sign the LPACA (LEAD Participation Agreement CARA Amendment) + submit a HIPAA data request; CMS delivers annual reports with target prices to support participation decisions.
- **End of 2027 (and every year-end after)** — ACOs submit proposed episode risk parameters via 4i; CMS reviews/finalizes; ACOs attest to executed EBRAs and identify Preferred Providers.
- **January 1, 2028 (and every Jan 1 after)** — CARA episode triggering commences.
- **Q1 2028 onward** — quarterly performance reports from the LEAD implementation contractor.
- **Q2 2028 onward** — annual performance reports.
- **Final Financial Settlement** — after each Performance Year; CARA episode reconciliation (payments/repayments) happens here.

### Why ACOs Want CARA

ACOs receive prospective payments from CMS (Medicare) to manage a population against a Total Cost of Care benchmark. Under benchmark with quality met → CMS pays the ACO a share of savings; over benchmark → ACO owes (two-sided risk). Specialists drive a large share of episode spend through decisions ACOs can't directly control. CARA transfers a slice of that risk — and upside — to the Preferred Providers actually making those decisions. Because CARA costs flow into the ACO's Performance Year expenditures (measured against a _non-rebased_ benchmark), efficiency gains aren't ratcheted away mid-model.

---

## 1A. LEAD/CARA Policy Reference

> Quick-reference distilled from the LEAD RFA (04/15/2026 revision). The RFA is the source of truth; this section captures the facts that bear directly on the product. Where the RFA leaves something undefined, it says so.

### Core Concepts in One Line Each

- **Rebasing** — resetting benchmark base years to recent spending; causes the "ratchet effect" that penalizes ACOs for prior success. LEAD does NOT rebase during the model — a core selling point (predictable, durable savings).
- **The "wedge"** — CMS grows the benchmark slower than counterfactual Medicare growth (saves taxpayers) but faster than actual observed growth (leaves ACO profit). The gap = shared savings.
- **Dually eligible** — qualifies for both Medicare and Medicaid; high-cost, high-complexity; a LEAD focus via state Medicaid partnerships.
- **Original Medicare / Parts A & B** — Part A = inpatient/facility; Part B = outpatient/professional. A+B = the TCOC basis. (Part C = Medicare Advantage, Part D = drugs — outside the TCOC calc.)
- **Medicare Trust Fund** — the federal pool funding Medicare (Part A solvency is the pressure point); LEAD aims to extend it by slowing spend growth.
- **High Needs beneficiaries** — complex/frail patients; ACOs with ≥40% qualify for lower alignment minimums + enhanced risk adjustment. Plausibly a high-value (if operationally harder) SpecLink segment — expand into, don't start with.

### The Two Risk Options

||Professional Risk|Global Risk|
|---|---|---|
|Risk type|Shared TCOC risk with CMS|Full two-sided (100% up/down)|
|CARA-eligible?|**No**|**Yes — exclusively**|
|Our market|Out of scope|**Our entire TAM**|

### Provider Types (who can be in CARA)

||Participant TIN|Preferred Provider|
|---|---|---|
|Used for alignment|Yes|No|
|Quality reporting|Yes|No|
|Capitation|Mandatory|Optional|
|Participation level|Whole TIN|Individual NPI|
|**CARA-eligible**|**No**|**Yes**|

A Preferred Provider has a written agreement with the ACO, is verified via PECOS, and is the only entity type that can be a CARA counterparty.

### LEAD Payment Mechanisms (how money moves)

- **TCC** — broad capitation, all services, all participating provider types.
- **PCC** — primary-care-only capitation; Base (covers PC cost) + Enhanced (infra investment; greater of [7% − Base] or [2%]; recouped at settlement).
- **NPCC** — _new;_ true capitation for non-primary services, ACO at risk. **Mutually exclusive with CARA.**
- **APO** — REACH carryover; pre-payment reconciled vs. FFS. **Mutually exclusive with CARA.**
- **CARA** — episode-based risk with Preferred Providers (see below).

### CARA Risk Parameters (the four knobs — model THESE)

1. **Target price** — negotiated, risk-adjusted per episode. The central number.
2. **Discount / premium to target** — negotiated range against target.
3. **Performance adjustment** — quality→$ link; CMS-bounded **10%–100%**, otherwise free to negotiate.
4. **Quality measure(s)** — ≥1; default **Q484**; "Other MIPS-comparable" allowed with uploaded specs.

There is **no ±20% episode stop-loss** in CARA. (LEAD's stop-loss is a separate, optional, ACO-level beneficiary-outlier reinsurance — not an episode cap.)

### CARA Participation Pathways

- **Default Approach** — CMS-built EBCM episode as-is (no changing trigger codes/length/exclusions); ACO sets target price, discount/premium, performance adjustment.
- **Max Flex Option** — ACO picks an EBCM type but defines its own construction; subject to CMS review in 4i.

### The 4i Platform (what CMS already provides — defines our boundary)

CMS's 4i hosts the CARA module: episode data access, parameter configuration & submission, automated **eligibility verification** (Global Risk + signed PY PA), **PECOS** specialist verification, and **attestation** capture. Crucially, **CMS collects only an attestation that an EBRA exists — never the agreement itself.** If 4i data and the executed EBRA disagree, 4i wins for reconciliation. → Our wedge is everything 4i deliberately doesn't do: pre-signing modeling, the real EBRA authoring/management, specialist-facing visibility, and analytics.

### Quality Measures in LEAD

- **Carried from REACH:** five claims-based measures + **CAHPS** (patient-experience survey, pay-for-performance).
- **Two new eCQMs (EHR-derived):** Diabetes Glycemic Status >9%; Controlling High Blood Pressure. Phase-in: **PY1–2 optional → PY3–4 pay-for-reporting → PY5–10 pay-for-performance.**
- **CARA default quality measure:** Q484.

### CARA Sequence of Events

`2027:` sign LPACA + HIPAA data request → CMS sends target-price reports. `End 2027 (annually):` submit episode risk parameters in 4i → CMS finalizes → attest EBRAs. `Jan 1, 2028 (annually):` episodes start triggering. `Q1 2028+:` quarterly performance reports. `Q2 2028+:` annual reports. `Final Settlement:` actual FFS vs. target price → reconciliation payments/repayments; costs roll into ACO PY expenditures.

### Genuinely Undefined in the RFA (track these)

- The two states for the Medicaid-partnership framework (chosen during the planning phase, March 2026–Dec 2027).
- Exact file formats/fields of the CMS target-price and performance reports.
- Whether 4i exposes any API/export, or is screen-only.
- Exact EBCM risk-adjustment formulas (live in the separate CMS QPP/MIPS cost-measure specs).

---

## 2. Product Concept — What SpecLink Does

SpecLink is **the operational layer for managing CARA contracts** — purpose-built software ACOs use to:

1. **Author and manage CARA contracts (EBRAs)** with Preferred Providers (target price, discount/premium, performance adjustment 10–100%, quality measures, episode selection) — and keep them synced to what's attested in CMS's 4i.
2. **Track episodes** against benchmarks in real time across all contracts.
3. **Surface drift early** — alert the ACO when a specialist or episode type is trending over benchmark, _before_ CMS reconciles 14 months later.
4. **Decompose cost drivers** — show _why_ episodes are running hot (SNF days, implant SKUs, readmissions), so the ACO can have specific, data-grounded specialist conversations.
5. **Benchmark specialists against peers** — leaderboards drive behavior change; transparency alone has been shown to close 30–50% of cost variation in bundled payment literature.
6. **Forecast reconciliation outcomes** — model the ACO's expected CARA settlement before the CMS performance year closes.
7. **Reduce operational overhead** — one ACO contracting analyst can manage 30+ specialist contracts on SpecLink vs. 8–10 in Excel.

### How SpecLink Generates Savings (Concretely)

Five mechanisms, ranked by direct dollar impact:

1. **Early drift detection.** A specialist's joint replacement episodes trend +12% in month 2. SpecLink alerts. The ACO has a conversation about implant choice. Next 40 episodes return to benchmark. ~$140K saved on that single course-correction.
2. **Cost-driver decomposition.** Walk into a specialist meeting with "your SNF days average 8.2 vs. peer 4.1" instead of "you're expensive." Behavior changes when data is specific.
3. **Peer-pressure leaderboards.** Showing Specialist A that Specialist B (same specialty, same ACO) runs 8% under benchmark with equivalent quality scores moves behavior — well-documented in bundled payment literature.
4. **Portfolio optimization at renewal.** SpecLink shows which CARA contracts are generating savings vs. dead weight. ACO drops underperformers, renegotiates middle tier, expands volume with top performers.
5. **Operational leverage.** Lower headcount cost per managed contract; ACO contracting team scales linearly with volume.

Mechanisms 1–3 map to CMS-reconciled dollars and are what we'd underwrite performance fees against. Mechanisms 4–5 are real operational savings but messier to attribute.

---

## 3. Users & Buyers

### Primary Users (the Buyers)

**ACOs** — specifically the people who own value-based-care performance:

- **VP of Population Health** — usually the day-to-day product user.
- **CFO / VP of Finance** — owns the economic case; signs the contract.
- **Chief Medical Officer** — clinical legitimacy and specialist relationships.
- **VP / Director of Contracting** — manages the specialist negotiation workflow.
- **Director of Value-Based Care** — sometimes a dedicated role.

For small ACOs, decisions may concentrate in the CEO or COO. For large ACOs, expect a 6–12 month sales cycle with 3–5 stakeholders.

### Secondary Users

**Specialists and specialty groups** — view their own performance against contract terms via a future specialist-facing portal (post-MVP roadmap item). They do not pay, but they need visibility for the contracts to function.

### Tertiary / Influencer Stakeholders

- **NAACOS** (trade association) — channel partner potential.
- **Healthcare consultancies** (McDermott+, ATI Advisory, Coral Health, Chess Health) — advise ACOs on LEAD applications, either future partners or competitors.
- **CMS** — sets the rules; relationship via the Tech Enabler Initiative pathway.

---

## 4. Data Model & Domain Concepts

### Core Entities

- **ACO** — the customer organization. One ACO can have many contracts, many specialists, many episodes.
- **Specialist** — an individual provider or specialty group on the receiving end of a CARA contract.
- **CARA Contract (EBRA)** — the formal agreement between an ACO and a Preferred Provider defining episode types, negotiated target price, discount/premium, performance adjustment (10–100%), and selected quality measures. The agreement itself lives outside 4i; CMS only receives an attestation that it exists.
- **Episode** — a single instance of bundled care for one patient, one condition, one defined time window (e.g., a hip replacement plus 90 days of related follow-up).
- **Episode Type** — the category template (e.g., "Joint Replacement"), with a default benchmark price.
- **Alert** — a system-generated notification about drift, threshold breach, or operational issue.

### What an Episode Is (and Isn't)

An episode is a **bounded, condition-specific bundle** — a defined clinical event with a fixed time window covering one patient's care for one condition.

- ✅ A hip replacement + all related follow-up, PT, and complications through day 90 → one episode.
- ❌ A specialist being "on-call" for a period of time → not an episode.
- ❌ A patient's entire lifetime healthcare journey → not an episode.

Each episode has a **benchmark price** (set by CMS based on regional/national historical data, risk-adjusted), and actual costs are measured against it for reconciliation.

### Mock Dataset (Current MVP)

- **ACO:** Greenfield ACO | Performance Year 2024
- **7 Specialists:**
    - Chen (Orthopedics)
    - Nair (Cardiology)
    - Okafor (Neurology)
    - Lindqvist (General Surgery)
    - Mehta (Physical Medicine)
    - Torres (Oncology)
    - Zhao (Orthopedics)
- **6 Episode Types** with benchmark prices:
    - Joint Replacement — $28,500
    - Cardiac Cath — $18,200
    - Falls Prevention — $9,800
    - Spine Surgery — $34,200
    - Hip Fracture — $22,100
    - COPD Management — $14,500
- **15 mock episodes** spanning the above
- **4 CARA contracts** in various states (draft, active, under review)

---

## 5. Technical Architecture

### Stack Direction (Not Locked In)

The technical stack has not been finalized. Current leanings, subject to revision once the CTO begins scaffolding:

|Layer|Current leaning|Status|
|---|---|---|
|Frontend|**Svelte 5 + SvelteKit + TypeScript**|Likely, not locked|
|Backend|**Go + PostgreSQL**|Likely, not locked|
|Auth|TBD|No decision yet|
|Hosting|TBD|No decision yet|
|Charts|TBD|No decision yet|

### Rationale for Current Leanings

- **Svelte 5 + SvelteKit + TypeScript** — modern reactivity model with runes, smaller bundle sizes than React, integrated SSR/routing via SvelteKit, strong DX. TypeScript is non-negotiable for a healthcare data app where schema correctness matters.
- **Go + PostgreSQL** — Go offers strong concurrency, fast compile times, straightforward deployment (single binary), and excellent performance for API workloads. Postgres is the obvious choice for relational data with JSON flexibility where needed.

### Open Stack Decisions

- **Auth** — options range from off-the-shelf (Auth0, Clerk, WorkOS, Supabase Auth) to self-hosted (Ory, Keycloak) to rolling our own (not recommended for healthcare). Healthcare/enterprise SSO support (SAML, OIDC) will be a requirement at some point.
- **Hosting** — depends on backend choice and compliance posture. Likely candidates: Fly.io, Render, Railway, or AWS (with HIPAA-eligible services). Will need BAA-capable infrastructure once real PHI lands.
- **Charts** — for a Svelte frontend, options include LayerChart, Chart.js, ApexCharts, or D3-based custom components. Decision deferred until first real module rebuild.

### Why the Original "FastAPI + React" Was Reconsidered

The earlier MVP HTML mockup was built with React-style patterns in mind, and Python/FastAPI was a natural pairing given healthcare data ecosystem (pandas, scikit-learn). The current leanings reflect a CTO preference for tighter, more performant primitives — Svelte's compile-time approach over React's runtime, and Go's deployment simplicity and performance characteristics over Python. Both stacks are defensible; the choice is about team velocity and operational preference, not capability gaps.

### What Doesn't Change Across Stack Choices

Regardless of the final decision:

- **PostgreSQL is the database.** No serious case for anything else at this stage.
- **TypeScript everywhere it can be.** Type safety across the stack is critical for a domain with this much schema complexity.
- **HIPAA-conscious architecture from day one** — encryption at rest + in transit, audit logs, principle of least privilege.
- **No PHI in MVP** — synthetic data only until BAA-capable infrastructure and counsel are in place.
- **API design will be resource-oriented** — RESTful or RPC-style; final shape depends on backend choice.

---

## 6. MVP Dashboard — What's Been Built

Delivered as `speclink.html` — a zero-dependency interactive HTML file that runs in any modern browser, used as the v0 demo prop for early ACO conversations.

### Module 1: Episode Performance Dashboard

- KPI cards: total episodes, net savings, at-risk episodes, average quality score.
- Monthly savings/loss bar chart.
- Cost vs. benchmark chart by episode type.
- Specialist leaderboard (top performers).

### Module 2: Specialist Performance View

- 7 specialist cards, clickable to expand into episode tables.
- Per-specialist metrics: episode count, net savings, average cost, % vs. benchmark.

### Module 3: Episode Tracker

- 15 mock episodes in a filterable table.
- Tri-filter: episode type, specialist, status.
- Visual savings delta and color-coded quality score per row.

### Module 4: Contract Management

- 4 CARA contracts displayed with status strip coloring.
- "+ New CARA Contract" modal form with all fields.
- **Open gap:** the contract form must model CARA's actual risk parameters as first-class fields — negotiated target price, discount/premium to target, performance adjustment (10–100% band), and quality-measure selection (default Q484). Remove any ±20% stop-loss framing from earlier mockups; that is not a CARA parameter.

### Module 5: Alerts & Insights

- 5 auto-generated alerts: 2 critical, 2 warning, 1 informational.
- Dismissible.
- Alert configuration panel for thresholds.

---

## 7. Business Model & Pricing

### Recommended Model (Base + Performance Share)

The cleanest model is **base SaaS fee + performance share**, designed so SpecLink only makes meaningful money when the ACO makes meaningful money.

- **Base platform fee:** $40–60K/year per ACO. Covers hosting, support, baseline access. Not the profit center; just a floor.
- **Performance fee:** 2–4% of net CARA-attributable savings the ACO realizes through contracts managed in SpecLink. Capped at ~5x base fee so we don't dominate board conversations.
- **No charge on losses:** If the ACO owes CMS, we don't take a performance fee that year. We eat it with them.

### Year-One Fallback (Per-Contract Fee)

While building track record and before attribution methodology is bulletproof, a **per-CARA-contract fee** (e.g., $5K/active contract managed) is simpler:

- Scales with engagement, not vanity metrics.
- Easier to bill, less attribution drama.
- Transition serious accounts to performance-share in years 2–3.

### Why This Aligns Incentives

- ACO CFO can underwrite it cleanly: "we only pay the big number if we made the bigger number."
- We're incentivized to ship features that move actual reconciled savings — not checkbox features.
- Defensible against Arcadia/Innovaccer, who charge flat enterprise fees regardless of outcome.

### Honest Tradeoffs

1. **Attribution is hard.** Proving SpecLink "caused" savings vs. ACO's own work is messy. Methodology: "savings on episodes under CARA contracts authored and managed in SpecLink." Some ACOs will argue the number.
2. **Cash flow lag.** CMS reconciles 12–18 months after performance year close. We'd be billing performance fees in 2029 for 2027 performance. Base fee must fund operations, or we need bridge financing.
3. **Adverse selection risk.** ACOs likely to lose money have less reason to invest. Screen for ACOs with realistic benchmark positions before signing performance-fee deals.

---

## 8. Competitive Landscape & Defensibility

### Who Else Plays Here

- **Arcadia, Innovaccer, Health Catalyst** — large population-health platforms. Ingest claims data at scale, do registries, gaps-in-care, quality reporting. **Do not address CARA workflow specifically.**
- **CMS static tools** — basic reporting dashboards CMS provides to participants. Not workflow software.
- **Excel + email** — the current default for most ACOs managing specialist contracts. Breaks down past ~8–10 contracts.
- **Niche consultancies** — McDermott+, ATI Advisory, Coral Health, Chess Health. Offer advisory services, not software.

### What's NOT Defensible

- The dashboard tech. Arcadia could build our UI in a quarter.
- Claims data pipelines. They already ingest at scale; we don't.
- Enterprise relationships. They're embedded in every major ACO; we're not.

### What IS Defensible (for now)

1. **Purpose-built for CARA, not retrofitted.** Population-health platforms treat CARA as a future bolt-on; we're building the workflow from scratch.
2. **Speed advantage, narrow window.** LEAD RFA dropped March 31, 2026. ACOs need CARA tooling _before_ they apply, not after. Our window is roughly 18 months wide; we can ship CARA-specific features in weeks, not 12–18 month enterprise roadmap cycles.
3. **Workflow depth, not data depth.** Their moat is data ingestion. Ours is contract authoring, specialist negotiation, alert configuration, reconciliation forecasting — depth that comes from sitting next to design partners for 12 months.
4. **Integration partner, not competitor.** Realistic positioning: be the CARA layer that plugs into Arcadia/Innovaccer via API. They keep ACO relationship; we own the specialist-risk vertical.

### Realistic Exit Path

End game is most likely **acquisition by Arcadia, Innovaccer, Health Catalyst, or Optum** in years 3–4, once CARA volume justifies it. Estimated range: $80–200M, depending on customer count and revenue. This is not a standalone $10B company — it's a category-defining wedge in a niche that one of the giants will buy. That's a great outcome; we should be clear-eyed about it with investors.

---

## 9. Go-to-Market & Sales Motion

### Phase 1 — Validate Before Building (weeks 1–4)

1. Read the LEAD RFA end-to-end. Build a confirmed-mechanics-vs-open-questions one-pager.
2. Talk to 8–12 ACOs (target: ACO REACH or MSSP Enhanced participants signaling LEAD interest, Global Risk-capable). Use the HTML dashboard as a discussion prop, not a sales demo.
3. Talk to 3–5 specialty groups (ortho, cardio first).
4. Talk to 2–3 NAACOS/consultancy contacts (McDermott+, ATI Advisory, Coral Health, Chess Health).

### Phase 2 — Build with Design Partners (weeks 4–10)

5. Sign 1–2 design partners (free or $1 contracts, weekly feedback, logo rights). This is the gate to building the backend, not vice versa.
6. Build the backend then, not now — to _their_ workflow, not assumed workflow.
7. Apply to **CMS Tech Enabler Initiative** in parallel — credibility multiplier and distribution channel.

### Phase 3 — Pilot, Then Pitch (weeks 10–20)

8. Run a real pilot with one design partner on synthetic-then-real data. Charter it as a 90-day evaluation.
9. Use pilot story as the proof point for seed raise or broader market expansion.

### Sales Cycle Expectations

- 6–12 months ACO-to-contract.
- 3–5 stakeholders typically involved (CFO, CMO, VP Pop Health, contracting, sometimes board).
- Conversion from cold email: 5–10% reply, 30–50% of replies to call. So 100 cold emails → ~3–5 calls.
- Warm intros (NAACOS, advisors, LinkedIn 2nd-degree) convert at 5–10x cold rate.
- Spend disproportionate time on warm-intro path; cold pipeline is backup.

### Outreach Email Templates (Drafted)

Three variants exist for ACO outreach, used based on context:

- **Direct & specific** — default cold email, names a specific stake (LEAD application).
- **Insight-led** — leads with contrarian observation ("most LEAD applicants are underestimating CARA"). Higher ceiling, slightly higher risk.
- **Warm intro / referral** — always use when there's any connection.

Operational notes for outreach: send from real domain (not Gmail), Tuesday–Thursday 7–10am recipient time, one follow-up after 5 business days, track in lightweight CRM (Attio or spreadsheet — not Salesforce yet).

---

## 10. Founding Team & Company Formation

### Team

- **Founding CTO** — owns product, engineering, technical architecture, the MVP build.
- **Founding COO** — owns market validation, GTM, customer development, partnerships, operations.

### Advisors (Target)

Three advisor profiles, 0.25–0.5% equity each, 2-year vest, no cliff:

1. **Former ACO COO/CFO** — operational credibility, warm intros to ACOs.
2. **Specialist-side leader** (e.g., orthopedic group MD or hospital VSL) — clinical credibility, specialist-side perspective.
3. **CMS-policy person** — RFA interpretation, model evolution insight.

### Company Formation Checklist

- ❌ Delaware C-corp incorporation (Stripe Atlas or Clerky, ~$500)
- ❌ Vesting schedules between co-founders (standard 4-year, 1-year cliff)
- ❌ IP assignment agreements
- ❌ Founders' stock issued with 83(b) elections filed within 30 days
- ❌ Cap table documented
- ❌ Healthcare counsel on retainer (Stark / AKS literacy — Hooper Lundy, Foley Hoag, Ropes & Gray practice areas)
- ❌ Final company name secured (domain + USPTO trademark)
- ❌ Real email domain with SPF/DKIM (SendGrid or Resend) for outreach

**Do all of this before signing the first paid pilot.**

### Funding Path (Decision Point)

Three viable paths, each implying different timelines and proof points:

- **Pre-seed raise** (~$1–2M) — fund 12–18 months of focused build + GTM. Implies fundraising in parallel with design partner conversations.
- **Bootstrap to revenue** — slower, lower dilution, dependent on early paying pilots.
- **Friends-and-family round** (~$250–500K) — bridge to seed, lower formality, faster to close.

This decision should be made in week 1 because it changes everything downstream.

---

## 11. Roadmap & Next Steps

### Status as of Latest Update

**What exists:**

- ✅ Interactive MVP dashboard (HTML, zero dependencies)
- ✅ Full data model and mock dataset
- ✅ Technical architecture explored; current leanings documented (Svelte/SvelteKit + Go + Postgres), not locked in
- ✅ Business case and competitive analysis
- ✅ Business model defined (base SaaS + performance share, with per-contract fallback)
- ✅ 8-week build timeline
- ✅ Founding team in place (CTO + COO)
- ✅ ACO outreach email templates drafted

**What does not yet exist:**

- ❌ Final company name and brand
- ❌ Real backend (likely Go + PostgreSQL, not finalized)
- ❌ Real authentication
- ❌ CSV/JSON episode import pipeline
- ❌ Production deployment
- ❌ Real CMS data integration (out of MVP scope intentionally)
- ❌ Specialist-facing portal (post-MVP)
- ❌ Signed design partners / paying pilots
- ❌ Delaware C-corp + cap table + IP assignment
- ❌ Healthcare counsel
- ❌ Advisor recruitment
- ❌ Domain / trademark cleared
- ❌ End-to-end LEAD RFA technical appendix read
- ❌ ACO target list (20–30 prospects, prioritized)

### Parallel Tracks for Weeks 1–8

**COO track — market validation & GTM:**

1. Read LEAD RFA + CARA factsheet cover-to-cover; produce one-pager.
2. Build target list of 20–30 ACOs.
3. Run 8–12 discovery calls.
4. Talk to 3–5 specialists / specialty groups.
5. Engage 2–3 NAACOS / consultancy contacts.
6. Sign 1–2 design partners by week 6.

**CTO track — foundation, not features:**

1. Finalize stack decision (current leaning: Svelte + Go + Postgres). Scaffold the backend with auth and a deployable starting point.
2. Deploy to Render / Fly.io / minimal AWS.
3. Wire Module 3 (Episode Tracker) to real API end-to-end.
4. Build CSV import pipeline with validation.
5. Hold off on specialist portal, advanced alerts, and full contract authoring until design partner workflows are observed.

**Joint work:**

- Finalize company name; secure domain + trademark.
- Delaware C-corp + vesting + IP assignment + 83(b).
- Cap table documented.
- 1-hour intro with Stark/AKS-literate healthcare attorney.
- Advisor recruitment (3 roles).
- Funding-path decision (pre-seed vs. bootstrap vs. F&F).

### What Success Looks Like by Week 8

- 12+ discovery calls completed; themes synthesized into a real PRD.
- 1–2 signed design partners (LOIs or free pilot agreements).
- Functional backend: auth + one live module + CSV import.
- Delaware C-corp formed, clean cap table, IP assigned.
- 2–3 advisors signed.
- Clear point of view on whether the original product hypothesis survived contact with reality (it probably won't fully — that's normal and good).

### Post-Week-8

- Build the design partner's actual workflow (the MVP probably gets 30% rewritten based on what's learned).
- Run 90-day pilot with one design partner.
- Apply to CMS Tech Enabler Initiative.
- Prep seed raise off real traction (if pre-seed path was chosen, raise seed; if bootstrap path, expand sales).

---

## 12. Open Questions & Risks

### Open Policy Questions

- **CARA risk parameters — RESOLVED via RFA.** Not a ±20% stop-loss. The negotiated knobs are: target price, discount/premium to target, performance adjustment (CMS-bounded 10–100%), and quality-measure selection (default Q484). Episode-level reconciliation compares actual FFS vs. risk-adjusted target price at LEAD Final Financial Settlement.
- **CARA contract template — PARTIALLY RESOLVED.** CMS provides EBCM episode definitions and "language regarding provisions that should be included in EBRAs" inside 4i, but does NOT collect or template the full executed EBRA. The actual agreement (terms, payment, recoupment-delegation clauses) is authored and held by the parties — outside 4i. This gap is our wedge: we own the real EBRA; 4i only holds the attestation. We are authoring/managing contracts, not filling a CMS form.
- **Reconciliation methodology — RESOLVED in shape, open in formula detail.** CARA episode reconciliation = actual FFS payments vs. risk-adjusted target price, settled at LEAD Final Financial Settlement; episode costs roll into the ACO's Performance Year expenditures. Exact EBCM risk-adjustment formulas live in the CMS QPP/MIPS cost-measure specs (separate documents) — pull those before building the simulator's math.
- **4i integration boundary — NEW open question.** Does CMS offer any API/export from the 4i CARA module, or is it screen-only? Determines whether we sync programmatically or via CSV/manual entry. Investigate during design-partner conversations.
- **Data CMS will share with ACOs — PARTIALLY RESOLVED.** Beginning 2027, the LEAD implementation contractor delivers annual reports with target prices (post-LPACA + HIPAA data request); quarterly performance reports start Q1 2028, annual reports Q2 2028. Exact file formats/fields TBD — this defines our ingest pipeline.

### Strategic Risks

- **Big platforms acquire or build first.** Defensible window is ~18 months. Move fast.
- **LEAD model gets delayed or restructured.** CMS Innovation Center models occasionally shift. Diversification thesis: most CARA capabilities transfer to other CMS specialist-risk arrangements.
- **Design partners drop out.** Have at least 2 before committing to their workflow specifically.
- **Adverse selection** — ACOs with weak benchmark positions buy us, lose money anyway, blame us.
- **Stark Law / Anti-Kickback exposure** — facilitating payments between ACOs and specialists has legal complexity. Counsel before any payment-flow features.

### Execution Risks

- **Solo-founder failure modes do not apply** — two founders, parallel tracks.
- **CTO builds wrong product before COO validates** — explicit gate at week 6 (1+ signed design partner) before building backend at scale.
- **COO spends on ops polish instead of customer calls** — single highest-leverage COO activity in months 1–3 is being on calls with ACO buyers. Process can wait.
- **Naming bikeshedding** — final name needs domain + trademark check, but no name is worth more than 1 week of either founder's time.

---

## 13. Glossary

- **ACO (Accountable Care Organization)** — a group of healthcare providers that take collective responsibility for the cost and quality of care for a defined population of Medicare beneficiaries.
- **ACO REACH** — CMS Innovation Center model (Realizing Equity, Access, and Community Health), immediate predecessor framework to LEAD; several quality measures carry over.
- **AKS (Anti-Kickback Statute)** — federal law prohibiting payment for patient referrals; affects how ACOs can compensate specialists. LEAD provides specific safe harbors (e.g., for RISE home modifications).
- **APO (Advanced Payment Option)** — carried over from ACO REACH; a pre-payment reconciled against actual FFS spend. Specialists electing APO cannot participate in CARA.
- **Attachment point** — in LEAD's ACO-level stop-loss, the spending level above which outlier reinsurance protection triggers for an individual beneficiary.
- **BAA (Business Associate Agreement)** — HIPAA-required contract between a covered entity (e.g., an ACO) and a vendor handling PHI.
- **Benchmark** — the expected Medicare Part A + B total cost of care for an ACO's aligned beneficiaries; the basis for capitation amounts and savings/loss calculations. LEAD does not rebase during the model.
- **BPCI Advanced (Bundled Payments for Care Improvement Advanced)** — earlier CMS episode-payment model; the EBCM methodology and shadow-bundle data initiative descend from it. (Note: its ±20% stop-loss is NOT a CARA parameter.)
- **CAHPS (Consumer Assessment of Healthcare Providers and Systems)** — standardized patient-experience survey; a carried-over pay-for-performance quality measure in LEAD.
- **CARA (CMS-Administered Risk Arrangement)** — the mechanism within LEAD for ACOs to share episode-based risk with Preferred Providers, built into the 4i platform. **Available only to Global Risk Option ACOs.** Episodes trigger starting Jan 1, 2028.
- **CMS (Centers for Medicare & Medicaid Services)** — the federal agency administering Medicare and Medicaid.
- **CMS Innovation Center (CMMI)** — the CMS division that designs and tests new payment models.
- **CMS Tech Enabler Initiative** — pathway for technology vendors to be recognized as supporting CMS model participants.
- **Design partner** — an early customer (typically free or near-free) who collaborates closely on product development in exchange for influence over the roadmap.
- **Discount / premium to target price** — a negotiated adjustment to a CARA episode's target price, agreed between ACO and Preferred Provider, entered in 4i.
- **Dually eligible** — beneficiaries who qualify for both Medicare and Medicaid; a high-cost, high-complexity population LEAD aims to serve better via state Medicaid partnerships.
- **EBCM (Episode-Based Cost Measure)** — CMS methodology (established in MIPS) measuring the risk-adjusted total Medicare cost of all items/services in a defined episode. The data spine of CARA; episodes are built on EBCMs.
- **EBRA (Episode-Based Risk Arrangement)** — the contract between an ACO and a Preferred Provider under CARA. CMS collects an attestation that it exists but does not collect the agreement itself.
- **eCQM (electronic Clinical Quality Measure)** — quality measures pulled from EHR data. LEAD phases in two new eCQMs (Diabetes Glycemic Status >9%; Controlling High Blood Pressure): optional PY1–2, pay-for-reporting PY3–4, pay-for-performance PY5–10.
- **Enhanced PCC** — the infrastructure-investment portion of Primary Care Capitation; the greater of (7% of benchmark − Base PCC) or (2% of benchmark). Recouped at settlement, so it functions as an advance.
- **Episode** — a defined clinical event (e.g., knee arthroplasty) with a fixed time window covering one patient's care for one condition.
- **Episode Type** — the EBCM category (e.g., "Orthopedic Procedure → Knee Arthroplasty") with default construction parameters.
- **Fee reduction** — the percentage by which a provider's Medicare FFS payments are reduced when enrolled in a prospective payment mechanism (TCC/PCC/NPCC), replaced by upfront capitation to the ACO.
- **4i (4Innovation)** — CMS's digital platform that hosts the CARA module: episode data access, parameter configuration/submission, eligibility verification (via PECOS), and attestation. The system of record for CARA; SpecLink layers on top of it.
- **Global Risk Option** — LEAD track with full two-sided TCOC risk (100% upside/downside); the ONLY track eligible for CARA.
- **High Needs beneficiaries** — complex/frail patients; ACOs serving a high proportion (≥40%) qualify for lower beneficiary-alignment minimums and enhanced risk adjustment.
- **HIPAA (Health Insurance Portability and Accountability Act)** — federal law governing handling of protected health information.
- **LEAD (Long-term Enhanced ACO Design)** — the CMS Innovation Center model running PY2027–PY2036.
- **LPACA (LEAD Participation Agreement CARA Amendment)** — the agreement an ACO signs to opt into CARA (requires Global Risk election).
- **Medicare Trust Fund** — the federal pool (notably the Part A Hospital Insurance fund) that pays for Medicare; LEAD aims to extend its solvency by slowing spending growth.
- **MSSP (Medicare Shared Savings Program)** — the largest, permanent CMS ACO program; a likely future CARA expansion target (476 ACOs).
- **NAACOS (National Association of ACOs)** — trade association; potential channel partner.
- **NPCC (Non-Primary Care Capitation)** — new in LEAD; true prospective capitation for non-primary-care services where the ACO bears risk. Specialists electing NPCC cannot participate in CARA.
- **Original Medicare** — Medicare Part A (inpatient/facility) + Part B (outpatient/professional); the basis for TCOC calculations.
- **Participant TIN** — a provider entity used for beneficiary alignment, subject to quality reporting and mandatory capitation. NOT CARA-eligible (contrast: Preferred Provider).
- **PCC (Primary Care Capitation)** — prospective monthly payment covering only primary care services by primary care specialists. Has Base + Enhanced components.
- **PECOS (Provider Enrollment, Chain, and Ownership System)** — CMS database 4i uses to verify a Preferred Provider's Medicare enrollment before CARA participation.
- **Performance adjustment** — the CARA mechanism linking quality performance to financial outcome; negotiated between ACO and Preferred Provider within a CMS-bounded range of **10%–100%**.
- **PHI (Protected Health Information)** — patient data covered by HIPAA.
- **Preferred Provider** — a specialist/provider organization with a written agreement with the ACO (not a Participant TIN). The CARA counterparty; verified via PECOS; participates at NPI level. **Only Preferred Providers are CARA-eligible.**
- **Professional Risk Option** — LEAD track with shared (not full) TCOC risk; NOT CARA-eligible.
- **PQP (Prevention and Quality Plan)** — a required ACO prevention plan; the RISE to Age in Place episode can satisfy it.
- **Q484** — the default CARA quality measure in 4i: Clinician & Clinician Group Risk-standardized Hospital Admission Rates for Patients with Multiple Chronic Conditions.
- **RBAC (Role-Based Access Control)** — access control model where permissions are tied to roles, not individuals.
- **Rebasing** — resetting benchmark base years to incorporate recent spending; causes the "ratchet effect." LEAD deliberately does NOT rebase during the model.
- **Reconciliation** — comparing actual costs vs. benchmark/target price to determine payments owed; for CARA, done at LEAD Final Financial Settlement.
- **RFA (Request for Applications)** — CMS solicitation inviting ACOs to apply; the source of truth for LEAD (this brief reflects the 04/15/2026 revision).
- **RISE to Age in Place** — CARA's falls-prevention episode (Resilience and Independence in a Safe Environment). Delivered by an OT/PT/RN team (+ optional handyperson for home mods up to $2,500). Has NO target price; paid via zeroed-out G-codes. Satisfies the PQP requirement.
- **Shadow bundles** — the pre-CARA data initiative providing nested episode-bundle pricing to ACOs; CARA's data lineage.
- **Stark Law** — federal law restricting physician self-referral; affects ACO-specialist payment structures.
- **Stop-loss (LEAD, ACO-level)** — OPTIONAL beneficiary-outlier reinsurance for the ACO's overall TCOC, via prospectively-set attachment points. **NOT an episode-level cap and NOT a CARA contract parameter** — do not conflate with CARA risk knobs.
- **Target price** — the negotiated, risk-adjusted price for a CARA episode; actual FFS spend is reconciled against it. The central CARA risk parameter.
- **TCC (Total Care Capitation)** — broad prospective monthly capitation covering all services for participating provider types; derived from the ACO benchmark.
- **Wedge** — the gap between the benchmark (grown at a rate below counterfactual Medicare growth but above actual growth) and actual expenditures; the shared-savings opportunity split between CMS and the ACO.

---

_End of brief. Next planned update: after first design partner is signed, or after RFA technical appendix has been read end-to-end — whichever comes first._