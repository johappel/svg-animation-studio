import React from "react";

export const NightSky: React.FC = () => {
  return (
    <g id="bg-night">
      {/* Dark sky background */}
      <rect width="1920" height="1080" fill="#0F172A" />

      {/* Grassy ground silhouette */}
      <path
        d="M -50,850 Q 960,820 1970,850 L 1970,1100 L -50,1100 Z"
        fill="#1E293B"
        stroke="#475569"
        strokeWidth="4"
      />

      {/* Crescent Moon */}
      <path
        d="M 250,150 C 320,150 360,200 350,270 C 270,270 230,220 250,150 Z"
        fill="#FEF08A"
        stroke="#1E293B"
        strokeWidth="3.5"
        transform="rotate(-20, 300, 210)"
      />

      {/* Stars */}
      <g stroke="#FEF08A" strokeWidth="2.5" fill="none">
        {/* Star 1 */}
        <path d="M 600,100 L 610,120 L 630,120 L 615,135 L 620,155 L 600,140 L 580,155 L 585,135 L 570,120 L 590,120 Z" fill="#FEF08A" />
        {/* Star 2 */}
        <path d="M 1200,180 L 1207,194 L 1222,194 L 1210,204 L 1214,218 L 1200,208 L 1186,218 L 1190,204 L 1178,194 L 1193,194 Z" fill="#FEF08A" />
        {/* Star 3 */}
        <path d="M 1500,80 L 1505,90 L 1515,90 L 1507,97 L 1510,107 L 1500,100 L 1490,107 L 1493,97 L 1485,90 L 1495,90 Z" fill="#FEF08A" />
        {/* Star 4 */}
        <path d="M 850,250 L 855,260 L 865,260 L 857,267 L 860,277 L 850,270 L 840,277 L 843,267 L 835,260 L 845,260 Z" fill="#FEF08A" />
      </g>
    </g>
  );
};
