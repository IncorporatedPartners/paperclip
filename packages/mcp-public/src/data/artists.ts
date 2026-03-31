export interface ArtistScore {
  id: string;
  name: string;
  genre: string;
  subgenre: string;
  acceleration: number; // 0–100: velocity of streaming/social growth over 30d
  surprise: number;     // 0–100: deviation from expected trajectory
  longevity: number;    // 0–100: catalog depth and audience retention
  culturalGravity: number; // 0–100: press velocity, playlist adds, sync placements
  composite: number;    // weighted composite
  momentum_label: "Rising" | "Steady" | "Cooling" | "Breakout";
  notable_signals: string[];
  last_updated: string;
}

// Seed data: 10 hip-hop/rap artists with measurable momentum, March 2026
export const ARTISTS: ArtistScore[] = [
  {
    id: "doechii",
    name: "Doechii",
    genre: "Hip-Hop/Rap",
    subgenre: "Rap",
    acceleration: 94,
    surprise: 88,
    longevity: 72,
    culturalGravity: 96,
    composite: 89,
    momentum_label: "Breakout",
    notable_signals: [
      "Best Rap Album Grammy win (2025)",
      "Alligator Bites Never Heal catalog streaming up 340% post-Grammy",
      "Debut headline tour sold out across 28 North American dates",
      "12 editorial playlist adds in 30 days",
    ],
    last_updated: "2026-03-01",
  },
  {
    id: "kendrick-lamar",
    name: "Kendrick Lamar",
    genre: "Hip-Hop/Rap",
    subgenre: "Rap",
    acceleration: 82,
    surprise: 60,
    longevity: 99,
    culturalGravity: 98,
    composite: 86,
    momentum_label: "Steady",
    notable_signals: [
      "GNX catalog maintaining elevated streaming 4 months post-release",
      "Super Bowl LVIX halftime cultural discussion sustaining press cycle",
      "Not Like Us certified 4x Platinum",
    ],
    last_updated: "2026-03-01",
  },
  {
    id: "glorilla",
    name: "GloRilla",
    genre: "Hip-Hop/Rap",
    subgenre: "Memphis Rap",
    acceleration: 76,
    surprise: 71,
    longevity: 68,
    culturalGravity: 79,
    composite: 74,
    momentum_label: "Rising",
    notable_signals: [
      "Glorious debut album shipping strong first-week numbers",
      "Headlining slot secured at three major summer festivals",
      "TikTok sound usage up 220% over prior 60 days",
    ],
    last_updated: "2026-03-01",
  },
  {
    id: "jid",
    name: "JID",
    genre: "Hip-Hop/Rap",
    subgenre: "Conscious Rap",
    acceleration: 67,
    surprise: 58,
    longevity: 86,
    culturalGravity: 74,
    composite: 71,
    momentum_label: "Steady",
    notable_signals: [
      "Consistent critical press on new single cycle",
      "Dreamville label synergy maintaining album anticipation",
      "High Spotify Save Rate (37%) on latest drop",
    ],
    last_updated: "2026-03-01",
  },
  {
    id: "ice-spice",
    name: "Ice Spice",
    genre: "Hip-Hop/Rap",
    subgenre: "Drill",
    acceleration: 71,
    surprise: 64,
    longevity: 59,
    culturalGravity: 77,
    composite: 68,
    momentum_label: "Rising",
    notable_signals: [
      "Y2K! album second-era rollout generating press attention",
      "Brand partnership announcements expanding mainstream reach",
      "Radio crossover pick-up accelerating on current single",
    ],
    last_updated: "2026-03-01",
  },
  {
    id: "tyler-the-creator",
    name: "Tyler, the Creator",
    genre: "Hip-Hop/Rap",
    subgenre: "Alternative Rap",
    acceleration: 73,
    surprise: 55,
    longevity: 95,
    culturalGravity: 90,
    composite: 77,
    momentum_label: "Rising",
    notable_signals: [
      "Camp Flog Gnaw 2026 announced with record presale velocity",
      "New album rollout signals in motion",
      "Catalog deep-cuts resurging via algorithm placements",
    ],
    last_updated: "2026-03-01",
  },
  {
    id: "sexyy-red",
    name: "Sexyy Red",
    genre: "Hip-Hop/Rap",
    subgenre: "St. Louis Rap",
    acceleration: 62,
    surprise: 59,
    longevity: 56,
    culturalGravity: 68,
    composite: 62,
    momentum_label: "Steady",
    notable_signals: [
      "Consistent chart presence maintaining streaming floor",
      "Feature market highly active (8 credited features in 90 days)",
      "Audience retention strong in 18–24 demographic",
    ],
    last_updated: "2026-03-01",
  },
  {
    id: "rapsody",
    name: "Rapsody",
    genre: "Hip-Hop/Rap",
    subgenre: "Conscious Rap",
    acceleration: 58,
    surprise: 74,
    longevity: 88,
    culturalGravity: 72,
    composite: 69,
    momentum_label: "Rising",
    notable_signals: [
      "Unexpected top-10 streaming week following key media placement",
      "Critical press momentum above 2-year average",
      "Collaboration activity signaling new project",
    ],
    last_updated: "2026-03-01",
  },
  {
    id: "latto",
    name: "Latto",
    genre: "Hip-Hop/Rap",
    subgenre: "Trap",
    acceleration: 64,
    surprise: 52,
    longevity: 66,
    culturalGravity: 70,
    composite: 63,
    momentum_label: "Steady",
    notable_signals: [
      "Sustained radio rotation on current single",
      "Upcoming tour dates generating ticket demand",
      "Crossover pop audience expanding",
    ],
    last_updated: "2026-03-01",
  },
  {
    id: "flo-milli",
    name: "Flo Milli",
    genre: "Hip-Hop/Rap",
    subgenre: "Trap",
    acceleration: 79,
    surprise: 83,
    longevity: 60,
    culturalGravity: 75,
    composite: 74,
    momentum_label: "Breakout",
    notable_signals: [
      "Viral resurgence: single streaming up 190% over 14 days",
      "Sync placement in major streaming platform ad campaign",
      "Return from hiatus generating outsized press attention",
    ],
    last_updated: "2026-03-01",
  },
];

export function getTrendingArtists(limit = 10): ArtistScore[] {
  return [...ARTISTS]
    .sort((a, b) => b.composite - a.composite)
    .slice(0, Math.min(limit, ARTISTS.length));
}

export function getArtistById(id: string): ArtistScore | undefined {
  return ARTISTS.find(
    (a) => a.id === id || a.name.toLowerCase().replace(/[^a-z0-9]/g, "-") === id.toLowerCase(),
  );
}
