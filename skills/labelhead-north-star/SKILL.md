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
**Version:** 3.1
**Status:** Living document — update when founder approves new decisions
**Last updated:** June 2026
**Supersedes:** Version 3.0 (June 2026), Version 2.0 (June 2026), Version 1.0 (March 2026)
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
### It Is NOT:
- A gambling platform or prediction market
- A social network or music discovery app
- A streaming service or playlist tool
- A game in the casual sense
- Open to everyone — scarcity is structural, not incidental
- A platform with exclusive artist picks (shared draft pool is fundamental)
---
## SCORING ARCHITECTURE — CANONICAL v3.0
### Supersedes all prior scoring definitions. Effective June 2026.
═══════════════════════════════════════════════════════
THE MASTER PHRASE (use verbatim in all contexts):
"Momentum measures the artist. Motion measures the label."
THE FORMULA:
Momentum Score × A&R Alpha = Motion Score
THE COMPLETE VERBAL SYSTEM (approved shorthand):
- "Momentum measures the artist. Motion measures the label."
- "Momentum Score tells you who is moving culture. Motion Score tells you who moved first."
- "Momentum is the signal. Motion is the game."
- "A&R Alpha converts Momentum into Motion."
- "External platforms track artist activity. LabelHead tracks cultural foresight."
- "Momentum is the box score. Motion is the game."
═══════════════════════════════════════════════════════
### THE SCORING CANON — THREE-LAYER SYSTEM AT A GLANCE
| Layer | Meaning | Product role |
|---|---|---|
| **Momentum Score** | The artist's real cultural momentum, independent of who picked them. | Artist profile, market signal, B2B-facing truth |
| **A&R Alpha** | The competitor's foresight multiplier for a specific pick. | Competition mechanic and early-adopter protection |
| **Motion Score** | `Momentum Score × A&R Alpha`. | Leaderboard currency |
This table is the fast-reference summary. The full definitions, inputs, naming rules,
and presentation patterns for each layer follow below — that detail governs whenever
it is more specific than this summary.
### SCORE 1 — MOMENTUM SCORE (artist metric)
**Definition:**
The artist's real cultural momentum, measured exclusively from external third-party
data. Competition-agnostic. No game mechanic contamination. The industry metric.
**Components (3 only — do not add without founder approval):**
| Component | Description |
|---|---|
| **Acceleration** | Rate of audience activity growth across streaming, social, and press — period over period. Baseline normalization lives inside this calculation and is NOT exposed as a separate component. |
| **Longevity** | Sustained above-baseline heat across consecutive Cycles. Measures durability, not spikes. |
| **Cultural Gravity** | Weighted mention velocity across 60+ tiered media sources. Captures what streaming numbers alone miss. Absolute threshold gate protects emerging artist tier integrity. |
**Formula (CANONICAL — the literal computation behind the ratified weights):**
Momentum is built from three raw 0–100 component scores, each weighted and rescaled
onto the 0–15 display scale, plus one situational addend:
```text
Acceleration      raw × 0.40 / 100 × 15
Cultural Gravity  raw × 0.35 / 100 × 15
Longevity         raw × 0.25 / 100 × 15
Direct Beef Bonus direct points on the 0–15 scale, applied when confirmed beef is active
```
This is the literal arithmetic behind the weights already ratified below (Acceleration
0.40 / Cultural Gravity 0.35 / Longevity 0.25 — see "Decisions Now Resolved"). Each raw
component score arrives on a 0–100 scale; dividing by 100, multiplying by its weight,
and rescaling by 15 produces that component's contribution to the final 0–15 Momentum
Score.
**Direct Beef Bonus (CANONICAL — situational addend, NOT a fourth component):**
A direct point addend on the same 0–15 Momentum scale, applied only when confirmed
beef coverage meets the verification threshold (high-confidence narrative detection,
not speculation). It rewards real, corroborated cultural conflict precisely because
that is a Cultural-Gravity-shaped signal that a pure mention-velocity calculation can
under-credit in the moment it matters most. It is additive and situational — it does
not change the three-component weighting above, does not apply by default, and must
never be described as a fourth scored component. Founder approval required to add any
further bonus mechanics of this kind.
**What it is NOT:**
- Baseline Outperformance is NOT a standalone component (risk of double-counting
  with Acceleration — removed in v3.0)
