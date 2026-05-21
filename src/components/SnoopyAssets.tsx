import React from "react";

// SVG Sketch/Hand-drawn filter to give lines a wiggly, hand-inked comic feel
export const SketchFilter: React.FC = () => {
  return (
    <defs>
      <filter id="sketch-filter" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.005" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      {/* Dropshadow for panels */}
      <filter id="panel-shadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="4" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.15" />
      </filter>
    </defs>
  );
};

// Types
export type EmotionType = "happy" | "sad" | "angry" | "surprised" | "thinking";

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

// 1. Snoopy-style Dog Character
export const SnoopyCharacter: React.FC<{
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

// 2. Charlie-style Boy Character
export const CharlieCharacter: React.FC<{
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

// 3. Lucy-style Girl Character
export const LucyCharacter: React.FC<{
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

// 4. Woodstock-style Bird Character
export const WoodstockCharacter: React.FC<{
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

// 5. Doghouse Prop
export const DoghouseProp: React.FC = () => {
  return (
    <g filter="url(#sketch-filter)">
      {/* Shadow */}
      <ellipse cx="0" cy="180" rx="140" ry="20" fill="#E2E8F0" />

      {/* Main Red Doghouse Base */}
      <polygon
        points="-100,50 -100,170 100,170 100,50 0,-30"
        fill="#EF4444"
        stroke="#1E293B"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />

      {/* Roof: Flat thick black line slanted */}
      <polygon
        points="-125,55 -120,40 0,-40 120,40 125,55 0,-25"
        fill="#1E293B"
        stroke="#1E293B"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />

      {/* Doorway/Entrance */}
      <path
        d="M -35,170 V 105 C -35,80 35,80 35,105 V 170 Z"
        fill="#1E293B"
        stroke="#1E293B"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Wooden plank lines on base */}
      <line x1="-100" y1="85" x2="100" y2="85" stroke="#1E293B" strokeWidth="3.5" strokeDasharray="10 5" />
      <line x1="-100" y1="125" x2="100" y2="125" stroke="#1E293B" strokeWidth="3.5" strokeDasharray="15 8" />
    </g>
  );
};

// 6. Tree Prop (Kite-eating Tree)
export const TreeProp: React.FC = () => {
  return (
    <g filter="url(#sketch-filter)">
      {/* Shadow */}
      <ellipse cx="0" cy="220" rx="110" ry="18" fill="#E2E8F0" />

      {/* Trunk (Scribbled, tilted Peanuts trunk) */}
      <path
        d="M -25,220 L -15,80 C -15,50 -25,20 -10,-10 C -5,-30 5,-20 15,10 C 20,40 15,70 25,220 Z"
        fill="#78350F"
        stroke="#1E293B"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      {/* Trunk bark texture lines */}
      <path d="M -8,190 Q -2,120 -8,70" fill="none" stroke="#1E293B" strokeWidth="3.5" />
      <path d="M 12,170 Q 8,100 12,50" fill="none" stroke="#1E293B" strokeWidth="3.5" />

      {/* Squiggly branches splitting */}
      <path d="M -12,20 C -40,5 -55,-25 -40,-35 C -35,-30 -25,-15 -8,0" fill="#78350F" stroke="#1E293B" strokeWidth="4" />
      <path d="M 12,15 C 40,-5 55,-35 40,-45 C 35,-40 25,-25 8,-2" fill="#78350F" stroke="#1E293B" strokeWidth="4" />

      {/* Messy Foliage (Snoopy-style hand-drawn loop circles) */}
      <path
        d="M -120,-80 C -150,-130 -100,-200 -50,-180 C -30,-220 50,-220 70,-170 C 120,-190 150,-120 110,-70 C 130,-20 80,30 20,10 C -30,25 -90,10 -120,-80 Z"
        fill="#22C55E"
        stroke="#1E293B"
        strokeWidth="5"
        strokeLinejoin="round"
        fillOpacity="0.9"
      />

      {/* Tangled kite string with red kite caught in the tree */}
      <g transform="translate(-10, -100)">
        {/* Kite */}
        <polygon
          points="0,-30 20,0 0,30 -20,0"
          fill="#EF4444"
          stroke="#1E293B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Cross spars */}
        <line x1="0" y1="-30" x2="0" y2="30" stroke="#1E293B" strokeWidth="2.5" />
        <line x1="-20" y1="0" x2="20" y2="0" stroke="#1E293B" strokeWidth="2.5" />
        {/* String/Tail with tiny bows */}
        <path d="M 0,30 C 15,60 5,90 -20,110" fill="none" stroke="#1E293B" strokeWidth="2.5" />
        <rect x="7" y="50" width="8" height="4" fill="#3B82F6" stroke="#1E293B" strokeWidth="1.5" transform="rotate(20)" />
        <rect x="3" y="75" width="8" height="4" fill="#FACC15" stroke="#1E293B" strokeWidth="1.5" transform="rotate(-15)" />
      </g>
    </g>
  );
};

// 7. Football Prop
export const FootballProp: React.FC = () => {
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

// 8. Cookie Prop
export const CookieProp: React.FC = () => {
  return (
    <g filter="url(#sketch-filter)">
      {/* Shadow */}
      <ellipse cx="0" cy="25" rx="30" ry="7" fill="#E2E8F0" />
      {/* Cookie circle */}
      <circle cx="0" cy="0" r="24" fill="#D97706" stroke="#1E293B" strokeWidth="4" />
      {/* Chocolate chips */}
      <circle cx="-10" cy="-8" r="3.5" fill="#451A03" />
      <circle cx="10" cy="-10" r="4" fill="#451A03" />
      <circle cx="-5" cy="8" r="3" fill="#451A03" />
      <circle cx="11" cy="5" r="3.5" fill="#451A03" />
      <circle cx="2" cy="-1" r="3" fill="#451A03" />
      {/* Hand-drawn crumbs */}
      <path d="M -30,12 L -26,16" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="-35" cy="18" r="2.5" fill="#D97706" stroke="#1E293B" strokeWidth="1.5" />
      <circle cx="28" cy="18" r="2" fill="#D97706" stroke="#1E293B" strokeWidth="1.5" />
    </g>
  );
};

// Background Renderer
export const BackgroundRenderer: React.FC<{ backgroundId: string }> = ({ backgroundId }) => {
  switch (backgroundId) {
    case "bg_schoolyard":
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
    case "bg_doghouse_hill":
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
    case "bg_classroom":
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
    case "bg_night_sky":
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
    default:
      return <rect width="1920" height="1080" fill="#FAF6EE" />;
  }
};

// Interactive Speech Bubble Component
export const SpeechBubble: React.FC<{
  text: string;
  charX: number;
  charY: number;
  flip?: boolean;
}> = ({ text, charX, charY, flip = false }) => {
  if (!text || text.trim() === "") return null;

  // Let's position the bubble offset above the character
  // If the character is at (charX, charY), speech bubble sits at roughly (charX, charY - 180)
  const bubbleY = charY - 160;
  const bubbleX = charX + (flip ? -140 : 140);

  // Measure text length to adjust width of the bubble dynamically
  const textLen = text.length;
  const bubbleWidth = Math.max(160, Math.min(450, textLen * 11 + 60));
  const bubbleHeight = Math.max(80, Math.min(220, Math.ceil(textLen / 28) * 26 + 45));

  // Speech bubble path with a hand-drawn pointer tail pointing down-left or down-right
  const rx = bubbleWidth / 2;
  const ry = bubbleHeight / 2;

  // Tail path: points back to character head at (charX, charY - 80)
  const tailStartX = flip ? rx - 40 : -rx + 40;
  const tailTargetX = flip ? rx + 80 : -rx - 80;
  const tailTargetY = ry + 80;

  const tailPath = `M ${tailStartX},${ry - 5} 
                    Q ${tailStartX + (flip ? 30 : -30)},${ry + 30} ${tailTargetX},${tailTargetY} 
                    Q ${tailStartX + (flip ? 10 : -10)},${ry + 15} ${tailStartX + (flip ? 20 : -20)},${ry - 5}`;

  return (
    <g transform={`translate(${bubbleX}, ${bubbleY})`} filter="url(#sketch-filter)">
      {/* Speech bubble bubble shape */}
      <rect
        x={-rx}
        y={-ry}
        width={bubbleWidth}
        height={bubbleHeight}
        rx="25"
        ry="25"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="3.5"
      />
      {/* Tail pointer */}
      <path
        d={tailPath}
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Bubble inner border cover to blend tail */}
      <path
        d={`M ${tailStartX - 5},${ry - 1.5} L ${tailStartX + (flip ? 25 : -25)},${ry - 1.5}`}
        stroke="#FFFFFF"
        strokeWidth="5.5"
      />

      {/* Comic text wrapped */}
      <foreignObject
        x={-rx + 20}
        y={-ry + 15}
        width={bubbleWidth - 40}
        height={bubbleHeight - 30}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontFamily: "'Patrick Hand', cursive",
            fontSize: "26px",
            lineHeight: "1.15",
            color: "#1E293B",
            overflow: "hidden",
            wordBreak: "break-word",
          }}
        >
          {text}
        </div>
      </foreignObject>
    </g>
  );
};
