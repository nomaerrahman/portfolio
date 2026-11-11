"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { spring } from "@/components/motion/presets";
import { cn } from "@/lib/utils";

type Piece = { id: string; glyph: string; white: boolean; sq: string };

const BACK = ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"];
const FILES = "abcdefgh";

function startPosition(): Piece[] {
  const pieces: Piece[] = [];
  FILES.split("").forEach((f, i) => {
    pieces.push({ id: `w${i}`, glyph: BACK[i], white: true, sq: `${f}1` });
    pieces.push({ id: `wp${f}`, glyph: "♟", white: true, sq: `${f}2` });
    pieces.push({ id: `bp${f}`, glyph: "♟", white: false, sq: `${f}7` });
    pieces.push({ id: `b${i}`, glyph: BACK[i], white: false, sq: `${f}8` });
  });
  return pieces;
}

/** Italian Game, main line. [pieceId, to-square, SAN] */
const LINE: [string, string, string][] = [
  ["wpe", "e4", "e4"],
  ["bpe", "e5", "e5"],
  ["w6", "f3", "Nf3"],
  ["b1", "c6", "Nc6"],
  ["w5", "c4", "Bc4"],
  ["b5", "c5", "Bc5"],
  ["wpc", "c3", "c3"],
  ["b6", "f6", "Nf6"],
  ["wpd", "d4", "d4"],
];

const xy = (sq: string) => ({ x: FILES.indexOf(sq[0]), y: 8 - Number(sq[1]) });

/**
 * A real board that plays the Italian Game while active, one move every 0.9s,
 * with pieces gliding on a spring (transform-only). Holds, then resets.
 */
export function ChessBoard({ active }: { active: boolean }) {
  const [ply, setPly] = useState(0);

  useEffect(() => {
    if (!active) {
      setPly(0);
      return;
    }
    const id = setTimeout(() => setPly((p) => (p >= LINE.length + 2 ? 0 : p + 1)), ply === 0 ? 400 : 900);
    return () => clearTimeout(id);
  }, [active, ply]);

  const played = Math.min(ply, LINE.length);
  const pieces = useMemo(() => {
    const ps = startPosition();
    for (let i = 0; i < played; i++) {
      const [id, to] = LINE[i];
      const p = ps.find((x) => x.id === id);
      if (p) p.sq = to;
    }
    return ps;
  }, [played]);

  const last = played > 0 ? LINE[played - 1] : null;
  const lastTo = last?.[1];

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <div className="relative aspect-square w-full max-w-[340px] overflow-hidden rounded-xl border border-border" aria-label="Chess board playing the Italian Game" role="img">
        <div className="grid h-full w-full grid-cols-8 grid-rows-8">
          {Array.from({ length: 64 }).map((_, i) => {
            const x = i % 8;
            const y = Math.floor(i / 8);
            const dark = (x + y) % 2 === 1;
            const sq = `${FILES[x]}${8 - y}`;
            return (
              <div
                key={i}
                className={cn("transition-colors duration-300", sq === lastTo && "!bg-[hsl(var(--accent)/0.75)]")}
                style={{ background: dark ? "hsl(28 30% 44%)" : "hsl(38 32% 80%)" }}
              />
            );
          })}
        </div>
        {pieces.map((p) => {
          const { x, y } = xy(p.sq);
          return (
            <motion.span
              key={p.id}
              className="absolute left-0 top-0 grid h-[12.5%] w-[12.5%] place-items-center text-[clamp(18px,5vw,32px)] leading-none"
              initial={false}
              animate={{ x: `${x * 100}%`, y: `${y * 100}%` }}
              transition={spring.soft}
              style={{
                color: p.white ? "#fbf8f1" : "#17140f",
                textShadow: p.white ? "0 0 1px #000, 0 0 1px #000, 0 1px 2px rgba(0,0,0,.45)" : "0 1px 0 rgba(255,255,255,.25)",
              }}
            >
              {p.glyph}
            </motion.span>
          );
        })}
      </div>

      <ol className="grid grid-cols-3 gap-x-3 gap-y-1 font-mono text-[11px] sm:grid-cols-1 sm:gap-y-0.5" aria-label="Moves">
        {Array.from({ length: Math.ceil(LINE.length / 2) }).map((_, m) => (
          <li key={m} className="flex gap-2 whitespace-nowrap">
            <span className="w-4 text-muted">{m + 1}.</span>
            {[0, 1].map((k) => {
              const idx = m * 2 + k;
              if (idx >= LINE.length) return null;
              return (
                <span
                  key={k}
                  className={cn(
                    "w-8 transition-colors duration-200",
                    idx < played ? "text-fg" : "text-muted/40",
                    idx === played - 1 && "text-accent"
                  )}
                >
                  {LINE[idx][2]}
                </span>
              );
            })}
          </li>
        ))}
      </ol>
    </div>
  );
}
