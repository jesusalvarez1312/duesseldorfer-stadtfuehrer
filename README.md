# Düsseldorfer Stadtführer e.V. – Website

Website des Netzwerks zertifizierter Guides in Düsseldorf.
Handgeschrieben in HTML, CSS und JavaScript – ohne Baukasten, ohne Framework.

**Vorschau:** läuft über GitHub Pages (Adresse siehe Repository-Einstellungen).
Alle Seiten tragen aktuell ein `noindex`, damit Google sie vor dem Start nicht findet.

---

## Aufbau der Dateien

Alle Dateien liegen direkt im Hauptordner – nur die Bilder haben einen
eigenen Ordner. So lässt sich alles über die GitHub-Oberfläche hochladen.

```
index.html                    Startseite
anfrage.html                  Anfrageformular
impressum.html

stadtviertel.html             ┐
kunst-kultur.html             │
geschichte-geschichten.html   │  die sechs Themenseiten
sportlich.html                │
besondere-beduerfnisse.html   │
touren-ausserhalb.html        ┘

altstadt.html                 ┐
nordpark.html                 │  15 Detailseiten einzelner Führungen
…                             ┘

style.css                     Grundgestaltung, gilt für ALLE Seiten
unterseiten.css               Ergänzungen für die Unterseiten

touren-daten.js               Liste aller Führungen (für die Suche)
script.js                     Menü, Suche, Formular

bilder/                       alle Fotos und Grafiken
```

## Wie hängt das zusammen?

**Startseite → Themenseite → Führung → Anfrage**

1. Auf der Startseite stehen die Top 10 und die sechs Themen.
2. Eine Themenseite (z. B. `stadtviertel.html`) zeigt aufklappbare Gruppen
   mit Karten – eine Karte je Führung.
3. Manche Führungen haben eine eigene Detailseite. Dann sind **Bild und
   Überschrift** der Karte verlinkt.
4. Jede Karte und jede Detailseite hat den Knopf **„Tour anfragen"**.
   Der trägt den Namen der Führung ins Formular ein.

---

## Etwas ändern – die häufigsten Fälle

### Text einer Führung ändern
Direkt in der jeweiligen HTML-Datei. Die Kartentexte stehen zwischen
`<h3 class="viertel__titel">` und dem `</p>` darunter.

### Eine neue Führung aufnehmen
1. In der passenden Themenseite eine bestehende Karte kopieren –
   von `<li class="viertel" id="tour-…">` bis `</li>` – und anpassen.
2. Die `id` muss auf der Seite einmalig sein: `id="tour-name-der-fuehrung"`,
   klein geschrieben, ohne Umlaute und ohne Leerzeichen.
3. Im Knopf „Tour anfragen" den Namen eintragen:
   `data-tour="Name der Führung"`.
4. In `touren-daten.js` einen Eintrag ergänzen – **sonst findet die
   Suche die neue Führung nicht.**

### Ein Foto austauschen
Neue Datei in `bilder/` legen und im HTML den Dateinamen ändern.
Empfehlung: Querformat 4:3, etwa 800 Pixel breit, unter 200 KB.

### Suchbegriffe verbessern
In `touren-daten.js` beim Feld `worte` ergänzen. Diese Wörter sieht
niemand, sie helfen nur beim Finden. Groß- und Kleinschreibung sowie
Umlaute spielen dabei keine Rolle.

---

## Gemeinsam arbeiten

**Wichtigste Regel: nie gleichzeitig dieselbe Datei bearbeiten.**
Am besten übernimmt jede Person eigene Seiten.

Ändern im Browser: Datei auf GitHub öffnen → Stiftsymbol → ändern →
unten „Commit changes". Nach ein bis zwei Minuten ist es in der Vorschau
sichtbar.

---

## Noch offen

- [ ] Formular auf Formspree umstellen (Anleitung steht in `script.js`)
- [ ] Schriften selbst hosten statt über Google Fonts laden
- [ ] Neue Vereinsfotos statt der Platzhalter
- [ ] `datenschutz.html` und `sitemap.html` fehlen, sind aber im Fußbereich verlinkt
- [ ] `english.html` und `francais.html` fehlen, sind aber im Menü verlinkt
- [ ] Einige Bilddateien fehlen noch (siehe unten)
- [ ] `noindex` entfernen, wenn die Seite öffentlich gehen soll

### Bilder
Alle Fotos wurden für das Web verkleinert (max. 1000 px breit, Kopfbilder
1600 px, JPEG-Qualität 82). Aus 309 MB wurden 23 MB. Die Kamera-Originale
sind **nicht** im Repository – bitte separat aufbewahren.

Neue Fotos vor dem Hochladen bitte genauso behandeln: Kamera-Originale mit
4000 Pixeln Breite machen die Seite auf dem Handy unbenutzbar.

### Fehlende Bilder
`touren-ausserhalb.html` (17 Stück), `besondere-beduerfnisse.html` (7),
`sportlich.html` (3), `stadtviertel.html` (2), `kulinarische-tour.html` (1).
Die genauen Dateinamen stehen jeweils im `src`-Attribut im HTML.
