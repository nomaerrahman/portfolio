"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTicker } from "./use-active";

/* Each illustration is a lightweight inline SVG that animates only while `active`.
   Colours use theme tokens so they work in dark and light mode. */

const line = "hsl(var(--fg) / 0.18)";
const ink = "hsl(var(--fg) / 0.85)";
const tone = "hsl(var(--accent))";

export function FootballArt({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 240 120" className="h-full w-full" aria-hidden>
      {/* pitch */}
      <rect x="6" y="10" width="228" height="100" rx="6" fill="none" stroke={line} />
      <line x1="120" y1="10" x2="120" y2="110" stroke={line} />
      <circle cx="120" cy="60" r="16" fill="none" stroke={line} />
      <rect x="196" y="34" width="38" height="52" fill="none" stroke={line} />
      {/* goal + net */}
      <motion.g animate={active ? { x: [0, 0, 3, 0] } : { x: 0 }} transition={{ duration: 1.8, times: [0, 0.62, 0.7, 0.8], repeat: active ? Infinity : 0, repeatDelay: 0.5 }}>
        <rect x="224" y="46" width="10" height="28" fill="hsl(var(--fg) / 0.06)" stroke={ink} strokeWidth="1.5" />
        {[52, 58, 64, 70].map((y) => (
          <line key={y} x1="224" y1={y} x2="234" y2={y} stroke={line} />
        ))}
      </motion.g>
      {/* ball */}
      <motion.g
        initial={false}
        animate={active ? { x: [0, 80, 168, 168], y: [0, -34, -2, -2], rotate: [0, 240, 540, 540] } : { x: 0, y: 0, rotate: 0 }}
        transition={{ duration: 1.8, times: [0, 0.35, 0.65, 1], ease: "easeOut", repeat: active ? Infinity : 0, repeatDelay: 0.5 }}
        style={{ originX: "56px", originY: "62px" }}
      >
        <circle cx="56" cy="62" r="7" fill={ink} />
        <path d="M 56 56 l 3 3 -1.5 4 h -3 l -1.5 -4 z" fill="hsl(var(--bg))" />
      </motion.g>
      <AnimatePresence>
        {active && (
          <motion.text
            x="196"
            y="28"
            textAnchor="middle"
            className="font-mono text-[10px] font-bold"
            fill={tone}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.3, times: [0, 0.5, 0.58, 0.85, 1], repeat: Infinity }}
          >
            GOAL!
          </motion.text>
        )}
      </AnimatePresence>
    </svg>
  );
}

export function BadmintonArt({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
      <line x1="10" y1="108" x2="190" y2="108" stroke={line} />
      {/* net */}
      <line x1="100" y1="70" x2="100" y2="108" stroke={ink} strokeWidth="1.5" />
      <rect x="96" y="70" width="8" height="18" fill="none" stroke={line} strokeDasharray="2 2" />
      {/* shuttle */}
      <motion.g
        initial={false}
        animate={active ? { x: [-62, 0, 62, 0, -62], y: [10, -44, 10, -44, 10], rotate: [40, 90, 140, 90, 40] } : { x: -62, y: 10, rotate: 40 }}
        transition={{ duration: 2, ease: "easeInOut", repeat: active ? Infinity : 0 }}
        style={{ originX: "100px", originY: "60px" }}
      >
        <path d="M 100 54 l -6 12 h 12 z" fill="none" stroke={ink} strokeWidth="1.3" />
        <circle cx="100" cy="68" r="3" fill={tone} />
      </motion.g>
    </svg>
  );
}

export function CalisthenicsArt({ active }: { active: boolean }) {
  const reps = useTicker(active, 1400);
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
      <line x1="40" y1="18" x2="160" y2="18" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      <line x1="40" y1="18" x2="40" y2="112" stroke={line} />
      <line x1="160" y1="18" x2="160" y2="112" stroke={line} />
      <motion.g
        initial={false}
        animate={active ? { y: [26, 0, 26] } : { y: 26 }}
        transition={{ duration: 1.4, ease: "easeInOut", repeat: active ? Infinity : 0 }}
      >
        {/* arms */}
        <motion.path
          d="M 86 18 L 92 40 M 114 18 L 108 40"
          stroke={ink}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="100" cy="34" r="7" fill={tone} />
        <path d="M 92 44 Q 100 40 108 44 L 105 74 L 95 74 Z" fill={ink} />
        <path d="M 96 74 L 94 96 M 104 74 L 106 96" stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
      </motion.g>
      <text x="184" y="112" textAnchor="end" className="font-mono text-[10px]" fill="hsl(var(--muted))">
        reps <tspan fill={tone} fontWeight="700">{reps}</tspan>
      </text>
    </svg>
  );
}

