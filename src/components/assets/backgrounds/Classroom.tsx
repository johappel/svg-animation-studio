import React from "react";

export const Classroom: React.FC = () => {
  return (
    <g id="bg-classroom">
      {/* Floor & Wall */}
      <rect width="1920" height="1080" fill="#FAF6EE" />
      {/* Floor line */}
      <line x1="0" y1="850" x2="1920" y2="850" stroke="#94A3B8" strokeWidth="4" />
      
      {/* Sketchy blackboard */}
      <g transform="translate(360, 150)" stroke="#1E293B" strokeWidth="4" fill="none" strokeLinejoin="round">
        {/* Wooden frame */}
        <rect x="0" y="0" width="1200" height="550" fill="#064E3B" />
        <rect x="-10" y="-10" width="1220" height="570" fill="none" stroke="#78350F" strokeWidth="12" />
        {/* Chalk ledge */}
        <line x1="-15" y1="565" x2="1215" y2="565" stroke="#78350F" strokeWidth="10" />

        {/* Chalk writings */}
        <text x="100" y="150" fontFamily="'Architects Daughter'" fontSize="72" fill="#F8FAFC" stroke="none">
          2 + 2 = ?
        </text>
        
        {/* Stick figure drawing */}
        <circle cx="900" cy="180" r="30" stroke="#F8FAFC" strokeWidth="4.5" />
        <line x1="900" y1="210" x2="900" y2="320" stroke="#F8FAFC" strokeWidth="4.5" />
        <line x1="900" y1="240" x2="850" y2="280" stroke="#F8FAFC" strokeWidth="4.5" />
        <line x1="900" y1="240" x2="950" y2="280" stroke="#F8FAFC" strokeWidth="4.5" />
        <line x1="900" y1="320" x2="860" y2="400" stroke="#F8FAFC" strokeWidth="4.5" />
        <line x1="900" y1="320" x2="940" y2="400" stroke="#F8FAFC" strokeWidth="4.5" />

        {/* "Aa Bb Cc" lesson */}
        <text x="100" y="280" fontFamily="'Architects Daughter'" fontSize="56" fill="#FACC15" stroke="none">
          Aa Bb Cc Dd
        </text>

        <text x="100" y="420" fontFamily="'Architects Daughter'" fontSize="48" fill="#F8FAFC" stroke="none">
          * Hausaufgabe: Seite 42 lesen
        </text>
      </g>

      {/* Classroom desk silhouette in corner */}
      <path
        d="M 50,850 V 750 H 220 V 850 M 150,750 V 850"
        fill="none"
        stroke="#94A3B8"
        strokeWidth="4"
      />
    </g>
  );
};
