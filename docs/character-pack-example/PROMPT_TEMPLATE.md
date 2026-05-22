# Promptvorlage für ein Character Pack mit fünf SVG-Dateien

Diese Vorlage ist dafür gedacht, einem KI-Modell genau ein Character Pack im Format dieses Verzeichnisses abzuverlangen.

## Verwendung

- Ersetze alle Platzhalter in doppelten geschweiften Klammern.
- Lass das Modell exakt sechs Dateien erzeugen: `meta.json` plus fünf SVG-Dateien.
- Wenn das Modell zu viel Fließtext erzeugt, ergänze am Ende: "Gib nur die Dateien aus, ohne weitere Erklärung."

## Copy-Paste-Prompt

```text
Erzeuge ein vollständiges Character Pack für mein SVG-Animationssystem.

Ziel:
- Ich brauche genau 6 Dateien:
  1. meta.json
  2. happy.svg
  3. sad.svg
  4. angry.svg
  5. surprised.svg
  6. thinking.svg

Kontext:
- Das Pack beschreibt genau eine Figur namens {{NAME}}.
- Figurentyp: {{FIGURE_TYPE_ODER_ROLLE}}
- Stilrichtung: {{STILRICHTUNG}}
- Zielästhetik: {{ÄSTHETIK}}
- Farbstimmung: {{FARBEN}}
- Alter / Wirkung: {{ALTER_ODER_WIRKUNG}}
- Besondere Merkmale: {{MERKMALE}}
- Kleidung / Accessoires: {{KLEIDUNG}}

Technische Anforderungen:
- Jede SVG-Datei muss eine vollständige, gültige SVG-Datei sein.
- Alle fünf SVG-Dateien müssen dieselbe Figur zeigen.
- Alle fünf SVG-Dateien müssen dieselbe Geometrie-Basis haben:
  - identische viewBox
  - identische Grundproportionen
  - identische Standfläche / Fußposition
  - identische Größe
- Nur Emotion, Mimik, kleine Pose-Unterschiede und Armhaltung dürfen sich ändern.
- Die Figur muss in allen fünf Dateien an derselben Position stehen, damit beim Umschalten nichts springt.
- Keine eingebetteten Rasterbilder.
- Kein JavaScript.
- Keine externen Fonts.
- Keine Verweise auf externe Dateien.
- SVG soll sauber, kompakt und editierbar sein.

Emotionsdefinitionen:
- happy: freundlich, offen, positiv
- sad: niedergeschlagen, weich, ruhig
- angry: angespannt, energisch, klar verärgert
- surprised: sichtbar überrascht, große Augen, offene Reaktion
- thinking: nachdenklich, leicht grübelnd, reflektierend

Dateiformat für meta.json:
Erzeuge eine JSON-Datei mit genau dieser Struktur:

{
  "id": "{{ID_SLUG}}",
  "name": "{{NAME}}",
  "type": "character",
  "version": 1,
  "defaultEmotion": "happy",
  "viewBox": "{{VIEWBOX}}",
  "files": {
    "happy": "happy.svg",
    "sad": "sad.svg",
    "angry": "angry.svg",
    "surprised": "surprised.svg",
    "thinking": "thinking.svg"
  },
  "import": {
    "main": "happy.svg",
    "emotions": {
      "happy": "happy.svg",
      "sad": "sad.svg",
      "angry": "angry.svg",
      "surprised": "surprised.svg",
      "thinking": "thinking.svg"
    }
  },
  "stage": {
    "defaultScale": {{DEFAULT_SCALE}},
    "anchor": "bottom-center"
  },
  "tags": [{{TAGS}}]
}

Zusätzliche Designregeln:
- Verwende eine klare Silhouette.
- Reduziere unnötige Details.
- Gesicht und Pose müssen die Emotion sofort lesbar machen.
- Behalte Frisur, Kleidung, Körperbau und Farbschema in allen fünf SVGs konsistent bei.
- Die Dateien sollen wie eine zusammengehörige Figurenfamilie wirken, nicht wie fünf verschiedene Charaktere.

Ausgabeformat:
- Gib die Dateien in genau dieser Reihenfolge aus:
  1. meta.json
  2. happy.svg
  3. sad.svg
  4. angry.svg
  5. surprised.svg
  6. thinking.svg
- Kennzeichne jede Datei eindeutig mit ihrem Dateinamen als Überschrift.
- Gib darunter jeweils direkt den vollständigen Dateiinhalt aus.
- Keine zusätzlichen Erklärungen vor oder nach den Dateien.

Inhaltliche Vorgaben für diese konkrete Figur:
- Name: {{NAME}}
- ID: {{ID_SLUG}}
- ViewBox: {{VIEWBOX}}
- Default Scale: {{DEFAULT_SCALE}}
- Tags: {{TAGS}}
- Beschreibung der Figur in 3 bis 6 Stichpunkten:
  - {{PUNKT_1}}
  - {{PUNKT_2}}
  - {{PUNKT_3}}
  - {{PUNKT_4_OPTIONAL}}
  - {{PUNKT_5_OPTIONAL}}
  - {{PUNKT_6_OPTIONAL}}
```

## Empfohlene Platzhalterwerte

- `{{ID_SLUG}}`: kurz, stabil, nur Kleinbuchstaben, Zahlen und Bindestriche
- `{{VIEWBOX}}`: zum Beispiel `-80 -80 160 210`
- `{{DEFAULT_SCALE}}`: zum Beispiel `1.3`
- `{{TAGS}}`: zum Beispiel `"custom-asset", "child", "comic"`

## Kurze Variante für schnelle Iteration

```text
Erzeuge ein Character Pack mit genau fünf zusammenpassenden SVG-Dateien für die Emotionen happy, sad, angry, surprised und thinking sowie einer meta.json. Alle SVGs sollen dieselbe viewBox, dieselbe Standposition und dieselben Proportionen haben. Die Figur heißt {{NAME}}, hat folgende Merkmale: {{KURZBESCHREIBUNG}}. Gib nur die sechs Dateien aus.
```