export function SwimmingArt({ active }: { active: boolean }) {
  const laps = useTicker(active, 2600);
  const wave = (y: number) =>
    `M -200 ${y} ${Array.from({ length: 12 })
      .map((_, i) => `q 25 ${i % 2 ? 6 : -6} 50 0`)
      .join(" ")}`;
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full overflow-hidden" aria-hidden>
      <defs>
        <clipPath id="pool">
          <rect x="6" y="14" width="188" height="96" rx="8" />
        </clipPath>
      </defs>
      <rect x="6" y="14" width="188" height="96" rx="8" fill="hsl(var(--corporate) / 0.08)" stroke={line} />
      <g clipPath="url(#pool)">
        {[40, 70, 100].map((y, i) => (
          <motion.path
            key={y}
            d={wave(y)}
            fill="none"
            stroke="hsl(var(--corporate) / 0.35)"
            strokeWidth="1.2"
            animate={active ? { x: [0, 100] } : { x: 0 }}
            transition={{ duration: 3 + i, ease: "linear", repeat: active ? Infinity : 0 }}
          />
        ))}
        {[55, 85].map((y) => (
          <line key={y} x1="6" y1={y} x2="194" y2={y} stroke={line} strokeDasharray="1 5" strokeWidth="2" />
        ))}
        {/* swimmer */}
        <motion.g
          initial={false}
          animate={active ? { x: [0, 150, 0] } : { x: 0 }}
          transition={{ duration: 5.2, ease: "easeInOut", repeat: active ? Infinity : 0 }}
        >
          <circle cx="24" cy="70" r="4.5" fill={tone} />
          <motion.path
            d="M 18 70 q -6 -6 -12 0"
            stroke={ink}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            animate={active ? { rotate: [0, 30, 0] } : { rotate: 0 }}
            transition={{ duration: 0.6, repeat: active ? Infinity : 0 }}
            style={{ originX: "18px", originY: "70px" }}
          />
        </motion.g>
      </g>
      <text x="194" y="9" textAnchor="end" className="font-mono text-[10px]" fill="hsl(var(--muted))">
        lengths <tspan fill={tone} fontWeight="700">{laps}</tspan>
      </text>
    </svg>
  );
}

export function FifaArt({ active }: { active: boolean }) {
  const t = useTicker(active, 380);
  const minute = Math.min(84 + t, 93);
  const label = minute >= 93 ? "FT" : minute > 90 ? `90+${minute - 90}'` : `${minute}'`;
  const home = minute >= 88 ? 2 : 1;
  const flash = active && minute >= 88 && minute <= 89;
  const pressed = t % 4;
  return (
    <svg viewBox="0 0 240 120" className="h-full w-full" aria-hidden>
      {/* scoreboard */}
      <rect x="62" y="6" width="116" height="24" rx="6" fill="hsl(var(--fg) / 0.06)" stroke={line} />
      <text x="120" y="22" textAnchor="middle" className="font-mono text-[11px]" fill={ink}>
        NOM{" "}
        <tspan fill={flash ? tone : ink} fontWeight="700">
          {active ? home : 1}
        </tspan>
        {" – 1 "}CPU
      </text>
      <text x="184" y="22" className="font-mono text-[9px]" fill="hsl(var(--muted))">
        {active ? label : "84'"}
      </text>
      {/* controller */}
      <path
        d="M 70 52 Q 120 40 170 52 Q 196 58 198 90 Q 200 112 182 110 Q 170 108 160 92 L 80 92 Q 70 108 58 110 Q 40 112 42 90 Q 44 58 70 52 Z"
        fill="hsl(var(--fg) / 0.05)"
        stroke={ink}
        strokeWidth="1.5"
      />
      {/* d-pad */}
      <path d="M 76 66 h 8 v 8 h 8 v 8 h -8 v 8 h -8 v -8 h -8 v -8 h 8 z" fill={line} />
      {/* face buttons */}
      {[
        [164, 64],
        [176, 76],
        [164, 88],
        [152, 76],
      ].map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="5"
          animate={{ fill: active && pressed === i ? tone : "hsl(var(--fg) / 0.2)", scale: active && pressed === i ? 0.85 : 1 }}
          transition={{ duration: 0.15 }}
          style={{ originX: `${cx}px`, originY: `${cy}px` }}
        />
      ))}
      <circle cx="104" cy="88" r="7" fill="none" stroke={line} />
      <circle cx="136" cy="88" r="7" fill="none" stroke={line} />
    </svg>
  );
}
