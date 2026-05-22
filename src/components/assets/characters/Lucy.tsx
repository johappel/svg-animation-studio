import React from "react";
import { EmotionType } from "../../../utils/types";
import { Wearables } from "../Wearables";

export const Lucy: React.FC<{
  emotion: EmotionType;
  wearables: string[];
  isAngryActive?: boolean;
}> = ({ emotion, wearables, isAngryActive = false }) => {
  return (
    <g className={`lucy-character ${emotion === "angry" || isAngryActive ? "animate-wiggle" : ""}`}>
      {/* Shadow */}
      <ellipse cx="0" cy="115" rx="65" ry="12" fill="#E2E8F0" />

      {/* Shoes & Legs */}
      {/* Left shoe */}
      <path
        d="M -28,95 L -40,115 H -18 C -13,115 -13,95 -18,95"
        fill="#78350F"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Right shoe */}
      <path
        d="M 18,95 L 30,115 H 48 C 53,115 53,95 44,95"
        fill="#78350F"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Legs (white socks) */}
      <rect x="-30" y="70" width="12" height="25" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3.5" />
      <rect x="20" y="70" width="12" height="25" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3.5" />

      {/* Dress: Classic Blue dress with scalloped neck */}
      <path
        d="M -40,20 L -50,72 H 50 L 40,20 Z"
        fill="#3B82F6"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Collar/Bow on dress */}
      <path
        d="M -15,20 C -15,30 -5,30 -5,20 C -5,30 5,30 5,20 C 5,30 15,30 15,20"
        fill="none"
        stroke="#1E293B"
        strokeWidth="3.5"
      />

      {/* Arms */}
      {emotion === "angry" ? (
        // Lucy fussing posture (hands on hips, ready to lecture)
        <g>
          <path
            d="M -42,25 C -55,30 -52,48 -38,48"
            fill="none"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 42,25 C 55,30 52,48 38,48"
            fill="none"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>
      ) : (
        // Standard hanging arms
        <g>
          <path
            d="M -42,25 Q -52,50 -45,60"
            fill="none"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 42,25 Q 52,50 45,60"
            fill="none"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* Head Group */}
      <g id="lucy-head">
        {/* Neck */}
        <rect x="-8" y="5" width="16" height="18" fill="#FED7AA" stroke="#1E293B" strokeWidth="4" />

        {/* Head */}
        <circle cx="0" cy="-25" r="38" fill="#FED7AA" stroke="#1E293B" strokeWidth="4" />

        {/* Lucy's black bob hair with top bumps */}
        <path
          d="M -40,-25 C -44,-35 -35,-50 -20,-58 C -10,-62 10,-62 20,-58 C 35,-50 44,-35 40,-25 C 44,-10 40,-5 36,-10 C 35,-25 32,-45 20,-52 C 10,-55 -10,-55 -20,-52 C -32,-45 -35,-25 -36,-10 C -40,-5 -44,-10 -40,-25 Z"
          fill="#1E293B"
          stroke="#1E293B"
          strokeWidth="2"
        />
        {/* Hair front curls */}
        <path
          d="M -30,-48 C -25,-55 -10,-58 -2,-50 C 5,-58 20,-55 30,-48"
          fill="none"
          stroke="#1E293B"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Ears */}
        <path d="M -38,-28 Q -44,-25 -38,-22" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
        <path d="M 38,-28 Q 44,-25 38,-22" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />

        {/* Eyes based on Emotion */}
        {emotion === "happy" && (
          <g>
            <path d="M -15,-34 Q -10,-36 -5,-34" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 5,-34 Q 10,-36 15,-34" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="-10" cy="-26" r="3" fill="#1E293B" />
            <circle cx="10" cy="-26" r="3" fill="#1E293B" />
          </g>
        )}
        {emotion === "sad" && (
          <g>
            <path d="M -15,-31 Q -10,-36 -5,-35" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 5,-35 Q 10,-36 15,-31" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="-10" cy="-24" r="3" fill="#1E293B" />
            <circle cx="10" cy="-24" r="3" fill="#1E293B" />
          </g>
        )}
        {emotion === "angry" && (
          <g>
            <path d="M -16,-38 L -6,-32" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            <path d="M 16,-38 L 6,-32" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            <circle cx="-10" cy="-26" r="3.5" fill="#1E293B" />
            <circle cx="10" cy="-26" r="3.5" fill="#1E293B" />
          </g>
        )}
        {emotion === "surprised" && (
          <g>
            <path d="M -15,-40 Q -10,-44 -5,-40" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            <path d="M 5,-40 Q 10,-44 15,-40" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            <circle cx="-10" cy="-27" r="4.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
            <circle cx="10" cy="-27" r="4.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
            <circle cx="-10" cy="-27" r="1.5" fill="#1E293B" />
            <circle cx="10" cy="-27" r="1.5" fill="#1E293B" />
          </g>
        )}
        {emotion === "thinking" && (
          <g>
            <circle cx="-10" cy="-27" r="3" fill="#1E293B" />
            <circle cx="10" cy="-27" r="3" fill="#1E293B" />
            <text x="25" y="-55" fontFamily="'Architects Daughter'" fontSize="20" fill="#8B5CF6">?</text>
          </g>
        )}

        {/* Nose */}
        <path d="M -3,-21 Q 2,-18 -2,-15" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />

        {/* Mouth */}
        {emotion === "happy" && (
          <path d="M -10,-8 Q 0,2 10,-8" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
        )}
        {emotion === "sad" && (
          <path d="M -10,-3 Q 0,-10 10,-3" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
        )}
        {emotion === "angry" && (
          // Large shouting mouth
          <path
            d="M -15,-6 Q 0,12 15,-6 Q 0,-16 -15,-6 Z"
            fill="#EF4444"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
        )}
        {emotion === "surprised" && (
          <circle cx="0" cy="-6" r="6" fill="#EF4444" stroke="#1E293B" strokeWidth="3.5" />
        )}
        {emotion === "thinking" && (
          <line x1="-8" y1="-8" x2="8" y2="-8" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
        )}

        {/* Wearables mount target */}
        <Wearables wearables={wearables} headOffset={{ x: 0, y: -63 }} neckOffset={{ x: 0, y: 22 }} />
      </g>
    </g>
  );
};