- Surprise is NOT a component (retired — replaced by A&R Alpha as competition modifier)
- Ownership saturation does NOT influence this score under any circumstances
**Where it lives:**
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
against real-world outcomes, compounding across every Cycle and every season. Contains:
- Pick timing curves (who identified artists at what ownership saturation before
  streaming confirmed the thesis)
- Consensus formation data (how quickly market agreement formed around artist archetypes)
- A&R Alpha patterns (what pick profiles generated above-consensus competitive returns)
- Motion Score outcomes over time
The Google parallel: Google's algorithm uses publicly available websites. What
competitors cannot replicate is the behavioral data from billions of searches that
continuously trains the ranking system. LabelHead's external data inputs are replicable.
The behavioral conviction layer is not. It has to be accumulated by running a
competition that real people take seriously enough to compete in.
**Deck language (Slide 9 — Market-Tested card):**
"500+ culturally informed competitors pressure-test the Momentum Score every Cycle
with real public picks and real stakes. Every outcome is verified against what
actually happened.
Each Cycle also generates a proprietary behavioral layer — pick timing, ownership
curves, consensus formation, A&R Alpha, and Motion Score outcomes — that no external
data provider can replicate. External platforms track artist activity. LabelHead
tracks cultural foresight."
---
### MODIFIER — A&R ALPHA (competition modifier)
**Definition:**
The competition-layer modifier that converts Momentum Score into Motion Score.
Measures the competitive foresight of the pick — how differentiated and early the
label's identification of that artist was relative to the field at the time of drafting.
**Inputs:**
- Ownership saturation AT TIME OF PICK (calculated at moment of drafting, not current
  rate — early adopter protection is non-negotiable)
