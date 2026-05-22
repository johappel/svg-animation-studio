import React from "react";
import { EmotionType } from "../../../utils/types";
import { Wearables } from "../Wearables";

export const Snoopy: React.FC<{
  emotion: EmotionType;
  wearables: string[];
  isAngryActive?: boolean;
}> = ({ emotion, wearables, isAngryActive = false }) => {
  return (
    <g className={`snoopy-character ${emotion === "angry" || isAngryActive ? "animate-wiggle" : ""}`}>
      {/* Shadow */}
      <ellipse cx="0" cy="115" rx="70" ry="12" fill="#E2E8F0" />

      {/* Feet & Legs */}
      {/* Left leg */}
      <path
        d="M -30,85 L -35,110 C -45,110 -55,105 -50,95"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right leg */}
      <path
        d="M 10,85 L 15,110 C 25,110 35,108 30,95"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Tail */}
      <path
        d="M -50,60 Q -80,45 -65,30 Q -55,35 -40,55"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Tail patch */}
      <path d="M -55,50 Q -70,42 -60,35 Z" fill="#1E293B" />

      {/* Body / Belly */}
      <path
        d="M -45,55 C -55,85 -20,105 5,100 C 25,95 30,80 20,55 C 10,40 -25,35 -45,55 Z"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      
      {/* Back Spot */}
      <path
        d="M -42,60 C -48,70 -35,80 -30,70 C -25,60 -35,50 -42,60 Z"
        fill="#1E293B"
      />

      {/* Collar (Red) */}
      <path
        d="M -25,35 C -15,40 10,38 15,30"
        fill="none"
        stroke="#EF4444"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Arms / Paws */}
      {emotion === "thinking" ? (
        // Thinking posture: arm raised to snout
        <path
          d="M 15,65 Q 25,60 20,40 Q 15,35 5,45"
          fill="none"
          stroke="#1E293B"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : emotion === "angry" ? (
        // Angry posture: arms crossed or fists out
        <g>
          <path
            d="M -15,60 Q -35,65 -30,75"
            fill="none"
            stroke="#1E293B"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M 15,60 Q 35,65 30,75"
            fill="none"
            stroke="#1E293B"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </g>
      ) : (
        // Happy / Normal: simple hanging arms
        <path
          d="M -10,55 Q 15,70 18,85"
          fill="none"
          stroke="#1E293B"
          strokeWidth="4"
          strokeLinecap="round"
        />
      )}

      {/* Head Group */}
      <g id="snoopy-head">
        {/* Head Shape */}
        {/* Snoopy's iconic long white snout and round head */}
        <path
          d="M -30,20 C -40,5 -30,-25 -10,-28 C 15,-30 35,-15 45,-5 C 55,5 50,20 25,22 C 10,23 -15,22 -30,20 Z"
          fill="#FFFFFF"
          stroke="#1E293B"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Nose */}
        <ellipse cx="48" cy="4" rx="9" ry="7" fill="#1E293B" transform="rotate(10, 48, 4)" />

        {/* Eyes based on Emotion */}
        {emotion === "happy" && (
          // Curved happy eyes
          <path
            d="M 12,-10 Q 17,-15 22,-10 M 0,-10 Q 5,-15 10,-10"
            fill="none"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        )}
        {emotion === "sad" && (
          // Drooping sad eyes
          <g>
            <path
              d="M 10,-8 Q 15,-3 20,-8 M -2,-8 Q 3,-3 8,-8"
              fill="none"
              stroke="#1E293B"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Tiny teardrop */}
            <path d="M 23,2 C 23,5 21,7 19,7 C 17,7 17,5 19,2 Z" fill="#3B82F6" />
          </g>
        )}
        {emotion === "angry" && (
          // Angry slanted eyebrows & eyes
          <g>
            <path d="M 6,-14 L 18,-6" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            <path d="M -4,-12 L 5,-7" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            <circle cx="11" cy="-6" r="2.5" fill="#1E293B" />
            <circle cx="1.5" cy="-7" r="2.5" fill="#1E293B" />
            {/* Angry red scribble symbol above head */}
            <path d="M 25,-45 L 35,-35 M 35,-45 L 25,-35" stroke="#EF4444" strokeWidth="3" />
            <path d="M 22,-37 L 38,-42" stroke="#EF4444" strokeWidth="3" />
          </g>
        )}
        {emotion === "surprised" && (
          // Big circular eyes
          <g>
            <circle cx="15" cy="-8" r="5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
            <circle cx="1" cy="-8" r="5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
            <circle cx="15" cy="-8" r="2" fill="#1E293B" />
            <circle cx="1" cy="-8" r="2" fill="#1E293B" />
          </g>
        )}
        {emotion === "thinking" && (
          // Dot eyes, looking up, question mark
          <g>
            <circle cx="14" cy="-11" r="2.5" fill="#1E293B" />
            <circle cx="2" cy="-11" r="2.5" fill="#1E293B" />
            {/* Question mark above head */}
            <text
              x="25"
              y="-40"
              fontFamily="'Architects Daughter', cursive"
              fontSize="24"
              fontWeight="bold"
              fill="#8B5CF6"
            >
              ?
            </text>
          </g>
        )}

        {/* Ear (Long floppy black ear attached at back of head) */}
        {emotion === "angry" ? (
          // Flying ear back
          <path
            d="M -22,-10 C -45,-15 -55,10 -40,15 C -30,18 -15,0 -22,-10 Z"
            fill="#1E293B"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        ) : emotion === "happy" ? (
          // Floppy ear wagging
          <path
            d="M -22,-10 C -40,-2 -42,32 -30,35 C -20,38 -15,10 -22,-10 Z"
            fill="#1E293B"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="animate-bounce"
            style={{ transformOrigin: "-22px -10px" }}
          />
        ) : (
          // Standard hanging floppy ear
          <path
            d="M -22,-10 C -38,5 -38,35 -28,35 C -18,35 -15,10 -22,-10 Z"
            fill="#1E293B"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        )}

        {/* Smile / Mouth line */}
        {emotion === "happy" && (
          <path d="M 22,12 Q 28,15 32,10" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        )}
        {emotion === "sad" && (
          <path d="M 20,15 Q 26,10 32,13" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        )}
        {emotion === "angry" && (
          <path d="M 18,14 Q 28,6 34,13" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
        )}
        {emotion === "surprised" && (
          <circle cx="28" cy="12" r="3.5" fill="#1E293B" />
        )}
        {emotion === "thinking" && (
          <path d="M 20,13 L 30,13" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        )}

        {/* Wearables mount target for head/neck */}
        <Wearables wearables={wearables} headOffset={{ x: -10, y: -28 }} neckOffset={{ x: -5, y: 35 }} />
      </g>
    </g>
  );
};
