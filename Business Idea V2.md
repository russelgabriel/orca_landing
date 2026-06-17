# SpecLink — Product Concept (v2, RFA-aligned)

_Working name. One-page concept reflecting the LEAD RFA (04/15/2026). Supersedes the earlier "SpecBridge / system-of-record" framing._

---

## One-line pitch

**The modeling, contracting, and specialist-engagement layer that sits on top of CMS's 4i CARA module — so ACOs can actually operate episode-based risk arrangements, not just submit them.**

---

## The problem (validated by the RFA itself)

CMS built CARA because specialists drive a large share of healthcare costs but sit outside accountability frameworks, and ACOs face real barriers standing up episode-based risk arrangements (EBRAs) with them. CMS provides the _plumbing_ — episode definitions (EBCMs), target-price data, and a submission/attestation workflow inside the **4i platform**. What CMS does **not** provide is everything that makes that plumbing usable: pre-signing financial modeling, the actual negotiated contract, specialist-facing visibility, and ongoing performance analytics. That gap is the product.

## Why now

CARA episodes begin triggering **January 1, 2028**, but ACOs must sign the LPACA, receive CMS target-price reports, and submit episode parameters **through 2027**. The buying decision happens in 2026–2027. No incumbent CARA-specific vendor exists. The window is ~18 months.

---

## The three adjustments from v1 (what the RFA changed)

### 1. Reposition: "layer on top of 4i," not "system of record"

CMS's 4i already owns episode definitions, parameter submission, eligibility/PECOS verification, and reconciliation. We do **not** try to replace it. Our wedge is precisely what 4i deliberately omits:

- **Pre-signing financial simulation** — 4i collects parameters and reconciles _after the fact_; nobody models outcomes _before_ signing. **This is our strongest, whitespace feature.**
- **The real EBRA** — CMS collects only an _attestation_ that an EBRA exists, never the agreement itself. We author, store, version, and reconcile the actual contract, kept in sync with the 4i attestation.
- **Specialist-facing visibility** — 4i is ACO-facing; specialists get nothing real-time.
- **Cross-episode analytics** — drift detection, cost decomposition, portfolio decisions.

### 2. Rebuild the contract model around CARA's real risk knobs

Drop the BPCI-style **±20% episode stop-loss** — that is **not** a CARA parameter. The negotiated knobs the RFA actually defines are:

|Parameter|Detail|
|---|---|
|**Target price**|Negotiated, risk-adjusted, per episode. The central number.|
|**Discount / premium to target**|Negotiated range against the target price.|
|**Performance adjustment**|Quality→$ link; CMS-bounded **10%–100%**.|
|**Quality measure(s)**|≥1; default **Q484**; "Other MIPS-comparable" allowed.|

(LEAD's only "stop-loss" is a separate, optional, ACO-level beneficiary-outlier reinsurance — irrelevant to the CARA contract module.)

### 3. Build episodes on the EBCM spine

Episodes are constructed on CMS's **EBCM (Episode-Based Cost Measure)** methodology — already used in MIPS and familiar to specialists. Mock data and the simulator should mirror the published EBCM episode list (knee/hip arthroplasty, lumbar fusion, PCI, CABG, sepsis, COPD, CHF, colon resection, cataract, etc.) so what ACOs see in SpecLink matches what they'll see in their 2027 CMS reports. Model the **RISE to Age in Place** falls-prevention episode as a special case (no target price; G-code based).

---

## What we sell (core modules)

1. **CARA Scenario Simulator** _(flagship — not offered by CMS)_ — model the ACO's settlement outcome at different target prices, discounts, and performance adjustments _before_ signing. Answers the exact question that paralyzes ACOs: "what target price keeps the specialist engaged without blowing my benchmark?"
2. **EBRA Authoring & Management** — author the real agreement around CMS episode definitions; track version, effective date, and recoupment-delegation clauses; stay synced to the 4i attestation.
3. **Episode Tracker & Cost Decomposition** — unified view of every episode, every Preferred Provider, every delta vs. target; decompose overruns to the line items driving them.
4. **Specialist Performance & (roadmap) Portal** — scorecards now; a specialist login later so providers see their own standing in real time.
5. **Alerts & Reconciliation Forecaster** _(roadmap)_ — real-time drift alerts plus a year-end settlement projection ("tax calculator" for CARA).

---

## Who we sell to

- **Buyer:** LEAD ACOs **in the Global Risk Option** (the only CARA-eligible track — this is the entire TAM, not a subset).
- **Buying roles:** VP Population Health, CFO/VP Finance, VP Contracting, CMO.
- **Secondary users:** **Preferred Providers** (specialists under written agreement with the ACO, NPI-level, PECOS-verified) — via the future portal.

## Competitive posture

- **vs. Arcadia / Innovaccer** — they're population-health/claims platforms; CARA is an adjacent contracting + episode-economics workflow they'd have to bolt on or acquire. Defensible on focus + timing, not tech.
- **vs. "just use 4i"** — our real competitor. We win by doing the modeling, contract authoring, specialist engagement, and analytics that 4i deliberately doesn't.
- **Likely exit:** acquisition by a pop-health platform or Optum once CARA volume justifies it (years 3–4).

## Expansion path (CMS-stated, not speculative)

The RFA says CARA's modular design enables scaling to other total-cost-of-care contexts based on uptake within LEAD. If CARA extends to MSSP (476 ACOs), the market multiplies — and the first purpose-built CARA tool is positioned as the category incumbent.