- Draft timing within the Cycle (how early in the amendment window)
- Conviction pattern (consistency of hold vs. churn across recent Cycles)
- Roster concentration (portfolio differentiation signal)
**Output:** A decimal multiplier
- Higher value = more differentiated/early pick
- Lower value = consensus/late/obvious pick
- 1.0 = exactly market consensus pick
**Naming convention:**
- Institutional/investor-facing: "A&R Alpha"
- Competitor UX/platform copy: "A&R Alpha" or "A&R Edge" (acceptable in casual contexts)
- "Surprise" is permanently retired
**Visibility:** Competition-layer only. Not artist-facing in current architecture.
Do not commit to "never visible to artists" — future product decisions may include
simplified transparency features that benefit artists without contaminating Momentum Score.
**B2B treatment:** A&R Alpha patterns are part of the proprietary behavioral conviction
layer sold as enrichment intelligence within the Label Intelligence API. They are NOT
the primary B2B metric.
---
### SCORE 2 — MOTION SCORE (leaderboard currency)
**Definition:**
The competition-adjusted score that determines leaderboard ranking and prize pool
outcomes. Generated by applying A&R Alpha to Momentum Score. Measures competitive
roster value — how much value a label's pick of that artist generated this Cycle.
**Formula:** Momentum Score × A&R Alpha = Motion Score
**Where it lives:**
- The LabelHead leaderboard (sole ranking currency)
- Competitor-facing roster analytics
- Cycle and season results
- Competition UX throughout
**Where it does NOT live:**
- Label Intelligence API as primary metric
- Artist-facing dashboards or score checker
- Institutional buyer pitch materials as primary metric
- Any B2B context where Momentum Score independence must be preserved
**Critical distinction:**
Motion Score is a competition result, not an artist quality metric. Institutional
buyers must never conclude that artist quality is determined by game mechanics.
Momentum Score independence is the foundation of the API's credibility.
**Platform language:**
- "My label got motion this Cycle."
- "Who's leading in Motion?"
- "That pick had Motion before anyone saw it."
- "She has Momentum, but low Motion because everyone already owns her."
**Naming:** "Motion Score" is the working canonical name. Trademark clearance
must be completed before it appears in public-facing materials (see Pending Legal Items).
---
### UX PRESENTATION PATTERN — ARTIST CARD
Never present Momentum Score and Motion Score as two peer scores of equal standing.
Present as a conversion sequence:
```
Momentum Score: 91
Cultural heat
A&R Alpha: 0.63x
Widely owned
Motion Score: 57
Roster value this Cycle
```
This three-line sequence resolves user confusion before it occurs.
---
### RETIRED TERMINOLOGY — DO NOT USE
| Retired Term | Replace With |
|---|---|
| "Surprise" (score component) | A&R Alpha (modifier, not component) |
| "Competition Score" | Motion Score |
| "Pure Momentum Score" | Momentum Score |
| "A&R Edge" (primary) | A&R Alpha (Edge acceptable in casual UX only) |
| "Baseline Outperformance" (standalone) | Absorbed into Acceleration methodology |
| "Geist Mono" (typography) | Cabinet Grotesk only |
| "Window" (competitor-facing) | "The Daily" or "Daily" |
| "Scoring window" | "Daily competition" |
| "Lock window" | "Daily lock" |
| "Window results" | "Daily results" |
| "liveWindowId" (API) | "liveDailyId" |
| "window_rank" (API) | "daily_rank" |
---
## Core Competition Mechanic (UPDATED v3.0)
### Shared Artist Draft Pool (CRITICAL — NEVER REVERSE)
Artists CAN be held by multiple competitors simultaneously. This is fundamental to
A&R Alpha functioning correctly. Ownership saturation = the percentage of the field
holding a given artist. The scarcity mechanic is information-based, not inventory-based.
### Early Adopter Protection (CANONICAL)
A&R Alpha is calculated based on the ownership rate AT THE TIME OF THE PICK — not the
current ownership rate. A competitor who drafted an artist in Week 2 at 4% ownership
earns their A&R Alpha based on 4% ownership throughout the season. This permanently
rewards early adopters and is the mathematical foundation of the cultural foresight thesis.
### Tiered Roster Mechanic (CANONICAL)
**CORE ROSTER — Weekly Lock (conviction picks)**
- The Invitational: 4 core artists
- Founding Season: 3 core artists
- Locked Monday 10:30 AM ET through following Monday 10:30 AM ET
- Cannot be changed mid-week
- Generates bulk of weekly Cycle score and season-long standing
**FLEX ROSTER — Daily Lock (market awareness picks)**
- The Invitational: 1 flex artist
- Founding Season: 2 flex artists
- Can be changed once per day during the daily amendment window
- Generates daily competition score, contributes partially to weekly Cycle score
### Daily Amendment Window (CANONICAL)
**9:00 AM ET to 10:30 AM ET daily**
- Monday window: BOTH core and flex picks eligible for change
- Monday 10:30 AM ET = new Cycle begins
- Missing the window: previous flex roster carries forward
Note: "window" is acceptable here as it describes the amendment period,
not a competition format. This is the roster decision window, not a
scoring event.
---
## Competition Format Naming (NEW — v3.1)
### THE CANONICAL HIERARCHY
| Format | Cadence | Status | Notes |
|---|---|---|---|
| **The Daily** | 24 hours | Live — Founding Season | Primary recurring competition |
| **The Cycle** | 7 days | Canonical — unchanged | Weekly competitive unit |
| **Season** | Full season | Canonical — unchanged | Prestige / cumulative ranking |
| **Daily AM / Daily PM** | 12 hours | Reserved — future only | High-frequency format, not live |
### THE DAILY — CANONICAL DEFINITION
The Daily is the 24-hour competition format. One result per calendar day.
"The Daily" is the branded format name. "daily competition" is the generic reference.
### SCORING CADENCE (CRITICAL)
The internal data pipeline runs every 12 hours for accuracy. This is an
implementation detail and is NEVER surfaced to competitors. Competitor-facing
competition cadence is 24 hours only — one Daily result per calendar day.
The two 12-hour data collection periods aggregate into a single Daily result.
"Window" as a technical term for the 12-hour data collection period is
acceptable in internal engine code, variable names, admin dashboards, and
code comments. It must NEVER appear in competitor-facing surfaces, API
responses consumed by the frontend, or any public-facing copy.
### CANONICAL PRODUCT LANGUAGE — THE DAILY
Use these exact phrases in all competitor-facing surfaces:
✅ USE:
- "You're in today's Daily."
- "The Daily locks in [timer]."
- "Daily results are settling."
- "You finished #18 in The Daily."
- "Your Daily roster is set."
- "Enter The Daily."
- "Today's Daily"
- "Yesterday's Daily"
❌ DO NOT USE:
- "The next Window opens..."
- "Window results are pending..."
- "You are entered in Window 042..."
- "Scoring window closes..."
- "Window · Daily" (old prize tier label)
### CLOSING LINE
"Momentum measures the artist. Motion measures the label.
The Daily is where labels prove it."
---
## Competition Format Architecture (CANONICAL)
### THE INVITATIONAL (Elite Competition — CANONICAL NAME)
- Field: 50 competitors, invitation only
- Duration: 8 weeks (8 Cycles)
- Roster: 4 core artists (weekly lock) / 1 flex artist (daily lock)
- Grand Prize: $100,000 — anchor sponsor funded only. Never from raise capital.
- Format: Single-division, open leaderboard. No brackets, no elimination.
- Selection Sunday: Both podcast hosts reveal rosters simultaneously. Rest of Top 50
  has 48-hour window to finalize.
