export type EmotionType = "happy" | "sad" | "angry" | "surprised" | "thinking";

export interface CustomAsset {
  id: string;
  name: string;
  type: "character" | "prop" | "background";
  svgContent: string;
}

export interface Keyframe {
  time_sec: number;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  opacity: number;
}

export interface ElementState {
  emotion: EmotionType;
  dialogue: string;
  wearables: string[];
}

export interface SceneElement {
  id: string;
  type: "character" | "prop";
  asset_id: string;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  opacity: number;
  state: ElementState;
  keyframes: Keyframe[];
}

export interface CameraState {
  zoom: number;
  x: number;
  y: number;
}

export interface AudioState {
  background_sound: string;
  volume: number;
}

export interface Scene {
  scene_id: string;
  name: string;
  duration: number;
  background_id: string;
  camera: CameraState;
  audio: AudioState;
  elements: SceneElement[];
}

export interface CustomAsset {
  id: string;
  name: string;
  type: "character" | "prop" | "background";
  svgContent: string; // Standard-SVG (happy)
  emotions?: {
    happy?: string;
    sad?: string;
    angry?: string;
    surprised?: string;
    thinking?: string;
  };
}

export interface Project {
  project_name: string;
  meta: {
    width: number;
    height: number;
    fps: number;
  };
  timeline: Scene[];
  custom_assets?: CustomAsset[];
}
