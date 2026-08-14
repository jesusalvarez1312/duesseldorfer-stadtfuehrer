/* ==================================================================
   Düsseldorfer Stadtführer e.V. – script.js
   ------------------------------------------------------------------
   Diese Datei wird von allen Seiten geladen. Sie besteht aus sechs
   voneinander unabhängigen Teilen:

     1. Menü auf dem Smartphone auf- und zuklappen
     2. Knopf „weniger anzeigen" am Ende eines Akkordeon-Bereichs
     3. Suche im Kopfbereich
     4. Sprung zu einer einzelnen Führung (öffnet den Bereich)
     5. Tourname an das Anfrageformular weiterreichen
     6. Anfrageformular verschicken

   Jeder Teil prüft zuerst, ob es die betreffenden Elemente auf der
   Seite überhaupt gibt. Fehlt etwas, passiert dort einfach nichts.
================================================================== */


/* ==================================================================
   1. MENÜ
================================================================== */

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
}

function menueSchliessen() {
  if (!menue || !burger) return;
  menue.classList.remove("offen");
  burger.setAttribute("aria-expanded", "false");
}


/* ==================================================================
   2. AKKORDEON: „weniger anzeigen"
   Der Knopf steht im HTML mit dem Attribut hidden. Erst hier wird es
   entfernt. Grund: Ohne JavaScript hätte der Knopf keine Wirkung –
   dann soll er auch gar nicht erst erscheinen.
================================================================== */

document.querySelectorAll(".gruppe__zu").forEach((knopf) => {

  knopf.hidden = false;

  knopf.addEventListener("click", () => {

    const bereich = knopf.closest("details");
    if (!bereich) return;

    bereich.open = false;

    // Nach dem Zuklappen zur Überschrift zurückspringen, sonst
    // steht man plötzlich weit unten auf der Seite.
    bereich.scrollIntoView({ block: "start" });

    const kopf = bereich.querySelector("summary");
    if (kopf) kopf.focus();
  });
});


/* ==================================================================
   3. SUCHE
   ------------------------------------------------------------------
   Durchsucht die Liste TOUREN aus js/touren-daten.js. Dort stehen
   alle Führungen – eine neue Tour trägt man nur dort ein, hier ist
   nichts zu ändern.
================================================================== */

const suchknopf    = document.getElementById("suchknopf");
const suchbereich  = document.getElementById("suchbereich");
const sucheingabe  = document.getElementById("sucheingabe");
const suchezu      = document.getElementById("suchezu");
const suchetreffer = document.getElementById("suchetreffer");
const suchehinweis = document.getElementById("suchehinweis");

