import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Upload, X, User, Gift, Image as ImageIcon, Smile } from "lucide-react";
import { CustomAsset, EmotionType } from "../utils/types";

interface SvgDropZoneProps {
  onAssetImported: (asset: CustomAsset) => void;
}

export const SvgDropZone: React.FC<SvgDropZoneProps> = ({ onAssetImported }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [assetName, setAssetName] = useState("");
  const [assetType, setAssetType] = useState<"character" | "prop" | "background">("prop");
  
  // SVG Contents
  const [mainSvg, setMainSvg] = useState<string>("");
  const [emotions, setEmotions] = useState<Record<EmotionType, string>>({
    happy: "",
    sad: "",
    angry: "",
    surprised: "",
    thinking: "",
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // XML / HTML XSS Sanitization
  const sanitizeSvg = (svgText: string): string => {
    // Remove scripts
    let clean = svgText.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
    // Remove onload/onerror handlers
    clean = clean.replace(/on\w+\s*=\s*["'][^"']*["']/gi, "");
    
    // Ensure it starts with <svg and has viewBox
    if (!clean.includes("<svg")) {
      throw new Error("Ungültiges SVG-Format.");
    }
    
    // Standardize width/height to fill container, use viewBox for aspect ratio
    // But keep a clean structure
    return clean;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File, isEmotion: boolean = false, emotionKey?: EmotionType) => {
    if (file.type !== "image/svg+xml" && !file.name.endsWith(".svg")) {
      setErrorMsg("Nur SVG-Dateien sind erlaubt!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const sanitized = sanitizeSvg(text);
        
        if (isEmotion && emotionKey) {
          setEmotions(prev => ({
            ...prev,
            [emotionKey]: sanitized
          }));
          // If uploading happy, also sync main SVG
          if (emotionKey === "happy") {
            setMainSvg(sanitized);
          }
        } else {
          setMainSvg(sanitized);
          setEmotions(prev => ({
            ...prev,
            happy: sanitized // Base is happy
          }));
          // Pre-fill name from filename
          const nameWithoutExt = file.name.replace(/\.svg$/i, "").replace(/[-_]/g, " ");
          setAssetName(prev => prev || nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1));
          setIsOpen(true);
        }
        setErrorMsg(null);
      } catch (err: any) {
        setErrorMsg(err.message || "Fehler beim Lesen der SVG-Datei.");
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
    e.target.value = "";
  };

  const handleEmotionFileChange = (e: React.ChangeEvent<HTMLInputElement>, emotionKey: EmotionType) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0], true, emotionKey);
    }
    e.target.value = "";
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    if (!assetName.trim()) {
      setErrorMsg("Bitte gib einen Namen für das Asset ein.");
      return;
    }
    if (!mainSvg) {
      setErrorMsg("Haupt-SVG fehlt.");
      return;
    }

    const newAsset: CustomAsset = {
      id: `custom_${assetType}_${Date.now()}`,
      name: assetName,
      type: assetType,
      svgContent: mainSvg,
      emotions: assetType === "character" ? {
        happy: emotions.happy || mainSvg,
        sad: emotions.sad || undefined,
        angry: emotions.angry || undefined,
        surprised: emotions.surprised || undefined,
        thinking: emotions.thinking || undefined,
      } : undefined
    };

    onAssetImported(newAsset);
    resetForm();
  };

  const resetForm = () => {
    setAssetName("");
    setAssetType("prop");
    setMainSvg("");
    setEmotions({
      happy: "",
      sad: "",
      angry: "",
      surprised: "",
      thinking: "",
    });
    setErrorMsg(null);
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      {/* Drop Zone Area */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
          dragActive
            ? "border-yellow-500 bg-yellow-500/10 shadow-lg"
            : "border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-950/70"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".svg"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 mb-2 group-hover:scale-110 transition-transform">
          <Upload className="h-5 w-5 text-yellow-500" />
        </div>
        <span className="text-xs font-semibold text-slate-200">
          SVG hierher ziehen oder klicken
        </span>
        <span className="text-[10px] text-slate-500 mt-1">
          Eigene SVGs zur Bibliothek hinzufügen
        </span>

        {errorMsg && (
          <div className="mt-2 text-[10px] text-red-400 font-semibold bg-red-950/20 px-2 py-1 rounded">
            {errorMsg}
          </div>
        )}
      </div>

      {/* Asset Configure Modal */}
      {isOpen && createPortal(
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4">
          <div className="my-4 bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[calc(100vh-2rem)] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
              <div className="flex items-center gap-2">
                <Smile className="h-5 w-5 text-yellow-500" />
                <h3 className="text-sm font-bold text-slate-100">Neues SVG-Asset konfigurieren</h3>
              </div>
              <button
                onClick={resetForm}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-6">
              
              {errorMsg && (
                <div className="p-3 text-xs text-red-400 font-semibold bg-red-950/30 border border-red-900/30 rounded-lg">
                  {errorMsg}
                </div>
              )}

              {/* Grid 2-Spalten Layout: links Preview, rechts Einstellungen */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Linke Spalte: Preview */}
                <div className="flex flex-col items-center justify-center rounded-xl bg-slate-950 border border-slate-800 p-4 aspect-square relative group">
                  <div className="text-[10px] uppercase font-bold text-slate-500 absolute top-3 left-3 tracking-wider">
                    Vorschau (Standard)
                  </div>
                  <div
                    className="h-40 w-40 flex items-center justify-center text-slate-100 overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: mainSvg }}
                    style={{ filter: "url(#sketch-filter)" }}
                  />
                  <div className="text-[10px] text-slate-500 text-center mt-3 max-w-[80%]">
                    Mit Peanuts &quot;Sketch-Filter&quot; (handgezeichneter Comic-Stil)
                  </div>
                </div>

                {/* Rechte Spalte: Formular */}
                <div className="space-y-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Name des Assets</label>
                    <input
                      type="text"
                      value={assetName}
                      onChange={(e) => setAssetName(e.target.value)}
                      placeholder="z.B. Roter Ballon, Super-Hase..."
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-yellow-500 focus:outline-none"
                    />
                  </div>

                  {/* Asset Type Select */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Asset-Typ</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "character", label: "Figur", icon: User },
                        { id: "prop", label: "Requisite", icon: Gift },
                        { id: "background", label: "Hintergrund", icon: ImageIcon },
                      ].map(type => {
                        const Icon = type.icon;
                        const isSel = assetType === type.id;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setAssetType(type.id as any)}
                            className={`flex flex-col items-center gap-1.5 rounded-lg border p-2.5 text-center transition-all ${
                              isSel
                                ? "border-yellow-500 bg-yellow-500/10 text-white shadow"
                                : "border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700"
                            }`}
                          >
                            <Icon className={`h-4 w-4 ${isSel ? "text-yellow-500" : "text-slate-500"}`} />
                            <span className="text-[10px] font-semibold">{type.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>

              {/* Figuren-Emotionen (Nur bei Typ Figur) - VORSCHLAG B */}
              {assetType === "character" && (
                <div className="border-t border-slate-800 pt-6 space-y-3">
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">Emotionen (Vorschlag B)</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
                      Lade optionale SVGs für verschiedene Gemütszustände deines Charakters hoch.
                      Fehlt eine Emotion, wird automatisch das Standard-SVG (happy) verwendet.
                    </p>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { id: "happy", label: "Glücklich (Standard)", emoji: "😃" },
                      { id: "sad", label: "Traurig", emoji: "😢" },
                      { id: "angry", label: "Wütend", emoji: "😡" },
                      { id: "surprised", label: "Überrascht", emoji: "😮" },
                      { id: "thinking", label: "Nachdenklich", emoji: "🤔" },
                    ].map(em => {
                      const hasSvg = !!emotions[em.id as EmotionType];
                      const isMain = em.id === "happy";
                      return (
                        <div
                          key={em.id}
                          className={`flex flex-col items-center justify-between border rounded-xl p-2 bg-slate-950/40 ${
                            hasSvg ? "border-emerald-800 bg-emerald-950/10" : "border-slate-800 hover:border-slate-700"
                          } transition-all`}
                        >
                          <span className="text-lg">{em.emoji}</span>
                          <span className="text-[9px] font-semibold text-slate-400 mt-0.5 text-center truncate w-full" title={em.label}>
                            {em.label.split(" ")[0]}
                          </span>

                          <label
                            className={`w-full mt-2 rounded py-1 text-[9px] font-bold text-center cursor-pointer transition-colors ${
                              hasSvg
                                ? "bg-emerald-900/30 hover:bg-emerald-900/50 text-emerald-400 border border-emerald-800"
                                : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                            } ${isMain ? "opacity-50 cursor-not-allowed" : ""}`}
                          >
                            <input
                              type="file"
                              accept=".svg"
                              onChange={(e) => handleEmotionFileChange(e, em.id as EmotionType)}
                              disabled={isMain && !!mainSvg}
                              className="sr-only"
                            />
                            {hasSvg ? "Ersetzen" : "Hinzufügen"}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="shrink-0 px-6 py-4 border-t border-slate-800 bg-slate-950/50 flex justify-end gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 transition"
              >
                Abbrechen
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-lg bg-yellow-500 hover:bg-yellow-400 px-5 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-yellow-500/10 transition"
              >
                In Studio aufnehmen
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
