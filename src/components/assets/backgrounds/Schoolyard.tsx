import React from "react";

export const Schoolyard: React.FC = () => {
  return (
    <g id="bg-yard">
      {/* Base Paper / Canvas fill */}
      <rect width="1920" height="1080" fill="#FAF6EE" />
      
      {/* Horizon ground line */}
      <path d="M 0,820 Q 960,800 1920,820" fill="none" stroke="#94A3B8" strokeWidth="4" strokeDasharray="12 8" />

      {/* Wooden fence posts on left */}
      <g transform="translate(100, 520)" stroke="#94A3B8" strokeWidth="3.5" fill="none" strokeLinejoin="round">
        {/* Post 1 */}
        <path d="M 0,300 V 100 L 20,70 L 40,100 V 300" />
        <path d="M 30,300 V 120 L 50,90 L 70,120 V 300" />
        <path d="M 60,300 V 110 L 80,80 L 100,110 V 300" />
        {/* Rails */}
        <line x1="-10" y1="140" x2="120" y2="140" />
        <line x1="-10" y1="240" x2="120" y2="240" />
      </g>

      {/* Chalk hopscotch grid on ground */}
      <g transform="translate(850, 830) rotate(-10)" stroke="#CBD5E1" strokeWidth="4" fill="none" strokeLinejoin="round">
        <rect x="0" y="0" width="100" height="100" />
        <rect x="0" y="-100" width="100" height="100" />
        <rect x="-50" y="-200" width="100" height="100" />
        <rect x="50" y="-200" width="100" height="100" />
        <rect x="0" y="-300" width="100" height="100" />
        {/* Hopscotch text numbers */}
        <text x="35" y="65" fontFamily="'Architects Daughter'" fontSize="48" fill="#94A3B8" stroke="none">1</text>
        <text x="35" y="-35" fontFamily="'Architects Daughter'" fontSize="48" fill="#94A3B8" stroke="none">2</text>
        <text x="-15" y="-135" fontFamily="'Architects Daughter'" fontSize="48" fill="#94A3B8" stroke="none">3</text>
        <text x="85" y="-135" fontFamily="'Architects Daughter'" fontSize="48" fill="#94A3B8" stroke="none">4</text>
      </g>

      {/* Sketchy brick/building wall line on right */}
      <path
        d="M 1600,300 V 820"
        fill="none"
        stroke="#94A3B8"
        strokeWidth="4"
      />
      {/* A few bricks */}
      <rect x="1600" y="450" width="80" height="40" fill="none" stroke="#CBD5E1" strokeWidth="3" />
      <rect x="1680" y="490" width="80" height="40" fill="none" stroke="#CBD5E1" strokeWidth="3" />
      <rect x="1600" y="570" width="80" height="40" fill="none" stroke="#CBD5E1" strokeWidth="3" />

      {/* Fluffy clouds sketch in the sky */}
      <path
        d="M 250,150 C 270,120 330,120 350,150 C 380,150 400,180 380,210 C 380,230 320,240 250,230 C 200,240 180,210 200,180 C 180,150 220,130 250,150 Z"
        fill="none"
        stroke="#CBD5E1"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M 1350,120 C 1370,95 1420,95 1440,120 C 1470,120 1490,145 1470,170 C 1470,190 1420,200 1350,190 C 1300,200 1280,190 1300,165 C 1280,140 1320,110 1350,120 Z"
        fill="none"
        stroke="#CBD5E1"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </g>
  );
};
