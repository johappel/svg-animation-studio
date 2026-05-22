# Character Pack Example

Dieses Beispiel zeigt ein dateibasiertes Character Pack mit einer Meta-Datei und fuenf Emotions-SVGs.

## Struktur

- meta.json
- happy.svg
- sad.svg
- angry.svg
- surprised.svg
- thinking.svg

## Import-Mapping

Die Dateien koennen direkt auf das vorhandene Custom-Asset-Modell abgebildet werden:

- svgContent = Inhalt von happy.svg
- emotions.happy = Inhalt von happy.svg
- emotions.sad = Inhalt von sad.svg
- emotions.angry = Inhalt von angry.svg
- emotions.surprised = Inhalt von surprised.svg
- emotions.thinking = Inhalt von thinking.svg

## Konventionen

- Alle SVGs nutzen dasselbe viewBox-Format.
- Der Figurenfuss sitzt in allen Dateien auf derselben Grundlinie.
- Nur Pose und Gesichtsausdruck variieren zwischen den Emotionen.

## Promptvorlage

Eine wiederverwendbare Promptvorlage für KI-Modelle liegt in [docs/character-pack-example/PROMPT_TEMPLATE.md](docs/character-pack-example/PROMPT_TEMPLATE.md).