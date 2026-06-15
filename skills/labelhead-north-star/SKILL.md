---
name: labelhead-north-star
description: >
  The canonical strategic vision document for LabelHead and LabelHead for Artists.
  This is the single source of truth for where the platform is going — beyond the MVP,
  beyond Founding Season, into the full long-term product. Deploy this skill for ANY
  task that involves evaluating whether a feature, partnership, data source, mechanic,
  or decision aligns with LabelHead's long-term vision. Also deploy when the user
  mentions: back catalog, historical artist data, new data sources for scoring, new
  competition formats, new revenue streams, new platform mechanics, LabelHead for
  Artists, artist agents, the score checker, catalog investors, the Label Intelligence
  API, scoring architecture, Momentum Score, Motion Score, A&R Alpha, or any idea
  that should be evaluated against the north star. This skill must be read at the
  start of any session involving product roadmap, feature evaluation, scoring
  implementation, or strategic direction — even if the user does not explicitly
  reference it.
---

# LabelHead North Star
**Version:** 3.3
**Status:** Living document — update when founder approves new decisions
**Last updated:** 2026-06-12 (Phase 1 engineering close, T5-R4 GREEN)
**Supersedes:** Version 3.2 (June 2026), Version 3.1 (June 2026), Version 2.0 (June 2026), Version 1.0 (March 2026)

**v3.3 change summary (SCOPE: technical/engineering canon ONLY — all founder-ratified 2026-06-10 → 06-12; the business strategy, marketplace architecture, LFA, GTM, API, and revenue sections below are UNCHANGED from v3.2):**
1. Acceleration source = C.1b LIVE in production (Songstats velocity arithmetic + min-base guardrail; per-artist legacy fallback) — first full traversal of the source-promotion path; certified SIM-04 → SIM-07
2. A&R Alpha sub-weights RATIFIED (ownership 0.6 / timing 0.2 / conviction 0.1 / concentration 0.1) — no longer interim
3. Variant B release-aware baseline adjustment live (factor 0.40); release floors REMOVED (last `event_type` read in scoring eliminated)
4. cycle_rank semantics canonical for the first time: single-count aggregation, ≤W bound, standard competition tie-break (1-2-2-4, exact equality)
5. Narrative pipeline integrity: idempotent event clustering + rollup max-guard (one logical event counts once)
6. Identity doctrine canonical after the seed-corruption forensic episode (census CLEAN; validator hardened; machines propose / humans ratify)
7. Gate T5.2 → T5.2′ (recompute-from-persisted-inputs, bit-identical) per Law 7; Phase 1 closed T5-R4 GREEN; platform live at `v3-apple @ 7609611`
8. Quarters/Form Table and amendment-window timing: both FORMALLY DEFERRED to Season 2 planning (see Decisions sections)
Full technical detail: the "Phase 1 Engineering Record" section near the end of this document + SCORING_SPEC.md v1.1 (repo) + `sim/reports/` certificates.

**v3.2 change summary (all founder-ratified June 2026):**
1. A&R Alpha range compressed to 0.7–1.5 with logarithmic ownership curve (was 0.1–2.0 linear)
2. Flex/core Cycle score split locked: core 80% / flex 20%; flex = 100% of daily score
3. Field aging rule adopted: rosters unconfirmed for 3 consecutive Cycles exit the field
4. directBeefBonus removed from Momentum Score; beef becomes a display-layer event object
5. Daily prize formula changed: best Alpha-adjusted single pick of the day (was highest aggregate)
6. Week 1 batch settlement adopted; draft timing zeroed for the initial draft
7. Partner-media exclusion rule adopted for Cultural Gravity
8. Call Record adopted as a first-class platform object (Founding Season launch scope)
9. Settlement P&L ledger adopted as launch scope
10. Notification taxonomy locked: Signal / Verdict / Window only

---

## The One-Sentence Vision

LabelHead is the permanent competitive infrastructure for cultural foresight — a
two-sided marketplace where competitors earn on their cultural knowledge and artists
build the momentum that makes them worth knowing about.

---

## The Overarching Thesis

Sports and music are built on the same foundation — elite talent, devoted fans,
cultural obsession. Sports built a $500B+ ecosystem. Music is at $54B with a $0
participation economy. The difference is not cultural relevance. It is architecture.

Sports built an organizational competition layer — leagues, teams, standardized
metrics, a governed format. That layer unlocked everything downstream: betting,
fantasy, prediction markets, a $200B participation economy. Music never got that
layer. LabelHead is that layer.

The box score was not just a game mechanic. It was the standardized measurement
infrastructure that made everything downstream possible. Once a shared, trusted,
independently verifiable number existed, the entire sports ecosystem unlocked.
The LabelHead Momentum Score is that number for music.

### Key Numbers — Use Precisely
- **$446B** = gap between total sports ecosystem ($500B+) and music ecosystem ($54B)
- **$200B** = sports participation economy vs music's $0
- **$54B** = music's current total ecosystem — not zero, growing at 10% YoY
- **$28.6B** = global recorded music revenue at historic highs

---

## The Marketplace Architecture (CANONICAL)

LabelHead is a two-sided marketplace. One platform. Two entry points.

**DEMAND SIDE — Competitors (LabelHead Competition Platform)**
Cultural tastemakers who build fictitious labels and draft real artists. Points earned
when rosters outperform cultural expectations. The leaderboard is public and permanent.
Status: Live — Founding Season Q2 2026

**SUPPLY SIDE — Artists (LabelHead for Artists)**
Unsigned artists who get the professional career infrastructure every breaking artist
has but almost no one can access before the deal. Twelve specialized AI agents running
simultaneously, building the Momentum Score that competitors draft them on.
Status: Score checker live — Agent service launches Season 2

