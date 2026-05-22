import React from "react";

export const Doghouse: React.FC = () => {
  return (
    <g filter="url(#sketch-filter)">
      {/* Shadow */}
      <ellipse cx="0" cy="180" rx="140" ry="20" fill="#E2E8F0" />

      {/* Main Red Doghouse Base */}
      <polygon
        points="-100,50 -100,170 100,170 100,50 0,-30"
        fill="#EF4444"
        stroke="#1E293B"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />

      {/* Roof: Flat thick black line slanted */}
      <polygon
        points="-125,55 -120,40 0,-40 120,40 125,55 0,-25"
        fill="#1E293B"
        stroke="#1E293B"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />

      {/* Doorway/Entrance */}
      <path
        d="M -35,170 V 105 C -35,80 35,80 35,105 V 170 Z"
        fill="#1E293B"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Wooden plank lines on base */}
      <line x1="-100" y1="85" x2="100" y2="85" stroke="#1E293B" strokeWidth="3.5" strokeDasharray="10 5" />
      <line x1="-100" y1="125" x2="100" y2="125" stroke="#1E293B" strokeWidth="3.5" strokeDasharray="15 8" />
    </g>
  );
};
