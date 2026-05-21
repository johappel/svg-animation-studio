import { Project } from "./types";

export const PRESET_PLAYGROUND_DISPUTE: Project = {
  project_name: "Schulhof-Streit",
  meta: { width: 1920, height: 1080, fps: 30 },
  timeline: [
    {
      scene_id: "scene_1",
      name: "Der Keks-Streit",
      duration: 5.0,
      background_id: "bg_schoolyard",
      camera: { zoom: 1.0, x: 0, y: 0 },
      audio: { background_sound: "ambient_playground", volume: 0.5 },
      elements: [
        {
          id: "char_charlie_01",
          type: "character",
          asset_id: "char_charlie",
          x: 300,
          y: 740,
          scaleX: 1.3,
          scaleY: 1.3,
          rotation: 0,
          opacity: 1,
          state: {
            emotion: "angry",
            dialogue: "Das ist mein Keks, Snoopy!",
            wearables: ["wearable_cap_red"]
          },
          keyframes: [
            { time_sec: 0.0, x: 300, y: 740, scaleX: 1.3, scaleY: 1.3, rotation: 0, opacity: 1 },
            { time_sec: 2.0, x: 750, y: 740, scaleX: 1.3, scaleY: 1.3, rotation: 5, opacity: 1 },
            { time_sec: 5.0, x: 750, y: 740, scaleX: 1.3, scaleY: 1.3, rotation: 0, opacity: 1 }
          ]
        },
        {
          id: "char_snoopy_01",
          type: "character",
          asset_id: "char_snoopy",
          x: 1300,
          y: 750,
          scaleX: -1.3, // Facing left
          scaleY: 1.3,
          rotation: 0,
          opacity: 1,
          state: {
            emotion: "thinking",
            dialogue: "Mmh, leckerer Keks...",
            wearables: ["wearable_glasses"]
          },
          keyframes: [
            { time_sec: 0.0, x: 1300, y: 750, scaleX: -1.3, scaleY: 1.3, rotation: 0, opacity: 1 },
            { time_sec: 2.2, x: 1100, y: 750, scaleX: -1.3, scaleY: 1.3, rotation: -3, opacity: 1 },
            { time_sec: 5.0, x: 1100, y: 750, scaleX: -1.3, scaleY: 1.3, rotation: 0, opacity: 1 }
          ]
        },
        {
          id: "prop_cookie_01",
          type: "prop",
          asset_id: "prop_cookie",
          x: 920,
          y: 810,
          scaleX: 1.2,
          scaleY: 1.2,
          rotation: 0,
          opacity: 1,
          state: {
            emotion: "happy",
            dialogue: "",
            wearables: []
          },
          keyframes: []
        }
      ]
    },
    {
      scene_id: "scene_2",
      name: "Lucy greift ein",
      duration: 5.0,
      background_id: "bg_schoolyard",
      camera: { zoom: 1.15, x: -120, y: -60 },
      audio: { background_sound: "ambient_playground", volume: 0.6 },
      elements: [
        {
          id: "char_charlie_01",
          type: "character",
          asset_id: "char_charlie",
          x: 750,
          y: 740,
          scaleX: 1.3,
          scaleY: 1.3,
          rotation: 0,
          opacity: 1,
          state: {
            emotion: "sad",
            dialogue: "Aber er hat ihn einfach weggeschnappt!",
            wearables: ["wearable_cap_red"]
          },
          keyframes: []
        },
        {
          id: "char_snoopy_01",
          type: "character",
          asset_id: "char_snoopy",
          x: 1100,
          y: 750,
          scaleX: -1.3,
          scaleY: 1.3,
          rotation: 0,
          opacity: 1,
          state: {
            emotion: "happy",
            dialogue: "*Knusper Knusper*",
            wearables: ["wearable_glasses"]
          },
          keyframes: [
            { time_sec: 0.0, x: 1100, y: 750, scaleX: -1.3, scaleY: 1.3, rotation: 0, opacity: 1 },
            { time_sec: 2.0, x: 1100, y: 730, scaleX: -1.3, scaleY: 1.3, rotation: 10, opacity: 1 },
            { time_sec: 4.0, x: 1100, y: 750, scaleX: -1.3, scaleY: 1.3, rotation: 0, opacity: 1 }
          ]
        },
        {
          id: "char_lucy_01",
          type: "character",
          asset_id: "char_lucy",
          x: 1700,
          y: 740,
          scaleX: -1.3,
          scaleY: 1.3,
          rotation: 0,
          opacity: 1,
          state: {
            emotion: "angry",
            dialogue: "Hört sofort auf zu streiten! Die Psychiater-Stunde kostet 5 Cent!",
            wearables: []
          },
          keyframes: [
            { time_sec: 0.0, x: 1700, y: 740, scaleX: -1.3, scaleY: 1.3, rotation: 0, opacity: 1 },
            { time_sec: 1.8, x: 1420, y: 740, scaleX: -1.3, scaleY: 1.3, rotation: 0, opacity: 1 },
            { time_sec: 5.0, x: 1420, y: 740, scaleX: -1.3, scaleY: 1.3, rotation: 0, opacity: 1 }
          ]
        }
      ]
    }
  ]
};

