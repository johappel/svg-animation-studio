import React from "react";
import { EmotionType } from "../../utils/types";

// Base filters and components
export { SketchFilter } from "./SketchFilter";
export { Wearables } from "./Wearables";
export { SpeechBubble } from "./SpeechBubble";

// Characters
import { Snoopy } from "./characters/Snoopy";
import { Charlie } from "./characters/Charlie";
import { Lucy } from "./characters/Lucy";
import { Woodstock } from "./characters/Woodstock";

export { Snoopy, Charlie, Lucy, Woodstock };

// Props
import { Doghouse } from "./props/Doghouse";
import { Tree } from "./props/Tree";
import { Football } from "./props/Football";
import { Cookie } from "./props/Cookie";

export { Doghouse, Tree, Football, Cookie };

// Backgrounds
import { Schoolyard } from "./backgrounds/Schoolyard";
import { DoghouseHill } from "./backgrounds/DoghouseHill";
import { Classroom } from "./backgrounds/Classroom";
import { NightSky } from "./backgrounds/NightSky";

export { Schoolyard, DoghouseHill, Classroom, NightSky };

// Registry definitions for dynamic rendering
export interface CharacterComponentProps {
  emotion: EmotionType;
  wearables: string[];
  isAngryActive?: boolean;
}

export const CHARACTER_REGISTRY: Record<string, React.FC<CharacterComponentProps>> = {
  char_snoopy: Snoopy,
  char_charlie: Charlie,
  char_lucy: Lucy,
  char_woodstock: Woodstock,
};

export const PROP_REGISTRY: Record<string, React.FC> = {
  prop_doghouse: Doghouse,
  prop_tree: Tree,
  prop_football: Football,
  prop_cookie: Cookie,
};

export const BACKGROUND_REGISTRY: Record<string, React.FC> = {
  bg_schoolyard: Schoolyard,
  bg_doghouse_hill: DoghouseHill,
  bg_classroom: Classroom,
  bg_night_sky: NightSky,
};