**The Neutrality Principle:**
LabelHead has no institutional allegiance. It reads third-party data from sources
neither side controls. An artist signed to Roc Nation, Gamma, or UMG is scored
identically. LabelHead is the neutral arbiter — the first platform in music history
that scores cultural performance with no economic stake in any artist's label,
distributor, or publisher.

**The Partner Integrity Rule (NEW — v3.2):**
Media sources contractually partnered with LabelHead (podcast hosts, future
publication partners) are excluded from Cultural Gravity computation for any artist
that partner's competitor account currently rosters. Even our partners cannot move
their own scores. This rule is public-facing and is a credibility asset — state it
proactively in institutional and press contexts.

---

## What LabelHead Is (And Is Not)

### It IS:
- A structured, skill-based competition platform built on real streaming and cultural data
- A two-sided marketplace: competitors on demand side, artists on supply side
- A proving ground for taste — pseudonymous, meritocratic, and publicly visible
- A recurring cultural property, like a season sport, with timestamped conviction data
- A B2B data asset: every draft pick, every score, every roster is a structured record
- A premium, invite-only experience that people want to be seen competing in
- The neutral arbiter of cultural momentum — no institutional allegiances
- A music industry utility: the Momentum Score is the standardized metric music never had
- A receipts machine: every call is timestamped, saturation-stamped, and permanent

### It Is NOT:
- A gambling platform or prediction market
- A social network or music discovery app
- A streaming service or playlist tool
- A game in the casual sense
- Open to everyone — scarcity is structural, not incidental
- A platform with exclusive artist picks (shared draft pool is fundamental)

---

## SCORING ARCHITECTURE — CANONICAL v3.2
### Supersedes all prior scoring definitions. Effective June 2026.

═══════════════════════════════════════════════════════
THE MASTER PHRASE (canonical — do not alter):
"Momentum measures the artist. Motion measures the label."

FORMULA (canonical):
Momentum Score × A&R Alpha = Motion Score

**CADENCE CLARIFICATION (v3.3, 2026-06-12):** Motion is the INSTANTANEOUS label-value of a pick. The competition format (daily vs weekly) sets the SETTLEMENT WINDOW over which Motion accumulates into the roster's `total_points` — it does NOT rescale the Motion number. The same pick shows the same Motion in any competition; only the aggregation period differs. (Rescaling by cadence would break cross-competition comparability.)

THE COMPLETE VERBAL SYSTEM (approved shorthand):
- "Momentum Score tells you who is moving culture. Motion Score tells you who moved first."
- "Momentum is the signal. Motion is the game."
- "A&R Alpha converts Momentum into Motion."
- "External platforms track artist activity. LabelHead tracks cultural foresight."
- "Momentum is the box score. Motion is the game."
═══════════════════════════════════════════════════════

### THE DESIGN INVARIANT (NEW — v3.2, governs all scoring changes)

**A competitor must never be able to win by being differentiated and wrong over
consensus and right.** Across any simulated or real season, Motion variance
attributable to Momentum (correctness) must exceed Motion variance attributable to
A&R Alpha (positioning). This invariant is enforced by the simulation harness and
is a release gate for any change to scoring math.

### SCORE 1 — MOMENTUM SCORE (artist metric)

**Definition:**
The artist's real cultural momentum, measured exclusively from external third-party
data. Competition-agnostic. No game mechanic contamination. No human editorial
inputs. The industry metric.

**Canonical architecture:**
MOMENTUM SCORE
  = f(Acceleration × 0.40,
       Cultural Gravity × 0.35,
       Longevity × 0.25)
  External data only. Competition-agnostic.
  No additive bonuses of any kind (v3.2).
  Artist-facing metric. Primary B2B product.
  Scale: 0–15. Raw components 0–100.

**Components (3 only — do not add without founder approval):**

| Component | Weight | Description |
|---|---|---|
| **Acceleration** | 0.40 | Rate of audience activity growth across streaming, social, and press — period over period. Baseline normalization lives inside this calculation. **(v3.3: source = C.1b LIVE — Songstats daily-series velocity + minimum-base guardrail, identity-verified artists, per-artist legacy fallback; Variant B release-aware baseline, factor 0.40; release floors removed. Certified SIM-04/SIM-07.)** |
| **Cultural Gravity** | 0.35 | Weighted mention velocity across 60+ tiered media sources, subject to the Partner Integrity Rule. Absolute threshold gate protects emerging artist tier integrity. |
| **Longevity** | 0.25 | Sustained above-baseline heat across consecutive Cycles. Measures durability, not spikes. (Decay-based persistence model approved for Season 2 — see backlog.) |

**What it is NOT:**
- Baseline Outperformance is NOT a standalone component (absorbed into Acceleration, v3.1)
- directBeefBonus is RETIRED (v3.2). Beef is captured organically: an active beef
  drives mention velocity (Cultural Gravity) and audience activity (Acceleration).
  The data sees it on its own. No additive, no editorial confirmation input.
- Ownership saturation does NOT influence this score under any circumstances

**Beef Event Object (NEW — v3.2, display layer only):**
Beef is a first-class platform event, never a score input.
- Object: artist pair, start date, end date (nullable), status (active/resolved),
  source citations (public, third-party)
- Surfaces: artist card tag ("Active Beef: vs. [artist], since [date]"), Cultural
  Event Window qualifying trigger (Season 2), partner content narrative surface,
  sponsorable inventory unit
- Zero pathway from this object to any score. Enforced at the schema level: the
  scoring engine has no read access to beef_events.

**Where Momentum lives:**
- labelhead.co/score (free artist-facing score checker)
- LFA agent dashboard (the north star agents optimize toward)
- Artist cards in the competition draft pool
- Label Intelligence API (primary B2B product)
- Public artist profiles
- All institutional buyer and press materials

