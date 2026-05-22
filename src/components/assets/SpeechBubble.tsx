import React from "react";

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
