# Roadmap - SVG "Snoopy-Style" Dialogue & Animation Studio

Dieses Dokument beschreibt die geplanten und abgeschlossenen Schritte zur Weiterentwicklung des Animation Studios.

## Status Quo
- **Timeline-Editor:** Visualisierung und Bearbeitung von Szenen und Keyframes.
- **Synthesizer-Audio:** Interaktive Sounds und Jazz-Melodien.
- **Snoopy-Ästhetik:** Handgezeichneter Wackel-Filter für Linien und Panels.
- **Vier Standard-Charaktere & vier Props:** Snoopy, Charlie, Lucy, Woodstock sowie Hütte, Baum, Football und Keks.

---

## Meilensteine & Geplante Erweiterungen

### [IN PROGRESS] Meilenstein 1: Asset-Modularisierung & Dynamische Bibliothek
- [ ] **Aufteilung von `SnoopyAssets.tsx`:** Aufspaltung in einzelne Dateien pro Charakter, Requisite und Hintergrund unter `src/components/assets/` zur Verbesserung der Erweiterbarkeit und Code-Wartbarkeit.
- [ ] **Einführung einer Asset-Registry:** Zentrale Registrierung aller statischen Assets, um dynamisches Laden und Rendern in `App.tsx` zu ermöglichen.
- [ ] **SVG-Drag-and-Drop im Frontend:** Ermöglichen des Imports eigener SVGs direkt im Frontend.
- [ ] **Automatischer Comic-Wackeleffekt für importierte SVGs:** Anwendung des `sketch-filter` auf gedroppte SVGs.
- [ ] **Projekt-JSON-Portabilität:** Einbettung der benutzerdefinierten SVGs in die Projektdatei (`Project`), damit importierte Assets beim Speichern und Laden erhalten bleiben.

### [TODO] Meilenstein 2: Erweiterte Charakter-Importe (Emotionen)
- [ ] Ermöglichen des Imports von mehreren SVG-Dateien pro Charakter für verschiedene Emotions-Zustände.
- [ ] Zuweisung von Zubehör-Ankerpunkten (Wearable Mountpoints) für benutzerdefinierte Charaktere.

### [TODO] Meilenstein 3: Export & Optimierung
- [ ] MP4- oder WebM-Export von Szenen im Browser.
- [ ] Soundeffekt-Mischpult zur individuellen Lautstärkeanpassung pro Element.

---

*Zuletzt aktualisiert am 21. Mai 2026.*
