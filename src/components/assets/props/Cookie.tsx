import React from "react";

export const Cookie: React.FC = () => {
  return (
    <g filter="url(#sketch-filter)">
      {/* Shadow */}
      <ellipse cx="0" cy="25" rx="30" ry="7" fill="#E2E8F0" />
      {/* Cookie circle */}
      <circle cx="0" cy="0" r="24" fill="#D97706" stroke="#1E293B" strokeWidth="4" />
      {/* Chocolate chips */}
      <circle cx="-10" cy="-8" r="3.5" fill="#451A03" />
      <circle cx="10" cy="-10" r="4" fill="#451A03" />
      <circle cx="-5" cy="8" r="3" fill="#451A03" />
      <circle cx="11" cy="5" r="3.5" fill="#451A03" />
      <circle cx="2" cy="-1" r="3" fill="#451A03" />
      {/* Hand-drawn crumbs */}
      <path d="M -30,12 L -26,16" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="-35" cy="18" r="2.5" fill="#D97706" stroke="#1E293B" strokeWidth="1.5" />
      <circle cx="28" cy="18" r="2" fill="#D97706" stroke="#1E293B" strokeWidth="1.5" />
    </g>
  );
};
