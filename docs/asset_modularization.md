# Dokumentation: Fortschritt der Asset-Modularisierung & SVG Drag-and-Drop

Dieses Dokument beschreibt den aktuellen Fortschritt und das technische Design für das modulare Asset-System und den dynamischen SVG-Import.

## Technische Architektur

### 1. Modularisierung der Snoopy-Assets
Die ehemals riesige Datei `src/components/SnoopyAssets.tsx` wird in einen modularen Ordner `src/components/assets/` zerlegt. 

- **Vorteil:** Jedes Asset (z.B. `SnoopyCharacter`, `CookieProp`, `SchoolyardBackground`) erhält eine eigene Datei. Das verringert Merge-Konflikte, erhöht die Lesbarkeit und erlaubt es uns, neue Charaktere extrem sauber hinzuzufügen.
- **Zentrale Registry (`src/components/assets/index.ts`):** 
  Wir führen Registries für Charaktere, Props und Hintergründe ein. Die App `src/App.tsx` lädt Komponenten dynamisch über ihre ID aus dieser Registry:
  ```typescript
  import { CHARACTER_REGISTRY } from "./components/assets";
  ```

---

### 2. SVG Drag-and-Drop (Dynamischer Import)
Um dem Benutzer maximale Freiheit zu geben, implementieren wir eine Drop-Zone im Bereich der linken Sidebar.

- **Verarbeitung im Browser:**
  Die gedroppte SVG-Datei wird im Browser über die HTML5 File-API gelesen:
  ```typescript
  const reader = new FileReader();
  reader.onload = (e) => {
    const rawSvg = e.target.result;
    // Bereinigung und Speicherung
  };
  reader.readAsText(file);
  ```

- **Integration der Peanuts-Ästhetik:**
  Wir nutzen den `dangerouslySetInnerHTML`-Ansatz in React, um den SVG-Inhalt in ein `<g>`-Element einzubetten. Diesem Element weisen wir den globalen handgezeichneten Wackel-Filter zu:
  ```tsx
  <g 
    filter="url(#sketch-filter)" 
    dangerouslySetInnerHTML={{ __html: customAsset.svgContent }} 
  />
  ```
  Dadurch passt sich jedes hochgeladene Bild sofort dem wunderschönen Snoopy-Stil an!

- **Datenmodell & Portabilität:**
  Die hochgeladenen SVGs werden direkt als String in den Projektdaten gespeichert. Dadurch ist das gesamte Projekt mitsamt seinen Custom Assets in einer einzigen, portablen JSON-Datei gespeichert und kann problemlos exportiert und importiert werden.

---

## Nächste Schritte
1. Abwarten des Benutzer-Feedbacks bezüglich des Implementierungsplans (`implementation_plan.md`).
2. Erstellen der neuen Verzeichnisse und Aufspalten der Asset-Dateien.
3. Integration des Drag-and-Drop-UIs in die linke Sidebar.
4. Anpassung von `App.tsx` auf das neue Registrierungsmodell.