export const PRESET_DOGHOUSE_NAP: Project = {
  project_name: "Hundehütten-Nickerchen",
  meta: { width: 1920, height: 1080, fps: 30 },
  timeline: [
    {
      scene_id: "scene_1",
      name: "Snoopy schläft",
      duration: 6.0,
      background_id: "bg_doghouse_hill",
      camera: { zoom: 1.1, x: -80, y: -40 },
      audio: { background_sound: "music_jazz", volume: 0.4 },
      elements: [
        {
          id: "prop_doghouse_01",
          type: "prop",
          asset_id: "prop_doghouse",
          x: 960,
          y: 650,
          scaleX: 1.5,
          scaleY: 1.5,
          rotation: 0,
          opacity: 1,
          state: { emotion: "happy", dialogue: "", wearables: [] },
          keyframes: []
        },
        {
          id: "char_snoopy_02",
          type: "character",
          asset_id: "char_snoopy",
          x: 960,
          y: 540,
          scaleX: 1.3,
          scaleY: 1.3,
          rotation: -90, // Lying flat on the roof!
          opacity: 1,
          state: {
            emotion: "happy",
            dialogue: "Zzz... Fliegenkuchen...",
            wearables: ["wearable_crown"]
          },
          keyframes: [
            { time_sec: 0.0, x: 960, y: 540, scaleX: 1.3, scaleY: 1.3, rotation: -90, opacity: 1 },
            { time_sec: 3.0, x: 960, y: 535, scaleX: 1.3, scaleY: 1.3, rotation: -88, opacity: 1 },
            { time_sec: 6.0, x: 960, y: 540, scaleX: 1.3, scaleY: 1.3, rotation: -90, opacity: 1 }
          ]
        },
        {
          id: "char_woodstock_01",
          type: "character",
          asset_id: "char_woodstock",
          x: 200,
          y: 250,
          scaleX: 0.9,
          scaleY: 0.9,
          rotation: 0,
          opacity: 1,
          state: {
            emotion: "happy",
            dialogue: "Piep!",
            wearables: ["wearable_scarf"]
          },
          keyframes: [
            { time_sec: 0.0, x: 200, y: 250, scaleX: 0.9, scaleY: 0.9, rotation: 0, opacity: 1 },
            { time_sec: 2.0, x: 650, y: 350, scaleX: 0.9, scaleY: 0.9, rotation: 15, opacity: 1 },
            { time_sec: 4.0, x: 800, y: 500, scaleX: 0.9, scaleY: 0.9, rotation: -10, opacity: 1 },
            { time_sec: 6.0, x: 1200, y: 200, scaleX: 0.9, scaleY: 0.9, rotation: 0, opacity: 1 }
          ]
        }
      ]
    }
  ]
};

