"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { competencies } from "@/data/profile";
import { EASE } from "@/lib/utils";

const SIZE = 340;
const C = SIZE / 2;
const R = 120;

function point(i: number, n: number, r: number) {
  const a = (Math.PI * 2 * i) / n - Math.PI / 2;
  return [C + Math.cos(a) * r, C + Math.sin(a) * r] as const;
}

export function SkillsRadar() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hover, setHover] = useState<number | null>(null);
  const n = competencies.length;
  const shape = competencies.map((c, i) => point(i, n, (c.value / 100) * R).join(",")).join(" ");
  const zero = competencies.map((_, i) => point(i, n, 0).join(",")).join(" ");

  return (
    <svg ref={ref} viewBox={`0 0 ${SIZE} ${SIZE}`} className="mx-auto w-full max-w-[380px] overflow-visible" role="img" aria-label="Core competencies radar chart">
      {[0.25, 0.5, 0.75, 1].map((s) => (
        <polygon
          key={s}
          points={competencies.map((_, i) => point(i, n, R * s).join(",")).join(" ")}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="1"
        />
      ))}
      {competencies.map((_, i) => {
        const [x, y] = point(i, n, R);
        return <line key={i} x1={C} y1={C} x2={x} y2={y} stroke="hsl(var(--border))" />;
      })}
      <motion.polygon
        initial={{ points: zero }}
        animate={{ points: inView ? shape : zero }}
        transition={{ duration: 1.4, ease: EASE }}
        fill="hsl(var(--accent) / 0.18)"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {competencies.map((c, i) => {
        const [px, py] = point(i, n, (c.value / 100) * R);
        const [lx, ly] = point(i, n, R + 26);
        const anchor = Math.abs(lx - C) < 4 ? "middle" : lx > C ? "start" : "end";
        return (
          <g key={c.axis} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} className="cursor-default">
            <motion.circle
              cx={px}
              cy={py}
              r={hover === i ? 6 : 3.5}
              fill="hsl(var(--accent))"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 1 + i * 0.06 }}
            />
            <text
              x={lx}
              y={ly}
              textAnchor={anchor}
              dominantBaseline="middle"
              className="font-mono text-[10px] uppercase tracking-wider"
              fill={hover === i ? "hsl(var(--fg))" : "hsl(var(--muted))"}
            >
              {c.axis}
              {hover === i && <tspan fill="hsl(var(--accent))"> {c.value}</tspan>}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
