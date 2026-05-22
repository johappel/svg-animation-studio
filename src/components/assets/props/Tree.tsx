import React from "react";

export const Tree: React.FC = () => {
  return (
    <g filter="url(#sketch-filter)">
      {/* Shadow */}
      <ellipse cx="0" cy="220" rx="110" ry="18" fill="#E2E8F0" />

      {/* Trunk (Scribbled, tilted Peanuts trunk) */}
      <path
        d="M -25,220 L -15,80 C -15,50 -25,20 -10,-10 C -5,-30 5,-20 15,10 C 20,40 15,70 25,220 Z"
        fill="#78350F"
        stroke="#1E293B"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      {/* Trunk bark texture lines */}
      <path d="M -8,190 Q -2,120 -8,70" fill="none" stroke="#1E293B" strokeWidth="3.5" />
      <path d="M 12,170 Q 8,100 12,50" fill="none" stroke="#1E293B" strokeWidth="3.5" />

      {/* Squiggly branches splitting */}
      <path d="M -12,20 C -40,5 -55,-25 -40,-35 C -35,-30 -25,-15 -8,0" fill="#78350F" stroke="#1E293B" strokeWidth="4" />
      <path d="M 12,15 C 40,-5 55,-35 40,-45 C 35,-40 25,-25 8,-2" fill="#78350F" stroke="#1E293B" strokeWidth="4" />

      {/* Messy Foliage (Snoopy-style hand-drawn loop circles) */}
      <path
        d="M -120,-80 C -150,-130 -100,-200 -50,-180 C -30,-220 50,-220 70,-170 C 120,-190 150,-120 110,-70 C 130,-20 80,30 20,10 C -30,25 -90,10 -120,-80 Z"
        fill="#22C55E"
        stroke="#1E293B"
        strokeWidth="5"
        strokeLinejoin="round"
        fillOpacity="0.9"
      />

      {/* Tangled kite string with red kite caught in the tree */}
      <g transform="translate(-10, -100)">
        {/* Kite */}
        <polygon
          points="0,-30 20,0 0,30 -20,0"
          fill="#EF4444"
          stroke="#1E293B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Cross spars */}
        <line x1="0" y1="-30" x2="0" y2="30" stroke="#1E293B" strokeWidth="2.5" />
        <line x1="-20" y1="0" x2="20" y2="0" stroke="#1E293B" strokeWidth="2.5" />
        {/* String/Tail with tiny bows */}
        <path d="M 0,30 C 15,60 5,90 -20,110" fill="none" stroke="#1E293B" strokeWidth="2.5" />
        <rect x="7" y="50" width="8" height="4" fill="#3B82F6" stroke="#1E293B" strokeWidth="1.5" transform="rotate(20)" />
        <rect x="3" y="75" width="8" height="4" fill="#FACC15" stroke="#1E293B" strokeWidth="1.5" transform="rotate(-15)" />
      </g>
    </g>
  );
};
