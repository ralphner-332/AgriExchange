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

export default function StatsPanel() {
  // Replace these with real values or props as needed
  const activeTarget = 0; // keep current data fidelity
  const categoriesTarget = 4;

  const active = useCountUp(activeTarget, 1300);
  const categories = useCountUp(categoriesTarget, 800);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="grid gap-4">
        <div className="relative rounded-2xl p-6 bg-gradient-to-br from-emerald-600 to-emerald-400 text-white shadow-2xl border border-white/10 overflow-hidden group transform-gpu transition-transform duration-500 hover:scale-[1.02]">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/8 blur-3xl opacity-70 animate-[float_8s_ease-in-out_infinite]" />
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -left-40 top-0 h-full w-80 bg-gradient-to-r from-transparent via-white/8 to-transparent transform-gpu rotate-12 opacity-50 animate-[shimmer_2.5s_linear_infinite]" />
          </div>

          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-white/90">Marketplace Pulse</p>
              <p className="text-4xl md:text-5xl font-extrabold mt-2 leading-tight">{active}</p>
              <p className="text-sm text-white/80 mt-1">active listings ready to browse.</p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="rounded-xl bg-white/12 px-4 py-2 text-sm font-semibold flex items-center gap-3">
                <span className="text-xs text-white/80">Categories</span>
                <span className="ml-2 font-black text-lg">{categories}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 justify-end">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/12 text-white text-sm font-semibold">Fresh</span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/12 text-white text-sm font-semibold">Local</span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/12 text-white text-sm font-semibold">Fair price</span>
              </div>
            </div>
          </div>

          <div className="absolute left-6 bottom-4 flex items-center gap-3">
            <span className="relative inline-flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-60" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
            </span>
            <span className="text-xs text-white/90 font-semibold">Live updates</span>
          </div>

          <style>{`
            @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
            @keyframes float { 0%{ transform: translateY(0px) } 50%{ transform: translateY(-10px) } 100%{ transform: translateY(0px) } }
          `}</style>
        </div>

        <div className="rounded-2xl p-5 bg-white/95 border border-gray-100 shadow-md">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-600">Why it feels better</h4>
          <p className="mt-3 text-gray-700">The page is structured to feel premium, calm, and easy to scan while keeping the energy of a live marketplace. Subtle motion and animated numbers make the metrics feel alive.</p>
        </div>
      </div>
    </div>
  );
}
