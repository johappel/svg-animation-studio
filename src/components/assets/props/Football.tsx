import React from "react";

export const Football: React.FC = () => {
  return (
    <g filter="url(#sketch-filter)">
      {/* Shadow */}
      <ellipse cx="0" cy="30" rx="35" ry="8" fill="#E2E8F0" />
      {/* Football body */}
      <path
        d="M -40,0 C -20,-28 20,-28 40,0 C 20,28 -20,28 -40,0 Z"
        fill="#92400E"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* White bands */}
      <path d="M -25,-12 C -24,0 -24,0 -25,12" stroke="#FFFFFF" strokeWidth="4.5" fill="none" />
      <path d="M 25,-12 C 24,0 24,0 25,12" stroke="#FFFFFF" strokeWidth="4.5" fill="none" />
      {/* Stitches */}
      <line x1="-15" y1="0" x2="15" y2="0" stroke="#FFFFFF" strokeWidth="4" />
      <line x1="-10" y1="-5" x2="-10" y2="5" stroke="#FFFFFF" strokeWidth="2.5" />
      <line x1="-5" y1="-5" x2="-5" y2="5" stroke="#FFFFFF" strokeWidth="2.5" />
      <line x1="0" y1="-5" x2="0" y2="5" stroke="#FFFFFF" strokeWidth="2.5" />
      <line x1="5" y1="-5" x2="5" y2="5" stroke="#FFFFFF" strokeWidth="2.5" />
      <line x1="10" y1="-5" x2="10" y2="5" stroke="#FFFFFF" strokeWidth="2.5" />
    </g>
  );
};
