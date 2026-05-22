import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  Download,
  Upload,
  Sparkles,
  Volume2,
  VolumeX,
  Layers,
  Settings,
  Eye,
  Compass,
  Crown,
  Copy,
  Grid,
  Info,
  Key,
  Film,
  Square
} from "lucide-react";
import gsap from "gsap";

import {
  CHARACTER_REGISTRY,
  PROP_REGISTRY,
  BACKGROUND_REGISTRY,
  SpeechBubble,
  SketchFilter
} from "./components/assets";
import {
  SnoopyCharacter,
  CharlieCharacter,
  LucyCharacter,
  WoodstockCharacter,
  DoghouseProp,
  TreeProp,
  FootballProp,
  CookieProp,
  BackgroundRenderer
} from "./components/SnoopyAssets";
import { SvgDropZone } from "./components/SvgDropZone";
import { getCustomAssetsFromDB, saveCustomAssetToDB } from "./utils/db";

import {
  Project,
  Scene,
  SceneElement,
  Keyframe,
  ElementState
} from "./utils/types";

import {
  PRESET_PLAYGROUND_DISPUTE,
  PRESET_DOGHOUSE_NAP,
  PRESET_FOOTBALL_TRICK
} from "./utils/presets";

import { audioSynth } from "./utils/audioSynth";

