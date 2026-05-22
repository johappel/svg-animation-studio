# Datei: `AGENTS.md`

# Agent Specification & Prompt: SVG "Snoopy-Style" Dialogue & Animation Studio

## 1. System Overview
This project is a web-based, interactive 2D Animation Studio specialized in minimal "Snoopy/Peanuts"-style SVG character animations and dialogues. Users can create scenes via a visual timeline, position characters and props on a stage, assign emotions/dialogues, and animate object properties.

### Core Tech Stack
- **Frontend Framework:** React (utilizing hooks for highly reactive state management)
- **Styling:** Tailwind CSS
- **Animation Engine:** GSAP (GreenSock Animation Platform) for timeline controls and SVG path/transform interpolations
- **Interactivity:** HTML5 Pointer Events

---

## 2. Central Data Architecture (The Project State)

The entire application state must be centralized and serializable. Every UI interaction mutates this single source of truth, which can be saved or exported as a JSON file.

```json
{
  "project_name": "Schulhof-Streit v1",
  "meta": { "width": 1920, "height": 1080, "fps": 30 },
  "custom_assets": [
    {
      "id": "custom_prop_balloon",
      "name": "Roter Ballon",
      "type": "prop",
      "svgContent": "<path d='M... Z' fill='#EF4444' />"
    }
  ],
  "timeline": [
    {
      "scene_id": "scene_1",
      "duration": 5.0,
      "background_id": "bg_schoolyard",
      "camera": { "zoom": 1.0, "x": 0, "y": 0 },
      "audio": { "background_sound": "ambient_playground", "volume": 0.5 },
      "elements": [
        {
          "id": "char_boy_01",
          "type": "character",
          "asset_id": "base_boy",
          "x": 400, "y": 600, "scaleX": 1, "scaleY": 1,
          "state": {
            "emotion": "angry",
            "dialogue": "Das ist mein Keks!",
            "wearables": ["prop_cap_red"]
          },
          "keyframes": [
            { "time_sec": 0.0, "x": 400, "y": 600 },
            { "time_sec": 2.0, "x": 600, "y": 600 }
          ]
        }
      ]
    }
  ]
}
```

---

## 3. UI Layout Specification

The interface follows a classic 5-zone IDE layout:

```
+------------------------------------------------------------------------------------+
|  [TOOLBAR] Project Name | New | Load | Save | Play/Pause | Export MP4/JSON        |
+------------------------------------------------------------------------------------+
| [LEFT SIDEBAR]     | [CENTER STAGE]                                | [RIGHT SIDEBAR] |
|                    | +-------------------------------------------+ | (Top: Inspector)|
| - Backgrounds      | |                                           | | Name, Dialogue|
| - Assets (Props)   | |              SVG STAGE                    | | Emotion Dropdn|
| - Characters       | |             (1920x1080)                   | | Wearables     |
| - Background Sounds| |                                           | |---------------|
|                    | +-------------------------------------------+ | (Bot: Options)  |
|                    |                                               | Move A -> B     |
|                    |                                               | Zoom (+/-)      |
|                    |                                               | Fade In/Out     |
+--------------------+-----------------------------------------------+-----------------+
| [TIMELINE]                                                                         |
| Scenes: [ Scene 1 (5s) ] [ Scene 2 (3s) ] [ + Add Scene ]                          |
+------------------------------------------------------------------------------------+
```
