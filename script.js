/* ==================================================================
   Düsseldorfer Stadtführer e.V.
   ------------------------------------------------------------------
   Diese Datei wird von allen Seiten geladen und macht zwei Dinge:

   1. Menü auf dem Smartphone auf- und zuklappen
   2. Den Knopf "weniger anzeigen" am Ende eines Akkordeon-Bereichs

   Beide Teile prüfen erst, ob es die betreffenden Elemente auf der
   Seite überhaupt gibt. Auf der Startseite gibt es kein Akkordeon –
   dann passiert dort einfach nichts.
================================================================== */


/* ---- 1. Menü ---------------------------------------------------- */

const burger = document.getElementById("burger");
const menue  = document.getElementById("hauptmenue");

if (burger && menue) {

  burger.addEventListener("click", () => {
    const offen = menue.classList.toggle("offen");
    burger.setAttribute("aria-expanded", offen);
  });

  // Nach dem Antippen eines Punktes schließen, damit das Menü
  // den angesprungenen Abschnitt nicht verdeckt.
  menue.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", menueSchliessen);
  });

  // Mit der Escape-Taste schließen
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") menueSchliessen();
  });
}

function menueSchliessen() {
  menue.classList.remove("offen");
  burger.setAttribute("aria-expanded", "false");
}


/* ---- 2. Akkordeon: "weniger anzeigen" ---------------------------
   Der Knopf steht im HTML mit dem Attribut hidden. Erst hier wird
   es entfernt. Grund: Ohne JavaScript hätte der Knopf keine
   Wirkung – dann soll er auch gar nicht erst erscheinen.
------------------------------------------------------------------ */

document.querySelectorAll(".gruppe__zu").forEach((knopf) => {

  knopf.hidden = false;

  knopf.addEventListener("click", () => {

    const bereich = knopf.closest("details");
    if (!bereich) return;

    bereich.open = false;

    // Nach dem Zuklappen zur Überschrift zurückspringen, sonst
    // steht man plötzlich weit unten auf der Seite.
    bereich.scrollIntoView({ block: "start" });

    // Der Tastaturfokus gehört jetzt wieder auf die Überschrift.
    const kopf = bereich.querySelector("summary");
    if (kopf) kopf.focus();
  });
});


/* ---- 3. Anfrageformular verschicken -----------------------------
   Solange kein Formular-Dienst eingerichtet ist, öffnet das Formular
   beim Absenden das E-Mail-Programm des Besuchers mit fertig
   vorbereitetem Text (data-versand="mailto").

   UMSTELLEN AUF FORMSPREE (o. ä.) SPÄTER:
   In anfrage.html im <form> lediglich
       action="https://formspree.io/f/DEINE-ID"  method="post"
   ergänzen und  data-versand="mailto"  entfernen. Dann verschickt
   der Browser das Formular normal und dieser Block hält sich raus.
------------------------------------------------------------------ */

const anfrageFormular = document.getElementById("anfrageFormular");

if (anfrageFormular && anfrageFormular.dataset.versand === "mailto") {

  // Beschriftungen für die spätere E-Mail, in gewünschter Reihenfolge
  const felder = [
    ["tour",            "Wunschtour / Thema"],
    ["sprache",         "Sprache"],
    ["termin",          "Wunschtermin"],
    ["uhrzeit",         "Uhrzeit"],
    ["alternativtermin","Alternativtermin"],
    ["dauer",           "Dauer"],
    ["personen",        "Personenzahl"],
    ["name",            "Name"],
    ["email",           "E-Mail"],
    ["telefon",         "Telefon"],
    ["anlass",          "Organisation / Anlass"],
  ];

  anfrageFormular.addEventListener("submit", (e) => {
    // Der Browser prüft vorher selbst die Pflichtfelder. Kommt es bis
    // hierher, sind alle Angaben gültig – wir bauen die E-Mail selbst.
    e.preventDefault();

    const daten     = new FormData(anfrageFormular);
    const empfaenger = anfrageFormular.dataset.empfaenger || "";

    // Textzeilen zusammensetzen, leere Felder überspringen
    const zeilen = [];
    felder.forEach(([schluessel, beschriftung]) => {
      const wert = (daten.get(schluessel) || "").toString().trim();
      if (wert) zeilen.push(beschriftung + ": " + wert);
    });

    const nachricht = (daten.get("nachricht") || "").toString().trim();
    if (nachricht) zeilen.push("", "Besondere Wünsche / Nachricht:", nachricht);

    const name    = (daten.get("name") || "").toString().trim();
    const betreff = "Anfrage über die Website" + (name ? " – " + name : "");

    const adresse =
      "mailto:" + empfaenger +
      "?subject=" + encodeURIComponent(betreff) +
      "&body="    + encodeURIComponent(zeilen.join("\n"));

    // E-Mail-Programm öffnen
    window.location.href = adresse;

    // Freundliche Rückmeldung einblenden
    const status = document.getElementById("anfrageStatus");
    if (status) {
      status.hidden = false;
      status.scrollIntoView({ block: "center" });
    }
  });
}
