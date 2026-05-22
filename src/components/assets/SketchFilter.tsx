import React from "react";

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
