# Implementierungsplan: Modulare Asset-Struktur & SVG-Drag-and-Drop Bibliothek

Dieses Dokument beschreibt das Konzept und die geplante Implementierung zur Erweiterung des **SVG "Snoopy-Style" Dialogue & Animation Studio**. Es schlägt eine elegante Modularisierung der Asset-Bibliothek und ein innovatives Drag-and-Drop-System vor, mit dem Benutzer eigene SVG-Dateien direkt im Frontend hochladen und nutzen können.

---

## User Review Required

> [!IMPORTANT]
> **Modulares Asset-System:**
> Die riesige Datei `SnoopyAssets.tsx` (über 1300 Zeilen) wird in eine saubere, erweiterbare Struktur aufgeteilt. Alle Charaktere, Requisiten und Hintergründe erhalten eigene Dateien im Ordner `src/components/assets/`. Über ein zentrales Registry-System können sie von der App dynamisch instanziiert werden.
> Dadurch entfallen die unübersichtlichen `if`-Statements in `App.tsx`.

> [!TIP]
> **SVG Drag-and-Drop-Bibliothek (WOW-Effekt!):**
> * **Lokale Verarbeitung:** Eigene SVG-Dateien können einfach im Frontend per Drag & Drop in die Asset-Sidebar gezogen werden. Der Browser liest den SVG-Code per `FileReader` ein.
> * **Automatische Peanuts-Ästhetik:** Alle importierten SVGs erhalten durch die SVG-Filter auf der Bühne automatisch den handgezeichneten, wackeligen Peanuts-Stil (`filter="url(#sketch-filter)"`), sodass sie sich nahtlos in die Ästhetik einfügen!
> * **Portabilität:** Die importierten SVGs werden direkt als SVG-Text in das Projekt-JSON eingebettet. Exportiert und importiert man das JSON-Projekt, sind alle eigenen Assets automatisch mit an Bord – ganz ohne Server-Datenbank!

---

## Design-Entscheidungen (Bestätigt vom Benutzer)

- **Emotions-Management für eigene Charaktere (Vorschlag B):**
  Beim Import eines neuen Charakters kann der Benutzer bis zu 5 verschiedene SVGs hochladen, die den Emotionen (`happy`, `sad`, `angry`, `surprised`, `thinking`) zugeordnet werden. Die App rendert dann dynamisch das der aktuellen Emotion entsprechende SVG. Ist für eine Emotion kein SVG hinterlegt, wird das Standard-SVG (happy) verwendet.
- **Lokale Persistenz (IndexedDB):**
  Importierte benutzerdefinierte Assets werden in einer lokalen Browser-Datenbank (`IndexedDB`) gespeichert. Dadurch bleiben sie auch beim Neuladen des Browsers dauerhaft in der Bibliothek erhalten, selbst wenn kein Projekt geladen ist. Zusätzlich werden sie beim Projekt-JSON-Export mitgesichert, um maximale Portabilität zu garantieren.

---

## Vorgeschlagene Änderungen

### 1. Strukturierte Asset-Dateien

Wir erstellen ein neues Verzeichnis `src/components/assets/` und modularisieren die Assets:

```
src/components/assets/
├── SketchFilter.tsx
├── Wearables.tsx
├── index.ts                 <-- Exportiert alle Komponenten und Registries
├── characters/
│   ├── Snoopy.tsx
│   ├── Charlie.tsx
│   ├── Lucy.tsx
│   └── Woodstock.tsx
├── props/
│   ├── Doghouse.tsx
│   ├── Tree.tsx
│   ├── Football.tsx
│   └── Cookie.tsx
└── backgrounds/
    ├── Schoolyard.tsx
    ├── DoghouseHill.tsx
    ├── Classroom.tsx
    └── NightSky.tsx
```

#### [NEW] [index.ts](file:///f:/code/svg-animation-studio/src/components/assets/index.ts)
Zentrale Registry, die Komponenten dynamisch anbietet. Sie definiert:
* `CHARACTER_REGISTRY`: Map von ID zu React-Komponente.
* `PROP_REGISTRY`: Map von ID zu React-Komponente.
* `BACKGROUND_REGISTRY`: Map von ID zu Render-Funktion.

#### [MODIFY] [App.tsx](file:///f:/code/svg-animation-studio/src/App.tsx)
* Wir ersetzen die statischen Importe und den massiven Rendering-Switch-Case durch ein dynamisches Registry-basiertes Rendering.
* Für Standard-Assets greift `App.tsx` auf die Registries zu:
  ```typescript
  const AssetComponent = CHARACTER_REGISTRY[el.asset_id];
  if (AssetComponent) {
    return <AssetComponent emotion={el.state.emotion} wearables={el.state.wearables} />;
  }
  ```
* Für gedroppte benutzerdefinierte Assets rendern wir ein dynamisches `<g dangerouslySetInnerHTML={{ __html: cleanSvg(customAsset.svgContent) }} filter="url(#sketch-filter)" />`.

---

### 2. Drag-and-Drop System & Datenmodell

#### [MODIFY] [types.ts](file:///f:/code/svg-animation-studio/src/utils/types.ts)
Wir erweitern das Projekt-Interface, um benutzerdefinierte SVGs zu unterstützen:

```typescript
export interface CustomAsset {
  id: string;
  name: string;
  type: "character" | "prop" | "background";
  svgContent: string; // Bereinigter innerer SVG-Code oder das vollständige SVG
}

export interface Project {
  project_name: string;
  meta: { width: number; height: number; fps: number };
  timeline: Scene[];
  custom_assets?: CustomAsset[]; // Die Liste der hochgeladenen SVGs
}
```

#### [NEW] [SvgDropZone.tsx](file:///f:/code/svg-animation-studio/src/components/SvgDropZone.tsx)
Eine wiederverwendbare Drag-and-Drop-Komponente für die linke Sidebar. Sie liest hochgeladene `.svg` Dateien aus, öffnet das Einstellungsmodal und fügt sie den `custom_assets` des Projekts hinzu.

---

## Verifikationsplan

### Automatisierte Tests / Validierung
- Wir überprüfen die Code-Kompilierung mittels `npm run build` bzw. des laufenden Vite-Dev-Servers.
- Wir verifizieren, dass der Import und Export von JSON-Dateien inklusive der eingebetteten benutzerdefinierten SVGs fehlerfrei funktioniert.

### Manuelle Verifikation
- **Visual & Usability Test:** Wir droppen eine `.svg` Datei in die Sidebar, weisen sie als "Requisite" aus, ziehen sie auf die Bühne und prüfen, ob der skizzierte Peanuts-Wackeleffekt sofort angewendet wird.
- **Speicher-Test:** Exportieren des Projekts als JSON, Neuladen der Seite, Importieren des JSON und Verifizieren, dass das gedroppte SVG exakt an seiner Position wieder erscheint.