// Die Suche braucht JavaScript. Erst wenn alles vorhanden ist, wird
// der Knopf sichtbar – vorher steht er mit "hidden" im HTML.
if (suchknopf && suchbereich && sucheingabe && typeof TOUREN !== "undefined") {

  suchknopf.hidden = false;

  /* ---- Schreibweisen angleichen ---------------------------------
     Damit „Fuehrung", „Führung" und „FÜHRUNG" dasselbe finden:
     alles klein schreiben, Umlaute auflösen, Satzzeichen zu
     Leerzeichen machen.
  --------------------------------------------------------------- */
  function vereinfachen(text) {
    return (text || "")
      .toLowerCase()
      .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/[éèê]/g, "e").replace(/[áàâ]/g, "a").replace(/[íì]/g, "i")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  // Suchtext einmal vorbereiten – das spart Arbeit bei jedem Tastendruck
  const vorrat = TOUREN.map((t) => ({
    tour:    t,
    imTitel: vereinfachen(t.titel),
    imRest:  vereinfachen(t.titel + " " + t.thema + " " + t.worte),
  }));

  const HOECHSTENS = 8;   // so viele Treffer werden angezeigt

  function suchen(eingabe) {

    const woerter = vereinfachen(eingabe).split(" ").filter(Boolean);
    if (!woerter.length) return [];

    const gefunden = [];

    vorrat.forEach((eintrag) => {

      // Jedes eingegebene Wort muss irgendwo vorkommen
      if (!woerter.every((w) => eintrag.imRest.includes(w))) return;

      // Treffer im Titel zählen mehr als Treffer in den Stichworten
      let punkte = 0;
      woerter.forEach((w) => {
        if (eintrag.imTitel.startsWith(w))    punkte += 4;
        else if (eintrag.imTitel.includes(w)) punkte += 2;
        else                                  punkte += 1;
      });

      gefunden.push({ tour: eintrag.tour, punkte: punkte });
    });

    gefunden.sort((a, b) =>
      b.punkte - a.punkte || a.tour.titel.localeCompare(b.tour.titel, "de"));

    return gefunden.slice(0, HOECHSTENS).map((g) => g.tour);
  }

  /* ---- Trefferliste aufbauen ------------------------------------ */
  function anzeigen(eingabe) {

    suchetreffer.innerHTML = "";

    if (!eingabe.trim()) {
      suchehinweis.textContent =
        "Tippen Sie einen Begriff ein – wir zeigen Ihnen passende Führungen.";
      return;
    }

    const treffer = suchen(eingabe);

    if (!treffer.length) {
      suchehinweis.innerHTML =
        "Dazu haben wir nichts gefunden. Schreiben Sie uns gern – wir stellen " +
        "auch eine Führung ganz nach Ihren Wünschen zusammen. " +
        '<a href="anfrage.html">Zur Anfrage</a>';
      return;
    }

    suchehinweis.textContent = treffer.length === 1
      ? "1 Führung gefunden"
      : treffer.length + " Führungen gefunden";

    treffer.forEach((t) => {

      const zeile = document.createElement("li");

      const link = document.createElement("a");
      link.className = "treffer";
      link.href = t.seite;

      const titel = document.createElement("span");
      titel.className = "treffer__titel";
      titel.textContent = t.titel;

      const thema = document.createElement("span");
      thema.className = "treffer__thema";
      thema.textContent = t.uebersicht ? "Themenübersicht" : t.thema;

      link.append(titel, thema);
      zeile.append(link);
      suchetreffer.append(zeile);
    });
  }

  /* ---- Auf- und zuklappen ---------------------------------------- */
  function sucheOeffnen() {
    suchbereich.hidden = false;
    suchknopf.setAttribute("aria-expanded", "true");
    menueSchliessen();
    sucheingabe.focus();
    sucheingabe.select();
  }

  function sucheSchliessen() {
    suchbereich.hidden = true;
    suchknopf.setAttribute("aria-expanded", "false");
  }

  suchknopf.addEventListener("click", () => {
    if (suchbereich.hidden) sucheOeffnen();
    else                    sucheSchliessen();
  });

  if (suchezu) {
    suchezu.addEventListener("click", () => {
      sucheSchliessen();
      suchknopf.focus();
    });
  }

  sucheingabe.addEventListener("input", () => anzeigen(sucheingabe.value));

  // Enter springt zum ersten Treffer
  sucheingabe.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const ersterTreffer = suchetreffer.querySelector("a");
    if (ersterTreffer) ersterTreffer.click();
  });

  // Ein Klick neben die Suche schließt sie wieder
  document.addEventListener("click", (e) => {
    if (suchbereich.hidden) return;
    if (suchbereich.contains(e.target) || suchknopf.contains(e.target)) return;
    sucheSchliessen();
  });
}

// Escape schließt Menü und Suche
document.addEventListener("keydown", (e) => {

  if (e.key !== "Escape") return;

  menueSchliessen();

  if (suchbereich && !suchbereich.hidden) {
    suchbereich.hidden = true;
    if (suchknopf) {
      suchknopf.setAttribute("aria-expanded", "false");
      suchknopf.focus();
    }
  }
});


