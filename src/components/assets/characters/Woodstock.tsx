import React from "react";
import { EmotionType } from "../../../utils/types";
import { Wearables } from "../Wearables";

export const Woodstock: React.FC<{
  emotion: EmotionType;
  wearables: string[];
  isAngryActive?: boolean;
}> = ({ emotion, wearables, isAngryActive = false }) => {
  return (
    <g className={`woodstock-character ${emotion === "angry" || isAngryActive ? "animate-wiggle" : ""}`}>
      {/* Shadow */}
      <ellipse cx="0" cy="115" rx="45" ry="9" fill="#E2E8F0" />

      {/* Thin black stick legs */}
      <line x1="-10" y1="90" x2="-10" y2="115" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="10" y1="90" x2="10" y2="115" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" />
      {/* Feet claws */}
      <path d="M -18,115 H -4" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M 2,115 H 18" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" />

      {/* Body: Yellow fluffy bird shape */}
      <path
        d="M -25,45 C -35,65 -25,92 5,90 C 25,88 32,70 20,50 C 25,35 15,30 5,32 C -5,30 -15,35 -25,45 Z"
        fill="#FACC15"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Tiny wings */}
      <path
        d="M -10,60 Q -30,62 -25,75 Q -10,75 -8,65"
        fill="#FACC15"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Head Group */}
      <g id="woodstock-head">
        {/* Head shape with feathers tuft */}
        <path
          d="M -20,20 C -25,5 -15,-15 -2,-18 C 15,-20 28,-5 25,12 C 15,22 -10,25 -20,20 Z"
          fill="#FACC15"
          stroke="#1E293B"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Woodstock's spiky feather tufts on back of head */}
        <path
          d="M -15,-12 L -35,-25 L -20, -2 L -38,-10 L -18,8 L -32,2 L -15,15"
          fill="#FACC15"
          stroke="#1E293B"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Beak (Orange) */}
        <path
          d="M 12,-4 L 35,2 L 18,15 Z"
          fill="#F97316"
          stroke="#1E293B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Eye */}
        {emotion === "happy" ? (
          <path d="M 2,-6 Q 6,-10 10,-6" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        ) : emotion === "sad" ? (
          <path d="M 2,-10 Q 6,-6 10,-10" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        ) : emotion === "angry" ? (
          <g>
            <line x1="2" y1="-12" x2="12" y2="-6" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="6" cy="-6" r="2.5" fill="#1E293B" />
          </g>
        ) : (
          <circle cx="6" cy="-6" r="2.5" fill="#1E293B" />
        )}

        {/* Wearables mount target */}
        <Wearables wearables={wearables} headOffset={{ x: 2, y: -20 }} neckOffset={{ x: -2, y: 22 }} />
      </g>
    </g>
  );
};
