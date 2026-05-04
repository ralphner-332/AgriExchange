"use client";

import React, { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1000) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let raf = 0;
    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const progress = Math.min(1, (ts - (startRef.current || 0)) / duration);
      const current = Math.round(progress * target);
      setValue(current);
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

export default function StatsPanel({
  categories = 4,
  active = 0,
  transparency = "100%",
  live = "⚡",
}: {
  categories?: number;
  active?: number;
  transparency?: string | number;
  live?: string;
}) {
  const activeCount = useCountUp(active, 1200);
  const categoriesCount = useCountUp(categories, 800);

  return (
    <div className="w-full">
      <div className="rounded-2xl p-6 bg-gradient-to-br from-slate-800 via-slate-800 to-slate-700 text-white shadow-xl border border-slate-700/40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-24 -top-20 h-64 w-64 rounded-full bg-emerald-500/6 blur-3xl" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
          <div className="flex flex-col items-start">
            <div className="text-3xl md:text-4xl font-black text-emerald-300">{categoriesCount}</div>
            <p className="text-xs font-semibold text-slate-300 mt-2 uppercase tracking-wide">Categories</p>
          </div>

          <div className="flex flex-col items-start">
            <div className="text-3xl md:text-4xl font-black text-emerald-300">{activeCount}</div>
            <p className="text-xs font-semibold text-slate-300 mt-2 uppercase tracking-wide">Active Listings</p>
          </div>

          <div className="flex flex-col items-start">
            <div className="text-3xl md:text-4xl font-black text-emerald-300">{transparency}</div>
            <p className="text-xs font-semibold text-slate-300 mt-2 uppercase tracking-wide">Transparency</p>
          </div>

          <div className="flex flex-col items-start">
            <div className="text-3xl md:text-4xl font-black text-emerald-300">{live}</div>
            <p className="text-xs font-semibold text-slate-300 mt-2 uppercase tracking-wide">Live Updates</p>
          </div>
        </div>
      </div>
    </div>
  );
}
