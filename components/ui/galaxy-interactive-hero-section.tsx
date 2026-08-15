"use client";

import React, { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

/**
 * SplineGalaxyBackground – An immersive 3D galaxy background
 * powered by Spline. Lazy-loaded to avoid blocking the initial page render.
 *
 * Usage: Place as an absolute-positioned layer behind your hero content.
 */
export function SplineGalaxyBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <Suspense
        fallback={
          <div className="absolute inset-0 bg-[#0a0a0a]" />
        }
      >
        <div className="pointer-events-auto w-full h-full">
          <Spline
            style={{ width: "100%", height: "100%" }}
            scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
          />
        </div>
      </Suspense>

      {/* Gradient overlays for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, rgba(10, 10, 10, 0.85), transparent 35%, transparent 65%, rgba(10, 10, 10, 0.85)),
            linear-gradient(to bottom, rgba(10, 10, 10, 0.3) 0%, transparent 30%, transparent 50%, rgba(10, 10, 10, 0.95) 90%)
          `,
        }}
      />
    </div>
  );
}
