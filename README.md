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

## Neu seit Oktober 2026

**Pop-up-Banner** (nur Startseite): Text, Link und Zeitraum stehen oben in
`banner.js`. Nach dem „bis“-Datum verschwindet das Banner von selbst.
Ausschalten: `aktiv: false`.

**Sprachen der Startseite** (Deutsch, English, Español, Français): Die
Übersetzungen stehen in `sprachen-startseite.js`. Wer einen deutschen Text
auf der Startseite ändert, passt dort den gleichnamigen Schlüssel an
(z. B. `held_lead`). Fehlt eine Übersetzung, erscheint der deutsche Text.

**Suche**: findet Wortteile, mehrere Wörter, den Text aller Unterseiten
und alle Guides. Eine neue Unterseite wird automatisch gefunden, sobald
sie auf einer Themenseite verlinkt ist. Ein neuer Guide, sobald er in
`stadtfuehrer-daten.js` steht.

**Schriften** liegen im Ordner `schriften/` – nichts wird mehr von Google
geladen.

**Datenschutz**: `datenschutz.html` – Entwurf, vom Vorstand zu prüfen.

---

## Noch offen

- [ ] Formular auf Formspree umstellen (Anleitung steht in `script.js`) –
      danach `datenschutz.html` anpassen
- [ ] Datenschutzerklärung vom Vorstand prüfen lassen
- [ ] Touren „Flingern“ (Stadtviertel) und „Kloster Kamp“ (Touren außerhalb) anlegen
      und danach wieder in `touren-daten.js` eintragen
- [ ] Einige Bilddateien fehlen noch (Platzhalter auf der Seite)
- [ ] `noindex` entfernen, wenn die Seite öffentlich gehen soll

### Bilder
Alle Fotos sind für das Handy verkleinert: Kartenbilder max. 800 px,
Kopfbilder 1000 px, Titelbild und Gruppenfoto 1400 px. Der ganze Ordner
hat rund 13 MB. Die Kamera-Originale sind **nicht** im Repository –
bitte separat aufbewahren.

Neue Fotos vor dem Hochladen bitte genauso verkleinern (z. B. mit
squoosh.app): ca. 800 px breit, unter 200 KB.
