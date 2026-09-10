export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; lang: string; code: string }
  | { type: "quote"; text: string };

export type Article = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  /** Short label used in article metadata. */
  topic: string;
  body: ArticleBlock[];
};

export const articles: Article[] = [
  {
    slug: "rendering-a-million-spans",
    title: "Rendering a million spans without dropping a frame",
    date: "2025-06-18",
    topic: "Performance",
    excerpt:
      "A trace viewer has to draw more rectangles than the DOM will ever tolerate. Here is the architecture I landed on after three rewrites, and the measurements that decided each one.",
    body: [
      {
        type: "p",
        text: "A distributed trace for a single request can contain thousands of spans. A trace for a slow batch job can contain a million. The first version of our viewer rendered each span as an absolutely positioned `div`, which worked beautifully in the demo and fell over the first time a real customer opened a real trace.",
      },
      {
        type: "p",
        text: "This is the write-up I wish I had found when I started: what actually costs time, what does not, and the shape of the solution that finally held.",
      },
      { type: "h2", text: "Measure before you rewrite" },
      {
        type: "p",
        text: "The instinct is to reach for canvas immediately. Resist it for an afternoon. I spent one recording the profile of the naive implementation, and the results reordered the whole plan.",
      },
      {
        type: "ul",
        items: [
          "**Layout** was 71% of frame time. Not paint, not script — layout. Every span was participating in the same containing block.",
          "**Style recalculation** was another 14%, driven by a hover rule that matched a descendant selector.",
          "Actual JavaScript, the part I assumed was the problem, was under 8%.",
        ],
      },
      {
        type: "p",
        text: "That profile told me the DOM itself was not the enemy. The enemy was asking the DOM to lay out a million elements in one pass. Any approach that removes elements from layout — virtualisation, containment, or canvas — would help. The question was which one degraded most gracefully.",
      },
      { type: "h2", text: "Three layers, three different tools" },
      {
        type: "p",
        text: "The version in production splits the timeline into three layers, and each one uses the cheapest technology that can do its job.",
      },
      { type: "h3", text: "The span layer is canvas" },
      {
        type: "p",
        text: "Spans are rectangles with a fill and, at sufficient width, a label. That is exactly what a 2D canvas is good at. We draw only the spans intersecting the current viewport, computed from a flat typed array rather than an object graph.",
      },
      {
        type: "code",
        lang: "ts",
        code: `// Spans live in parallel typed arrays: no per-span objects, no GC pressure.
type SpanBuffer = {
  start: Float64Array;
  duration: Float64Array;
  depth: Uint16Array;
  colorIndex: Uint8Array;
};

function drawViewport(
  ctx: CanvasRenderingContext2D,
  spans: SpanBuffer,
  view: { from: number; to: number; rowHeight: number },
) {
  const scale = ctx.canvas.width / (view.to - view.from);
  for (let i = 0; i < spans.start.length; i++) {
    const end = spans.start[i] + spans.duration[i];
    if (end < view.from || spans.start[i] > view.to) continue;

    const x = (spans.start[i] - view.from) * scale;
    const width = Math.max(1, spans.duration[i] * scale);
    ctx.fillStyle = PALETTE[spans.colorIndex[i]];
    ctx.fillRect(x, spans.depth[i] * view.rowHeight, width, view.rowHeight - 1);
  }
}`,
      },
      {
        type: "p",
        text: "The `Math.max(1, ...)` matters more than it looks. Sub-pixel rectangles disappear entirely at some zoom levels, and a span that vanishes reads as a bug in the tracing agent rather than a rounding artefact in the renderer.",
      },
      { type: "h3", text: "The interaction layer is one element" },
      {
        type: "p",
        text: "Canvas has no hit testing, so people usually rebuild it with a quadtree. For a timeline you do not need one: rows are uniform in height and spans within a row are sorted by start time. A pointer position becomes a row index by division and a span index by binary search. Both are constant work regardless of trace size.",
      },
      {
        type: "code",
        lang: "ts",
        code: `function spanAt(x: number, y: number, view: View): number | null {
  const row = Math.floor(y / view.rowHeight);
  const range = rowIndex[row];
  if (!range) return null;

  const time = view.from + x / view.scale;
  let lo = range.start;
  let hi = range.end;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (spans.start[mid] > time) hi = mid - 1;
    else if (spans.start[mid] + spans.duration[mid] < time) lo = mid + 1;
    else return mid;
  }
  return null;
}`,
      },
      { type: "h3", text: "The chrome layer stays in the DOM" },
      {
        type: "p",
        text: "Tooltips, the selected-span outline, context menus, and the ruler are ordinary React components. There are never more than a handful of them on screen, they need real focus management, and reimplementing accessible menus on a canvas is a bad trade nobody thanks you for.",
      },
      { type: "h2", text: "What I would do differently" },
      {
        type: "ol",
        items: [
          "Build the typed-array data model first. Converting from an object graph later touched every file in the module.",
          "Put the zoom transform in one place. I had three implementations of the same time-to-pixel conversion before I noticed they disagreed at the edges.",
          "Test with a pathological trace from day one — a million spans, all one microsecond long, all at depth 40. Every bug I shipped was visible in that fixture.",
        ],
      },
      {
        type: "quote",
        text: "The fastest render is the one you skip, and the second fastest is the one that never enters layout.",
      },
      {
        type: "p",
        text: "The finished viewer holds 60fps on a four-year-old laptop with a million spans loaded. None of that came from a clever algorithm. It came from reading a profile honestly and then choosing the least interesting tool that fit each layer.",
      },
    ],
  },
  {
    slug: "design-tokens-that-survive-a-redesign",
    title: "Design tokens that survive a redesign",
    date: "2025-04-02",
    topic: "Design systems",
    excerpt:
      "Most token systems break the first time the brand changes. The fix is not more tokens — it is being strict about which layer a name belongs to.",
    body: [
      {
        type: "p",
        text: "A design system I worked on had 340 tokens and a rename every sprint. The next one had 61 and survived a full rebrand without a single component change. The difference was not discipline about quantity. It was discipline about layers.",
      },
      { type: "h2", text: "Three layers, and never skip one" },
      {
        type: "p",
        text: "Every token belongs to exactly one of three layers, and each layer may only reference the layer beneath it.",
      },
      {
        type: "ol",
        items: [
          "**Primitives** are raw values with no opinion: `neutral-100`, `blue-600`, `space-4`. They never appear in a component.",
          "**Semantic tokens** describe a role in the interface: `surface-raised`, `text-secondary`, `border-subtle`. Components only ever reference these.",
          "**Component tokens** exist only when a component genuinely needs a value nothing else shares: `button-primary-bg-hover`. Most components need none.",
        ],
      },
      {
        type: "code",
        lang: "css",
        code: `/* Layer 1 — primitives. Change rarely, mean nothing on their own. */
--neutral-0:   #ffffff;
--neutral-100: #f5f5f5;
--neutral-900: #171717;

/* Layer 2 — semantics. This is the whole public API. */
--surface-page:    var(--neutral-100);
--surface-raised:  var(--neutral-0);
--text-primary:    var(--neutral-900);

/* Layer 3 — only when a component is genuinely special. */
--code-block-bg: var(--neutral-100);`,
      },
      {
        type: "p",
        text: "The rule that pays for itself: **a component may not reference a primitive.** If a component needs `neutral-300` and no semantic token means that, you have found a gap in the semantic layer. Fill it, name it by role, and move on.",
      },
      { type: "h2", text: "Name by role, not by appearance" },
      {
        type: "p",
        text: "`--border-light` is a description of a colour. `--border-subtle` is a description of a job. In dark mode the first one is a lie and the second one is still true. Every token whose name describes how it looks will need renaming the moment the theme changes, and renames are how systems accumulate aliases nobody dares delete.",
      },
      {
        type: "ul",
        items: [
          "Good: `text-secondary`, `surface-sunken`, `border-focus`, `space-section`.",
          "Bad: `grey-text`, `light-bg`, `blue-border`, `space-24`.",
        ],
      },
      { type: "h2", text: "Theming is a swap, not a fork" },
      {
        type: "p",
        text: "If the layering holds, dark mode is a redefinition of layer two and nothing else. No component branches on theme, no utility carries a `dark:` variant for colour, and adding a third theme costs one file.",
      },
      {
        type: "code",
        lang: "css",
        code: `:root {
  --surface-page:   var(--neutral-100);
  --surface-raised: var(--neutral-0);
  --text-primary:   var(--neutral-900);
}

.dark {
  --surface-page:   var(--neutral-950);
  --surface-raised: var(--neutral-900);
  --text-primary:   var(--neutral-50);
}`,
      },
      {
        type: "p",
        text: "When I audited the failing system, 60% of its dark-mode bugs were components reaching past the semantic layer to a primitive. They were not careless — the semantic layer simply had no token for what they needed, so they improvised.",
      },
      { type: "h2", text: "The test that catches drift" },
      {
        type: "p",
        text: "One lint rule does more for a token system than any amount of documentation: fail the build if a file under `components/` contains a primitive token name. It is crude, it has false positives twice a year, and it has kept the semantic layer honest for two years running.",
      },
      {
        type: "quote",
        text: "A token system does not fail because it has too few names. It fails because two names mean the same thing and nobody remembers which one is current.",
      },
    ],
  },
  {
    slug: "the-case-against-your-virtualised-table",
    title: "The case against your virtualised table",
    date: "2025-01-27",
    topic: "Performance",
    excerpt:
      "Virtualisation is the default answer for long lists, and for a surprising number of real tables it makes things slower, buggier, and harder to search.",
    body: [
      {
        type: "p",
        text: "I have removed virtualisation from three production tables and measured an improvement every time. This is not an argument that virtualisation is wrong. It is an argument that it is applied reflexively at sizes where it costs more than it saves.",
      },
      { type: "h2", text: "What virtualisation actually costs" },
      {
        type: "ul",
        items: [
          "**Find-in-page stops working.** Rows outside the window do not exist in the DOM, so the browser cannot find them. For a table of invoices, that is the primary interaction.",
          "**Scroll anchoring gets harder.** Restoring position after a data update means storing an index and a pixel offset, and getting it wrong shows up as a jump.",
          "**Row heights must be known or measured.** Variable heights mean a measurement pass, which reintroduces the layout cost you were avoiding.",
          "**Accessibility gets fragile.** `aria-rowcount` and `aria-rowindex` have to be maintained by hand, and most implementations quietly do not.",
        ],
      },
      { type: "h2", text: "Where the crossover actually is" },
      {
        type: "p",
        text: "I benchmarked a plain table against a virtualised one on a mid-range laptop, six columns, plain text cells, no nested components.",
      },
      {
        type: "ul",
        items: [
          "**500 rows:** plain table renders in 34ms. Virtualised renders in 11ms plus 6ms of measurement, and scrolls with occasional blank frames.",
          "**2,000 rows:** plain 121ms, virtualised 12ms. Still fine either way for a view the user opens once.",
          "**10,000 rows:** plain 640ms and visible jank on filter. Virtualisation wins clearly.",
        ],
      },
      {
        type: "p",
        text: "Somewhere between two and five thousand rows, the trade flips. Below it, you are paying real usability costs for a difference nobody perceives on a view that renders once and is then scrolled.",
      },
      { type: "h2", text: "Cheaper things to try first" },
      {
        type: "h3",
        text: "CSS containment",
      },
      {
        type: "p",
        text: "`content-visibility: auto` gets you most of the benefit with none of the complexity. The browser skips rendering work for off-screen rows while keeping them in the accessibility tree and findable by the browser's own search.",
      },
      {
        type: "code",
        lang: "css",
        code: `tbody tr {
  content-visibility: auto;
  /* Without this the scrollbar jumps as rows are realised. */
  contain-intrinsic-size: auto 44px;
}`,
      },
      { type: "h3", text: "Stop re-rendering the whole body" },
      {
        type: "p",
        text: "In two of my three cases the table was not slow because of row count. It was slow because a context value changed identity on every keystroke in the filter box, re-rendering 2,000 memoised rows that all returned identical output. The profiler said `render`, and I had assumed it meant the DOM.",
      },
      { type: "h3", text: "Paginate, if the data is paginated anyway" },
      {
        type: "p",
        text: "If the server returns 50 rows at a time, an infinite virtual list is emulating a dataset you do not have. A page control is less code, restores from a URL, and prints correctly.",
      },
      { type: "h2", text: "When to virtualise anyway" },
      {
        type: "p",
        text: "Log viewers, trace timelines, spreadsheets, and anything where the user genuinely scrolls through tens of thousands of rows in one session. In those cases virtualise deliberately — and budget the week it takes to get keyboard navigation, scroll restoration, and search right, because that week is not optional.",
      },
      {
        type: "quote",
        text: "Reach for virtualisation when you have measured the row count, not when you have imagined it.",
      },
    ],
  },
  {
    slug: "optimistic-ui-honestly",
    title: "Optimistic UI, honestly",
    date: "2024-11-12",
    topic: "Interaction",
    excerpt:
      "Optimistic updates make an interface feel instant until the moment they lie to someone. The difference is entirely in how you handle the unhappy path.",
    body: [
      {
        type: "p",
        text: "Optimistic UI is the practice of showing the result of an action before the server has confirmed it. Done well, it removes every spinner from a product. Done carelessly, it tells a user their payment succeeded when it did not.",
      },
      { type: "h2", text: "The test for whether an action qualifies" },
      {
        type: "p",
        text: "Before making an action optimistic, answer three questions. If any answer is uncomfortable, keep the pending state.",
      },
      {
        type: "ol",
        items: [
          "**How likely is failure?** Toggling a bookmark fails almost never. Reserving inventory fails routinely.",
          "**How bad is a wrong impression?** A star that un-stars itself is mildly annoying. A confirmed transfer that reverses is a support call and a trust problem.",
          "**Can the user recover?** If the correction is visible and the action is repeatable, optimism is cheap. If the user has already navigated away or told a colleague, it is not.",
        ],
      },
      { type: "h2", text: "Rollback is the whole feature" },
      {
        type: "p",
        text: "Most implementations spend their code on applying the optimistic state and treat rollback as an afterthought. It is the reverse: applying is trivial, and every hard bug lives in reconciliation.",
      },
      {
        type: "code",
        lang: "ts",
        code: `type Mutation<T> = {
  id: string;
  apply: (state: T) => T;
  /** Captured before apply so rollback restores exactly what was there. */
  snapshot?: T;
};

function commit<T>(state: T, pending: Mutation<T>[], server: T): T {
  // Replay unconfirmed mutations on top of authoritative server state
  // instead of reverting to a snapshot that may now be stale.
  return pending.reduce((acc, mutation) => mutation.apply(acc), server);
}`,
      },
      {
        type: "p",
        text: "The important detail is that rollback does not restore the snapshot. It replays the still-pending mutations on top of the newest server state. Restoring a snapshot discards any change that arrived in between, which is exactly the class of bug that shows up only under real network conditions and is nearly impossible to reproduce locally.",
      },
      { type: "h2", text: "Failure needs a place to land" },
      {
        type: "p",
        text: "A toast that says **Something went wrong** and disappears in four seconds is not error handling. The user acted on a specific row, and that is where the failure belongs.",
      },
      {
        type: "ul",
        items: [
          "Return the affected item to its previous state, visibly rather than instantly.",
          "Mark that item with an inline, persistent message naming what failed.",
          "Offer retry on the item itself, so the user does not have to reconstruct what they were doing.",
          "Never move focus away from where the user was working.",
        ],
      },
      { type: "h2", text: "Idempotency, or you will double-charge someone" },
      {
        type: "p",
        text: "Optimistic UI encourages retries, and retries without idempotency keys duplicate work. Generate the key on the client at the moment of the user's action — not per request attempt — and let the server collapse duplicates.",
      },
      {
        type: "code",
        lang: "ts",
        code: `// One key per user intent, reused across every retry of that intent.
const intentKey = crypto.randomUUID();

await fetch("/api/transfers", {
  method: "POST",
  headers: { "Idempotency-Key": intentKey },
  body: JSON.stringify(transfer),
});`,
      },
      {
        type: "quote",
        text: "Optimism is a promise about latency, not about outcome. Break the second one and nobody believes the first one again.",
      },
    ],
  },
  {
    slug: "type-safe-route-boundaries",
    title: "Type-safe route boundaries in the App Router",
    date: "2024-08-19",
    topic: "TypeScript",
    excerpt:
      "Route params arrive as strings and search params arrive as anything at all. A thin parsing layer at the boundary removes an entire category of runtime surprise.",
    body: [
      {
        type: "p",
        text: "The App Router hands you `params` and `searchParams` typed loosely, because that is the honest type — a URL can contain anything. The mistake is letting that looseness travel inward. Parse once at the route boundary and the rest of the module can be strict.",
      },
      { type: "h2", text: "The shape of the problem" },
      {
        type: "p",
        text: "A page for `/reports/[id]` with `?range=30d&view=table` receives `id` as a string that may not be a valid identifier, `range` as a string that may be anything, and `view` as a string, an array of strings, or undefined, depending on how many times the key appears in the query.",
      },
      {
        type: "code",
        lang: "ts",
        code: `// What you actually receive.
type SearchParams = Record<string, string | string[] | undefined>;

// What the rest of your code wants.
type ReportView = {
  id: string;
  range: "7d" | "30d" | "90d";
  view: "table" | "chart";
};`,
      },
      { type: "h2", text: "A parser, not a cast" },
      {
        type: "p",
        text: "You do not need a validation library for this. A handful of small functions covers most routes, and they compose into something readable.",
      },
      {
        type: "code",
        lang: "ts",
        code: `function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function oneOf<T extends string>(
  value: string | string[] | undefined,
  allowed: readonly T[],
  fallback: T,
): T {
  const candidate = first(value);
  return allowed.includes(candidate as T) ? (candidate as T) : fallback;
}

export function parseReportView(
  params: { id: string },
  search: SearchParams,
): ReportView {
  return {
    id: params.id,
    range: oneOf(search.range, ["7d", "30d", "90d"] as const, "30d"),
    view: oneOf(search.view, ["table", "chart"] as const, "table"),
  };
}`,
      },
      {
        type: "p",
        text: "Note what this does with bad input: it falls back rather than throwing. For a query parameter that is almost always right — a stale bookmark, a truncated link in an email — silently correcting to the default is better behaviour than an error page. Reserve `notFound()` for the path segment, where a wrong value genuinely means the resource does not exist.",
      },
      { type: "h2", text: "Static generation still needs the same types" },
      {
        type: "p",
        text: "When a route is statically generated, `generateStaticParams` and the page component must agree about the param shape. Deriving both from one source keeps them from drifting apart during a refactor.",
      },
      {
        type: "code",
        lang: "ts",
        code: `export function generateStaticParams(): { slug: string }[] {
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((entry) => entry.slug === slug);
  if (!article) notFound();
  return <ArticleView article={article} />;
}`,
      },
      { type: "h2", text: "Where this pays off" },
      {
        type: "ul",
        items: [
          "Every function below the boundary takes a precise type, so autocomplete works and impossible states stop appearing in props.",
          "Bad URLs degrade to sensible defaults instead of rendering an interface in an undefined state.",
          "Changing an allowed value is one edit, and the compiler lists every place that has to change with it.",
        ],
      },
      {
        type: "quote",
        text: "Types at the edge of the system are documentation. Types in the middle of the system are just confidence.",
      },
    ],
  },
  {
    slug: "what-blur-to-focus-costs",
    title: "What blur-to-focus animation actually costs",
    date: "2024-05-06",
    topic: "Motion",
    excerpt:
      "Animating a CSS filter looks effortless and is one of the most expensive things you can ask a compositor to do. Here is how to keep the effect and pay less for it.",
    body: [
      {
        type: "p",
        text: "The blur-to-focus reveal — content arriving slightly out of focus and settling — is everywhere right now, including on this site. It is also the single most expensive entrance animation in common use, and most implementations make it worse than it needs to be.",
      },
      { type: "h2", text: "Why blur is different" },
      {
        type: "p",
        text: "`opacity` and `transform` are handled entirely by the compositor. The element is already rasterised; the GPU reuses that texture. `filter: blur()` is not that. Every distinct blur radius requires a fresh rasterisation and a multi-pass convolution over the element's texture — and you are asking for a new radius on every frame.",
      },
      {
        type: "ul",
        items: [
          "Cost scales with **element area**, not complexity. A blurred full-width hero costs far more than a blurred badge.",
          "Cost scales with **radius**. Going from 10px to 20px more than doubles the work.",
          "A blurred element **cannot share a composited layer** with its siblings, so a staggered group of twelve creates twelve layers.",
        ],
      },
      { type: "h2", text: "Four rules that keep it cheap" },
      { type: "h3", text: "Keep the radius small and the distance short" },
      {
        type: "p",
        text: "10px of blur over 600ms reads as focus settling. 24px reads as a lens effect and costs three times as much. Pair it with a 10px translate, not 40px — the blur already carries the sense of motion, so the transform only needs to hint at direction.",
      },
      { type: "h3", text: "Animate once, then remove the filter entirely" },
      {
        type: "p",
        text: "A finished animation that leaves `filter: blur(0px)` on the element keeps it on its own layer for the rest of the session. Clear the property at the end so the element rejoins the normal paint path.",
      },
      {
        type: "code",
        lang: "ts",
        code: `<motion.div
  initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
  whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
  onAnimationComplete={() => {
    // Drop the filter so the element stops needing its own layer.
    ref.current?.style.removeProperty("filter");
  }}
/>`,
      },
      { type: "h3", text: "Blur the group, not every child" },
      {
        type: "p",
        text: "A stagger of twelve cards where each card animates its own filter creates twelve simultaneous convolutions. Blurring the container once and staggering only opacity and transform on the children looks nearly identical and costs a fraction as much.",
      },
      { type: "h3", text: "Never blur below the fold on load" },
      {
        type: "p",
        text: "Entrance animations that fire on page load compete directly with hydration and image decoding for main-thread time. Trigger on viewport entry so the work is spread across the scroll rather than concentrated at the worst possible moment.",
      },
      { type: "h2", text: "Respect the setting" },
      {
        type: "p",
        text: "Blur-to-focus is exactly the effect that causes trouble for people with vestibular sensitivity or low vision. `prefers-reduced-motion` is not a nice-to-have here; content briefly rendered illegibly is an accessibility failure, not a stylistic choice.",
      },
      {
        type: "code",
        lang: "ts",
        code: `const reduced = useReducedMotion();

<motion.div
  initial={reduced ? false : { opacity: 0, filter: "blur(10px)", y: 10 }}
  whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
/>;`,
      },
      {
        type: "quote",
        text: "If the animation is doing the work of the design, the design is not finished yet.",
      },
    ],
  },
  {
    slug: "reading-the-waterfall",
    title: "Reading the waterfall before you optimise",
    date: "2024-02-14",
    topic: "Performance",
    excerpt:
      "Most front-end performance work starts with a guess. Twenty minutes with a network waterfall usually replaces a week of guessing with one afternoon of fixing.",
    body: [
      {
        type: "p",
        text: "Every performance engagement I have joined started the same way: a list of proposed optimisations, none of them measured. Bundle splitting, image formats, a CDN move. Sometimes one of them is the answer. Usually the answer is sitting in the waterfall, visible in the first screenshot.",
      },
      { type: "h2", text: "Four shapes worth recognising" },
      { type: "h3", text: "The staircase" },
      {
        type: "p",
        text: "Requests descend one after another, each starting as the previous finishes. This is a dependency chain: HTML requests a stylesheet, which requests a font, which is only discovered after the CSS parses. The fix is discovery, not size — preload the font, inline the critical CSS, and the staircase collapses into a column.",
      },
      { type: "h3", text: "The wall" },
      {
        type: "p",
        text: "Thirty requests all starting at once and all finishing slowly. Everything is discovered promptly and then starves for bandwidth. Reducing bytes helps here; reordering does not, because nothing is waiting on discovery.",
      },
      { type: "h3", text: "The long first bar" },
      {
        type: "p",
        text: "The document itself takes 900ms before a single byte of body arrives. No amount of front-end work fixes this — it is server time, and it delays everything downstream. Check for an uncached database query on the render path before touching the client bundle.",
      },
      { type: "h3", text: "The late arrival" },
      {
        type: "p",
        text: "A request that begins at 2.4s, long after everything else has settled. Almost always a script inserted by another script: an analytics loader that fetches a second loader, or a font subset requested after hydration. These are invisible in a bundle analyser because they were never in the bundle.",
      },
      { type: "h2", text: "The numbers that actually decide things" },
      {
        type: "ol",
        items: [
          "**Time to first byte.** If this is above 500ms, fix it first; every other metric inherits the delay.",
          "**Largest contentful paint element.** Not the score — the element. Knowing it is the hero image tells you what to preload.",
          "**Total blocking time.** The honest proxy for whether the page responds to a tap while it is loading.",
          "**Bytes of JavaScript executed**, which is a different number from bytes downloaded, and the one that costs main-thread time.",
        ],
      },
      { type: "h2", text: "Fix in this order" },
      {
        type: "p",
        text: "Ordered by cost-to-benefit rather than by how interesting the work is, which is the opposite of how most teams sequence it.",
      },
      {
        type: "ul",
        items: [
          "**Remove** things nobody uses. The unused polyfill bundle, the second analytics tag, the icon font loaded for four glyphs.",
          "**Defer** things that are not needed for first paint. Below-the-fold images, the chat widget, anything under an interaction.",
          "**Reorder** so the browser discovers critical resources early. `preload`, `fetchpriority`, and moving the hero image out of a client component.",
          "**Shrink** what remains. Modern formats, tree-shaking, code splitting. Real work, but the last of the four to pay for itself.",
        ],
      },
      {
        type: "quote",
        text: "The best performance patch I shipped last year deleted 140KB of JavaScript that had been dead for eighteen months. It took eleven minutes.",
      },
    ],
  },
];

export const sortedArticles = [...articles].sort(
  (a, b) => Date.parse(b.date) - Date.parse(a.date),
);

export const latestArticles = sortedArticles.slice(0, 3);

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function articleWordCount(article: Article) {
  return article.body.reduce((total, block) => {
    if (block.type === "ul" || block.type === "ol") {
      return total + block.items.join(" ").split(/\s+/).length;
    }
    if (block.type === "code") return total;
    return total + block.text.split(/\s+/).length;
  }, 0);
}