- Midseason: Week 4 formal report — top 10, biggest surprise, biggest miss
### FOUNDING SEASON (Broader Platform)
- Field: Up to 500 competitors. Invitational 50 included.
- Duration: 12 weeks (12 Cycles)
- Roster: 3 core artists (weekly lock) / 2 flex artists (daily lock)
- Grand Prize: $50,000 — anchor sponsor funded only
### Prize Pool Structure (CANONICAL — THREE TIERS)
**TIER 1 — The Daily**
- Prize: $500 per Daily
- Winner: Highest 24-hour aggregate Motion Score across Founding Season competitors
- Competition cadence: Once per calendar day (24-hour result)
- Data pipeline: 12-hour internally — not surfaced to competitors
- Season total (84 Dailies across 12 Cycles): $42,000
- Funded by: Sovereign operating budget
- Branded as: "The Daily · $500"
**TIER 2 — The Cycle (Weekly)**
- Prize: $2,500 per Cycle, split 60/25/15 across top 3
- Season total (12 Cycles): $30,000
- Funded by: Sovereign operating budget, offset by secondary sponsors from Week 4
- Branded as: "The Cycle · $2,500"
**TIER 3 — Season Grand Prizes**
- The Invitational champion: $100,000
- Founding Season champion: $50,000
- Funded by: Anchor sponsor — 100% pass-through. NEVER from raise capital.
- Never announced until sponsor check clears.
- Branded as: "Season Title · $100,000" / "Season Title · $50,000"
**Net Sovereign prize cost (Tiers 1 and 2 only):**
2026: $16,500 | 2027: $114,500 | 2028: $177,000
---
## LabelHead for Artists (LFA) — Canonical Definition
### Core Premise
Unsigned artists don't lack talent. They lack infrastructure. Every artist who breaks
has a team — manager, publicist, release strategist, A&R advisor. That team is
inaccessible before the deal. LFA breaks that loop.
### The Differentiation
An artist using LFA is not improving abstract career metrics. They are building the
Momentum Score that 500 culturally informed competitors use to draft them. This stakes
mechanism cannot be replicated without the competition platform existing first.
Lead with the competition. LFA follows.
### GTM Sequencing (CANONICAL — NEVER REVERSE)
1. Now: Score checker at labelhead.co/score — free, quiet, existing infrastructure
2. Founding Season: Competition is entire public GTM thrust. LFA does not exist publicly.
3. Season 2: LFA launches as named product with subscriptions open.
### Pricing
- LFA Subscription: $299/month (starting tier)
- Artist Portal (user-facing): $12.99/week per portal per subscriber
- Revenue split: 70% artist / 30% Sovereign
- Artists pay nothing to create or maintain a portal
### The 12 Agents (CANONICAL)
All agents act — they do not advise. Outbound actions require artist approval.
| # | Agent | Function |
|---|---|---|
| 01 | Manager | Strategic direction, orchestration of other 11 agents |
| 02 | Publicist | Press pitches, placement tracking |
| 03 | Release Strategist | Optimal release windows from streaming velocity data |
| 04 | DSP Pitch Agent | Editorial playlist consideration submissions |
| 05 | A&R Intelligence Agent | Surfaces accelerating trends before market recognizes them |
| 06 | Booking Coordinator | Support slots, festival submissions, showcases |
| 07 | Social Strategist | Content timing and format recommendations |
| 08 | Sync Licensing Agent | Placement opportunities, licensing inquiries |
| 09 | Analytics Interpreter | Plain-language weekly reports |
| 10 | Brand Partnership Scout | Brand alignment opportunities |
| 11 | Legal Brief Agent | Contract term flags — NOT a lawyer |
| 12 | Cultural Trend Monitor | Cultural moments relevant to artist's audience |
### APPROVED GAP — Publishing Strategy Agent (Agent 13)
Publishing ownership is the single most important financial decision a musician makes.
No current agent addresses it. Should be added as Agent 13 or replace existing agent.
### The Momentum Score as North Star
Every agent decision is guided by one question: does this move the artist's Momentum
Score? The score their agents optimize is the same score 500 competitors use to draft
them. For the first time, an artist's career decisions and the industry's evaluation
of them run on the same data.
---
## GTM Strategy (CANONICAL)
### Option 1 — Primary Target (Joe Budden Podcast + The Breakfast Club)
- Joe Budden Podcast: $75,000 cash + 1.0% Sovereign equity (84,416 shares at $0.77)
- The Breakfast Club: $125,000 cash to iHeart + 0.75% to Charlamagne personally (63,312 shares)
- Combined: $200K cash / 1.75% equity / $17M exit value at 12x ARR
### Option 2 — Secondary Target (Joe & Jada + Drink Champs)
- Joe & Jada: $50K cash + 0.75% equity (Fat Joe and Jadakiss, 0.375% each)
- Drink Champs: $60K cash + 0.75% equity (N.O.R.E. and DJ EFN, 0.375% each)
- Combined: $110K cash / 1.5% equity
### Selection Sunday (CANONICAL)
Both shows go live within the same 2-hour window. Contractually required before
any other deliverable activates. This is the cultural anchor event.
### Key Contractual Deliverables (Top 5)
1. Selection Sunday simulcast participation
2. Weekly in-show Cycle commentary
3. Score reaction content within 72 hours of Cycle results
4. Artist pipeline activation — ask guests about their LabelHead score on air
5. Cross-show rivalry episode minimum 2 per season
---
## Label Intelligence API — Full Architecture
### Stream 7A — A&R and DSP Tier
- Pricing: $500/month standard, $2,500/month enterprise
- Primary B2B product: Momentum Score data (competition-agnostic)
- Launch: Q3 2028
### Stream 7B — Catalog Investor Tier (NEW — v3.0)
For institutional catalog investors (Harbourview, Shamrock, Primary Wave, Tempo,
Reservoir, Hipgnosis/BlackRock, Concord, Round Hill).
**Product Components:**
1. Historical Momentum Index — per-artist longitudinal score across all completed seasons
2. Catalog Cohort Benchmarking — artist vs. peer cohort of similar genre/era/recognition
3. Cultural Durability Rating — composite AAA through D for investment committee legibility
**Critical:** Motion Score is NOT the primary B2B metric. Momentum Score is.
A&R Alpha patterns and Motion Score outcomes enrich the behavioral intelligence layer
but institutional buyers must never conclude artist quality is determined by game mechanics.
**Pricing (annual contracts):**
- Standard: $150,000/year
- Premium: $300,000/year
- Enterprise: $500,000/year
- Blended average: $225,000/year
**Revenue:** 2028: $712,500 | 2029: $1,935,000 | 2030: $3,105,000
**Stream 7 Combined (A + B):**
2028: $792,500 | 2029: $2,220,000 | 2030: $3,789,000
---
## The Data Vision
### Founding Season Data Sources (v1 — Active)
Spotify Web API, Last.fm, YouTube Data API v3, Shazam via RapidAPI,
Apify TikTok Scraper (TIKTOK_SIGNAL_WEIGHT = 0.20 cap),
Soundcharts (social signals), Genius, Ticketmaster, Wikipedia,
60+ tiered media source registry (Cultural Gravity)
### Near-Term (Season 2+) — Approved
Chartmetric API (pending license), Audiomack API (critical for Hip-Hop authenticity),
TikTok sound adoption velocity (most predictive leading indicator)
### Medium-Term
Reddit API, SoundCloud API, Bandsintown API
### Long-Term
BDS/Luminate radio airplay, sync licensing activity, live ticketing velocity,
merchandise sales velocity, press mention sentiment analysis
### Back Catalog Mechanic ✅ APPROVED FOR SEASON 3+
Separate Catalog League track for pre-streaming era artists. Curated draft pool by era.
Note: "Surprise" component in catalog scoring will need to be re-evaluated under the
new A&R Alpha architecture before implementation.
---
## Revenue Stream Vision (Full Stack v3.0)
| Stream | Timing | Notes |
|---|---|---|
| Anchor Sponsorship | Founding Season | Never from raise. Announced only when check clears. |
| Secondary Sponsorships | Season 2 | Non-exclusive category packages |
| Artist Portals | Season 2 | $12.99/week, 70/30 split |
| LFA Subscriptions | Season 2 | $299/month, 12-agent service |
| Analyst Tier | Season 2 | $19.99/month, advanced scoring data |
| Press Correspondents | Season 2 | $99/month |
| Verified Pro Membership | Season 3 | $199/year |
| Label Intelligence API 7B | Q1 2028 | Catalog investor tier |
| Label Intelligence API 7A | Q3 2028 | A&R and DSP tier |
| LFA Label Pack | Season 3 | Indie label roster subscriptions |
| Catalog League | Season 3 | Separate competition revenue |
| Institutional Leagues | Season 4+ | Real labels field official teams |
| LabelHead Live | Season 4+ | Annual event, ticketing, broadcast |
| Brazen content layer | Season 4+ | Organic broadcast consequence at scale |
| Data Archive Licensing | Season 4+ | Historical conviction data |
---
## Platform Architecture
### Typography (CANONICAL — NO EXCEPTIONS)
- Cabinet Grotesk only — sole typeface across the entire platform
- NO monospace fonts anywhere — Geist Mono is permanently retired
- font-variant-numeric: tabular-nums for all live-updating numbers
### Brand Colors (Canonical)
- #0A0A0A — dark background
- #00E5FF — cyan accent (LabelHead)
- #F2F0EB — off-white primary text
- #C8A96A — gold (Sovereign/financial)
- #D4A843 — amber
- #3D3C3A — muted gray flat hex
### API Response Pattern (Scoring)
```
GET /artists/:id/score
  Returns Momentum Score only.
  arAlpha: null, motionScore: null
  Artist-facing context only.
GET /artists/:id/score?context=competition
  Returns all three values populated.
  Competition-facing views only.
```
---
## Sovereign Company Structure
**Sovereign Co.** — Delaware C-Corp holdco
**LabelHead, Inc.** — Competition platform + LFA (primary operating subsidiary)
**Brazen, Inc.** — Content network (Season 4+ activation, NOT seed-funded)
### Brazen Positioning
Brazen is the organic content consequence of running a competition at scale — not a
co-equal seed-funded property. Series A conversation, post-Founding Season.
Marcus's creative domain. The pitch is: one marketplace, two sides — not two companies.
### Seed Raise (CURRENT)
**Amount:** $1,200,000 | **Pre-money:** $6,500,000 | **Post-money:** $7,700,000
**Investor ownership:** 15.6% | **Implied share price:** $0.77 (10M shares)
**Prize pool:** NOT in this raise. Anchor sponsor only.
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
---
## Pending Legal Items
**Motion Score trademark clearance:**
"Motion Score" has prior usage in adjacent contexts — MotionApp uses it for ad
creative analysis, MIT-linked research uses it in influencer video contexts. Neither
constitutes a block in the music competition scoring context. However trademark
clearance must be completed before Motion Score appears in any public-facing materials,
press, or marketing. Currently treated as working canonical name only.
Action required: Trademark clearance search before launch.
---
## Approved Future Features Backlog (v3.0)
| Feature | Season Target | Status | Notes |
|---|---|---|---|
| **Back Catalog / Catalog League** | Season 3 | ✅ Approved | Separate track; A&R Alpha architecture needs evaluation for catalog context |
| **Tiered Roster (Core + Flex)** | Founding Season | ✅ Canonical | 4/1 Invitational, 3/2 Founding Season |
| **The Invitational (Top 50)** | Founding Season | ✅ Canonical | 8-week, 50-person, $100K prize |
| **The Daily (24-hour competition)** | Founding Season | ✅ Canonical | Replaces "Window" — 24-hour cadence, 12-hour pipeline internal only |
| **Daily AM / Daily PM** | Future | 🔵 Reserved | 12-hour high-frequency format — NOT Founding Season |
| **LFA Score Checker** | Live Now | ✅ Live | labelhead.co/score, Momentum Score only |
| **LFA 12-Agent Service** | Season 2 | ✅ Approved | $299/month |
| **Publishing Strategy Agent (13)** | Season 2 | ✅ Approved | Most important LFA gap |
| **Artist Portal Subscriptions** | Season 2 | ✅ Approved | $12.99/week, 70/30 split |
| **Label Intelligence API 7A** | Q3 2028 | ✅ Approved | A&R and DSP tier |
| **Label Intelligence API 7B** | Q1 2028 | ✅ Approved | Catalog investor tier |
| **Cultural Durability Rating (AAA-D)** | Season 3 | ✅ Approved | For catalog investor API |
| **Positional drafting** | Season 2 | ✅ Approved | Emerging/Rising/Established/Legacy/Wildcard |
| **Genre-specific leaderboards** | Season 2 | ✅ Approved | Hip-Hop, R&B, Global tracks |
| **Multi-week roster locks** | Season 2 | ✅ Approved | Higher risk/reward |
| **Audiomack integration** | Season 2 | ✅ Approved | Critical for Hip-Hop authenticity |
| **TikTok sound adoption data** | Season 2 | ✅ Approved | Most predictive leading indicator |
| **Chartmetric API** | Season 2 | ✅ Approved | Pending license |
| **LFA Label Pack** | Season 3 | ✅ Approved | Indie label roster subscriptions |
| **Head-to-head challenge format** | Season 3 | ✅ Approved | Two competitors, one matchup |
| **Draft class system** | Season 3 | ✅ Approved | Annual intake of newly eligible artists |
| **Sync licensing as scoring signal** | Season 3 | ✅ Approved | TV/film placements as latent demand |
| **Institutional Leagues** | Season 4 | ✅ Approved | Real labels field official teams |
| **LabelHead Live** | Season 4 | ✅ Approved | Annual in-person event |
| **Brazen content layer** | Season 4+ | ✅ Approved | Marcus's domain, organic consequence |
| **Radio airplay (BDS)** | Season 3 | 🔵 Exploring | High cost, legacy infrastructure |
| **Live ticketing velocity** | Season 3 | 🔵 Exploring | Pre-sale demand as cultural signal |
| **Motion Score trademark** | Pre-launch | ⚠️ Pending | Legal clearance required |
---
## Decisions Now Resolved (v3.1)
- ✅ Scoring architecture: Three-layer system (Momentum Score, A&R Alpha, Motion Score)
- ✅ "Surprise" retired, replaced by A&R Alpha as competition-layer modifier only
- ✅ Momentum Score: 3 components only (Acceleration, Longevity, Cultural Gravity)
- ✅ Momentum Score weights: Acceleration 0.40 / Longevity 0.25 / Cultural Gravity 0.35
- ✅ Momentum Score formula (Scoring Canon): each raw 0–100 component score is weighted
  and rescaled onto the 0–15 display scale via `raw × weight / 100 × 15`; Direct Beef
  Bonus is applied as a direct, situational point addend on that same 0–15 scale when
  confirmed beef coverage meets the verification threshold — not a fourth component