**Naming:** "Momentum Score" only. Never "Pure Momentum Score" (retired).

**The moat argument — two layers:**
Layer 1 (Formula Layer): External data inputs processed through proprietary composite
methodology. Replicable in theory, defensible through IP in practice. Not the moat.

Layer 2 (Behavioral Conviction Layer): Generated exclusively by the competition.
Structured, timestamped picks from 500+ culturally informed competitors, verified
against real-world outcomes, compounding across every Cycle and every season. Contains
pick timing curves, consensus formation data, A&R Alpha patterns, Motion Score outcomes,
and (v3.2) Conviction Theses — structured qualitative reasoning attached to timestamped
predictions. The Google parallel holds: external data inputs are replicable; the
behavioral conviction layer is not.

---

### MODIFIER — A&R ALPHA (competition modifier) — UPDATED v3.2

**Definition:**
The competition-layer modifier that converts Momentum Score into Motion Score.
Measures the competitive foresight of the pick — how differentiated and early the
label's identification of that artist was relative to the field at the time of drafting.

**Canonical architecture (v3.2 — supersedes 0.1–2.0 linear):**
A&R ALPHA
  = 0.7 + 0.8 × C, where C ∈ [0,1] is the weighted sub-component composite
  Range: 0.7 (maximum-consensus pick) to 1.5 (maximum-differentiation pick)
  Ownership sub-score uses a LOGARITHMIC curve — differentiation
  is concentrated at the low-ownership end, where foresight lives.
  Full curve definition and constants: SCORING_SPEC.md §2 (canonical).
  NULL/missing ledger row → neutral fallback of exactly 1.0.
  Captured at pick time. Never recomputed from current saturation.
  Competition-layer only. Never artist-facing.

**Why the compression (rationale of record):** at 0.1–2.0, Alpha's 20x dynamic range
overwhelmed Momentum's ~3x practical spread among pool-eligible artists, making the
leaderboard an ownership-arbitrage game. At 0.7–1.5, a maximum-differentiation pick
earns up to ~2.1x the multiplier of a maximum-consensus pick — a decisive edge that
cannot, by itself, carry a wrong call past a right one. This enforces the Design
Invariant.

**Inputs and sub-weights:**
- Ownership saturation AT TIME OF PICK — dominant input (interim weight 0.6)
- Draft timing within the Cycle (interim weight 0.2) — ZEROED for the initial
  Week 1 draft (v3.2)
- Conviction pattern — hold consistency vs. churn (interim weight 0.1)
- Roster concentration — portfolio differentiation (interim weight 0.1)
- Sub-weights RATIFIED (v3.3, 2026-06): ownership 0.6 / timing 0.2 / conviction 0.1 / concentration 0.1; `c_conviction` INERT (0.5) until Season 2's Conviction Modifier

**Week 1 Batch Settlement (NEW — v3.2, canonical):**
The initial draft settles as a simultaneous batch. Ownership saturation for all
opening picks is computed ONCE, after the 48-hour post-Selection-Sunday window
closes, and applied uniformly. draft_timing_score = 0 for all initial-draft picks.
No competitor gains Alpha by submitting faster. The platform rewards cultural
intelligence and timing — never speed. This rule is absolute.

**Early Adopter Protection (CANONICAL — unchanged):**
A&R Alpha is captured when an artist is added to a roster and preserved through
later ownership increases. Alpha pays out only if the competitor holds that artist
through the relevant lock or settlement period. If the artist is dropped before
settlement, the captured Alpha is forfeited and the pick receives no Motion
contribution for that period. Later ownership increases do not reduce the original
picker's Alpha. Consensus can catch up, but it cannot erase early conviction.

A separate bounded Conviction Modifier (1.00–1.15×) for uninterrupted multi-Cycle
holds is approved for Season 2 and must never recalculate the original ownership basis.

### Alpha Treatment by Pick State (unchanged)

| Pick State | Treatment |
|---|---|
| Active pick with captured Alpha | Use captured Alpha at settlement |
| Active pick, missing Alpha (legacy data gap) | Neutral 1.0 fallback |
| Dropped/inactive pick before settlement | Zero Motion contribution — no fallback, no partial credit |
| Replaced pick | Replacement artist scores on its own captured Alpha |

**Capture completeness (v3.2 — launch gate):** 100% of picks, including initial
client-side drafts, route through the capture endpoint. No pick may exist without
a ledger row. The Motion==Momentum operational state described in v3.1 is closed
out as a launch precondition, not tolerated into the season.

---

### SCORE 2 — MOTION SCORE (leaderboard currency)

**Definition:**
The competition-adjusted score that determines leaderboard ranking and prize pool
outcomes. Generated by applying A&R Alpha to Momentum Score.

**Formula:** Momentum Score × A&R Alpha = Motion Score