export default function App() {
  // --- Project State ---
  const [project, setProject] = useState<Project>(PRESET_PLAYGROUND_DISPUTE);
  const [activeSceneId, setActiveSceneId] = useState<string>("scene_1");
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [playheadTime, setPlayheadTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  // Clip playback: plays ALL scenes back-to-back sequentially
  const [isPlayingClip, setIsPlayingClip] = useState<boolean>(false);
  const [clipSceneIndex, setClipSceneIndex] = useState<number>(0);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [snapToGrid, setSnapToGrid] = useState<boolean>(true);
  const [showGuideLines, setShowGuideLines] = useState<boolean>(false);
  const [activeLeftTab, setActiveLeftTab] = useState<"backgrounds" | "characters" | "props" | "audio">("characters");
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [importJsonText, setImportJsonText] = useState<string>("");
  const [importError, setImportError] = useState<string | null>(null);

  // Dragging state references
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement | null>(null);

  // GSAP animation reference
  const playheadTweenRef = useRef<gsap.core.Tween | null>(null);
  const playheadRef = useRef<number>(0);
  // Ref for synchronous access inside GSAP onComplete closures
  const isPlayingClipRef = useRef<boolean>(false);
  const clipSceneIndexRef = useRef<number>(0);

  // Find active scene object
  const activeScene = useMemo(() => {
    return project.timeline.find(s => s.scene_id === activeSceneId) || project.timeline[0];
  }, [project, activeSceneId]);

  // Sync playheadRef with playheadTime for GSAP use
  useEffect(() => {
    playheadRef.current = playheadTime;
  }, [playheadTime]);

  // Sync clip refs with states so GSAP onComplete closures can read current values
  useEffect(() => {
    isPlayingClipRef.current = isPlayingClip;
  }, [isPlayingClip]);
  useEffect(() => {
    clipSceneIndexRef.current = clipSceneIndex;
  }, [clipSceneIndex]);

  // Ensure activeScene is valid
  useEffect(() => {
    if (activeScene) {
      if (playheadTime > activeScene.duration) {
        setPlayheadTime(activeScene.duration);
      }
    }
  }, [activeSceneId, activeScene]);

  // Sync Audio Synthesizer Loop
  useEffect(() => {
    if (isPlaying && isSoundEnabled && activeScene) {
      const soundType = activeScene.audio.background_sound;
      const vol = activeScene.audio.volume;

      if (soundType === "music_jazz") {
        audioSynth.startJazzPianoLoop(vol);
      } else if (soundType === "ambient_playground") {
        audioSynth.startPlaygroundAmbient(vol);
      } else if (soundType === "music_night") {
        audioSynth.startNightAmbient(vol);
      } else {
        audioSynth.stopBackgroundSound();
      }
    } else {
      audioSynth.stopBackgroundSound();
    }

    return () => {
      audioSynth.stopBackgroundSound();
    };
  }, [isPlaying, isSoundEnabled, activeSceneId, activeScene?.audio.background_sound]);

  // --- Interpolate Element Positions at Current Time ---
  const interpolateElementState = (element: SceneElement, time: number) => {
    if (!element.keyframes || element.keyframes.length === 0) {
      return {
        x: element.x,
        y: element.y,
        scaleX: element.scaleX,
        scaleY: element.scaleY,
        rotation: element.rotation,
        opacity: element.opacity,
      };
    }

    // Sort keyframes by time
    const sorted = [...element.keyframes].sort((a, b) => a.time_sec - b.time_sec);

    // Bounds checking
    if (time <= sorted[0].time_sec) {
      return {
        x: sorted[0].x,
        y: sorted[0].y,
        scaleX: sorted[0].scaleX,
        scaleY: sorted[0].scaleY,
        rotation: sorted[0].rotation,
        opacity: sorted[0].opacity,
      };
    }
    if (time >= sorted[sorted.length - 1].time_sec) {
      const last = sorted[sorted.length - 1];
      return {
        x: last.x,
        y: last.y,
        scaleX: last.scaleX,
        scaleY: last.scaleY,
        rotation: last.rotation,
        opacity: last.opacity,
      };
    }

    // Find bounding keyframes
    let prev = sorted[0];
    let next = sorted[sorted.length - 1];
    for (let i = 0; i < sorted.length - 1; i++) {
      if (sorted[i].time_sec <= time && sorted[i + 1].time_sec >= time) {
        prev = sorted[i];
        next = sorted[i + 1];
        break;
      }
    }

    const duration = next.time_sec - prev.time_sec;
    const factor = duration === 0 ? 0 : (time - prev.time_sec) / duration;

    // Smooth cubic ease-in-out curve
    const easeFactor = factor < 0.5 ? 4 * factor * factor * factor : 1 - Math.pow(-2 * factor + 2, 3) / 2;

    return {
      x: prev.x + easeFactor * (next.x - prev.x),
      y: prev.y + easeFactor * (next.y - prev.y),
      scaleX: prev.scaleX + easeFactor * (next.scaleX - prev.scaleX),
      scaleY: prev.scaleY + easeFactor * (next.scaleY - prev.scaleY),
      rotation: prev.rotation + easeFactor * (next.rotation - prev.rotation),
      opacity: prev.opacity + easeFactor * (next.opacity - prev.opacity),
    };
  };

  // Get active scene's elements evaluated at the current playhead time
  const evaluatedElements = useMemo(() => {
    if (!activeScene) return [];
    return activeScene.elements.map(el => {
      const state = interpolateElementState(el, playheadTime);
      return {
        ...el,
        x: state.x,
        y: state.y,
        scaleX: state.scaleX,
        scaleY: state.scaleY,
        rotation: state.rotation,
        opacity: state.opacity,
      };
    });
  }, [activeScene, playheadTime]);

  const selectedElement = useMemo(() => {
    if (!selectedElementId || !activeScene) return null;
    return activeScene.elements.find(el => el.id === selectedElementId) || null;
  }, [selectedElementId, activeScene]);

  // Selected element evaluated state
  const selectedElementEvaluated = useMemo(() => {
    if (!selectedElement) return null;
    return evaluatedElements.find(el => el.id === selectedElement.id) || null;
  }, [selectedElement, evaluatedElements]);

  // --- GSAP Playback Controls ---
  const handlePlayPause = () => {
    if (isPlaying) {
      if (playheadTweenRef.current) {
        playheadTweenRef.current.kill();
        playheadTweenRef.current = null;
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);

      // Reset to 0 if at the end of the scene
      const startSec = playheadTime >= activeScene.duration ? 0 : playheadTime;
      if (startSec === 0) {
        setPlayheadTime(0);
      }

      const animObject = { time: startSec };

      playheadTweenRef.current = gsap.to(animObject, {
        time: activeScene.duration,
        duration: activeScene.duration - startSec,
        ease: "none",
        onUpdate: () => {
          setPlayheadTime(animObject.time);
        },
        onComplete: () => {
          setIsPlaying(false);
          playheadTweenRef.current = null;

          // Clip mode: automatically advance to the next scene in the timeline
          if (isPlayingClipRef.current) {
            const nextIndex = clipSceneIndexRef.current + 1;
            if (nextIndex < project.timeline.length) {
              // Advance to the next scene and continue playback
              setClipSceneIndex(nextIndex);
              clipSceneIndexRef.current = nextIndex;
              setActiveSceneId(project.timeline[nextIndex].scene_id);
              setPlayheadTime(0);
              setTimeout(() => {
                // Restart the playhead animation on the new scene
                const nextScene = project.timeline[nextIndex];
                const animObject = { time: 0 };
                setIsPlaying(true);
                playheadTweenRef.current = gsap.to(animObject, {
                  time: nextScene.duration,
                  duration: nextScene.duration,
                  ease: "none",
                  onUpdate: () => setPlayheadTime(animObject.time),
                  onComplete: () => {
                    // Trigger recursive advance via a tiny re-call to handlePlayPause's onComplete behavior
                    setIsPlaying(false);
                    playheadTweenRef.current = null;
                    // Re-enter clip-advance loop by invoking the clip advancement directly
                    advanceClip();
                  }
                });
              }, 250);
              return;
            } else {
              // End of clip: reset states
              setIsPlayingClip(false);
              isPlayingClipRef.current = false;
              setClipSceneIndex(0);
              clipSceneIndexRef.current = 0;
              return;
            }
          }

          if (isLooping) {
            setPlayheadTime(0);
            // Trigger repeat
            setTimeout(() => {
              handlePlayPause();
            }, 100);
          }
        }
      });
    }
  };

  // Recursively advance the clip to the next scene after the current one completes.
  // This function is called from onComplete closures to avoid stale state issues.
  const advanceClip = () => {
    const nextIndex = clipSceneIndexRef.current + 1;
    if (nextIndex < project.timeline.length) {
      setClipSceneIndex(nextIndex);
      clipSceneIndexRef.current = nextIndex;
      setActiveSceneId(project.timeline[nextIndex].scene_id);
      setPlayheadTime(0);
      setTimeout(() => {
        const nextScene = project.timeline[nextIndex];
        const animObject = { time: 0 };
        setIsPlaying(true);
        playheadTweenRef.current = gsap.to(animObject, {
          time: nextScene.duration,
          duration: nextScene.duration,
          ease: "none",
          onUpdate: () => setPlayheadTime(animObject.time),
          onComplete: () => {
            setIsPlaying(false);
            playheadTweenRef.current = null;
            advanceClip();
          }
        });
      }, 250);
    } else {
      // Entire clip finished
      setIsPlayingClip(false);
      isPlayingClipRef.current = false;
      setClipSceneIndex(0);
      clipSceneIndexRef.current = 0;
    }
  };

  // Start playing the entire project timeline (all scenes back-to-back)
  const handlePlayEntireClip = () => {
    // If already playing a clip, stop it first
    if (isPlayingClipRef.current) {
      handleStopClip();
      return;
    }

    if (project.timeline.length === 0) return;

    // Reset to the very first scene
    const firstScene = project.timeline[0];
    setActiveSceneId(firstScene.scene_id);
    setClipSceneIndex(0);
    clipSceneIndexRef.current = 0;
    setIsPlayingClip(true);
    isPlayingClipRef.current = true;
    setPlayheadTime(0);

    // Begin the first scene's playhead animation
    setTimeout(() => {
      const animObject = { time: 0 };
      setIsPlaying(true);
      playheadTweenRef.current = gsap.to(animObject, {
        time: firstScene.duration,
        duration: firstScene.duration,
        ease: "none",
        onUpdate: () => setPlayheadTime(animObject.time),
        onComplete: () => {
          setIsPlaying(false);
          playheadTweenRef.current = null;
          advanceClip();
        }
      });
    }, 100);
  };

  // Stop clip playback (also kills any ongoing playhead tween)
  const handleStopClip = () => {
    if (playheadTweenRef.current) {
      playheadTweenRef.current.kill();
      playheadTweenRef.current = null;
    }
    setIsPlaying(false);
    setIsPlayingClip(false);
    isPlayingClipRef.current = false;
    setClipSceneIndex(0);
    clipSceneIndexRef.current = 0;
  };

  const handleStop = () => {
    if (playheadTweenRef.current) {
      playheadTweenRef.current.kill();
      playheadTweenRef.current = null;
    }
    setIsPlaying(false);
    setPlayheadTime(0);
  };

  // --- Pointer Drag & Drop Stage Logic ---
  const getSvgCoordinates = (e: React.PointerEvent<any>) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    
    // Viewport relative coordinates (0 to 1920, 0 to 1080)
    const svgX = ((e.clientX - rect.left) / rect.width) * 1920;
    const svgY = ((e.clientY - rect.top) / rect.height) * 1080;

    // Adjust for camera translation and zoom
    const zoom = activeScene.camera.zoom;
    const camX = activeScene.camera.x;
    const camY = activeScene.camera.y;

    // Apply inverse transformation: X_elem = (X_svg / zoom) - camX
    return {
      x: (svgX / zoom) - camX,
      y: (svgY / zoom) - camY,
    };
  };

  const handleStagePointerDown = (e: React.PointerEvent<any>, elementId?: string) => {
    if (isPlaying) {
      // Pause animation if they try to edit/drag during playback
      handlePlayPause();
    }

    if (elementId) {
      e.stopPropagation();
      setSelectedElementId(elementId);
      setIsDragging(true);

      const targetEl = activeScene.elements.find(el => el.id === elementId);
      if (!targetEl) return;

      const clickCoords = getSvgCoordinates(e);
      const evalState = interpolateElementState(targetEl, playheadTime);

      // Save offset between click and element position
      dragStartOffset.current = {
        x: clickCoords.x - evalState.x,
        y: clickCoords.y - evalState.y,
      };
      
      // Focus target element
      svgRef.current?.setPointerCapture(e.pointerId);
    } else {
      // Clicked on empty stage
      setSelectedElementId(null);
    }
  };

  const handleStagePointerMove = (e: React.PointerEvent<any>) => {
    if (!isDragging || !selectedElementId || !activeScene) return;

    const coords = getSvgCoordinates(e);
    let newX = coords.x - dragStartOffset.current.x;
    let newY = coords.y - dragStartOffset.current.y;

    if (snapToGrid) {
      newX = Math.round(newX / 20) * 20;
      newY = Math.round(newY / 20) * 20;
    }

    // Keep coordinates within a reasonable bounding area
    newX = Math.max(-500, Math.min(2400, newX));
    newY = Math.max(-500, Math.min(1500, newY));

    // Update coordinates in the active scene's elements list
    const updatedElements = activeScene.elements.map(el => {
      if (el.id !== selectedElementId) return el;

      // Decide if we update a keyframe or base properties
      const keyframeIndex = el.keyframes.findIndex(k => Math.abs(k.time_sec - playheadTime) < 0.08);

      if (keyframeIndex >= 0) {
        // Update existing keyframe
        const updatedKeyframes = [...el.keyframes];
        updatedKeyframes[keyframeIndex] = {
          ...updatedKeyframes[keyframeIndex],
          x: newX,
          y: newY,
        };
        return {
          ...el,
          x: playheadTime === 0 ? newX : el.x,
          y: playheadTime === 0 ? newY : el.y,
          keyframes: updatedKeyframes,
        };
      } else if (el.keyframes.length > 0) {
        // Add new keyframe at current scrub time
        const newKeyframe: Keyframe = {
          time_sec: Math.round(playheadTime * 100) / 100,
          x: newX,
          y: newY,
          scaleX: el.scaleX,
          scaleY: el.scaleY,
          rotation: el.rotation,
          opacity: el.opacity,
        };
        return {
          ...el,
          keyframes: [...el.keyframes, newKeyframe].sort((a, b) => a.time_sec - b.time_sec),
        };
      } else {
        // No keyframes exist, update base attributes
        return { ...el, x: newX, y: newY };
      }
    });

    const updatedScene = { ...activeScene, elements: updatedElements };
    const updatedTimeline = project.timeline.map(s =>
      s.scene_id === activeSceneId ? updatedScene : s
    );

    setProject({ ...project, timeline: updatedTimeline });
  };

  const handleStagePointerUp = (e: React.PointerEvent<any>) => {
    setIsDragging(false);
    svgRef.current?.releasePointerCapture(e.pointerId);
  };

  // --- Sidebar Element Creation ---
  const handleAddElement = (assetId: string, type: "character" | "prop") => {
    if (!activeScene) return;

    // Check default scale and dimensions
    const isWoodstock = assetId.includes("woodstock");
    const initialScale = isWoodstock ? 0.9 : 1.3;

    const newElement: SceneElement = {
      id: `${assetId}_${Date.now()}`,
      type,
      asset_id: assetId,
      x: 960,
      y: 700,
      scaleX: initialScale,
      scaleY: initialScale,
      rotation: 0,
      opacity: 1,
      state: {
        emotion: "happy",
        dialogue: type === "character" ? "Hallo!" : "",
        wearables: []
      },
      keyframes: [
        {
          time_sec: 0.0,
          x: 960,
          y: 700,
          scaleX: initialScale,
          scaleY: initialScale,
          rotation: 0,
          opacity: 1
        }
      ]
    };

    const updatedScene = {
      ...activeScene,
      elements: [...activeScene.elements, newElement]
    };

    const updatedTimeline = project.timeline.map(s =>
      s.scene_id === activeSceneId ? updatedScene : s
    );

    setProject({ ...project, timeline: updatedTimeline });
    setSelectedElementId(newElement.id);

    // Play a happy synthesizer chirp or voice
    if (isSoundEnabled) {
      if (assetId.includes("woodstock")) {
        audioSynth.playWoodstockChirp();
      } else {
        audioSynth.playCuteSynthLaugh();
      }
    }
  };

  // Delete element
  const handleDeleteElement = (id: string) => {
    if (!activeScene) return;
    const updatedElements = activeScene.elements.filter(el => el.id !== id);
    const updatedScene = { ...activeScene, elements: updatedElements };
    const updatedTimeline = project.timeline.map(s =>
      s.scene_id === activeSceneId ? updatedScene : s
    );
    setProject({ ...project, timeline: updatedTimeline });
    setSelectedElementId(null);
  };

  // Update selected element state details (dialogue, emotion, wearables)
  const handleUpdateElementState = (fields: Partial<ElementState>) => {
    if (!selectedElement || !activeScene) return;
    
    const updatedElements = activeScene.elements.map(el => {
      if (el.id !== selectedElement.id) return el;
      return {
        ...el,
        state: {
          ...el.state,
          ...fields
        }
      };
    });

    const updatedScene = { ...activeScene, elements: updatedElements };
    const updatedTimeline = project.timeline.map(s =>
      s.scene_id === activeSceneId ? updatedScene : s
    );
    setProject({ ...project, timeline: updatedTimeline });
  };

  // Update selected element keyframe parameters or base transform parameters
  const handleUpdateElementTransform = (fields: Partial<Omit<SceneElement, "id" | "type" | "asset_id" | "state" | "keyframes">>) => {
    if (!selectedElement || !activeScene) return;

    const updatedElements = activeScene.elements.map(el => {
      if (el.id !== selectedElement.id) return el;

      // Find if we have a keyframe at/near playhead
      const keyframeIndex = el.keyframes.findIndex(k => Math.abs(k.time_sec - playheadTime) < 0.08);

      if (keyframeIndex >= 0) {
        // Update keyframe
        const updatedKeyframes = [...el.keyframes];
        updatedKeyframes[keyframeIndex] = {
          ...updatedKeyframes[keyframeIndex],
          ...fields
        } as Keyframe;

        return {
          ...el,
          // Sync base values if editing at 0.0s
          x: playheadTime === 0 && fields.x !== undefined ? fields.x : el.x,
          y: playheadTime === 0 && fields.y !== undefined ? fields.y : el.y,
          scaleX: playheadTime === 0 && fields.scaleX !== undefined ? fields.scaleX : el.scaleX,
          scaleY: playheadTime === 0 && fields.scaleY !== undefined ? fields.scaleY : el.scaleY,
          rotation: playheadTime === 0 && fields.rotation !== undefined ? fields.rotation : el.rotation,
          opacity: playheadTime === 0 && fields.opacity !== undefined ? fields.opacity : el.opacity,
          keyframes: updatedKeyframes
        };
      } else {
        // Update base properties
        return {
          ...el,
          ...fields
        };
      }
    });

    const updatedScene = { ...activeScene, elements: updatedElements };
    const updatedTimeline = project.timeline.map(s =>
      s.scene_id === activeSceneId ? updatedScene : s
    );
    setProject({ ...project, timeline: updatedTimeline });
  };

  // Add keyframe manually at current time
  const handleAddKeyframe = () => {
    if (!selectedElement || !activeScene) return;

    // Check if keyframe already exists at current playhead time
    const exists = selectedElement.keyframes.some(k => Math.abs(k.time_sec - playheadTime) < 0.05);
    if (exists) return;

    const evalState = interpolateElementState(selectedElement, playheadTime);
    const newKeyframe: Keyframe = {
      time_sec: Math.round(playheadTime * 100) / 100,
      x: evalState.x,
      y: evalState.y,
      scaleX: evalState.scaleX,
      scaleY: evalState.scaleY,
      rotation: evalState.rotation,
      opacity: evalState.opacity
    };

    const updatedElements = activeScene.elements.map(el => {
      if (el.id !== selectedElement.id) return el;
      return {
        ...el,
        keyframes: [...el.keyframes, newKeyframe].sort((a, b) => a.time_sec - b.time_sec)
      };
    });

    const updatedScene = { ...activeScene, elements: updatedElements };
    const updatedTimeline = project.timeline.map(s =>
      s.scene_id === activeSceneId ? updatedScene : s
    );
    setProject({ ...project, timeline: updatedTimeline });
  };

  // Delete keyframe
  const handleDeleteKeyframe = (timeSec: number) => {
    if (!selectedElement || !activeScene) return;

    const updatedElements = activeScene.elements.map(el => {
      if (el.id !== selectedElement.id) return el;
      return {
        ...el,
        keyframes: el.keyframes.filter(k => k.time_sec !== timeSec)
      };
    });

    const updatedScene = { ...activeScene, elements: updatedElements };
    const updatedTimeline = project.timeline.map(s =>
      s.scene_id === activeSceneId ? updatedScene : s
    );
    setProject({ ...project, timeline: updatedTimeline });
  };

  // Update keyframe coordinates/values directly
  const handleUpdateSpecificKeyframe = (timeSec: number, fields: Partial<Keyframe>) => {
    if (!selectedElement || !activeScene) return;

    const updatedElements = activeScene.elements.map(el => {
      if (el.id !== selectedElement.id) return el;
      const updatedKeyframes = el.keyframes.map(k => {
        if (k.time_sec !== timeSec) return k;
        return { ...k, ...fields };
      });
      return {
        ...el,
        keyframes: updatedKeyframes
      };
    });

    const updatedScene = { ...activeScene, elements: updatedElements };
    const updatedTimeline = project.timeline.map(s =>
      s.scene_id === activeSceneId ? updatedScene : s
    );
    setProject({ ...project, timeline: updatedTimeline });
  };

  // --- Active Scene Metadata Updates ---
  const handleUpdateSceneProperties = (fields: Partial<Omit<Scene, "scene_id" | "elements">>) => {
    if (!activeScene) return;

    const updatedScene = {
      ...activeScene,
      ...fields
    };

    const updatedTimeline = project.timeline.map(s =>
      s.scene_id === activeSceneId ? updatedScene : s
    );

    setProject({ ...project, timeline: updatedTimeline });
  };

  // --- Timeline Scenes Management ---
  const handleAddScene = () => {
    const nextId = `scene_${Date.now()}`;
    const newScene: Scene = {
      scene_id: nextId,
      name: `Szene ${project.timeline.length + 1}`,
      duration: 5.0,
      background_id: "bg_schoolyard",
      camera: { zoom: 1.0, x: 0, y: 0 },
      audio: { background_sound: "ambient_playground", volume: 0.5 },
      elements: []
    };

    setProject({
      ...project,
      timeline: [...project.timeline, newScene]
    });
    setActiveSceneId(nextId);
    setPlayheadTime(0);
  };

  const handleDuplicateScene = () => {
    if (!activeScene) return;
    const nextId = `scene_${Date.now()}`;
    const duplicatedScene: Scene = {
      ...activeScene,
      scene_id: nextId,
      name: `${activeScene.name} (Kopie)`
    };

    setProject({
      ...project,
      timeline: [...project.timeline, duplicatedScene]
    });
    setActiveSceneId(nextId);
    setPlayheadTime(0);
  };

  const handleDeleteActiveScene = () => {
    if (project.timeline.length <= 1) return;
    
    const remainingScenes = project.timeline.filter(s => s.scene_id !== activeSceneId);
    setProject({
      ...project,
      timeline: remainingScenes
    });
    setActiveSceneId(remainingScenes[0].scene_id);
    setPlayheadTime(0);
  };

  // --- Preset Loaders ---
  const handleLoadPreset = (preset: Project) => {
    setProject(preset);
    setActiveSceneId(preset.timeline[0].scene_id);
    setSelectedElementId(null);
    setPlayheadTime(0);
    setIsPlaying(false);
  };

  const handleNewProject = () => {
    const emptyProj: Project = {
      project_name: "Unbenanntes Projekt",
      meta: { width: 1920, height: 1080, fps: 30 },
      timeline: [
        {
          scene_id: "scene_1",
          name: "Szene 1",
          duration: 5.0,
          background_id: "bg_schoolyard",
          camera: { zoom: 1.0, x: 0, y: 0 },
          audio: { background_sound: "ambient_playground", volume: 0.5 },
          elements: []
        }
      ]
    };
    handleLoadPreset(emptyProj);
  };

  // --- JSON Export & Import ---
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(project, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${project.project_name.toLowerCase().replace(/\s+/g, "-")}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (!parsed.project_name || !parsed.timeline || !Array.isArray(parsed.timeline)) {
        throw new Error("Ungültiges Dateiformat. Fehlende Projektparameter.");
      }
      setProject(parsed);
      setActiveSceneId(parsed.timeline[0].scene_id);
      setSelectedElementId(null);
      setPlayheadTime(0);
      setIsPlaying(false);
      setShowImportModal(false);
      setImportJsonText("");
      setImportError(null);
    } catch (err: any) {
      setImportError(err.message || "Parsing fehlgeschlagen.");
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-slate-950 font-sans text-slate-100 select-none">
      
      {/* 1. TOP TOOLBAR */}
      <header className="flex h-14 items-center justify-between border-b border-slate-800 bg-slate-900 px-4 shadow-sm z-30">
        
        {/* Project Name & Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-500 text-slate-950 shadow-md font-bold text-lg font-comic">
              S
            </span>
            <input
              type="text"
              value={project.project_name}
              onChange={(e) => setProject({ ...project, project_name: e.target.value })}
              className="bg-transparent font-semibold text-lg text-yellow-500 focus:border-b focus:border-yellow-500 focus:outline-none w-48 font-handwriting tracking-wide"
            />
          </div>
          <div className="h-4 w-px bg-slate-800" />
          
          {/* Quick presets */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-yellow-500" />
              Presets:
            </span>
            <button
              onClick={() => handleLoadPreset(PRESET_PLAYGROUND_DISPUTE)}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-all ${
                project.project_name === "Schulhof-Streit"
                  ? "bg-yellow-500 text-slate-950 shadow"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Keks-Streit
            </button>
            <button
              onClick={() => handleLoadPreset(PRESET_DOGHOUSE_NAP)}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-all ${
                project.project_name === "Hundehütten-Nickerchen"
                  ? "bg-yellow-500 text-slate-950 shadow"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Hüttenschlaf
            </button>
            <button
              onClick={() => handleLoadPreset(PRESET_FOOTBALL_TRICK)}
              className={`rounded px-2.5 py-1 text-xs font-medium transition-all ${
                project.project_name === "Der Football-Trick"
                  ? "bg-yellow-500 text-slate-950 shadow"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Football-Trick
            </button>
          </div>
        </div>

        {/* Global Controls & Tools */}
        <div className="flex items-center gap-4">
          
          {/* View guides and snapping */}
          <div className="flex items-center gap-2 rounded-lg bg-slate-800 p-0.5">
            <button
              onClick={() => setSnapToGrid(!snapToGrid)}
              title="An Raster ausrichten (20px)"
              className={`rounded p-1 transition-all ${
                snapToGrid ? "bg-slate-700 text-yellow-500" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setShowGuideLines(!showGuideLines)}
              title="Guides/Koordinaten anzeigen"
              className={`rounded p-1 transition-all ${
                showGuideLines ? "bg-slate-700 text-yellow-500" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsSoundEnabled(!isSoundEnabled)}
              title={isSoundEnabled ? "Sound stummschalten" : "Sound aktivieren"}
              className={`rounded p-1 transition-all ${
                isSoundEnabled ? "bg-slate-700 text-yellow-500" : "text-slate-500 hover:text-slate-400"
              }`}
            >
              {isSoundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          {/* Play Entire Clip Button (all scenes back-to-back) */}
          <button
            onClick={handlePlayEntireClip}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all shadow-md active:scale-95 ${
              isPlayingClip
                ? "bg-red-500 text-white hover:bg-red-600 ring-2 ring-red-400/60 ring-offset-2 ring-offset-slate-900"
                : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-400 hover:to-red-400"
            }`}
            title={
              isPlayingClip
                ? "Clip-Playback stoppen"
                : "Alle Szenen hintereinander abspielen"
            }
          >
            {isPlayingClip ? (
              <>
                <Square className="h-3.5 w-3.5 fill-current" />
                Clip stoppen ({clipSceneIndex + 1}/{project.timeline.length})
              </>
            ) : (
              <>
                <Film className="h-3.5 w-3.5" />
                Clip abspielen
              </>
            )}
          </button>

          <div className="h-4 w-px bg-slate-800" />

          {/* New / Export / Import Project */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleNewProject}
              className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
            >
              Neu
            </button>
            <button
              onClick={() => setShowImportModal(true)}
              className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
            >
              <Upload className="h-3.5 w-3.5" />
              Import JSON
            </button>
            <button
              onClick={handleExportJson}
              className="flex items-center gap-1.5 rounded-lg bg-yellow-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-yellow-400 shadow-md transition"
            >
              <Download className="h-3.5 w-3.5" />
              Export JSON
            </button>
          </div>
        </div>

      </header>

      {/* MAIN IDE WORKSPACE */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* 2. LEFT SIDEBAR */}
        <aside className="w-80 border-r border-slate-800 bg-slate-900/50 flex flex-col z-20">
          {/* Side Nav Tabs */}
          <div className="flex border-b border-slate-800">
            <button
              onClick={() => setActiveLeftTab("characters")}
              className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 ${
                activeLeftTab === "characters" ? "border-yellow-500 text-yellow-500 bg-slate-800/30" : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              Figuren
            </button>
            <button
              onClick={() => setActiveLeftTab("props")}
              className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 ${
                activeLeftTab === "props" ? "border-yellow-500 text-yellow-500 bg-slate-800/30" : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              Requisiten
            </button>
            <button
              onClick={() => setActiveLeftTab("backgrounds")}
              className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 ${
                activeLeftTab === "backgrounds" ? "border-yellow-500 text-yellow-500 bg-slate-800/30" : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              Hintergrund
            </button>
            <button
              onClick={() => setActiveLeftTab("audio")}
              className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-all border-b-2 ${
                activeLeftTab === "audio" ? "border-yellow-500 text-yellow-500 bg-slate-800/30" : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              Sounds
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* CHARACTER TAB */}
            {activeLeftTab === "characters" && (
              <div className="space-y-4">
                <div className="rounded-lg bg-slate-800/50 p-3 border border-slate-800 flex items-start gap-2.5">
                  <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-xs leading-relaxed text-slate-400">
                    Klicke auf eine Snoopy-Style Figur, um sie auf der Bühne zu platzieren. Du kannst sie anschließend frei verschieben.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "char_snoopy", name: "Snoopy", desc: "Verwegener Beagle", color: "bg-red-500" },
                    { id: "char_charlie", name: "Charlie", desc: "Kultiger Junge", color: "bg-yellow-500" },
                    { id: "char_lucy", name: "Lucy", desc: "Forsche Psychiaterin", color: "bg-blue-500" },
                    { id: "char_woodstock", name: "Woodstock", desc: "Zarter gelber Vogel", color: "bg-yellow-400" },
                  ].map(char => (
                    <button
                      key={char.id}
                      onClick={() => handleAddElement(char.id, "character")}
                      className="group flex flex-col items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-3 text-center transition-all hover:-translate-y-0.5 hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/10 cursor-pointer"
                    >
                      <div className="h-20 w-20 flex items-center justify-center rounded-lg bg-slate-800/50 border border-slate-700/50 overflow-hidden mb-2 relative">
                        {/* Mini SVG Render for Preview */}
                        <svg viewBox="-80 -80 160 210" className="h-16 w-16">
                          {char.id === "char_snoopy" && <SnoopyCharacter emotion="happy" wearables={[]} />}
                          {char.id === "char_charlie" && <CharlieCharacter emotion="happy" wearables={[]} />}
                          {char.id === "char_lucy" && <LucyCharacter emotion="happy" wearables={[]} />}
                          {char.id === "char_woodstock" && <WoodstockCharacter emotion="happy" wearables={[]} />}
                        </svg>
                      </div>
                      <div>
                        <span className="block text-xs font-semibold text-slate-200 group-hover:text-yellow-500">{char.name}</span>
                        <span className="block text-[10px] text-slate-500 mt-0.5">{char.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PROPS TAB */}
            {activeLeftTab === "props" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "prop_doghouse", name: "Hundehütte", desc: "Klassisch Rot", type: "prop" },
                    { id: "prop_tree", name: "Kite-Baum", desc: "Drachenfressend", type: "prop" },
                    { id: "prop_football", name: "Football", desc: "Leder-Klassiker", type: "prop" },
                    { id: "prop_cookie", name: "Schokokeks", desc: "Zankobjekt", type: "prop" },
                  ].map(prop => (
                    <button
                      key={prop.id}
                      onClick={() => handleAddElement(prop.id, "prop")}
                      className="group flex flex-col items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-3 text-center transition-all hover:-translate-y-0.5 hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/10 cursor-pointer"
                    >
                      <div className="h-20 w-20 flex items-center justify-center rounded-lg bg-slate-800/50 border border-slate-700/50 overflow-hidden mb-2">
                        <svg viewBox="-120 -100 240 240" className="h-16 w-16">
                          {prop.id === "prop_doghouse" && <g transform="scale(0.8)"><DoghouseProp /></g>}
                          {prop.id === "prop_tree" && <g transform="scale(0.5) translate(0, -60)"><TreeProp /></g>}
                          {prop.id === "prop_football" && <g transform="scale(1.8)"><FootballProp /></g>}
                          {prop.id === "prop_cookie" && <g transform="scale(2)"><CookieProp /></g>}
                        </svg>
                      </div>
                      <div>
                        <span className="block text-xs font-semibold text-slate-200 group-hover:text-yellow-500">{prop.name}</span>
                        <span className="block text-[10px] text-slate-500 mt-0.5">{prop.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* BACKGROUND TAB */}
            {activeLeftTab === "backgrounds" && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 font-medium mb-2">Wähle ein Hintergrundbild:</p>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: "bg_schoolyard", name: "Schulhof", desc: "Ziegelwand & Hopse-Spiel" },
                    { id: "bg_doghouse_hill", name: "Hügelkuppe", desc: "Unter strahlendem Himmel" },
                    { id: "bg_classroom", name: "Klassenzimmer", desc: "Tafel & Kreideskizzen" },
                    { id: "bg_night_sky", name: "Sternennacht", desc: "Ruhe und Mondschein" },
                  ].map(bg => (
                    <button
                      key={bg.id}
                      onClick={() => handleUpdateSceneProperties({ background_id: bg.id })}
                      className={`group flex items-center gap-3 rounded-xl border p-2.5 text-left transition-all ${
                        activeScene.background_id === bg.id
                          ? "border-yellow-500 bg-yellow-500/10 shadow"
                          : "border-slate-800 bg-slate-900 hover:border-slate-700"
                      } cursor-pointer`}
                    >
                      <div className="h-12 w-20 flex-shrink-0 rounded bg-slate-800 border border-slate-700/50 overflow-hidden">
                        <svg viewBox="0 0 1920 1080" className="h-full w-full">
                          <BackgroundRenderer backgroundId={bg.id} />
                        </svg>
                      </div>
                      <div className="overflow-hidden">
                        <span className="block text-xs font-semibold text-slate-200 group-hover:text-yellow-500 truncate">{bg.name}</span>
                        <span className="block text-[10px] text-slate-500 mt-0.5 truncate">{bg.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* AUDIO TAB */}
            {activeLeftTab === "audio" && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 font-medium mb-1">Hintergrundsound für diese Szene:</p>
                
                <div className="space-y-2">
                  {[
                    { id: "ambient_playground", name: "Schulhof-Trubel", desc: "Wind, Lachen und Vogelzwitschern" },
                    { id: "music_jazz", name: "Jazz Piano", desc: "Guaraldi-Rhodes Jazz Progression" },
                    { id: "music_night", name: "Nachtgeräusche", desc: "Zikaden und Mondscheinstille" },
                    { id: "none", name: "Stumm", desc: "Keine Begleitmusik" },
                  ].map(track => (
                    <button
                      key={track.id}
                      onClick={() => handleUpdateSceneProperties({
                        audio: { ...activeScene.audio, background_sound: track.id }
                      })}
                      className={`group w-full flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                        activeScene.audio.background_sound === track.id
                          ? "border-yellow-500 bg-yellow-500/10 shadow"
                          : "border-slate-800 bg-slate-900 hover:border-slate-700"
                      } cursor-pointer`}
                    >
                      <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700/50">
                        <Volume2 className={`h-4.5 w-4.5 ${activeScene.audio.background_sound === track.id ? "text-yellow-500" : "text-slate-400"}`} />
                      </div>
                      <div>
                        <span className="block text-xs font-semibold text-slate-200 group-hover:text-yellow-500">{track.name}</span>
                        <span className="block text-[10px] text-slate-500 mt-0.5">{track.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="h-px bg-slate-800 my-4" />

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-semibold text-slate-300">Szenen-Lautstärke</span>
                    <span className="text-xs text-slate-500">{Math.round(activeScene.audio.volume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={activeScene.audio.volume}
                    onChange={(e) => handleUpdateSceneProperties({
                      audio: { ...activeScene.audio, volume: parseFloat(e.target.value) }
                    })}
                    className="w-full h-1.5 rounded-lg appearance-none bg-slate-800 accent-yellow-500"
                  />
                </div>

                <div className="h-px bg-slate-800 my-4" />

                <div className="space-y-2">
                  <p className="text-xs text-slate-400 font-medium">Interaktive Soundeffekte:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => audioSynth.playTeacherWah(1.5)}
                      className="rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium py-2 px-3 flex items-center justify-center gap-1.5 transition active:scale-95"
                    >
                      Wah-Wah Lehrer
                    </button>
                    <button
                      onClick={() => audioSynth.playWoodstockChirp()}
                      className="rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium py-2 px-3 flex items-center justify-center gap-1.5 transition active:scale-95"
                    >
                      Woodstock-Piep
                    </button>
                    <button
                      onClick={() => audioSynth.playCuteSynthLaugh()}
                      className="rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium py-2 px-3 flex items-center justify-center gap-1.5 transition active:scale-95"
                    >
                      Süßes Kichern
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* 3. CENTER STAGE (THE CARTOON SCREEN) */}
        <main className="flex-1 flex flex-col bg-slate-900 border-r border-slate-800 relative select-none">
          
          {/* Zoom & Cam Controls */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-950/80 border border-slate-800 rounded-lg p-1 z-10 shadow-lg">
            <button
              onClick={() => handleUpdateSceneProperties({
                camera: { ...activeScene.camera, zoom: Math.min(3, activeScene.camera.zoom + 0.1) }
              })}
              title="Kamera heranzoomen"
              className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <Plus className="h-4 w-4" />
            </button>
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 px-1 font-mono">
              ZOOM: {Math.round(activeScene.camera.zoom * 100)}%
            </span>
            <button
              onClick={() => handleUpdateSceneProperties({
                camera: { ...activeScene.camera, zoom: Math.max(0.5, activeScene.camera.zoom - 0.1) }
              })}
              title="Kamera herauszoomen"
              className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </button>
            <button
              onClick={() => handleUpdateSceneProperties({
                camera: { zoom: 1.0, x: 0, y: 0 }
              })}
              title="Kamera zurücksetzen"
              className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-800 border-l border-slate-800 pl-2"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-950/80 border border-slate-800 rounded-lg p-1 z-10 shadow-lg">
            <span className="text-[10px] text-slate-400 px-1 font-mono">
              T: {playheadTime.toFixed(2)}s / {activeScene?.duration.toFixed(1)}s
            </span>
          </div>

          {/* Interactive Canvas Canvas Area */}
          <div className="flex-1 flex items-center justify-center p-6 bg-slate-950 overflow-hidden relative">
            
            {/* SVG Stage container */}
            <div
              className="w-full max-w-[1280px] aspect-[16/9] bg-white border-4 border-slate-800 rounded-2xl relative shadow-2xl overflow-hidden flex items-center justify-center"
              style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.45))" }}
            >
              <svg
                ref={svgRef}
                viewBox="0 0 1920 1080"
                className="w-full h-full cursor-default select-none overflow-hidden"
                onPointerMove={handleStagePointerMove}
                onPointerUp={handleStagePointerUp}
                onPointerLeave={handleStagePointerUp}
                onPointerDown={(e) => handleStagePointerDown(e)}
              >
                {/* SVG Filters for Sketch Lines */}
                <SketchFilter />

                {/* BACKGROUND LAYER */}
                <BackgroundRenderer backgroundId={activeScene.background_id} />

                {/* GRID OR GUIDE LINES */}
                {showGuideLines && (
                  <g opacity="0.15" stroke="#1E293B" strokeWidth="1.5" strokeDasharray="5 5">
                    {/* Vertical Grid lines */}
                    {Array.from({ length: 19 }).map((_, i) => (
                      <line key={`v-${i}`} x1={(i + 1) * 100} y1="0" x2={(i + 1) * 100} y2="1080" />
                    ))}
                    {/* Horizontal Grid lines */}
                    {Array.from({ length: 10 }).map((_, i) => (
                      <line key={`h-${i}`} x1="0" y1={(i + 1) * 100} x2="1920" y2={(i + 1) * 100} />
                    ))}
                    {/* Center Crosshairs */}
                    <line x1="960" y1="0" x2="960" y2="1080" stroke="#EF4444" strokeWidth="2.5" />
                    <line x1="0" y1="540" x2="1920" y2="540" stroke="#EF4444" strokeWidth="2.5" />
                  </g>
                )}

                {/* MAIN CAMERA VIEWPORT GROUP */}
                <g
                  transform={`scale(${activeScene.camera.zoom}) translate(${activeScene.camera.x}, ${activeScene.camera.y})`}
                  style={{ transformOrigin: "center center", transition: isPlaying ? "none" : "transform 0.2s ease-out" }}
                >
                  
                  {/* DRAW PROPS & CHARACTERS */}
                  {evaluatedElements.map((el) => {
                    const isSelected = selectedElementId === el.id;
                    return (
                      <g
                        key={el.id}
                        transform={`translate(${el.x}, ${el.y}) scale(${el.scaleX}, ${el.scaleY}) rotate(${el.rotation})`}
                        opacity={el.opacity}
                        onPointerDown={(e) => handleStagePointerDown(e, el.id)}
                        className="cursor-grab active:cursor-grabbing"
                      >
                        {/* Dynamic Render based on Asset ID */}
                        {el.asset_id === "char_snoopy" && (
                          <SnoopyCharacter emotion={el.state.emotion} wearables={el.state.wearables} isAngryActive={el.state.emotion === "angry"} />
                        )}
                        {el.asset_id === "char_charlie" && (
                          <CharlieCharacter emotion={el.state.emotion} wearables={el.state.wearables} isAngryActive={el.state.emotion === "angry"} />
                        )}
                        {el.asset_id === "char_lucy" && (
                          <LucyCharacter emotion={el.state.emotion} wearables={el.state.wearables} isAngryActive={el.state.emotion === "angry"} />
                        )}
                        {el.asset_id === "char_woodstock" && (
                          <WoodstockCharacter emotion={el.state.emotion} wearables={el.state.wearables} isAngryActive={el.state.emotion === "angry"} />
                        )}

                        {el.asset_id === "prop_doghouse" && <DoghouseProp />}
                        {el.asset_id === "prop_tree" && <TreeProp />}
                        {el.asset_id === "prop_football" && <FootballProp />}
                        {el.asset_id === "prop_cookie" && <CookieProp />}

                        {/* Selected Outline Bounding Box */}
                        {isSelected && (
                          <g filter="none">
                            {/* Inner helper coordinate dot */}
                            <circle cx="0" cy="0" r="6" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                            {/* Outer dashed border box around character */}
                            <rect
                              x="-85"
                              y="-110"
                              width="170"
                              height="230"
                              rx="8"
                              fill="none"
                              stroke="#EF4444"
                              strokeWidth="3"
                              strokeDasharray="6 4"
                            />
                            {/* Little helper indicator text */}
                            <text
                              x="0"
                              y="-125"
                              textAnchor="middle"
                              fill="#EF4444"
                              fontFamily="monospace"
                              fontSize="16"
                              fontWeight="bold"
                            >
                              X:{Math.round(el.x)} Y:{Math.round(el.y)}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}

                  {/* SPEECH BUBBLES LAYER */}
                  {evaluatedElements.map((el) => {
                    if (el.type === "character" && el.state.dialogue) {
                      const isFlipped = el.scaleX < 0;
                      return (
                        <SpeechBubble
                          key={`bubble-${el.id}`}
                          text={el.state.dialogue}
                          charX={el.x}
                          charY={el.y}
                          flip={isFlipped}
                        />
                      );
                    }
                    return null;
                  })}

                </g>
              </svg>

              {/* Guide Overlay Info */}
              {showGuideLines && (
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur rounded px-2.5 py-1 text-[11px] font-mono text-slate-300 pointer-events-none">
                  Stage Size: 1920x1080 | Active Elements: {activeScene.elements.length}
                </div>
              )}
            </div>
          </div>
        </main>

        {/* 4. RIGHT SIDEBAR (INSPECTOR) */}
        <aside className="w-80 border-l border-slate-800 bg-slate-900/50 flex flex-col z-20 overflow-y-auto">
          
          <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-200">
            <Settings className="h-4.5 w-4.5 text-yellow-500" />
            <span>Inspector</span>
          </div>

          {selectedElement ? (
            // ELEMENT INSPECTOR
            <div className="p-4 space-y-5">
              
              {/* Element Header info */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Ausgewähltes Element
                  </h3>
                  <div className="text-sm font-bold text-yellow-500 flex items-center gap-1.5 mt-0.5">
                    {selectedElement.asset_id.replace("char_", "Figur: ").replace("prop_", "Objekt: ")}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteElement(selectedElement.id)}
                  className="rounded p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 transition"
                  title="Element löschen"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="h-px bg-slate-800" />

              {/* Emotion Selector for Character types */}
              {selectedElement.type === "character" && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 block">Gesichtsausdruck / Emotion</label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {[
                      { id: "happy", label: "😃" },
                      { id: "sad", label: "😢" },
                      { id: "angry", label: "😡" },
                      { id: "surprised", label: "😮" },
                      { id: "thinking", label: "🤔" },
                    ].map(em => (
                      <button
                        key={em.id}
                        onClick={() => handleUpdateElementState({ emotion: em.id as EmotionType })}
                        title={em.id}
                        className={`rounded-lg py-2 border text-lg transition-all ${
                          selectedElement.state.emotion === em.id
                            ? "border-yellow-500 bg-yellow-500/10 text-white"
                            : "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        {em.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dialogue Bubble Text */}
              {selectedElement.type === "character" && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 block">Sprechblase Inhalt</label>
                  <textarea
                    rows={2}
                    value={selectedElement.state.dialogue}
                    onChange={(e) => handleUpdateElementState({ dialogue: e.target.value })}
                    placeholder="Snoopy spricht..."
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-xs font-handwriting text-slate-200 focus:border-yellow-500 focus:outline-none placeholder-slate-600 resize-none text-[15px]"
                  />
                  {selectedElement.state.dialogue && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateElementState({ dialogue: "" })}
                        className="text-[10px] text-slate-500 hover:text-slate-300 transition"
                      >
                        Sprechblase entfernen
                      </button>
                      {isSoundEnabled && (
                        <button
                          onClick={() => {
                            if (selectedElement.asset_id.includes("woodstock")) {
                              audioSynth.playWoodstockChirp();
                            } else {
                              audioSynth.playTeacherWah();
                            }
                          }}
                          className="text-[10px] text-yellow-500 hover:text-yellow-400 transition ml-auto"
                        >
                          Ton abspielen
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Wearables (Accessories) */}
              {selectedElement.type === "character" && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 block">Zubehör / Kleidung</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "wearable_cap_red", name: "Rote Mütze" },
                      { id: "wearable_glasses", name: "Sonnenbrille" },
                      { id: "wearable_crown", name: "Goldkrone" },
                      { id: "wearable_scarf", name: "Winter-Schal" },
                    ].map(wear => {
                      const isActive = selectedElement.state.wearables.includes(wear.id);
                      return (
                        <button
                          key={wear.id}
                          onClick={() => {
                            const current = selectedElement.state.wearables;
                            const next = isActive
                              ? current.filter(w => w !== wear.id)
                              : [...current, wear.id];
                            handleUpdateElementState({ wearables: next });
                          }}
                          className={`flex items-center gap-2 rounded-lg border p-2 text-left transition-all ${
                            isActive
                              ? "border-yellow-500 bg-yellow-500/10 text-white"
                              : "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700"
                          }`}
                        >
                          <Crown className={`h-3.5 w-3.5 ${isActive ? "text-yellow-500" : "text-slate-500"}`} />
                          <span className="text-[11px] font-medium">{wear.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="h-px bg-slate-800" />

              {/* Coordinates & Transform values */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-300">Transformation</h4>
                
                {/* Pos X */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] text-slate-400 font-mono">Pos X</span>
                    <span className="text-[11px] text-slate-300 font-mono font-bold">{Math.round(selectedElementEvaluated?.x ?? selectedElement.x)}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1920"
                    value={Math.round(selectedElementEvaluated?.x ?? selectedElement.x)}
                    onChange={(e) => handleUpdateElementTransform({ x: parseInt(e.target.value) })}
                    className="w-full h-1 rounded bg-slate-800 accent-yellow-500"
                  />
                </div>

                {/* Pos Y */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] text-slate-400 font-mono">Pos Y</span>
                    <span className="text-[11px] text-slate-300 font-mono font-bold">{Math.round(selectedElementEvaluated?.y ?? selectedElement.y)}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1080"
                    value={Math.round(selectedElementEvaluated?.y ?? selectedElement.y)}
                    onChange={(e) => handleUpdateElementTransform({ y: parseInt(e.target.value) })}
                    className="w-full h-1 rounded bg-slate-800 accent-yellow-500"
                  />
                </div>

                {/* Scale & Flip (Horizontal mirroring) */}
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    onClick={() => {
                      const curVal = selectedElementEvaluated?.scaleX ?? selectedElement.scaleX;
                      handleUpdateElementTransform({ scaleX: -curVal });
                    }}
                    className="rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-semibold py-1 px-2 border border-slate-700 transition"
                  >
                    ↔️ Horizontal spiegeln
                  </button>
                  <button
                    onClick={() => {
                      const curVal = selectedElementEvaluated?.scaleY ?? selectedElement.scaleY;
                      handleUpdateElementTransform({ scaleY: -curVal });
                    }}
                    className="rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-semibold py-1 px-2 border border-slate-700 transition"
                  >
                    ↕️ Vertikal spiegeln
                  </button>
                </div>

                {/* Rotation */}
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] text-slate-400 font-mono">Drehung (Rotation)</span>
                    <span className="text-[11px] text-slate-300 font-mono font-bold">{Math.round(selectedElementEvaluated?.rotation ?? selectedElement.rotation)}°</span>
                  </div>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={Math.round(selectedElementEvaluated?.rotation ?? selectedElement.rotation)}
                    onChange={(e) => handleUpdateElementTransform({ rotation: parseInt(e.target.value) })}
                    className="w-full h-1 rounded bg-slate-800 accent-yellow-500"
                  />
                </div>

                {/* Opacity */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] text-slate-400 font-mono">Deckkraft (Opacity)</span>
                    <span className="text-[11px] text-slate-300 font-mono font-bold">{Math.round((selectedElementEvaluated?.opacity ?? selectedElement.opacity) * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={selectedElementEvaluated?.opacity ?? selectedElement.opacity}
                    onChange={(e) => handleUpdateElementTransform({ opacity: parseFloat(e.target.value) })}
                    className="w-full h-1 rounded bg-slate-800 accent-yellow-500"
                  />
                </div>
              </div>

              <div className="h-px bg-slate-800" />

              {/* KEYFRAMES MANAGEMENT */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-slate-300">Keyframe-Steuerung</h4>
                  <button
                    onClick={handleAddKeyframe}
                    disabled={selectedElement.keyframes.some(k => Math.abs(k.time_sec - playheadTime) < 0.05)}
                    className="flex items-center gap-1 rounded bg-yellow-500 text-slate-950 font-bold px-2 py-1 text-[10px] hover:bg-yellow-400 disabled:opacity-30 transition cursor-pointer"
                  >
                    <Plus className="h-3 w-3" />
                    Keyframe bei {playheadTime.toFixed(1)}s
                  </button>
                </div>

                {selectedElement.keyframes.length === 0 ? (
                  <p className="text-[10px] text-slate-500 leading-normal italic">
                    Keine Keyframes definiert. Das Element bleibt in dieser Szene statisch.
                  </p>
                ) : (
                  <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1.5">
                    {selectedElement.keyframes.map((k) => {
                      const isCurrent = Math.abs(k.time_sec - playheadTime) < 0.08;
                      return (
                        <div
                          key={`kf-${k.time_sec}`}
                          className={`rounded border p-2 flex flex-col gap-1 transition-all ${
                            isCurrent
                              ? "border-yellow-500 bg-yellow-500/10"
                              : "border-slate-800 bg-slate-950"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              onClick={() => setPlayheadTime(k.time_sec)}
                              className="text-[11px] font-semibold text-slate-300 hover:text-yellow-500 cursor-pointer flex items-center gap-1"
                            >
                              <Key className="h-3 w-3 text-yellow-500" />
                              Zeit: {k.time_sec.toFixed(2)}s
                            </span>
                            <button
                              onClick={() => handleDeleteKeyframe(k.time_sec)}
                              className="text-slate-500 hover:text-red-400 transition"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] font-mono text-slate-400">
                            <div>X: <input
                              type="number"
                              value={Math.round(k.x)}
                              onChange={(e) => handleUpdateSpecificKeyframe(k.time_sec, { x: parseInt(e.target.value) || 0 })}
                              className="w-14 bg-slate-900 border border-slate-800 text-slate-200 px-1 rounded"
                            /></div>
                            <div>Y: <input
                              type="number"
                              value={Math.round(k.y)}
                              onChange={(e) => handleUpdateSpecificKeyframe(k.time_sec, { y: parseInt(e.target.value) || 0 })}
                              className="w-14 bg-slate-900 border border-slate-800 text-slate-200 px-1 rounded"
                            /></div>
                            <div className="col-span-2 mt-1">
                              Rot: <input
                                type="number"
                                value={Math.round(k.rotation)}
                                onChange={(e) => handleUpdateSpecificKeyframe(k.time_sec, { rotation: parseInt(e.target.value) || 0 })}
                                className="w-14 bg-slate-900 border border-slate-800 text-slate-200 px-1 rounded mr-2"
                              />
                              Scale: <input
                                type="number"
                                step="0.1"
                                value={k.scaleX}
                                onChange={(e) => handleUpdateSpecificKeyframe(k.time_sec, { scaleX: parseFloat(e.target.value) || 1 })}
                                className="w-14 bg-slate-900 border border-slate-800 text-slate-200 px-1 rounded"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          ) : (
            // SCENE INSPECTOR
            <div className="p-4 space-y-5">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Szeneneinstellungen
                </h3>
                <div className="text-sm font-bold text-slate-300 mt-0.5">
                  {activeScene.name}
                </div>
              </div>

              <div className="h-px bg-slate-800" />

              {/* Scene duration */}
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-300 block">Szenenlänge (Sekunden)</label>
                  <span className="text-xs font-mono text-yellow-500 font-bold">{activeScene.duration.toFixed(1)}s</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="15"
                  step="0.5"
                  value={activeScene.duration}
                  onChange={(e) => handleUpdateSceneProperties({ duration: parseFloat(e.target.value) })}
                  className="w-full h-1.5 rounded-lg appearance-none bg-slate-800 accent-yellow-500"
                />
              </div>

              <div className="h-px bg-slate-800" />

              {/* Camera zoom / pan */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Compass className="h-4 w-4 text-blue-400" />
                  Kameraeinstellungen
                </h4>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] text-slate-400 font-mono">Zoom</span>
                    <span className="text-[11px] text-slate-300 font-mono">{Math.round(activeScene.camera.zoom * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.05"
                    value={activeScene.camera.zoom}
                    onChange={(e) => handleUpdateSceneProperties({
                      camera: { ...activeScene.camera, zoom: parseFloat(e.target.value) }
                    })}
                    className="w-full h-1 rounded bg-slate-800 accent-yellow-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] text-slate-400 font-mono">Verschiebung X</span>
                    <span className="text-[11px] text-slate-300 font-mono">{Math.round(activeScene.camera.x)}px</span>
                  </div>
                  <input
                    type="range"
                    min="-800"
                    max="800"
                    value={activeScene.camera.x}
                    onChange={(e) => handleUpdateSceneProperties({
                      camera: { ...activeScene.camera, x: parseInt(e.target.value) }
                    })}
                    className="w-full h-1 rounded bg-slate-800 accent-yellow-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] text-slate-400 font-mono">Verschiebung Y</span>
                    <span className="text-[11px] text-slate-300 font-mono">{Math.round(activeScene.camera.y)}px</span>
                  </div>
                  <input
                    type="range"
                    min="-500"
                    max="500"
                    value={activeScene.camera.y}
                    onChange={(e) => handleUpdateSceneProperties({
                      camera: { ...activeScene.camera, y: parseInt(e.target.value) }
                    })}
                    className="w-full h-1 rounded bg-slate-800 accent-yellow-500"
                  />
                </div>
              </div>

              <div className="h-px bg-slate-800" />

              <div className="rounded-lg bg-slate-900 border border-slate-800 p-3 text-[11px] text-slate-400 leading-relaxed">
                💡 <span className="text-slate-300 font-semibold">Tipp:</span> Klicke auf ein Element auf der Bühne, um dessen Koordinaten, Dialogtexte, Animation-Keyframes und Zubehörteile (wie Hüte oder Brillen) anzupassen!
              </div>

            </div>
          )}

        </aside>

      </div>

      {/* 5. BOTTOM TIMELINE PANEL */}
      <footer className="h-64 border-t border-slate-800 bg-slate-900 flex flex-col z-20">
        
        {/* Scenes List Header & Scene Management */}
        <div className="flex h-11 items-center justify-between border-b border-slate-800 px-4">
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <Layers className="h-3.5 w-3.5" />
              Szenen:
            </span>
            <div className="flex items-center gap-1.5 max-w-[500px] overflow-x-auto py-0.5">
              {project.timeline.map((sc, idx) => (
                <div key={sc.scene_id} className="flex items-center rounded-lg bg-slate-950 p-0.5 border border-slate-800">
                  <button
                    onClick={() => {
                      setActiveSceneId(sc.scene_id);
                      setPlayheadTime(0);
                      setSelectedElementId(null);
                    }}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                      activeSceneId === sc.scene_id
                        ? "bg-yellow-500 text-slate-950 shadow font-bold"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {idx + 1}. {sc.name || `Szene ${idx + 1}`} ({sc.duration.toFixed(1)}s)
                  </button>
                </div>
              ))}
            </div>
            
            <button
              onClick={handleAddScene}
              className="rounded bg-slate-800 p-1 text-slate-300 hover:bg-slate-700 transition"
              title="Neue Szene hinzufügen"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDuplicateScene}
              className="flex items-center gap-1 rounded bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition"
            >
              <Copy className="h-3.5 w-3.5" />
              Szene duplizieren
            </button>
            <button
              onClick={handleDeleteActiveScene}
              disabled={project.timeline.length <= 1}
              className="flex items-center gap-1 rounded bg-red-950/60 border border-red-900/60 px-2.5 py-1 text-xs font-semibold text-red-400 hover:bg-red-900/50 disabled:opacity-30 transition"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Szene löschen
            </button>
          </div>

        </div>

        {/* Playback Controls & Slider */}
        <div className="flex-1 flex flex-col overflow-hidden">
          
          {/* Controls Bar */}
          <div className="flex h-12 items-center justify-between border-b border-slate-800 px-4 bg-slate-900/80">
            
            {/* Play/Pause controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePlayPause}
                className={`flex h-8 w-8 items-center justify-center rounded-full shadow transition-all active:scale-95 ${
                  isPlaying ? "bg-red-500 text-white" : "bg-yellow-500 text-slate-950"
                }`}
              >
                {isPlaying ? <Pause className="h-4.5 w-4.5" /> : <Play className="h-4.5 w-4.5 fill-current" />}
              </button>
              <button
                onClick={handleStop}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition active:scale-95"
                title="Stopp / Zurückspulen"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              
              <div className="h-4 w-px bg-slate-800 mx-1" />

              <button
                onClick={() => setIsLooping(!isLooping)}
                className={`rounded px-2 py-1 text-[11px] font-semibold border transition ${
                  isLooping
                    ? "border-yellow-500 bg-yellow-500/10 text-yellow-500"
                    : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                }`}
              >
                🔁 Endlosschleife (Loop)
              </button>
            </div>

            {/* Scrubber slider bar */}
            <div className="flex-1 max-w-[800px] flex items-center gap-3 px-6">
              <span className="text-xs font-mono text-slate-400">0.0s</span>
              <div className="flex-1 relative flex items-center">
                <input
                  type="range"
                  min="0"
                  max={activeScene.duration}
                  step="0.02"
                  value={playheadTime}
                  onChange={(e) => {
                    if (isPlaying) {
                      handlePlayPause();
                    }
                    setPlayheadTime(parseFloat(e.target.value));
                  }}
                  className="w-full h-2 rounded bg-slate-950 appearance-none accent-yellow-500 cursor-pointer"
                />
              </div>
              <span className="text-xs font-mono text-slate-400">{activeScene.duration.toFixed(1)}s</span>
            </div>

            {/* Time display indicator */}
            <div className="flex items-center gap-2">
              <div className="rounded bg-slate-950 border border-slate-800 px-3 py-1 font-mono text-xs text-yellow-500 font-bold">
                {playheadTime.toFixed(2)}s
              </div>
              <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                FPS: {project.meta.fps}
              </div>
            </div>

          </div>

          {/* Tracks Timeline Viewport */}
          <div className="flex-1 overflow-y-auto bg-slate-950/40">
            {activeScene.elements.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-slate-600 italic">
                Füge links Figuren oder Requisiten hinzu, um Spuren im Zeitstrahl zu generieren.
              </div>
            ) : (
              <div className="divide-y divide-slate-900">
                {activeScene.elements.map((el) => {
                  const isSelected = selectedElementId === el.id;
                  return (
                    <div
                      key={`track-${el.id}`}
                      onClick={() => setSelectedElementId(el.id)}
                      className={`flex h-10 items-center justify-between transition ${
                        isSelected ? "bg-slate-800/40" : "hover:bg-slate-800/10"
                      }`}
                    >
                      {/* Name of active track */}
                      <div className="w-48 px-4 flex items-center gap-2 border-r border-slate-900 shrink-0">
                        <span className="text-[11px] font-bold text-slate-300 truncate">
                          {el.asset_id.replace("char_", "").replace("prop_", "")}
                        </span>
                        <span className="text-[9px] uppercase px-1 rounded bg-slate-900 text-slate-500 font-semibold">
                          {el.type}
                        </span>
                      </div>

                      {/* Timeline track keyframes */}
                      <div className="flex-1 h-full relative">
                        
                        {/* Playhead red vertical indicator line */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-red-500 pointer-events-none z-10"
                          style={{ left: `${(playheadTime / activeScene.duration) * 100}%` }}
                        />

                        {/* Rendering diamonds for keyframes */}
                        {el.keyframes.map((k) => {
                          const leftPct = (k.time_sec / activeScene.duration) * 100;
                          return (
                            <button
                              key={`diamond-${k.time_sec}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedElementId(el.id);
                                setPlayheadTime(k.time_sec);
                              }}
                              className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 bg-yellow-500 border border-slate-950 rotate-45 hover:bg-yellow-400 hover:scale-125 transition-transform cursor-pointer"
                              style={{ left: `calc(${leftPct}% - 7px)` }}
                              title={`Keyframe bei ${k.time_sec.toFixed(2)}s`}
                            />
                          );
                        })}

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </footer>

      {/* IMPORT JSON MODAL */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-200">Projekt-JSON importieren</h3>
            <p className="text-xs text-slate-400">
              Füge den exportierten JSON-Code deines Projekts hier ein, um deine Animationen wiederherzustellen.
            </p>
            <textarea
              rows={10}
              value={importJsonText}
              onChange={(e) => {
                setImportJsonText(e.target.value);
                setImportError(null);
              }}
              placeholder='{ "project_name": "...", "meta": {...}, "timeline": [...] }'
              className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs font-mono text-slate-200 focus:border-yellow-500 focus:outline-none"
            />
            {importError && (
              <p className="text-xs text-red-400 bg-red-950/40 p-2.5 rounded border border-red-900/40">
                ⚠️ Fehler: {importError}
              </p>
            )}
            <div className="flex justify-end gap-2 text-xs font-semibold">
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportJsonText("");
                  setImportError(null);
                }}
                className="rounded-lg bg-slate-800 px-4 py-2 hover:bg-slate-700 transition"
              >
                Abbrechen
              </button>
              <button
                onClick={handleImportJson}
                className="rounded-lg bg-yellow-500 text-slate-950 px-4 py-2 hover:bg-yellow-400 transition"
              >
                Importieren
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
