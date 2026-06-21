/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = '', size = 40 }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div 
        className="relative flex items-center justify-center rounded-xl bg-black/40 border border-white/10 shadow-lg group"
        style={{ width: size, height: size }}
      >
        {/* Subtle glow behind logo */}
        <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full group-hover:bg-blue-500/20 transition-all duration-500" />
        
        {/* Premium SVG reproducing the LS Ribbon monogram */}
        <svg
          width={size * 0.75}
          height={size * 0.75}
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative transition-transform duration-500 ease-out group-hover:scale-105"
        >
          <defs>
            <linearGradient id="ribbonGrad" x1="120" y1="80" x2="400" y2="450" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="45%" stopColor="#E2E8F0" />
              <stop offset="70%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
            <linearGradient id="ribbonDark" x1="150" y1="120" x2="350" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="50%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>
            <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="8" dy="12" stdDeviation="10" floodColor="#000000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* LS Monogram Ribbon Drawing */}
          {/* Main "L" and sweeping "S" overlap construct */}
          <g filter="url(#shadow)">
            {/* Background looping ribbon part for S curve */}
            <path
              d="M360,120 C420,120 440,160 410,210 C380,260 270,300 240,360 C210,420 260,460 360,460 C420,460 450,420 450,380 L380,380 C380,410 360,420 330,420 C300,420 280,390 300,350 C320,310 400,280 430,230 C460,180 440,100 340,100 Z"
              fill="url(#ribbonDark)"
              opacity="0.9"
            />
            {/* L ribbon standing bar with premium bevel shape */}
            <path
              d="M160,100 L210,120 L210,340 C210,380 230,400 300,415 L260,440 C170,440 160,390 160,350 Z"
              fill="url(#ribbonGrad)"
            />
            {/* Elegant ribbon loop representing the main "S" foreground curves */}
            <path
              d="M260,160 C320,160 360,180 360,220 C360,260 310,280 260,300 C210,320 180,350 180,390 L180,100 L230,120 L230,320 C235,290 260,275 310,255 C360,235 410,210 410,160 C410,110 350,80 250,80 Z"
              fill="url(#ribbonGrad)"
            />
          </g>
        </svg>
      </div>
      <div>
        <span className="text-xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400 font-sans">
          Lowspeed
        </span>
      </div>
    </div>
  );
}
