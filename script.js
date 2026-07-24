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
