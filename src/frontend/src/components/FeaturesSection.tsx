import { useEffect, useRef, useState } from "react";

interface Feature {
  number: string;
  title: string;
  description: string;
  tags: string[];
}

const FEATURES: Feature[] = [
  {
    number: "01",
    title: "AI Technical Advisory",
    description:
      "Guiding businesses through every stage of AI adoption with expert technical direction.",
    tags: ["AI Roadmap Planning", "AI Stack Consultation"],
  },
  {
    number: "02",
    title: "Bespoke AI Systems",
    description:
      "Building purpose-built AI systems that streamline, automate and elevate your core operations.",
    tags: ["Workflow Automation", "Process Intelligence"],
  },
  {
    number: "03",
    title: "AI Consulting",
    description:
      "Strategic AI partnerships that turn complexity into competitive advantage.",
    tags: ["AI Strategy & Advisory", "Bespoke AI Implementation"],
  },
];

// ─────────────────────────────────────────────────────────────
// Desktop — sticky scroll-scrubbed card stack
// ─────────────────────────────────────────────────────────────
function DesktopStack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const overlay1Ref = useRef<HTMLDivElement>(null);
  const overlay2Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const rect = track.getBoundingClientRect();
        const trackHeight = track.offsetHeight - window.innerHeight;
        // How far we've scrolled into the track (0 → 1 over full 300vh)
        const raw = -rect.top / trackHeight;
        const progress = Math.max(0, Math.min(1, raw));

        // Card 2 animates in during first half (progress 0 → 0.5)
        const p2 = Math.max(0, Math.min(1, progress / 0.5));
        // Card 3 animates in during second half (progress 0.5 → 1)
        const p3 = Math.max(0, Math.min(1, (progress - 0.5) / 0.5));

        // Card 2: slides from 100vh → 0
        if (card2Ref.current) {
          const ty = (1 - p2) * 100;
          card2Ref.current.style.transform = `translateY(${ty}vh)`;
        }

        // Card 3: slides from 100vh → 0
        if (card3Ref.current) {
          const ty = (1 - p3) * 100;
          card3Ref.current.style.transform = `translateY(${ty}vh)`;
        }

        // Card 1 scales down and darkens as card 2 arrives
        if (card1Ref.current) {
          const scale = 1 - p2 * 0.05; // 1 → 0.95
          card1Ref.current.style.transform = `scale(${scale})`;
        }
        if (overlay1Ref.current) {
          overlay1Ref.current.style.opacity = String(p2 * 0.45);
        }

        // Card 2 scales down and darkens as card 3 arrives
        if (card2Ref.current) {
          const baseScale = 1 - p2 * 0.05;
          const extraScale = p3 * 0.05;
          card2Ref.current.style.transform = `translateY(${(1 - p2) * 100}vh) scale(${baseScale - extraScale})`;
        }
        if (overlay2Ref.current) {
          overlay2Ref.current.style.opacity = String(p3 * 0.45);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initialise
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={trackRef}
      style={{ height: "300vh" }}
      className="relative"
      data-ocid="features.scroll_track"
    >
      {/* Sticky viewport wrapper */}
      <div
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
        data-ocid="features.sticky_wrapper"
      >
        {/* Section header */}
        <div className="absolute top-0 left-0 right-0 flex flex-col items-center pt-16 pb-6 z-50 pointer-events-none select-none">
          <span
            className="uppercase tracking-[0.25em] text-xs font-body mb-3"
            style={{ color: "#ff3b2e" }}
          >
            Selected Services
          </span>
          <h2
            className="font-display text-5xl lg:text-6xl text-center leading-tight"
            style={{ color: "oklch(0.92 0.01 60)", fontStyle: "italic" }}
          >
            What We Do
          </h2>
        </div>

        {/* Card stack container */}
        <div
          className="relative w-full flex items-center justify-center"
          style={{ height: "420px" }}
        >
          {/* Card 1 */}
          <div
            ref={card1Ref}
            className="absolute"
            style={{
              zIndex: 10,
              willChange: "transform",
              transformOrigin: "center top",
            }}
            data-ocid="features.card.1"
          >
            <FeatureCard feature={FEATURES[0]} />
            {/* Darkening overlay */}
            <div
              ref={overlay1Ref}
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ background: "#1a0205", opacity: 0 }}
            />
          </div>

          {/* Card 2 */}
          <div
            ref={card2Ref}
            className="absolute"
            style={{
              zIndex: 20,
              willChange: "transform",
              transform: "translateY(100vh)",
              transformOrigin: "center top",
            }}
            data-ocid="features.card.2"
          >
            <FeatureCard feature={FEATURES[1]} />
            <div
              ref={overlay2Ref}
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ background: "#1a0205", opacity: 0 }}
            />
          </div>

          {/* Card 3 */}
          <div
            ref={card3Ref}
            className="absolute"
            style={{
              zIndex: 30,
              willChange: "transform",
              transform: "translateY(100vh)",
            }}
            data-ocid="features.card.3"
          >
            <FeatureCard feature={FEATURES[2]} />
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 flex flex-col items-center gap-2 pointer-events-none select-none"
          style={{ color: "oklch(0.55 0.02 60)" }}
        >
          <span className="text-xs tracking-widest uppercase font-body">
            Scroll to explore
          </span>
          <span
            className="w-px h-8 block"
            style={{
              background:
                "linear-gradient(to bottom, oklch(0.55 0.02 60), transparent)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile — vertical list with Intersection Observer fade-up
// ─────────────────────────────────────────────────────────────
function MobileList() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = Number(entry.target.getAttribute("data-idx"));
          if (entry.isIntersecting) {
            setVisible((prev) => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        }
      },
      { threshold: 0.15 },
    );

    for (const el of itemRefs.current) {
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);

  return (
    <div className="px-5 py-20">
      <div className="text-center mb-14">
        <span
          className="uppercase tracking-[0.25em] text-xs font-body block mb-3"
          style={{ color: "#ff3b2e" }}
        >
          Selected Services
        </span>
        <h2
          className="font-display text-4xl leading-tight"
          style={{ color: "oklch(0.92 0.01 60)", fontStyle: "italic" }}
        >
          What We Do
        </h2>
      </div>

      <div className="flex flex-col gap-6 max-w-lg mx-auto">
        {FEATURES.map((feature, i) => (
          <div
            key={feature.number}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            data-idx={i}
            data-ocid={`features.card.${i + 1}`}
            style={{
              opacity: visible[i] ? 1 : 0,
              transform: visible[i] ? "translateY(0)" : "translateY(32px)",
              transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`,
            }}
          >
            <FeatureCard feature={feature} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Shared FeatureCard
// ─────────────────────────────────────────────────────────────
function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div
      className="shadow-card"
      style={{
        background: "oklch(0.16 0.08 20)",
        border: "1px solid oklch(0.30 0.10 20)",
        borderRadius: "16px",
        width: "min(680px, 90vw)",
        padding: "48px 52px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle left accent bar */}
      <div
        className="absolute left-0 top-8 bottom-8 w-1 rounded-full"
        style={{ background: "#ff3b2e", opacity: 0.7 }}
      />

      {/* Top row: number + title */}
      <div className="flex items-start gap-5 mb-6">
        <span
          className="font-display text-5xl leading-none flex-shrink-0"
          style={{
            fontStyle: "italic",
            color: "oklch(0.38 0.08 15)",
            letterSpacing: "-0.02em",
          }}
        >
          {feature.number}
        </span>
        <h3
          className="font-display text-2xl md:text-3xl leading-snug pt-1"
          style={{ color: "oklch(0.92 0.01 60)" }}
        >
          {feature.title}
        </h3>
      </div>

      {/* Divider */}
      <div
        className="mb-5"
        style={{
          height: "1px",
          background: "linear-gradient(to right, #ff3b2e55, transparent)",
        }}
      />

      {/* Description */}
      <p
        className="font-body text-base leading-relaxed mb-7"
        style={{ color: "oklch(0.65 0.02 60)" }}
      >
        {feature.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {feature.tags.map((tag) => (
          <span
            key={tag}
            className="font-body text-xs font-medium tracking-wide px-3 py-1.5 rounded-full"
            style={{
              border: "1px solid #ff3b2e66",
              color: "#ff3b2e",
              background: "rgba(255, 59, 46, 0.06)",
              letterSpacing: "0.04em",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────
export default function FeaturesSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section
      data-ocid="features.section"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.45 0.22 25), oklch(0.30 0.16 22) 50%, oklch(0.22 0.12 20) 100%)",
        position: "relative",
      }}
    >
      {/* Silk sheen pseudo-layer — diagonal highlight */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.055) 0%, transparent 45%, rgba(255,255,255,0.02) 70%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        {isMobile ? <MobileList /> : <DesktopStack />}
      </div>
    </section>
  );
}