**Cycle score composition (NEW — v3.2, canonical):**
- CORE roster picks = 80% of the weekly Cycle score
- FLEX roster picks = 20% of the weekly Cycle score
- FLEX roster picks = 100% of the daily competition score
- Leaderboard and roster Cycle totals rank on the Motion total:
  total_points = Σ (artist Momentum × that pick's A&R Alpha), weighted 80/20 core/flex

**The Field (UPDATED — v3.2):**
"The field" — for scoring, leaderboard ranking, AND ownership saturation — is each
label's latest roster (carry-forward), NOT a single calendar week. Engine and
ownership resolve the field identically to the leaderboard (selectLatestRostersByUser).

**Field Aging Rule (NEW — v3.2, canonical):** a roster exits the field after 3
consecutive Cycles without confirmation. Confirmation = any roster change OR an
explicit roster confirmation action. An aged-out roster: (a) stops scoring,
(b) exits the ownership saturation denominator, (c) is marked Inactive on the
standings (not deleted — the history is permanent). Any roster action by the
competitor restores the roster to the field immediately, effective the next
settlement. Rationale of record: indefinite carry-forward of abandoned rosters
deflates the saturation denominator and silently inflates late-season Alpha —
currency debasement.

**Where Motion lives / does not live (unchanged):** sole leaderboard currency;
never the primary B2B metric; never artist-facing; never in institutional pitch
materials as primary metric. Motion Score is a competition result, not an artist
quality metric. Momentum Score independence is the foundation of the API's credibility.

## Competition · Prize Architecture (CANONICAL — v3.2 lineage, restored 2026-06-12)
*Restored from v3.2. Only the subsections genuinely absent from this file are inlined here — roster-flex/amendment-window, competition formats, and prize tiers. The v3.2 block's LFA / GTM / Label Intelligence API content already lives in full as dedicated sections below this one and is NOT duplicated here. Where v3.2 touched a decision v3.3 re-disposed, the v3.3 ruling governs (⚠ inline).*

### Roster flex & the Daily Amendment Window
- Flex artists per format: **The Invitational — 1 flex** · **Founding Season — 2 flex**. Changeable once per day during the daily amendment window.
- **Daily Amendment Window** — operational spec stands; **⚠ timing superseded by §7.1 (v3.3 deferral, founder-confirmed 2026-06-12)**: timing is FORMALLY DEFERRED; live interim is **12:00 UTC (= 8 AM EDT), UTC-pinned**. The 9:00–10:30 AM ET window (and a 12:00–1:30 PM ET alternative) are the v3.2 candidates, revisited before Season 2 ruleset lock.
  - **Monday** window: BOTH core and flex picks eligible for change; the Monday window-close marks a **new Cycle**.
  - Missing the window: the previous flex roster carries forward.

### Competition Format Architecture
- **THE INVITATIONAL** — Field **50** (invitation only) · **8 weeks / 8 Cycles** · Roster **4 core / 1 flex** · Grand Prize **$100,000** (anchor-sponsor funded only) · single-division, open leaderboard, no brackets, no elimination. **Selection Sunday:** both podcast hosts reveal rosters simultaneously; the rest of the Top 50 has a 48-hour window to finalize; the initial draft settles as a batch. **Midseason:** Week-4 formal report (top 10, biggest surprise, biggest miss).
- **FOUNDING SEASON** — Field **up to 500** (the Invitational 50 included) · **12 weeks / 12 Cycles** · Roster **3 core / 2 flex** · Grand Prize **$50,000** (anchor-sponsor funded only) · every founding imprint carries **"Est. Founding Season 2026"** permanently.

### Prize Pool Structure (three tiers)
- **TIER 1 — Daily** ($500/day): winner = the competitor holding the **best Alpha-adjusted single pick** of the day — highest single-pick daily Motion contribution (that pick's daily Momentum × its captured Alpha); tie-break = earlier capture timestamp. *Rationale of record: highest-aggregate rewarded release-calendar spike-chasing; the single-pick formula makes the daily winner a foresight story, not a volume story.* Season total (84 days) **$42,000** · Sovereign operating budget.
- **TIER 2 — Weekly Cycle** ($2,500/Cycle, split **60/25/15** across top 3): season total **$30,000** · Sovereign budget, offset by secondary sponsors from Week 4. **⚠ Quarters/Form Table restructuring FORMALLY DEFERRED per §7.2 (v3.3, founder-confirmed 2026-06-12)** to Season 2 planning (zero Invitational dependency); if ever adopted it must be decided and announced **before launch** — prize structure never changes mid-season.
- **TIER 3 — Season Grand Prizes:** Invitational champion **$100,000** · Founding Season champion **$50,000** · funded by anchor sponsor at **100% pass-through, NEVER from raise capital**; never announced until the sponsor check clears.
- **Net Sovereign prize cost (Tiers 1 & 2 only):** 2026: $16,500 | 2027: $114,500 | 2028: $177,000

---

## LabelHead for Artists (LFA) — Canonical Definition

(Unchanged from v3.1 except where noted.)

### Core Premise
Unsigned artists don't lack talent. They lack infrastructure. Every artist who breaks
has a team — manager, publicist, release strategist, A&R advisor. That team is
inaccessible before the deal. LFA breaks that loop.

### The Differentiation
An artist using LFA is building the Momentum Score that 500 culturally informed
competitors use to draft them. This stakes mechanism cannot be replicated without
the competition platform existing first. Lead with the competition. LFA follows.

### GTM Sequencing (CANONICAL — NEVER REVERSE)
1. Now: Score checker at labelhead.co/score — free, quiet, existing infrastructure
2. Founding Season: Competition is entire public GTM thrust. LFA does not exist publicly.
3. Season 2: LFA launches as named product with subscriptions open.

### Pricing
- LFA Subscription: $299/month (starting tier)
- Artist Portal: $12.99/week per portal per subscriber | 70% artist / 30% Sovereign
- Artists pay nothing to create or maintain a portal

### The 12 Agents (CANONICAL — unchanged)
All agents act — they do not advise. Outbound actions require artist approval.
01 Manager | 02 Publicist | 03 Release Strategist | 04 DSP Pitch | 05 A&R Intelligence |
06 Booking Coordinator | 07 Social Strategist | 08 Sync Licensing | 09 Analytics
Interpreter | 10 Brand Partnership Scout | 11 Legal Brief (NOT a lawyer) |
12 Cultural Trend Monitor

**v3.2 note — agent guardrail:** LFA agents optimize Momentum Score through its
three measured components. With directBeefBonus retired, no agent has any
structural incentive to advise artists toward conflict. Agent guidance must never
recommend manufacturing conflict as a score strategy.

### APPROVED GAP — Publishing Strategy Agent (Agent 13) — unchanged

### The Momentum Score as North Star — unchanged

---

## GTM Strategy (CANONICAL — unchanged from v3.1)

### Option 1 — Primary Target (Joe Budden Podcast + The Breakfast Club)
- Joe Budden Podcast: $75,000 cash + 1.0% Sovereign equity (84,416 shares at $0.77)
- The Breakfast Club: $125,000 cash to iHeart + 0.75% to Charlamagne personally (63,312 shares)
- Combined: $200K cash / 1.75% equity / $17M exit value at 12x ARR

### Option 2 — Secondary Target (Joe & Jada + Drink Champs)
- Joe & Jada: $50K cash + 0.75% equity | Drink Champs: $60K cash + 0.75% equity
- Combined: $110K cash / 1.5% equity

### Selection Sunday (CANONICAL)
Both shows go live within the same 2-hour window. Contractually required before
any other deliverable activates.

### Key Contractual Deliverables (Top 5)
1. Selection Sunday simulcast participation
2. Weekly in-show Cycle commentary
3. Score reaction content within 72 hours of Cycle results
4. Artist pipeline activation — ask guests about their LabelHead score on air
5. Cross-show rivalry episode minimum 2 per season

**v3.2 note:** Deliverable 4 operates under the Partner Integrity Rule — partner
coverage never feeds Cultural Gravity for artists the partner rosters.

---

## Label Intelligence API — Full Architecture (unchanged from v3.1)

### Stream 7A — A&R and DSP Tier
$500/month standard, $2,500/month enterprise. Primary product: Momentum Score data
(competition-agnostic). Launch Q3 2028.

### Stream 7B — Catalog Investor Tier
Historical Momentum Index | Catalog Cohort Benchmarking | Cultural Durability
Rating (AAA–D). Standard $150K / Premium $300K / Enterprise $500K annual.
Launch Q1 2028. Revenue: 2028 $712,500 | 2029 $1,935,000 | 2030 $3,105,000.
Stream 7 combined: 2028 $792,500 | 2029 $2,220,000 | 2030 $3,789,000.

**Critical:** Motion Score is NOT the primary B2B metric. Momentum Score is.
**v3.2 reinforcement:** Momentum Score now contains zero editorial inputs of any
kind. Every input traces to a third-party source neither side controls. This is
a diligence-room asset — use it.

---

## The Data Vision (unchanged from v3.1)

### Founding Season Data Sources (v1 — Active)
Spotify Web API, Last.fm, YouTube Data API v3, Shazam via RapidAPI,
Apify TikTok Scraper (TIKTOK_SIGNAL_WEIGHT = 0.20 cap),
Soundcharts (social signals), Genius, Ticketmaster, Wikipedia,
60+ tiered media source registry (Cultural Gravity, subject to Partner Integrity Rule)

### Near-Term (Season 2+) — Approved
Chartmetric API (pending license), Audiomack API, TikTok sound adoption velocity

### Medium-Term
Reddit API, SoundCloud API, Bandsintown API

### Long-Term
BDS/Luminate radio airplay, sync licensing activity, live ticketing velocity,
merchandise sales velocity, press mention sentiment analysis

### Back Catalog Mechanic ✅ APPROVED FOR SEASON 3+
Separate Catalog League track. A&R Alpha architecture must be evaluated for
catalog context before implementation.

---

## Revenue Stream Vision (unchanged from v3.1)

| Stream | Timing |
|---|---|
| Anchor Sponsorship | Founding Season |
| Secondary Sponsorships | Season 2 |
| Artist Portals | Season 2 |
| LFA Subscriptions | Season 2 |
| Staff Pass / Analyst Tier ($19.99/mo) | Season 2 — product DEFINED v3.3 |
| Press Correspondents ($99/mo) | Season 2 |
| Verified Pro Membership ($199/yr) | Season 3 |
| Label Intelligence API 7B | Q1 2028 |
| Label Intelligence API 7A | Q3 2028 |
| LFA Label Pack | Season 3 |
| Catalog League | Season 3 |
| Institutional Leagues | Season 4+ |
| LabelHead Live | Season 4+ |
| Brazen content layer | Season 4+ |
| Data Archive Licensing | Season 4+ |

**v3.2 addition (exploratory, not yet approved):** Beef/conflict event coverage as
sponsorable inventory ("presented by" packages around active competition narratives).
Verzuz precedent. Requires founder approval before any sponsor conversation.

**THE STAFF PASS (NEW — v3.3, 2026-06-12, founder-ratified) — defines the previously-empty Analyst Tier:**
The competitor-side intel subscription, **$19.99/mo**, unlocks the platform's named staff specialists on artist surfaces. One door, FOUR named specialists all unlocking together (NOT a ladder; expanded from 2→4 on 2026-06-12 after the Staff page revealed the full roster):
- **Jordan Ellis — Head of A&R / Scout:** human interpretation of the machine signal. Structured read (Signal/Bull/Risk/Fit), inline-expand on the artist card.
- **Marcus Webb — Director of Analytics:** the deep-visualization war room (Alpha-decay curve, Momentum×ownership positioning scatter, component-stacked bands, 12-month multi-source velocity overlays, field-percentile distributions). Opens as a full modal — self-selected destination for the analyst audience, segmented OFF the simplicity-gated default card.
- **Market Intel — Competitive Intel:** competitive/field intelligence specialist (Staff Pass; ruled 2026-06-12).
- **Trend Forecaster — Macro Signals:** macro trend specialist (Staff Pass; ruled 2026-06-12).
Free tier sees all four greyed + one-line teasers; Staff Pass lights all four full-color together. **LAUNCH-HONESTY QUALIFIER (2026-06-12, BE-17 §3B finding):** the four-specialist roster is the ROADMAP, not day-one reality. Production today = ONE authoring scout (536 per-artist reads, fronted as Jordan/A&R) + Marcus's analytics (computed over certified data — real). Market Intel and Trend Forecaster have ~no authored corpus yet and ship as visible-but-`coming_soon`, NOT sold as delivering live reads until they author. The Staff Pass at launch truthfully BUYS Jordan's reads + Marcus's analytics; the other two are the front office being built. (Same honesty principle as the projectedBoost removal: never sell what doesn't yet work.)
Canonical division this establishes: **machines score (Momentum — neutral, free, the B2B credibility asset); named humans interpret (Staff — paid).** This reinforces the Neutrality Principle rather than threatening it. Constraints that hold regardless of price: the three-class notification taxonomy (no alert builders) and no new scoring surfaces (the War Room visualizes certified scores, never mints new score types; "projected Momentum" etc. remain founder-deliberate backlog). CONSTITUTIONAL PRECONDITION: named-human byline over AI-assisted analysis requires an AI-authorship disclosure (route: labelhead-legal-compliance) before the named reports ship publicly. Other subscriptions are SEPARATE and unchanged: artist-side LFA $299/mo + Portals $12.99/wk; B2B API $500–$2,500/mo; **Press Correspondent / 'Press Room' $99/mo (a DISTINCT publishing/coverage desk — NOT folded into the Staff Pass; different job, 4.5× price; orchestrator judgment 2026-06-12, founder deferred)**; Verified Pro $199/yr. First specced in order FE-04 (§4B Jordan, §4C Marcus).

---

## Platform Architecture

### Typography (CANONICAL — NO EXCEPTIONS)
Cabinet Grotesk only. NO monospace fonts anywhere. font-variant-numeric:
tabular-nums for all live-updating numbers.

### Brand Colors (Canonical)
#0A0A0A dark background | #00E5FF cyan accent | #F2F0EB off-white text |
#C8A96A gold (Sovereign/financial) | #D4A843 amber | #3D3C3A muted gray

### Notification Taxonomy (NEW — v3.2, locked)
Three classes only. Nothing else may be built.
- **Signal** — an artist you hold or watchlist crossed a defined threshold
- **Verdict** — Cycle settled; your result; one notification
- **Window** — amendment window open/closing; opt-in only
No streaks. No re-engagement bait. No rival-activity notifications.

### API Response Pattern (Scoring)

```
GET /artists/:id/score
  Returns Momentum Score only. arAlpha: null, motionScore: null
GET /artists/:id/score?context=competition
  Returns all three values populated. Competition-facing views only.
```

Full contract definitions: SCORING_SPEC.md §6 (canonical for engineering).

---

## Sovereign Company Structure (unchanged)

Sovereign Co. (Delaware C-Corp holdco) | LabelHead, Inc. (competition + LFA) |
Brazen, Inc. (Season 4+, NOT seed-funded, Marcus's domain).
Seed: $1,200,000 at $6,500,000 pre / $7,700,000 post | 15.6% | $0.77/share (10M shares)
Prize pool NOT in raise. Anchor sponsor only.

---

## Brand Voice (Canonical)

Terse. Data-forward. No exclamation points. No hype language.
The competitive unit is a **Cycle** (never "week").
"Bag first, legacy second" is the GTM framing that resonates.

---

## Active Constraints (All Agents and Communications)

- Never reference Timbaland in outbound communications
- Marcus is available for all active GTM work — Brazen is his priority
- Never state prize pool figures until anchor sponsor is confirmed
- Never recruit celebrity-tier founding competitors until sponsor is confirmed
- Never position LabelHead as a gambling platform or prediction market
- Never use exclusive artist pick mechanic — shared drafts are fundamental
- Brazen is not a music streaming platform
- Never use Geist Mono anywhere
- Motion Score is NOT the primary B2B metric — Momentum Score is
- (v3.2) No editorial or discretionary inputs to Momentum Score, ever
- (v3.2) No scoring pathway from beef_events — enforced at schema level
- (v3.2) Partner media never feeds Cultural Gravity for artists the partner rosters
- (v3.2) No mechanic may reward submission speed — Week 1 settles as a batch
- (v3.2) Any scoring math change must pass the Design Invariant in simulation
  before release

---

## Pending Legal Items

**Motion Score trademark clearance** — required before any public-facing use.
Currently working canonical name only.

---

## Approved Future Features Backlog (v3.2)

| Feature | Season Target | Status | Notes |
|---|---|---|---|
| **Call Record object** | Founding Season | ✅ Approved v3.2 | Shareable card; launch scope |
| **Settlement P&L Ledger** | Founding Season | ✅ Approved v3.2 | Launch scope |
| **Draft pool scatter (Momentum × ownership)** | Founding Season | ✅ Approved v3.2 | Default pool view; onboarding |
| **"Est. Founding Season 2026" mark** | Founding Season | ✅ Approved v3.2 | Permanent on imprint + standings |
| **Regional divisions (display layer)** | Founding Season | ✅ Approved v3.2 | Groups of 10; no new scoring |
| **Beef Event Object** | Founding Season | ✅ Approved v3.2 | Display only; no score pathway |
| **Field Aging Rule** | Founding Season | ✅ Approved v3.2 | 3-Cycle confirmation threshold |
| **Partner Integrity Rule** | Founding Season | ✅ Approved v3.2 | Launch gate, pre-Selection Sunday |
| **Quarters + Form Table** | Season 2 planning | ⏸️ FORMALLY DEFERRED (2026-06-12) | Presentation-layer; zero Invitational dependency |
| **Tiered Roster (Core + Flex)** | Founding Season | ✅ Canonical | 4/1 Invitational, 3/2 Founding; 80/20 split |
| **The Invitational (Top 50)** | Founding Season | ✅ Canonical | 8-week, 50-person, $100K |
| **Daily Competition** | Founding Season | ✅ Canonical | $500/day; v3.2 single-pick formula |
| **LFA Score Checker** | Live Now | ✅ Live | Momentum Score only |
| **LFA 12-Agent Service** | Season 2 | ✅ Approved | $299/month |
| **Publishing Strategy Agent (13)** | Season 2 | ✅ Approved | Most important LFA gap |
| **Conviction Modifier** | Season 2 | ✅ Approved | Bounded 1.00–1.15×; never recalculates basis |
| **Conviction Thesis** | Season 2 | ✅ Approved v3.2 | Sealed until lock, then permanent/public |
| **Cultural Event Window** | Season 2 | ✅ Approved v3.2 | Flex-only, max 2/Cycle, 24hr, declared |
| **Conviction Override** | Season 2 | ✅ Approved v3.2 | One mid-week core change per season |
| **Signing Event mechanic** | Season 2 | ✅ Approved v3.2 | Graduation settlement scaled by Alpha |
| **Longevity decay model** | Season 2 | ✅ Approved v3.2 | Half-life persistence replaces streak logic |
| **Acceleration expectations model** | LIVE | ✅ SHIPPED EARLY (v3.3) | Variant B release-calendar adjustment, factor 0.40, certified + in production |
| **New-artist bootstrapping** | Season 2 | ✅ Approved v3.2 | Provisional status or cohort baseline |
| **Cross-source corroboration** | Season 2 | ✅ Approved v3.2 | 2+ source families confirm spikes |
| **A&R Rating (skill metric)** | S1 quiet / S2 public | ✅ Approved v3.2 | Bayesian, cross-season, separate from standings |
| **Producer graph (intel layer)** | Season 2 intel / S3 score | ✅ Approved v3.2 | Unscored Phase 1; validate before promoting |
| **Regional Scene Index** | Season 2 intel | ✅ Approved v3.2 | Phase as intel first |
| **Earned imprint reveal** | Season 2 | ✅ Approved v3.2 | Opt-in identity claim at defined achievement |
| **Artist Portal Subscriptions** | Season 2 | ✅ Approved | $12.99/week, 70/30 |
| **Positional drafting** | Season 2 | ✅ Approved | |
| **Genre-specific leaderboards** | Season 2 | ✅ Approved | Track-configurable weights REQUIRED first |
| **Multi-week roster locks** | Season 2 | ✅ Approved | |
| **Audiomack integration** | Season 2 | ✅ Approved | |
| **TikTok sound adoption data** | Season 2 | ✅ Approved | |
| **Chartmetric API** | Season 2 | ✅ Approved | Pending license |
| **Label Intelligence API 7A / 7B** | 2028 | ✅ Approved | |
| **Cultural Durability Rating** | Season 3 | ✅ Approved | |
| **LFA Label Pack** | Season 3 | ✅ Approved | |
| **Head-to-head challenge** | Season 3 | ✅ Approved | |
| **Draft class system** | Season 3 | ✅ Approved | Requires bootstrapping model |
| **Sync licensing signal** | Season 3 | ✅ Approved | |
| **Publication institutional imprints** | Season 3+ | ⏸️ Held | Blocked on Partner Integrity Rule surviving a season |
| **Institutional Leagues** | Season 4 | ✅ Approved | |
| **LabelHead Live** | Season 4 | ✅ Approved | |
| **Brazen content layer** | Season 4+ | ✅ Approved | |
| **Radio airplay (BDS)** | Season 3 | 🔵 Exploring | |
| **Live ticketing velocity** | Season 3 | 🔵 Exploring | |
| **Motion Score trademark** | Pre-launch | ⚠️ Pending | Legal clearance required |

---

## Decisions Now Resolved (v3.2)

All v3.1 resolutions carry forward, plus:
- ✅ A&R Alpha: 0.7–1.5 range, logarithmic ownership curve (supersedes 0.1–2.0)
- ✅ Cycle score split: core 80% / flex 20%; flex 100% of daily
- ✅ Field Aging: 3-Cycle confirmation threshold; inactive rosters exit denominator
- ✅ directBeefBonus retired; Beef Event Object adopted (display only)
- ✅ Daily prize: best Alpha-adjusted single pick formula
- ✅ Week 1 batch settlement; draft timing zeroed for initial draft
- ✅ Partner Integrity Rule adopted as launch gate
- ✅ Design Invariant adopted as release gate for scoring changes
- ✅ Capture completeness (100% of picks through ledger) is a launch precondition
- ✅ Call Record and Settlement P&L Ledger in Founding Season launch scope
- ✅ Notification taxonomy locked: Signal / Verdict / Window

**v3.3 resolutions (2026-06-12, all founder-ratified — technical scope):**
- ✅ A&R Alpha sub-weights ratified (0.6/0.2/0.1/0.1); ALPHA_MAX 1.5 confirmed
- ✅ Acceleration source: C.1b promoted and LIVE (full constitutional path; certified)
- ✅ Variant B factor 0.40; release floors removed
- ✅ cycle_rank semantics canonical (single-count, ≤W bound, competition 1-2-2-4 tie-break, exact equality)
- ✅ Full-scope rank repair executed (scope = re-measured at execute time; 542 rows; 0 pending verified)
- ✅ Narrative dedup (idempotent clustering + rollup max-guard) certified + deployed
- ✅ Identity doctrine canonical; census CLEAN; WESTSIDE BOOGIE override; Babysantana UNVERIFIED; Sterling Hull RETIRED
- ✅ Gate T5.2 → T5.2′ per Law 7; Phase 1 CLOSED (T5-R4 GREEN)
- ✅ Delta-attestation cadence: per-deploy sweeps
- ⏸️ Quarters + Form Table — FORMALLY DEFERRED to Season 2 planning
- ⏸️ Amendment-window timing — FORMALLY DEFERRED (interim: UTC-pinned 12:00; revisit pre-Season-2 lock)

## Decisions Still Requiring Founder Input

- [x] ~~A&R Alpha sub-weights ratification~~ — RATIFIED v3.3 (0.6/0.2/0.1/0.1)
- [x] ~~Quarters + Form Table~~ — FORMALLY DEFERRED to Season 2 planning (v3.3)
- [x] ~~Amendment window timing~~ — FORMALLY DEFERRED; UTC-pinned 12:00 interim (v3.3)
- [ ] Founding Season open: clean-slate disposition of preseason results (recommended, undecided) + the moment Law 1 (no mid-season scoring changes) binds
- [ ] Whether A&R Alpha is ever surfaced to artists in simplified form
- [ ] Motion Score trademark clearance confirmation
- [ ] Whether Catalog League uses A&R Alpha or a modified version
- [ ] Publishing Strategy Agent: replace existing or add as 13th
- [x] ~~Analyst Tier ($19.99/mo) product definition~~ — RESOLVED v3.3: the Staff Pass (Jordan + Marcus). See Revenue Stream Vision.
- [ ] LFA tier structure above $299/month (artist-side; still open — distinct from the Staff Pass)
- [ ] Staff Pass: future premium split (Scout-only vs Analytics-only) — deferred; revisit on subscription data
- [ ] Selection Sunday broadcast date relative to Founding Season open
- [ ] Beef-adjacent sponsorship packages (exploratory — approve before any conversation)

---

## Phase 1 Engineering Record (v3.3 — 2026-06-12) — TECHNICAL CANON

*This section is the engineering layer only. It governs implementation; the business strategy above governs the company. Where deep detail is needed: SCORING_SPEC.md v1.1 (repo, canonical for engineering) and `sim/reports/` (certificates, byte-verbatim).*

**Phase 1 CLOSED:** T5-R4 GREEN (2026-06-12) — zero replay/artist/value/cycle-rank mismatches, both audited cycles (#6 `60dbeed2` legacy-ref, #8 `8d58e04e` c1-ref). Production: `v3-apple @ 7609611`, Railway, `ACCELERATION_SOURCE=c1` live since 2026-06-11 19:06 UTC.

**The five-rider certified boundary (SIM-07 full certificate on `7609611`):** (1) narrative clustering idempotency (status-agnostic candidate load; token-similarity/normalized-label merge; no `event_type` in any identity key); (2) rollup max-guard (one max-contribution representative per logical event; identity for clean artists; monotonic); (3) identity-validator hardening (name hard-gate + alias allowlist + trusted-anchor relaxation); (4) cycle_rank single-count fix + competition tie-break; (5) ≤W aggregation bound (normative at every compute time, incl. historical re-scores). Certificate gates: rotation ≤−2% / win 0% (two seed sets), foresight cost ≤0.5% (measured −0.33/−0.35%), Momentum share ≥0.95 (0.97 @ 100%), top-decile Alpha 0.25–0.40 (0.32).

**Rank semantics (first canonical definition):** `cycle_rank` = standing through window W; peer set = rosters with rows in the cycle ≤ W; aggregation = Σ total_points over windows ≤ W, each counted exactly once; tie-break = standard competition ranking (1-2-2-4), exact equality, no epsilon; derived display value — no settlement economics depend on it. `leaderboard_cache.rank` is a distinct, separately-governed surface (semantics review logged).

**Identity doctrine (canonical):** identity is never auto-guessed — machines propose with evidence (independent anchor, contaminant-excluded, refuse-on-ambiguity), humans ratify per row; validator expectations derive from trusted sources; embed verification budgeted into every pass; dossier hint-weighting hardening is a precondition of the next identity pass. Census CLEAN (0 mis-resolutions, 0 duplicates; 12,171 victim rows quarantined at the data layer — scoring views exclude by construction).

**The T5 lineage (the audit that audited itself):** T5 RED (instrument fault) → T5.2′ ratified per Law 7 (stricter: recompute-from-persisted-inputs, bit-identical) → T5-R2 RED (genuine defect → BE-14/15) → T5-R3 RED (correct sequencing refusal) → T5-R4 GREEN. Settlement value-math bit-identical through four consecutive audits. T5.2′ residual honestly named: input-capture fidelity → contemporaneous-snapshot debt item (recommended post-Invitational). T5.6-S registered at window #9.

**Process canon earned this phase:** evidence-latched preconditions (quoted evidence, never assertion); founder-as-second-instrument ("a write the script intends is a write the script confirms"); deploy-state founder-confirmed, never inferred; one tested definition, never two implementations; display layer never manufactures what the platform hasn't earned; gated admin tooling = B4 pattern (dry-run default, programmatic dry-run/execute parity); per-deploy attestation sweeps; `sim/reports/` version-controlled byte-verbatim.

**The thesis, measured:** pure foresight beats calendar-reading by **+19.6 points, 100/100 seasons, both seed sets** (SIM-04-a, c1 config). 

**Open engineering tracks at v3.3 cut:** BE-16 (apply SCORING_SPEC v1.1 + reconcile tooling branches + archive reports) · BE-13-R3 step 7 (cosmetic embeds, founder-run) · BE-12 (historical-data exposure endpoints → FE PR-C) · T5.6-S (window #9) · debt register in the v3.4 staging ledger (north-star-v33-staging-ledger skill).

---

## How to Update This Document

1. Add approved features to the Approved Future Features Backlog
2. Update relevant sections when core mechanics change
3. Note version and date
4. Do NOT add anything without explicit founder approval

Version 3.3 supersedes all prior versions across all instances. (v3.3 = v3.2's full business canon, unchanged, + the Phase 1 engineering ratifications marked above. ⚠ One recovery gap from the v3.2 restoration is marked inline at original lines 310–442 — restore that block from the founder's source copy.)
