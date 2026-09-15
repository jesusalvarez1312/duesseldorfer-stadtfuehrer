/* ================================================================
   STADTFÜHRER-DATEN
   Eine Zeile pro Gästeführerin/Gästeführer. Neue Personen können
   hier einfach ergänzt werden – die Kacheln auf stadtfuehrer.html
   entstehen automatisch daraus, in zufälliger Reihenfolge.

   bild:       Dateiname ohne Endung. Erwartet wird eine Datei
               bilder/<bild>.jpg (Querformat 4:3, ca. 800px breit).
               Fehlt die Datei, erscheint automatisch ein Platzhalter.
   stichworte: genau 3 Begriffe, die die Schwerpunkte beschreiben.
   sprachen:   Kürzel aus der Liste unten, 1–4 Stück.
               de = Deutsch, en = English, fr = Français, nl = Nederlands,
               es = Español, ca = Català, it = Italiano, cs = Čeština, pl = Polski
=================================================================== */
const stadtfuehrerListe = [
  { name: "Anja Kühner",                bild: "anja-kuehner",                stichworte: ["Altstadt", "Geschichte", "Kunst & Kultur"],       sprachen: ["de", "en", "fr"] },
  { name: "Antje Kahnt",                 bild: "antje-kahnt",                 stichworte: ["Architektur", "Neue Mitte", "MedienHafen"],        sprachen: ["de", "en"] },
  { name: "Georg Reinders",              bild: "georg-reinders",              stichworte: ["Industriegeschichte", "Rheinufer", "Wirtschaft"],  sprachen: ["de", "en", "it"] },
  { name: "Brigitte Rey-Brögger",        bild: "brigitte-rey-broegger",       stichworte: ["Kirchen", "Persönlichkeiten", "Altstadt"],         sprachen: ["de", "fr", "en"] },
  { name: "Jesús Alvarez",               bild: "jesus-alvarez",               stichworte: ["Kulinarisches", "Altbier", "Stadtviertel"],        sprachen: ["de", "es", "en"] },
  { name: "Peter Jäger",                 bild: "peter-jaeger",                stichworte: ["Radtouren", "Grünflächen", "Rheinufer"],           sprachen: ["de", "en"] },
  { name: "Steffi Buss",                 bild: "steffi-buss",                 stichworte: ["Familien", "Kinder", "Altstadt"],                  sprachen: ["de", "en", "nl"] },
  { name: "Martina Kaiser",              bild: "martina-kaiser",              stichworte: ["Kunst & Kultur", "Jugendstil", "Mode"],            sprachen: ["de", "en", "fr", "it"] },
  { name: "Brigitte Salem",              bild: "brigitte-salem",              stichworte: ["Geschichte", "Kirchen", "Literatur"],              sprachen: ["de", "fr", "en"] },
  { name: "Brigitta Binsfeld-Rizkalla",  bild: "brigitta-binsfeld-rizkalla",  stichworte: ["Klein-Tokio", "Kulinarisches", "Stadtviertel"],    sprachen: ["de", "en", "fr"] },
  { name: "Maria Rißen",                 bild: "maria-rissen",                stichworte: ["Kaiserswerth", "Geschichte", "Kirchen"],           sprachen: ["de", "en"] },
  { name: "Magdalena Piotrowski",        bild: "magdalena-piotrowski",        stichworte: ["Altstadt", "Kunst & Kultur", "Persönlichkeiten"],  sprachen: ["de", "pl", "en"] },
  { name: "Jadwiga Schäfer",             bild: "jadwiga-schaefer",            stichworte: ["Geschichte", "Architektur", "Neue Mitte"],         sprachen: ["de", "pl"] },
  { name: "Lidia Jansen",                bild: "lidia-jansen",                stichworte: ["MedienHafen", "Radtouren", "Rheinufer"],           sprachen: ["de", "nl", "en"] },
  { name: "Ute Pannes",                  bild: "ute-pannes",                  stichworte: ["Nachtwächtertour", "Altstadt", "Geschichte"],      sprachen: ["de", "en"] },
  { name: "Helga Linn",                  bild: "helga-linn",                  stichworte: ["Barrierefrei", "Familien", "Grünflächen"],         sprachen: ["de", "en", "nl"] },
  { name: "Saskia Schilperoort",         bild: "saskia-schilperoort",         stichworte: ["Kulinarisches", "Altbier", "Kunst & Kultur"],      sprachen: ["de", "nl", "en"] },
  { name: "Jörg Allenstein",             bild: "joerg-allenstein",            stichworte: ["Wirtschaft", "Architektur", "MedienHafen"],        sprachen: ["de", "en", "pl"] },
  { name: "Dorothee Spelberg",           bild: "dorothee-spelberg",           stichworte: ["Jugendstil", "Kunst & Kultur", "Stadtviertel"],    sprachen: ["de", "en"] },
  { name: "Daniela Pusch",               bild: "daniela-pusch",               stichworte: ["Kaiserswerth", "Kirchen", "Literatur"],            sprachen: ["de", "en", "it"] },
  { name: "Mechthild Langohr",           bild: "mechthild-langohr",           stichworte: ["Familien", "Kinder", "Radtouren"],                 sprachen: ["de", "en", "fr"] },
  { name: "Anne Hahn",                   bild: "anne-hahn",                   stichworte: ["Altstadt", "Persönlichkeiten", "Kulinarisches"],   sprachen: ["de", "en"] }
];

/* Anzeigedaten je Sprachkürzel – deckt sich mit der Liste im
   Abschnitt "Sprachen" auf index.html. Català nutzt dort kein
   Emoji, sondern eine kleine SVG-Fahne. */
const spracheInfo = {
  de: { label: "Deutsch",  flagge: "🇩🇪" },
  en: { label: "English",  flagge: "🇬🇧" },
  fr: { label: "Français", flagge: "🇫🇷" },
  nl: { label: "Nederlands", flagge: "🇳🇱" },
  es: { label: "Español",  flagge: "🇪🇸" },
  ca: { label: "Català",   flagge: "<svg viewBox=\"0 0 20 20\"><rect width=\"20\" height=\"20\" fill=\"#FCDD09\"/><g fill=\"#DA121A\"><rect y=\"3\" width=\"20\" height=\"2.4\"/><rect y=\"8\" width=\"20\" height=\"2.4\"/><rect y=\"13\" width=\"20\" height=\"2.4\"/></g></svg>" },
  it: { label: "Italiano", flagge: "🇮🇹" },
  cs: { label: "Čeština",  flagge: "🇨🇿" },
  pl: { label: "Polski",   flagge: "🇵🇱" }
};
