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
  /* NEO BRUTALISM */
  return (
    <div className={`flex items-center select-none ${className}`}>
      <div>
        <span className="text-xl font-black uppercase tracking-tight text-black border-b-3 border-black bg-[#FFE500] px-2 py-0.5 shadow-[2px_2px_0px_#000000]">
          Lowspeed
        </span>
      </div>
    </div>
  );
}
