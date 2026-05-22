import React from "react";

export const DoghouseHill: React.FC = () => {
  return (
    <g id="bg-hill">
      {/* Sky background */}
      <rect width="1920" height="1080" fill="#E0F2FE" />
      
      {/* Sun */}
      <circle cx="1700" cy="180" r="70" fill="#FEF08A" stroke="#1E293B" strokeWidth="4" />
      {/* Sketchy sun rays */}
      <path d="M 1700,80 V 50 M 1700,280 V 310 M 1600,180 H 1570 M 1800,180 H 1830 M 1629,109 L 1608,88 M 1771,251 L 1792,272 M 1629,251 L 1608,272 M 1771,109 L 1792,88" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />

      {/* Grassy Hill (Big sweeping curve) */}
      <path
        d="M -100,850 Q 800,680 2020,870 L 2020,1100 L -100,1100 Z"
        fill="#86EFAC"
        stroke="#1E293B"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Tiny grass blades details */}
      <path d="M 200,750 L 205,735 M 205,750 L 212,732" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
      <path d="M 600,720 L 602,705 M 606,720 L 615,708" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
      <path d="M 1400,760 L 1404,742 M 1408,760 L 1418,745" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
      <path d="M 1100,730 L 1102,710 M 1106,730 L 1115,715" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
};
