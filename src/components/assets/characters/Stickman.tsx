import React from "react";
import { EmotionType } from "../../../utils/types";
import { Wearables } from "../Wearables";

export const Charlie: React.FC<{
  emotion: EmotionType;
  wearables: string[];
  isAngryActive?: boolean;
}> = ({ emotion, wearables, isAngryActive = false }) => {
  return (
    <g className={`charlie-character ${emotion === "angry" || isAngryActive ? "animate-wiggle" : ""}`}>
      {/* Shadow */}
      <ellipse cx="0" cy="115" rx="65" ry="12" fill="#E2E8F0" />

      {/* Shoes & Legs */}
      {/* Left shoe */}
      <path
        d="M -30,95 L -45,115 H -20 C -15,115 -15,95 -20,95"
        fill="#78350F"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Right shoe */}
      <path
        d="M 15,95 L 30,115 H 45 C 50,115 50,95 40,95"
        fill="#78350F"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Legs (Socks) */}
      <rect x="-32" y="75" width="12" height="20" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3.5" />
      <rect x="18" y="75" width="12" height="20" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3.5" />

      {/* Shorts */}
      <path
        d="M -35,55 L -35,76 H -10 L -5,65 L 5,65 L 10,76 H 35 L 35,55 Z"
        fill="#1E293B"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Torso: Iconic Yellow shirt with black zig-zag */}
      <path
        d="M -40,15 L -45,55 H 45 L 40,15 C 30,10 -30,10 -40,15 Z"
        fill="#FACC15"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Zig-Zag stripe across the chest */}
      <path
        d="M -43,38 L -30,30 L -18,38 L -5,30 L 8,38 L 20,30 L 32,38 L 43,30"
        fill="none"
        stroke="#1E293B"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Arms / Hands */}
      {emotion === "thinking" ? (
        // Hand on chin
        <g>
          <path
            d="M -35,25 Q -55,35 -40,50"
            fill="none"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Raising right hand to chin */}
          <path
            d="M 35,25 Q 45,15 20, -5"
            fill="none"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ) : emotion === "angry" ? (
        // Fists on hips
        <g>
          <path
            d="M -38,22 C -55,30 -50,45 -38,42"
            fill="none"
            stroke="#1E293B"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 38,22 C 55,30 50,45 38,42"
            fill="none"
            stroke="#1E293B"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      ) : (
        // Simple arms hanging
        <g>
          <path
            d="M -38,22 Q -45,45 -40,55"
            fill="none"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 38,22 Q 45,45 40,55"
            fill="none"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* Head Group */}
      <g id="charlie-head">
        {/* Neck */}
        <rect x="-8" y="0" width="16" height="20" fill="#FED7AA" stroke="#1E293B" strokeWidth="4" />

        {/* Head (Perfect round circle for Charlie Brown) */}
        <circle cx="0" cy="-30" r="42" fill="#FED7AA" stroke="#1E293B" strokeWidth="4" />

        {/* Hair: iconic single loop on forehead */}
        <path d="M 0,-62 Q 5,-54 10,-60" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
        {/* Hair: scribbles on the back of his head */}
        <path d="M -38,-35 Q -42,-32 -40,-28" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        <path d="M 38,-35 Q 42,-32 40,-28" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />

        {/* Ears */}
        <path d="M -42,-33 Q -48,-30 -42,-27" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
        <path d="M 42,-33 Q 48,-30 42,-27" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />

        {/* Eyes & Eyebrows based on Emotion */}
        {emotion === "happy" && (
          <g>
            <path d="M -18,-42 Q -12,-44 -6,-42" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 6,-42 Q 12,-44 18,-42" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="-12" cy="-32" r="3.5" fill="#1E293B" />
            <circle cx="12" cy="-32" r="3.5" fill="#1E293B" />
          </g>
        )}

        {emotion === "sad" && (
          <g>
            <path d="M -18,-38 Q -12,-44 -6,-43" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 6,-43 Q 12,-44 18,-38" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="-12" cy="-31" r="3" fill="#1E293B" />
            <circle cx="12" cy="-31" r="3" fill="#1E293B" />
          </g>
        )}

        {emotion === "angry" && (
          <g>
            <path d="M -18,-44 L -6,-38" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            <path d="M 18,-44 L 6,-38" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            <circle cx="-12" cy="-32" r="3.5" fill="#1E293B" />
            <circle cx="12" cy="-32" r="3.5" fill="#1E293B" />
          </g>
        )}

        {emotion === "surprised" && (
          <g>
            {/* Raised eyebrows */}
            <path d="M -18,-48 Q -12,-52 -6,-48" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 6,-48 Q 12,-52 18,-48" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="-12" cy="-33" r="4.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
            <circle cx="12" cy="-33" r="4.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
            <circle cx="-12" cy="-33" r="1.5" fill="#1E293B" />
            <circle cx="12" cy="-33" r="1.5" fill="#1E293B" />
          </g>
        )}

        {emotion === "thinking" && (
          <g>
            <path d="M -16,-43 L -8,-45" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            <path d="M 8,-42 L 16,-42" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            <circle cx="-12" cy="-34" r="3" fill="#1E293B" />
            <circle cx="12" cy="-34" r="3" fill="#1E293B" />
            <path d="M 28,-60 L 38,-70 Q 42,-74 38,-78 C 34,-82 28,-78 32,-72" fill="none" stroke="#8B5CF6" strokeWidth="3.5" />
            <circle cx="33" cy="-56" r="2" fill="#8B5CF6" />
          </g>
        )}

        {/* Nose: iconic little curved loop */}
        <path d="M -4,-28 Q 2,-25 -2,-21" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />

        {/* Mouth based on Emotion */}
        {emotion === "happy" && (
          // Big simple open smile
          <path
            d="M -12,-15 Q 0,-5 12,-15 Q 0,-22 -12,-15 Z"
            fill="#EF4444"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
        )}
        {emotion === "sad" && (
          // Squiggly line mouth
          <path
            d="M -12,-12 Q -6,-18 0,-12 Q 6,-6 12,-12"
            fill="none"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        )}
        {emotion === "angry" && (
          // Screaming wide open mouth
          <ellipse cx="0" cy="-10" rx="14" ry="10" fill="#EF4444" stroke="#1E293B" strokeWidth="4" />
        )}
        {emotion === "surprised" && (
          // Round small gasp mouth
          <circle cx="0" cy="-12" r="7" fill="#EF4444" stroke="#1E293B" strokeWidth="3.5" />
        )}
        {emotion === "thinking" && (
          // Straight neutral line
          <line x1="-10" y1="-12" x2="10" y2="-12" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
        )}

        {/* Wearables mount target */}
        <Wearables wearables={wearables} headOffset={{ x: 0, y: -72 }} neckOffset={{ x: 0, y: 15 }} />
      </g>
    </g>
  );
};
