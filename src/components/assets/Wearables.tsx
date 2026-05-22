import React from "react";

interface WearablesProps {
  wearables: string[];
  headOffset: { x: number; y: number };
  neckOffset: { x: number; y: number };
}

// Wearables Renderer
export const Wearables: React.FC<WearablesProps> = ({ wearables, headOffset, neckOffset }) => {
  return (
    <>
      {/* Neck Accessories (Scarf) */}
      {wearables.includes("wearable_scarf") && (
        <g transform={`translate(${neckOffset.x}, ${neckOffset.y})`} filter="url(#sketch-filter)">
          {/* Red and white striped cozy scarf */}
          <path
            d="M -30,0 C -30,10 30,10 30,0 C 30,-5 -30,-5 -30,0 Z"
            fill="#EF4444"
            stroke="#1E293B"
            strokeWidth="3.5"
          />
          {/* Stripes */}
          <path d="M -15,-3 C -10,5 -10,7 -12,9" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
          <path d="M 0,-4 C 5,4 5,8 2,9" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
          <path d="M 15,-3 C 20,5 20,7 18,9" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
          {/* Hanging tails */}
          <path
            d="M 10,5 L 20,35 C 20,40 10,40 10,35 Z"
            fill="#EF4444"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="M -5,5 L -10,45 C -15,48 -22,42 -15,35 Z"
            fill="#EF4444"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
        </g>
      )}

      {/* Eyes Accessories (Sunglasses) */}
      {wearables.includes("wearable_glasses") && (
        <g transform={`translate(${headOffset.x}, ${headOffset.y + 10})`} filter="url(#sketch-filter)">
          {/* Cool dark sunglasses */}
          <path
            d="M -40,-5 Q -20,-12 0,-5 Q 20,-12 40,-5 C 45,5 35,20 20,20 C 10,20 5,10 0,5 C -5,10 -10,20 -20,20 C -35,20 -45,5 -40,-5 Z"
            fill="#1E293B"
            stroke="#1E293B"
            strokeWidth="4"
          />
          {/* Bridge */}
          <path d="M -5,-7 Q 0,-9 5,-7" stroke="#1E293B" strokeWidth="4" fill="none" />
          {/* Glass glare */}
          <path d="M -30,-2 L -25,10" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 10,-2 L 15,10" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}

      {/* Head Accessories (Cap or Crown) */}
      {wearables.includes("wearable_cap_red") && (
        <g transform={`translate(${headOffset.x}, ${headOffset.y - 12})`} filter="url(#sketch-filter)">
          {/* Cap dome */}
          <path
            d="M -45,5 C -45,-35 45,-35 45,5 Z"
            fill="#EF4444"
            stroke="#1E293B"
            strokeWidth="3.5"
          />
          {/* Cap brim */}
          <path
            d="M 35,0 C 55,-5 75,5 80,15 C 65,18 45,15 35,0 Z"
            fill="#EF4444"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Button on top */}
          <circle cx="0" cy="-35" r="6" fill="#FACC15" stroke="#1E293B" strokeWidth="3" />
        </g>
      )}

      {wearables.includes("wearable_crown") && (
        <g transform={`translate(${headOffset.x}, ${headOffset.y - 20})`} filter="url(#sketch-filter)">
          {/* Golden Crown */}
          <path
            d="M -35,15 L -45,-15 L -15,0 L 0,-30 L 15,0 L 45,-15 L 35,15 Z"
            fill="#FACC15"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Crown jewels */}
          <circle cx="-45" cy="-15" r="4" fill="#EF4444" stroke="#1E293B" strokeWidth="2" />
          <circle cx="0" cy="-30" r="4" fill="#3B82F6" stroke="#1E293B" strokeWidth="2" />
          <circle cx="45" cy="-15" r="4" fill="#10B981" stroke="#1E293B" strokeWidth="2" />
        </g>
      )}
    </>
  );
};
