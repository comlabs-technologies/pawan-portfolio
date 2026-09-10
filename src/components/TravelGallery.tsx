"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, useMotionValue, useReducedMotion } from "motion/react";
import { travelCards, type TravelCard } from "@/data/travel";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Positions survive navigation for the length of the session. */
const sessionPositions = new Map<string, { x: number; y: number }>();

const NUDGE = 16;

/**
 * A deliberately untidy pile of printed photographs. Every card can be
 * dragged with a pointer or nudged with the arrow keys; with reduced motion
 * the pile becomes an ordinary scrolling row.
 */
export function TravelGallery() {
  const reduced = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const [topCard, setTopCard] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (reduced) {
    return (
      <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {travelCards.map((card) => (
          <li key={card.id} className="w-45 shrink-0 snap-start md:w-60">
            <PhotoCard card={card} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div
      ref={frameRef}
      className="relative h-120 select-none overflow-hidden md:h-130"
    >
      {travelCards.map((card, index) => (
        <DraggableCard
          key={card.id}
          card={card}
          index={index}
          isMobile={isMobile}
          frameRef={frameRef}
          onLift={() => setTopCard(card.id)}
          isTop={topCard === card.id}
        />
      ))}
    </div>
  );
}

function DraggableCard({
  card,
  index,
  isMobile,
  frameRef,
  onLift,
  isTop,
}: {
  card: TravelCard;
  index: number;
  isMobile: boolean;
  frameRef: RefObject<HTMLDivElement | null>;
  onLift: () => void;
  isTop: boolean;
}) {
  const stored = sessionPositions.get(card.id);
  const x = useMotionValue(stored?.x ?? 0);
  const y = useMotionValue(stored?.y ?? 0);
  const position = isMobile ? card.mobile : card.desktop;

  const remember = () => sessionPositions.set(card.id, { x: x.get(), y: y.get() });

  /** Keyboard equivalent of dragging, for pointer-free navigation. */
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-NUDGE, 0],
      ArrowRight: [NUDGE, 0],
      ArrowUp: [0, -NUDGE],
      ArrowDown: [0, NUDGE],
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    onLift();
    x.set(x.get() + move[0]);
    y.set(y.get() + move[1]);
    remember();
  };

  return (
    <motion.div
      drag
      dragConstraints={frameRef}
      dragElastic={0.14}
      dragMomentum
      dragTransition={{ power: 0.18, timeConstant: 260, bounceStiffness: 220, bounceDamping: 26 }}
      onDragStart={onLift}
      onDragEnd={remember}
      onPointerDown={onLift}
      onFocus={onLift}
      onKeyDown={onKeyDown}
      whileDrag={{ scale: 1.03, rotate: position.rotate * 0.4 }}
      /* The entrance must not animate x/y: those motion values carry the
         card's dragged position and would be reset to zero. */
      initial={{ opacity: 0, filter: "blur(10px)", scale: 0.97 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: EASE }}
      style={{
        x,
        y,
        left: `${position.x}%`,
        top: `${position.y}%`,
        rotate: position.rotate,
        zIndex: isTop ? 30 : 10 + index,
        /* Lets the browser keep vertical page scrolling until a drag starts. */
        touchAction: "pan-y",
      }}
      tabIndex={0}
      role="group"
      aria-roledescription="draggable photograph"
      aria-label={`${card.location}. Use the arrow keys to move this photograph.`}
      className="absolute w-45 cursor-grab rounded-md active:cursor-grabbing md:w-60"
    >
      <PhotoCard card={card} draggable />
    </motion.div>
  );
}

function PhotoCard({ card, draggable = false }: { card: TravelCard; draggable?: boolean }) {
  return (
    <figure
      className={cn(
        "rounded-md border border-line bg-muted p-2 shadow-[var(--shadow-photo)]",
        draggable && "pointer-events-none",
      )}
    >
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm bg-page">
        <Image
          src={card.image}
          alt={card.alt}
          fill
          sizes="(max-width: 767px) 180px, 240px"
          loading="lazy"
          draggable={false}
          className="object-cover"
        />
      </div>
      <figcaption className="pt-2 pb-0.5 text-center">
        <span className="block text-meta font-medium text-ink">{card.location}</span>
        <span className="mt-0.5 block text-[11px] leading-4 text-ink-3">{card.caption}</span>
      </figcaption>
    </figure>
  );
}
