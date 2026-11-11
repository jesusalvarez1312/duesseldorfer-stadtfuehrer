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
   sterne:     1, 2 oder 3 – Qualifikationsnachweis, erscheint als Sterne
               hinter dem Namen. Fehlt der Wert, werden keine Sterne gezeigt.
   sprachen:   Kürzel aus der Liste unten, beliebig viele.
               de = Deutsch, en = English, fr = Français, nl = Nederlands,
               es = Español, ca = Català, it = Italiano, cs = Čeština, pl = Polski,
               ru = Русский
   link:       optional. Wenn gesetzt, werden Foto und Name der Person
               dorthin verlinkt (z. B. eigene Website); beim Überfahren
               mit der Maus erscheint "mehr Infos". Fehlt der Link,
               führt die Kachel zur Anfrage-Seite (standardLink unten).
   telefon:    optional. Handynummer, z. B. "+49 171 1234567". Dann
               erscheint ein Telefon-Symbol, das direkt anruft.
   mail:       optional. E-Mail-Adresse. Dann erscheint ein @-Symbol,
               das eine neue Mail öffnet.
=================================================================== */
/* Ziel für alle Kacheln ohne eigenen "link": die Anfrage auf index.html. */
const standardLink = "index.html#buchung";

const stadtfuehrerListe = [
  { name: "Anja Kühner",                bild: "anja-kuehner",                stichworte: ["Japanviertel", "Kulinarisches", "Städtebau & Architektur"],       sprachen: ["de", "en", "fr", "es"], sterne: 3, link: "https://www.duesseldorf-entdecken.de/", telefon: "+49 157 72166732", mail: "duesta@duesseldorf-entdecken.de" },
  { name: "Antje Kahnt",                 bild: "antje-kahnt",                 stichworte: ["Kunststadt", "Frauen", "Architektur"],        sprachen: ["de", "en"], sterne: 3, link: "https://www.stadtstreicherin.de/", telefon: "+49 177 2497391", mail: "stadtstreicherin@email.de" },
  { name: "Georg Reinders",              bild: "georg-reinders",              stichworte: ["Wehrhahnlinie", "Medienhafen", "Säulenheilige"],  sprachen: ["de", "en"], sterne: 2, link: "https://www.reisezeit-rheinruhr.de/", telefon: "+49 173 2731579", mail: "reinders@reisezeit-rheinruhr.info" },
  { name: "Brigitte Rey-Brögger",        bild: "brigitte-rey-broegger",       stichworte: ["Brauereien", "Internationales", "Düsseldorfer Originale"],         sprachen: ["de", "fr", "en"], sterne: 3, link: "https://die-gaestefuehrer.de/profile/brigitte-rey-broegger-608", telefon: "+49 160 97830429", mail: "rey-broegger@n-broegger.de" },
  { name: "Jesús Álvarez",               bild: "jesus-alvarez",               stichworte: ["Kulinarisches", "Kö-Bogen I&II", "multimedial"], sprachen: ["de", "es"], sterne: 1, link: "https://die-gaestefuehrer.de/profile/jesus-alvarez-10636", mail: "jesusalvarez@gmx.com" },
  { name: "Peter Jäger",                 bild: "peter-jaeger",                stichworte: ["Radtouren", "Medienhafen", "Wirtschaft"],           sprachen: ["de", "en", "es", "ca"], sterne: 2, link: "https://die-gaestefuehrer.de/profile/peter-jaeger-386", telefon: "+49 171 3819746", mail: "fuehrungen@jaegerguide.eu" },
  { name: "Steffi Buss",                 bild: "steffi-buss",                 stichworte: ["Altstadt", "Sport & Unterhaltung", "Kunst & Architektur"],                  sprachen: ["de", "en"], sterne: 3, link: "https://www.steffibuss.com/ueber-uns", telefon: "+49 160 4023159", mail: "steffi.buss@gmx.de" },
  { name: "Martina Kaiser",              bild: "martina-kaiser",              stichworte: ["Kunst & Kultur", "Brauereien", "Radtouren"],            sprachen: ["de", "en", "nl", "fr", "es"], sterne: 1, telefon: "+49 176 50125739", mail: "Martina.Kaiser@gmx.net" },
  { name: "Brigitte Salem",              bild: "brigitte-salem",              stichworte: ["Kaiserswerth", "Frauen", "Medienhafen"],              sprachen: ["de", "en"], sterne: 3, link: "https://die-gaestefuehrer.de/profile/brigitte-salem-7282", telefon: "+49 1577 6450794", mail: "bsalem@web.de" },
  { name: "Brigitta Binsfeld",           bild: "brigitta-binsfeld-rizkalla",  stichworte: ["Kirchen", "Musik", "Kaiserswerth"],    sprachen: ["de", "en"], sterne: 3, link: "https://die-gaestefuehrer.de/profile/brigitta-binsfeld-rizkalla-4329", telefon: "+49 152 53242337", mail: "brigitta.binsfeld@googlemail.com" },
  { name: "Maria Rißen",                 bild: "maria-rissen",                stichworte: ["Kinder", "Geschichte", "Neuss"],           sprachen: ["de", "en"], sterne: 1, mail: "ma.rissen@web.de" },
  { name: "Magdalena Piotrowski",        bild: "magdalena-piotrowski",        stichworte: ["Natur", "Radtouren", "Kunst & Architektur"],  sprachen: ["de", "pl", "en"], sterne: 1, mail: "info@magdalenapiotrowski.de" },
  { name: "Jadwiga Schäfer",             bild: "jadwiga-schaefer",            stichworte: ["Architektur", "Neue Mitte", "Golzheim & Pempelfort"],         sprachen: ["de", "pl"], sterne: 1, telefon: "+49 157 32387398", mail: "jschaefer.d@gmail.com" },
  { name: "Ute Pannes",                  bild: "ute-pannes",                  stichworte: ["Architektur", "Carlstadt", "Gerresheim"],      sprachen: ["de"], sterne: 3, telefon: "+49 173 9444119", mail: "ute-pannes@t-online.de" },
  { name: "Helga Linn",                  bild: "helga-linn",                  stichworte: ["Brauereien", "Medienhafen", "Wehrhahnlinie"],         sprachen: ["de", "en",], sterne: 1, telefon: "+49 178 4724043", mail: "ht.linn@t-online.de" },
  { name: "Saskia Schilperoort",         bild: "saskia-schilperoort",         stichworte: ["Straßenbahn", "Diversity", "Karneval"],      sprachen: ["de", "it"], sterne: 1, mail: "saskiaschilperoort@web.de" },
  { name: "Jörg Allenstein",             bild: "joerg-allenstein",            stichworte: ["Nachtwächter", "Kunst", "Architektur"],        sprachen: ["de", "en"], sterne: 3, link: "https://die-gaestefuehrer.de/profile/joerg-allenstein-384", mail: "J.Allenstein@web.de" },
  { name: "Dorothee Spelberg",           bild: "dorothee-spelberg",           stichworte: ["Musik", "Gärten & Parks", "Niederrhein"],    sprachen: ["de", "en", "fr", "es"], sterne: 3, link: "https://die-gaestefuehrer.de/profile/dorothee-spelberg-7779", telefon: "+49 172 9943685", mail: "dorothee.spelberg@gmx.de" },
  { name: "Daniela Pusch",               bild: "daniela-pusch",               stichworte: ["Friedhöfe", "Stadtentwicklung", "Literatur"],            sprachen: ["de", "en", "fr", "cs"], sterne: 2, telefon: "+49 163 8793425", mail: "daniela.pusch@rub.de" },
  { name: "Anne Hahn",                   bild: "anne-hahn",                   stichworte: ["Kinder", "Politik", "Kulinarisches"],   sprachen: ["de", "en"], sterne: 1, mail: "hallo@annehahn.de" },
  { name: "Peter Kieffer",               bild: "peter-kieffer",               stichworte: ["Stadtentwicklung", "Nachtwächter", "Neuss & Niederrhein"],  sprachen: ["de", "en"], sterne: 1, telefon: "+49 15679 787711", mail: "tourguide@mailbox.org" }
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
