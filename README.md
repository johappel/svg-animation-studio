# SVG "Snoopy-Style" Dialogue & Animation Studio

Willkommen im **SVG "Snoopy-Style" Dialogue & Animation Studio**! Dies ist ein interaktives 2D-Animationsstudio, das speziell für minimalistische Charakter-Animationen und Dialoge im zeitlosen "Snoopy/Peanuts"-Comicstil entwickelt wurde.

Mit diesem Studio kannst du ganz einfach Szenen auf einer visuellen Zeitleiste erstellen, Figuren und Requisiten platzieren, Sprechblasen und Emotionen zuweisen sowie flüssige GSAP-Animationen erstellen.

---

## 🚀 Kern-Features
- **Visueller Timeline-Editor:** Erstelle beliebig viele Szenen und animiere Position, Skalierung, Rotation und Deckkraft über intuitive Keyframes.
- **Wunderschöne Peanuts-Aktivposten:** Snoopy, Charlie Brown, Lucy und Woodstock inklusive Zubehör wie Mützen, Brillen und Schals.
- **Klassische Requisiten:** Die legendäre rote Hundehütte, der drachenfressende Baum, ein Football und natürlich Schokokekse.
- **Dynamischer Skizzen-Effekt:** Ein ausgeklügelter SVG-Turbulenz-Filter verleiht allen Linien ein wackeliges, handgezeichnetes Tusche-Gefühl.
- **Sound & Musik-Synthesizer:** Integrierte Jazz-Piano-Begleitungen (im Vince-Guaraldi-Stil) und stimmungsvolle Soundeffekte.
- **JSON-Import/Export:** Sichere deine Projekte lokal ab und teile sie unkompliziert.

---

## 🛠️ Technologie-Stack
- **Framework:** React (Vite & TypeScript)
- **Styling:** Tailwind CSS (modernes HSL-Farbschema, Sleek Dark Mode)
- **Animationen:** GreenSock Animation Platform (GSAP)
- **Interaktionen:** HTML5 Pointer Events

---

## 💻 Erste Schritte (Lokale Entwicklung)

Stelle sicher, dass du [Node.js](https://nodejs.org/) und [pnpm](https://pnpm.io/) installiert hast.

1. **Abhängigkeiten installieren:**
   ```bash
   pnpm install
   ```

2. **Entwicklungsserver starten:**
   ```bash
   pnpm dev
   ```

3. **Projekt bauen (Produktion):**
   ```bash
   pnpm build
   ```

---

## 📂 Projektstruktur & Erweiterbarkeit
- `/src/components/SnoopyAssets.tsx`: Die originale Komponenten-Bibliothek für alle Vektorgrafiken und Filter.
- `/src/utils/presets.ts`: Vorlagen wie "Der Keks-Streit" und "Der Football-Trick".
- `/src/utils/audioSynth.ts`: Web Audio API Synthesizer für dynamische Melodien und Geräusche.
- `/docs/`: Ausführliche technische Konzepte und Dokumentationen.
- `Roadmap.md`: Unsere Entwicklungs-Roadmap.

---

*Entwickelt mit Liebe zum Detail und Leidenschaft für Comic-Kunst.*
