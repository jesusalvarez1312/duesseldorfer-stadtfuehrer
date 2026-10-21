/* ================================================================
   STADTFÜHRER-DATEN
   Eine Zeile pro Gästeführerin/Gästeführer. Neue Personen können
   hier einfach ergänzt werden – die Kacheln auf stadtfuehrer.html
   entstehen automatisch daraus, in zufälliger Reihenfolge.
   Kacheln, die immer am Ende stehen sollen, kommen in die Liste
   "stadtfuehrerFesteKacheln" weiter unten.

   bild:       Dateiname ohne Endung. Erwartet wird eine Datei
               bilder/<bild>.jpg (Querformat 4:3, ca. 800px breit).
               Fehlt die Datei, erscheint automatisch ein Platzhalter.
   stichworte: Begriffe, die die Schwerpunkte beschreiben (beliebig viele).
   sprachen:   Kürzel aus der Liste unten, beliebig viele.
               de = Deutsch, en = English, fr = Français, nl = Nederlands,
               es = Español, ca = Català, it = Italiano, cs = Čeština, pl = Polski,
               ru = Русский
   link:       optional. Wenn gesetzt, werden Foto und Name der Person
               dorthin verlinkt (z. B. eigene Website); beim Überfahren
               mit der Maus erscheint "mehr Infos". Fehlt der Link,
               führt die Kachel zur Anfrage-Seite (standardLink unten).
=================================================================== */
/* Ziel für alle Kacheln ohne eigenen "link": die Anfrage auf index.html. */
const standardLink = "index.html#buchung";

const stadtfuehrerListe = [
  { name: "Anja Kühner",                bild: "anja-kuehner",                stichworte: ["Japanviertel", "Kulinarisches", "Neue Mitte"],       sprachen: ["de", "en", "fr", "es"], link: "https://www.duesseldorf-entdecken.de/" },
  { name: "Antje Kahnt",                 bild: "antje-kahnt",                 stichworte: ["Franzosenzeit", "Carlstadt", "Krimitouren"],        sprachen: ["de", "en"], link: "https://www.stadtstreicherin.de/" },
  { name: "Georg Reinders",              bild: "georg-reinders",              stichworte: ["Wehrhahnlinie", "Rheinbrücken", "Wirtschaft"],  sprachen: ["de", "en"], link: "https://die-gaestefuehrer.de/profile/georg-reinders-424" },
  { name: "Brigitte Rey-Brögger",        bild: "brigitte-rey-broegger",       stichworte: ["Brauereien", "Düsseldorfer Originale", "Internationale Einflüsse"],         sprachen: ["de", "fr", "en"] },
  { name: "Jesús Alvarez",               bild: "jesus-alvarez",               stichworte: ["Kulinarisches", "Altbier", "Neuss"],        sprachen: ["de", "es"], link: "https://die-gaestefuehrer.de/profile/jesus-alvarez-10636" },
  { name: "Peter Jäger",                 bild: "peter-jaeger",                stichworte: ["Radtouren", "Medienhafen", "Wirtschaft"],           sprachen: ["de", "en", "es", "ca"], link: "https://die-gaestefuehrer.de/profile/peter-jaeger-386" },
  { name: "Steffi Buss",                 bild: "steffi-buss",                 stichworte: ["Familien", "Kinder", "Sportlich"],                  sprachen: ["de", "en", "nl"], link: "http://www.run-and-see-duesseldorf.de/entertrainerin_steffi_buss.html" },
  { name: "Martina Kaiser",              bild: "martina-kaiser",              stichworte: ["Kunst & Kultur", "Brauereien", "Radtouren"],            sprachen: ["de", "en", "nl", "fr", "es"] },
  { name: "Brigitte Salem",              bild: "brigitte-salem",              stichworte: ["Geschichte", "Kirchen", "Literatur"],              sprachen: ["de", "fr", "en"] },
  { name: "Brigitta Binsfeld-Rizkalla",  bild: "brigitta-binsfeld-rizkalla",  stichworte: ["Kirchen", "Musik", "Kaiserswerth"],    sprachen: ["de", "en"], link: "https://die-gaestefuehrer.de/profile/brigitta-binsfeld-rizkalla-4329" },
  { name: "Maria Rißen",                 bild: "maria-rissen",                stichworte: ["Altstadt", "Geschichte", "Neuss"],           sprachen: ["de", "en"] },
  { name: "Magdalena Piotrowski",        bild: "magdalena-piotrowski",        stichworte: ["Natur", "Radtouren", "Persönlichkeiten"],  sprachen: ["de", "pl", "en"] },
  { name: "Jadwiga Schäfer",             bild: "jadwiga-schaefer",            stichworte: ["Architektur", "Neue Mitte", "Golzheim & Pempelfort"],         sprachen: ["de", "pl"] },
  { name: "Lidia Jansen",                bild: "lidia-jansen",                stichworte: ["MedienHafen", "Königsallee", "Rheinufer"],           sprachen: ["de", "pl"] },
  { name: "Ute Pannes",                  bild: "ute-pannes",                  stichworte: ["Hofgarten", "Oberbilk", "Theater"],      sprachen: ["de"] },
  { name: "Helga Linn",                  bild: "helga-linn",                  stichworte: ["Brauereien", "Familien", "Grünflächen"],         sprachen: ["de", "en", "nl"] },
  { name: "Saskia Schilperoort",         bild: "saskia-schilperoort",         stichworte: ["Landesgeschichte", "Diversity", "Kunst & Kultur"],      sprachen: ["de", "it"] },
  { name: "Jörg Allenstein",             bild: "joerg-allenstein",            stichworte: ["Nachtwächter", "Natur", "Architektur"],        sprachen: ["de", "en"], link: "https://die-gaestefuehrer.de/profile/joerg-allenstein-384" },
  { name: "Dorothee Spelberg",           bild: "dorothee-spelberg",           stichworte: ["Musik", "Gärten & Parks", "Niederrhein"],    sprachen: ["de", "en", "fr", "es"], link: "https://die-gaestefuehrer.de/profile/dorothee-spelberg-7779" },
  { name: "Daniela Pusch",               bild: "daniela-pusch",               stichworte: ["Friedhöfe", "Kirchen", "Literatur"],            sprachen: ["de", "en", "fr", "cs"] },
  { name: "Mechthild Langohr",           bild: "mechthild-langohr",           stichworte: ["Musik", "Kinder", "Barrierefrei"],                 sprachen: ["de", "en", "ru"] },
  { name: "Anne Hahn",                   bild: "anne-hahn",                   stichworte: ["Kinder", "Politik", "Kulinarisches"],   sprachen: ["de", "en"] }
];

/* Feste Kacheln: stehen immer am Ende der Liste, in genau dieser
   Reihenfolge, und werden von der Zufallsmischung ausgenommen.
   Felder wie oben; "sprachen" darf leer bleiben (dann erscheinen
   keine Flaggen). */
const stadtfuehrerFesteKacheln = [
  { name: "Ente Quak", bild: "ente-quak", stichworte: ["Parks", "Wasser", "Teich"], sprachen: [] }
];

/* Anzeigedaten je Sprachkürzel. "flagge" wird nur verwendet, wenn das
   Gerät Flaggen darstellen kann; sonst zeigen alle Sprachen ihr
   Textkürzel (siehe flaggen.js). Englisch nutzt die britische Flagge. – deckt sich mit der Liste im
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
  pl: { label: "Polski",   flagge: "🇵🇱" },
  ru: { label: "Русский",  flagge: "🇷🇺" }
};