/* ==================================================================
   4. SPRUNG ZU EINER EINZELNEN FÜHRUNG
   ------------------------------------------------------------------
   Führungen ohne eigene Detailseite stehen in einem zugeklappten
   Bereich. Kommt jemand über die Suche mit einer Adresse wie
   stadtviertel.html#tour-volksgarten, klappen wir den Bereich auf
   und heben die Karte kurz hervor.
================================================================== */

function zurKarteSpringen() {

  const kennung = decodeURIComponent(window.location.hash.replace("#", ""));
  if (kennung.indexOf("tour-") !== 0) return;

  const karte = document.getElementById(kennung);
  if (!karte) return;

  // Alle darüberliegenden Bereiche aufklappen
  let bereich = karte.closest("details");
  while (bereich) {
    bereich.open = true;
    bereich = bereich.parentElement ? bereich.parentElement.closest("details") : null;
  }

  // Kurz warten, damit der aufgeklappte Bereich seine Höhe hat
  window.setTimeout(() => {
    karte.scrollIntoView({ block: "center", behavior: "smooth" });
    karte.classList.add("viertel--hervor");
    window.setTimeout(() => karte.classList.remove("viertel--hervor"), 2600);
  }, 60);
}

window.addEventListener("DOMContentLoaded", zurKarteSpringen);
window.addEventListener("hashchange", zurKarteSpringen);


/* ==================================================================
   5. TOURNAME AN DAS ANFRAGEFORMULAR WEITERREICHEN
   ------------------------------------------------------------------
   Jeder Knopf „Tour anfragen" trägt im HTML den Namen seiner Führung:

       <a href="anfrage.html" data-tour="Nordpark">Tour anfragen</a>

   Hier wird daraus  anfrage.html?tour=Nordpark  – und auf der
   Anfrageseite landet der Name im ersten Feld des Formulars.

   Ohne JavaScript bleibt der Link trotzdem gültig: Er führt dann
   auf das leere Formular. Es geht also nichts kaputt.
================================================================== */

document.querySelectorAll("a[data-tour]").forEach((link) => {

  const name = (link.dataset.tour || "").trim();
  if (!name) return;

  const ziel = link.getAttribute("href") || "anfrage.html";
  if (ziel.indexOf("?") !== -1) return;          // schon ein Zusatz vorhanden

  link.setAttribute("href", ziel + "?tour=" + encodeURIComponent(name));
});


/* ---- Auf der Anfrageseite: Feld vorausfüllen --------------------- */

const tourFeld = document.getElementById("tour");

if (tourFeld) {

  const gewuenscht =
    (new URLSearchParams(window.location.search).get("tour") || "").trim();

  if (gewuenscht) {

    tourFeld.value = gewuenscht;

    // Sichtbarer Hinweis über dem Feld, damit klar ist, woher der
    // Eintrag kommt – und dass man ihn ändern darf.
    const hinweis = document.createElement("p");
    hinweis.className = "feld__uebernommen";

    const wort = document.createElement("strong");
    wort.textContent = "Ihre Auswahl: " + gewuenscht;

    const zusatz = document.createElement("span");
    zusatz.textContent = "Sie können den Text jederzeit ändern oder ergänzen.";

    hinweis.append(wort, zusatz);
    tourFeld.parentNode.insertBefore(hinweis, tourFeld);
  }
}


/* ==================================================================
   6. ANFRAGEFORMULAR VERSCHICKEN
   ------------------------------------------------------------------
   Solange kein Formular-Dienst eingerichtet ist, öffnet das Formular
   beim Absenden das E-Mail-Programm des Besuchers mit fertig
   vorbereitetem Text (data-versand="mailto").

   UMSTELLEN AUF FORMSPREE (o. ä.) SPÄTER:
   In anfrage.html im <form> lediglich
       action="https://formspree.io/f/DEINE-ID"  method="post"
   ergänzen und  data-versand="mailto"  entfernen. Dann verschickt
   der Browser das Formular normal und dieser Block hält sich raus.
================================================================== */

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

    const daten      = new FormData(anfrageFormular);
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
