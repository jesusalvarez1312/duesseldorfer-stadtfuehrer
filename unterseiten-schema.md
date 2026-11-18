# Schema für Tour-Unterseiten

Vorlage: `altstadtkirchen.html`, `literatur.html` oder `neue-mitte.html` kopieren und nur die markierten Stellen ändern.

## 1. Seitenkopf
| Element | Inhalt | Beispiel |
|---|---|---|
| Brotkrumen | Start › Touren › Kategorie › Tourtitel | Start › Touren › Kunst & Kultur › Literatur |
| Augenbraue (rote Zeile) | Name der Kategorie | KUNST & KULTUR |
| Titel (H1) | Name der Tour, kurz | Literatur |
| Einleitung (lead) | **ein** Satz, gern „Schlagwort: Erklärung" | Literaten und Schreiberlinge: Heinrich Heine, … |
| Kopfbild | `bilder/kopfbild-<seitenname>.jpg`, Querformat 4:3, 1200 × 900 px, unter 300 KB | `kopfbild-literatur.jpg` |
| Alternativtext | beschreibt, was auf dem Bild zu sehen ist | Heine-Haus mit Literaturhaus … |

## 2. Textteil
- **Eine** Zwischenüberschrift (H2) als Motto der Tour.
- Danach 2–4 Absätze Fließtext, keine Aufzählungen und keine Karten.
- Optional am Ende, in dieser Reihenfolge:
  - `<p><strong>Dauer:</strong> …</p>`
  - Kombi-Tipp („Diese Tour lässt sich gut verbinden mit …")
  - Querverweis: `<p><strong>Interesse an …?</strong> Mehr zur Tour – <a href="….html">hier klicken</a>.</p>`

## 3. Hinweis am Ende
Kasten „Interesse an dieser Tour?“ mit dem Knopf „Tour anfragen“. Bei `data-tour="…"` und im Satz darüber steht der Tourtitel.

## 4. Damit die Seite überall erreichbar ist
1. **Kachel** auf der Kategorieseite: Bild und Titel verlinken auf die neue Seite (`viertel__bildlink` + `<a>` im `viertel__titel`).
2. **alle-themen.html**: In der Liste steht `<li><a href="….html">…</a></li>` statt des „auf Anfrage“-Eintrags.
3. **touren-daten.js**: Bei `seite:` den neuen Dateinamen eintragen und bei `worte:` Suchbegriffe ergänzen.