export const PRESET_FOOTBALL_TRICK: Project = {
  project_name: "Der Football-Trick",
  meta: { width: 1920, height: 1080, fps: 30 },
  timeline: [
    {
      scene_id: "scene_1",
      name: "Der Anlauf",
      duration: 5.0,
      background_id: "bg_doghouse_hill",
      camera: { zoom: 1.0, x: 0, y: 0 },
      audio: { background_sound: "ambient_playground", volume: 0.5 },
      elements: [
        {
          id: "char_charlie_03",
          type: "character",
          asset_id: "char_charlie",
          x: 200,
          y: 740,
          scaleX: 1.3,
          scaleY: 1.3,
          rotation: 0,
          opacity: 1,
          state: {
            emotion: "happy",
            dialogue: "Dieses Mal treffe ich ihn ganz bestimmt!",
            wearables: []
          },
          keyframes: [
            { time_sec: 0.0, x: 200, y: 740, scaleX: 1.3, scaleY: 1.3, rotation: 0, opacity: 1 },
            { time_sec: 2.5, x: 800, y: 740, scaleX: 1.3, scaleY: 1.3, rotation: 10, opacity: 1 },
            { time_sec: 5.0, x: 800, y: 740, scaleX: 1.3, scaleY: 1.3, rotation: 0, opacity: 1 }
          ]
        },
        {
          id: "char_lucy_03",
          type: "character",
          asset_id: "char_lucy",
          x: 1050,
          y: 740,
          scaleX: -1.3,
          scaleY: 1.3,
          rotation: 0,
          opacity: 1,
          state: {
            emotion: "happy",
            dialogue: "Komm schon, Charlie Brown! Lauf!",
            wearables: []
          },
          keyframes: []
        },
        {
          id: "prop_football_03",
          type: "prop",
          asset_id: "prop_football",
          x: 950,
          y: 810,
          scaleX: 1.2,
          scaleY: 1.2,
          rotation: 0,
          opacity: 1,
          state: { emotion: "happy", dialogue: "", wearables: [] },
          keyframes: []
        }
      ]
    },
    {
      scene_id: "scene_2",
      name: "Der Fehlschlag",
      duration: 4.0,
      background_id: "bg_doghouse_hill",
      camera: { zoom: 1.2, x: -150, y: -60 },
      audio: { background_sound: "ambient_playground", volume: 0.7 },
      elements: [
        {
          id: "char_charlie_03",
          type: "character",
          asset_id: "char_charlie",
          x: 880,
          y: 740,
          scaleX: 1.3,
          scaleY: 1.3,
          rotation: 0,
          opacity: 1,
          state: {
            emotion: "surprised",
            dialogue: "AAUGH!!",
            wearables: []
          },
          keyframes: [
            { time_sec: 0.0, x: 880, y: 740, scaleX: 1.3, scaleY: 1.3, rotation: 0, opacity: 1 },
            { time_sec: 0.8, x: 920, y: 400, scaleX: 1.3, scaleY: 1.3, rotation: 120, opacity: 1 },
            { time_sec: 1.8, x: 980, y: 770, scaleX: 1.3, scaleY: -1.3, rotation: 180, opacity: 1 }, // Face down on floor
            { time_sec: 4.0, x: 980, y: 770, scaleX: 1.3, scaleY: -1.3, rotation: 180, opacity: 1 }
          ]
        },
        {
          id: "char_lucy_03",
          type: "character",
          asset_id: "char_lucy",
          x: 1150,
          y: 740,
          scaleX: -1.3,
          scaleY: 1.3,
          rotation: 0,
          opacity: 1,
          state: {
            emotion: "happy",
            dialogue: "Huch! Meine Hand ist ausgerutscht!",
            wearables: []
          },
          keyframes: []
        },
        {
          id: "prop_football_03",
          type: "prop",
          asset_id: "prop_football",
          x: 950,
          y: 810,
          scaleX: 1.2,
          scaleY: 1.2,
          rotation: 0,
          opacity: 1,
          state: { emotion: "happy", dialogue: "", wearables: [] },
          keyframes: [
            { time_sec: 0.0, x: 950, y: 810, scaleX: 1.2, scaleY: 1.2, rotation: 0, opacity: 1 },
            { time_sec: 0.2, x: 1100, y: 650, scaleX: 1.2, scaleY: 1.2, rotation: 45, opacity: 1 },
            { time_sec: 1.0, x: 1200, y: 790, scaleX: 1.2, scaleY: 1.2, rotation: 90, opacity: 1 },
            { time_sec: 4.0, x: 1200, y: 790, scaleX: 1.2, scaleY: 1.2, rotation: 90, opacity: 1 }
          ]
        }
      ]
    }
  ]
};
