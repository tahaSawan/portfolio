/** Orthogonal (Manhattan) circuit paths — only horizontal / vertical segments. */

export type CircuitPathDef = {
  d: string;
  delayClass?: string;
  reverse?: boolean;
  slow?: boolean;
  /** Corner / junction coordinates for node dots */
  nodes?: readonly (readonly [number, number])[];
};

export const CIRCUIT_VIEWBOX = {
  hero: "0 0 1440 800",
  section: "0 0 1440 640",
  page: "0 0 1440 4200",
} as const;

/** Dense hero overlay — down → across → up/down */
export const CIRCUIT_PATHS_HERO: readonly CircuitPathDef[] = [
  {
    d: "M 100 20 L 100 200 L 340 200 L 340 80 L 580 80 L 580 280",
    delayClass: "circuit-glow__path--1",
    nodes: [
      [100, 200],
      [340, 200],
      [340, 80],
      [580, 80],
      [580, 280],
    ],
  },
  {
    d: "M 1340 60 L 1340 240 L 1100 240 L 1100 100 L 860 100 L 860 320",
    delayClass: "circuit-glow__path--2",
    reverse: true,
    nodes: [
      [1340, 240],
      [1100, 240],
      [1100, 100],
      [860, 100],
      [860, 320],
    ],
  },
  {
    d: "M 40 420 L 40 300 L 260 300 L 260 480 L 480 480 L 480 360",
    delayClass: "circuit-glow__path--3",
    nodes: [
      [40, 300],
      [260, 300],
      [260, 480],
      [480, 480],
    ],
  },
  {
    d: "M 1400 520 L 1400 640 L 1180 640 L 1180 460 L 960 460 L 960 600 L 740 600",
    delayClass: "circuit-glow__path--4",
    reverse: true,
    slow: true,
    nodes: [
      [1400, 640],
      [1180, 640],
      [1180, 460],
      [960, 460],
      [960, 600],
    ],
  },
  {
    d: "M 720 40 L 720 160 L 920 160 L 920 40",
    delayClass: "circuit-glow__path--5",
    nodes: [
      [720, 160],
      [920, 160],
    ],
  },
  {
    d: "M 620 680 L 620 540 L 860 540 L 860 720 L 1100 720 L 1100 580",
    delayClass: "circuit-glow__path--6",
    reverse: true,
    nodes: [
      [620, 540],
      [860, 540],
      [860, 720],
      [1100, 720],
    ],
  },
  {
    d: "M 200 600 L 200 720 L 420 720",
    delayClass: "circuit-glow__path--2",
    slow: true,
    nodes: [
      [200, 720],
      [420, 720],
    ],
  },
  {
    d: "M 1280 380 L 1280 260 L 1060 260",
    delayClass: "circuit-glow__path--5",
    reverse: true,
    nodes: [
      [1280, 260],
      [1060, 260],
    ],
  },
];