- ✅ Cultural Gravity = Narrative engine (renamed, calculation preserved)
- ✅ Baseline Outperformance: NOT a standalone component
- ✅ Shared artist draft pool (not exclusive picks — fundamental to A&R Alpha)
- ✅ Artist portals: 70% artist / 30% Sovereign
- ✅ LFA pricing: $299/month agent service; $12.99/week portal
- ✅ Competition format: The Invitational (50) + Founding Season (500)
- ✅ Raise amount: $1,200,000
- ✅ Brazen: Season 4+ organic consequence, not seed-funded
- ✅ Typography: Cabinet Grotesk only, no Geist Mono
- ✅ Motion Score is competition-layer output, NOT primary B2B metric
- ✅ Momentum Score is competition-agnostic, primary B2B metric
- ✅ Label Intelligence API: Stream 7A (A&R/DSP) + Stream 7B (catalog investors)
- ✅ "Window" retired from all competitor-facing surfaces
- ✅ "The Daily" is the canonical 24-hour competition format name
- ✅ Competition cadence: 24-hour Daily results (12-hour data pipeline internal only)
- ✅ Daily AM / Daily PM: reserved for future — NOT implemented in Founding Season
- ✅ Dual engine consolidated: window engine (v5) is sole source of truth
- ✅ compute-scores.js deprecated — window engine absorbs all its responsibilities
- ✅ Historical picks: null ownershipSaturationAtTimeOfPick → 1.0 neutral A&R Alpha fallback
- ✅ New picks: ownershipSaturationAtTimeOfPick written at pick creation time
## Decisions Still Requiring Founder Input
- [ ] Whether A&R Alpha is ever surfaced to artists in simplified form
- [ ] Motion Score trademark clearance confirmation
- [ ] Precise A&R Alpha formula parameters (ownership curve shape, timing decay function, roster concentration cap)
- [ ] Whether Catalog League uses A&R Alpha or a modified version
- [ ] Publishing Strategy Agent: replace existing or add as 13th
- [ ] LFA tier structure above $299/month
- [ ] Selection Sunday broadcast date relative to Founding Season open
---
## How to Update This Document
1. Add approved features to the Approved Future Features Backlog
2. Update relevant sections when core mechanics change
3. Note version and date
4. Do NOT add anything without explicit founder approval
Version 3.1 supersedes all prior versions across all instances. The Scoring Canon
formula reference (raw component weighting + Direct Beef Bonus) was merged into the
SCORE 1 — MOMENTUM SCORE section as part of this revision; it completes, rather than
contradicts, the v3.1 weight ratification already recorded under "Decisions Now Resolved."
