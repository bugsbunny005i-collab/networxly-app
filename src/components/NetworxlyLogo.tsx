// src/components/NetworxlyLogo.tsx
import React, { useMemo } from "react";

interface NetworxlyLogoProps {
  size?: number;
  className?: string;
  glow?: boolean;
  showWordmark?: boolean;
  wordmarkSize?: number;
  title?: string;
}

export default function NetworxlyLogo({
  size = 200, // Default size adjust kela ahe login page sathi
  className = "",
  glow = true,
  showWordmark = true,
  wordmarkSize = 36,
  title = "Networxly logo",
}: NetworxlyLogoProps) {
  
  const ids = useMemo(() => {
    const suffix = Math.random().toString(36).slice(2, 9);
    return {
      grad: `nxGrad-${suffix}`,
      glow: `nxGlow-${suffix}`,
    };
  }, []);

  const viewBoxW = 420;
  const viewBoxH = showWordmark ? 520 : 420;
  const globeRadius = 160;
  const strokeWidth = 10;
  const monogramStroke = 40;
  const orbitStroke = 12;

  return (
    <svg
      width={size}
      height={size * (viewBoxH / viewBoxW)}
      viewBox={`0 0 ${viewBoxW} ${viewBoxH}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={ids.grad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="45%" stopColor="#2B8BFF" />
          <stop offset="100%" stopColor="#7B3BFF" />
        </linearGradient>

        {glow && (
          <filter id={ids.glow} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blurOut" />
            <feMerge>
              <feMergeNode in="blurOut" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      <rect x="0" y="0" width={viewBoxW} height={viewBoxH} fill="#ffffff" fillOpacity="0" />

      <g transform={`translate(${viewBoxW / 2}, ${globeRadius + 30})`}>
        <circle cx={0} cy={0} r={globeRadius} fill="none" stroke={`url(#${ids.grad})`} strokeWidth={strokeWidth} strokeLinejoin="round" />
        <ellipse cx={0} cy={-globeRadius * 0.5} rx={globeRadius * 0.98} ry={globeRadius * 0.28} fill="none" stroke={`url(#${ids.grad})`} strokeWidth={orbitStroke} strokeLinecap="round" />
        <ellipse cx={0} cy={0} rx={globeRadius * 0.98} ry={globeRadius * 0.40} fill="none" stroke={`url(#${ids.grad})`} strokeWidth={orbitStroke} strokeLinecap="round" />
        <ellipse cx={0} cy={globeRadius * 0.5} rx={globeRadius * 0.98} ry={globeRadius * 0.28} fill="none" stroke={`url(#${ids.grad})`} strokeWidth={orbitStroke} strokeLinecap="round" />
        <ellipse cx={0} cy={0} rx={globeRadius * 0.28} ry={globeRadius * 0.98} transform={`rotate(-15)`} fill="none" stroke={`url(#${ids.grad})`} strokeWidth={orbitStroke} strokeLinecap="round" />
        <ellipse cx={0} cy={0} rx={globeRadius * 0.28} ry={globeRadius * 0.98} transform={`rotate(15)`} fill="none" stroke={`url(#${ids.grad})`} strokeWidth={orbitStroke} strokeLinecap="round" />
        <ellipse cx={0} cy={0} rx={globeRadius * 0.45} ry={globeRadius * 0.98} transform={`rotate(90)`} fill="none" stroke={`url(#${ids.grad})`} strokeWidth={orbitStroke} strokeLinecap="round" />

        <g filter={glow ? `url(#${ids.glow})` : undefined}>
          <path d={`M ${-95} ${80} L ${-95} ${-80} L 0 20 L ${95} ${-80}`} fill="none" stroke="#ffffff" strokeWidth={monogramStroke} strokeLinecap="square" strokeLinejoin="miter" />
          <path d={`M ${-50} ${-80} L ${50} ${80}`} fill="none" stroke="#ffffff" strokeWidth={monogramStroke * 0.9} strokeLinecap="square" strokeLinejoin="miter" />
          <path d={`M ${-50} ${80} L ${50} ${-80}`} fill="none" stroke="#ffffff" strokeWidth={monogramStroke * 0.9} strokeLinecap="square" strokeLinejoin="miter" />
        </g>
      </g>

      {showWordmark && (
        <g transform={`translate(${viewBoxW / 2}, ${globeRadius * 2 + 64})`}>
          <text textAnchor="middle" dominantBaseline="middle" fill="#0b1220" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: `${wordmarkSize}px`, letterSpacing: "0.6px" }}>
            Networxly
          </text>
        </g>
      )}
    </svg>
  );
}