/** Full-page backdrop — repeated circuit bands down the scroll height */
export const CIRCUIT_PATHS_PAGE: readonly CircuitPathDef[] = [
  {
    d: "M 80 120 L 80 320 L 300 320 L 300 180 L 520 180 L 520 400",
    delayClass: "circuit-glow__path--1",
    nodes: [
      [80, 320],
      [300, 320],
      [520, 180],
    ],
  },
  {
    d: "M 1360 200 L 1360 400 L 1140 400 L 1140 240 L 920 240 L 920 460",
    delayClass: "circuit-glow__path--2",
    reverse: true,
    nodes: [
      [1360, 400],
      [1140, 400],
      [920, 240],
    ],
  },
  {
    d: "M 200 900 L 200 720 L 420 720 L 420 920 L 640 920",
    delayClass: "circuit-glow__path--3",
    nodes: [
      [200, 720],
      [420, 720],
      [420, 920],
    ],
  },
  {
    d: "M 1240 1000 L 1240 1180 L 1020 1180 L 1020 980 L 800 980 L 800 1200",
    delayClass: "circuit-glow__path--4",
    reverse: true,
    slow: true,
    nodes: [
      [1240, 1180],
      [1020, 1180],
      [800, 980],
    ],
  },
  {
    d: "M 60 1500 L 60 1700 L 280 1700 L 280 1540 L 500 1540 L 500 1760",
    delayClass: "circuit-glow__path--5",
    nodes: [
      [60, 1700],
      [280, 1700],
      [500, 1540],
    ],
  },
  {
    d: "M 1380 1650 L 1380 1850 L 1160 1850 L 1160 1690 L 940 1690",
    delayClass: "circuit-glow__path--6",
    reverse: true,
    nodes: [
      [1380, 1850],
      [1160, 1850],
      [940, 1690],
    ],
  },
  {
    d: "M 700 2100 L 700 2280 L 920 2280 L 920 2120 L 1140 2120 L 1140 2340",
    delayClass: "circuit-glow__path--1",
    slow: true,
    nodes: [
      [700, 2280],
      [920, 2280],
      [1140, 2120],
    ],
  },
  {
    d: "M 360 2600 L 360 2420 L 580 2420 L 580 2620 L 800 2620",
    delayClass: "circuit-glow__path--3",
    reverse: true,
    nodes: [
      [360, 2420],
      [580, 2420],
      [580, 2620],
    ],
  },
  {
    d: "M 1200 2900 L 1200 3080 L 980 3080 L 980 2920 L 760 2920 L 760 3140",
    delayClass: "circuit-glow__path--4",
    nodes: [
      [1200, 3080],
      [980, 3080],
      [760, 2920],
    ],
  },
  {
    d: "M 140 3400 L 140 3580 L 360 3580 L 360 3420 L 580 3420 L 580 3640",
    delayClass: "circuit-glow__path--5",
    slow: true,
    nodes: [
      [140, 3580],
      [360, 3580],
      [580, 3420],
    ],
  },
  {
    d: "M 1300 3500 L 1300 3680 L 1080 3680 L 1080 3520 L 860 3520",
    delayClass: "circuit-glow__path--6",
    reverse: true,
    nodes: [
      [1300, 3680],
      [1080, 3680],
      [860, 3520],
    ],
  },
];

export const CIRCUIT_PATHS_SECTION_A: readonly CircuitPathDef[] = [
  {
    d: "M 60 40 L 60 200 L 280 200 L 280 80 L 480 80",
    delayClass: "circuit-glow__path--1",
    nodes: [
      [60, 200],
      [280, 200],
    ],
  },
  {
    d: "M 1380 120 L 1380 280 L 1160 280 L 1160 160",
    delayClass: "circuit-glow__path--3",
    reverse: true,
    nodes: [
      [1380, 280],
      [1160, 280],
    ],
  },
  {
    d: "M 120 480 L 120 360 L 340 360 L 340 520 L 560 520",
    delayClass: "circuit-glow__path--5",
    nodes: [
      [120, 360],
      [340, 360],
      [340, 520],
    ],
  },
];

export const CIRCUIT_PATHS_SECTION_B: readonly CircuitPathDef[] = [
  {
    d: "M 1320 60 L 1320 220 L 1100 220 L 1100 100 L 900 100 L 900 260",
    delayClass: "circuit-glow__path--2",
    reverse: true,
    nodes: [
      [1320, 220],
      [1100, 220],
      [900, 100],
    ],
  },
  {
    d: "M 100 300 L 100 440 L 320 440 L 320 320",
    delayClass: "circuit-glow__path--4",
    nodes: [
      [100, 440],
      [320, 440],
    ],
  },
  {
    d: "M 1280 500 L 1280 620 L 1060 620 L 1060 480 L 840 480",
    delayClass: "circuit-glow__path--6",
    reverse: true,
    slow: true,
    nodes: [
      [1280, 620],
      [1060, 620],
    ],
  },
];

export type CircuitPathSetKey =
  | "hero"
  | "page"
  | "section-a"
  | "section-b";

export function getCircuitPaths(key: CircuitPathSetKey): readonly CircuitPathDef[] {
  switch (key) {
    case "hero":
      return CIRCUIT_PATHS_HERO;
    case "page":
      return CIRCUIT_PATHS_PAGE;
    case "section-a":
      return CIRCUIT_PATHS_SECTION_A;
    case "section-b":
      return CIRCUIT_PATHS_SECTION_B;
  }
}
