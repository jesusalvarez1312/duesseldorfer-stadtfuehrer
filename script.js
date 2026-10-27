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
   Die Suche findet Führungen, Unterseiten und Guides.

   Woher kommen die Treffer?
     a) Die Liste TOUREN aus touren-daten.js (sofort verfügbar)
     b) Die Guides aus stadtfuehrer-daten.js (Name, Stichworte, Sprachen)
     c) Der komplette Text ALLER Unterseiten. Beim ersten Öffnen der
        Suche liest das Skript im Hintergrund alle Seiten ein, die von
        der Startseite, „Alle Themen“ und den Themenseiten aus verlinkt
        sind – und deren Unterseiten.

   Für das Team heißt das: Eine neue Unterseite wird automatisch
   gefunden, sobald sie auf einer Themenseite verlinkt ist. Hier im
   Skript ist nichts zu ändern.

   Wie wird gesucht?
     - Groß-/Kleinschreibung und Umlaute sind egal (Fuehrung = Führung).
     - Wortteile genügen: „geh“ findet „Gehry“, „brück“ findet „Brücken“.
     - Mehrere Wörter: Jedes Wort muss vorkommen („frank gehry“,
       „kunst spanisch“).
================================================================== */

const suchknopf    = document.getElementById("suchknopf");
const suchbereich  = document.getElementById("suchbereich");
const sucheingabe  = document.getElementById("sucheingabe");
const suchezu      = document.getElementById("suchezu");
const suchetreffer = document.getElementById("suchetreffer");
const suchehinweis = document.getElementById("suchehinweis");

if (suchknopf && suchbereich && sucheingabe && typeof TOUREN !== "undefined") {

  suchknopf.hidden = false;

  const HOECHSTENS_FUEHRUNGEN = 8; // so viele Führungen werden angezeigt
  const HOECHSTENS_GUIDES     = 6; // … und so viele Guides darunter

  // Diese Seiten sind keine Führungen und werden nicht durchsucht
  const NICHT_DURCHSUCHEN = ["index.html", "alle-themen.html", "anfrage.html", "impressum.html",
                             "datenschutz.html", "stadtfuehrer.html"];

  // Von hier aus sucht das Skript alle verlinkten Seiten zusammen
  const STARTSEITEN = ["index.html", "alle-themen.html", "stadtviertel.html",
                       "kunst-kultur.html", "geschichte-geschichten.html",
                       "sportlich.html", "besondere-beduerfnisse.html",
                       "touren-ausserhalb.html"];

  // Sprachkürzel der Guides -> Wörter, nach denen man suchen kann
  const SPRACHWOERTER = {
    de: "Deutsch German", en: "Englisch English", fr: "Französisch Français French",
    nl: "Niederländisch Nederlands Holländisch", es: "Spanisch Español Spanish",
    ca: "Katalanisch Català", it: "Italienisch Italiano", cs: "Tschechisch Čeština",
    pl: "Polnisch Polski", ru: "Russisch Русский"
  };

  /* ---- Schreibweisen angleichen ---------------------------------- */
  function vereinfachen(text) {
    return (text || "")
      .toLowerCase()
      .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .normalize("NFD").replace(/[̀-ͯ]/g, "")   // é -> e, č -> c
      .replace(/[^a-z0-9а-яё]+/g, " ")
      .trim();
  }

  /* ---- Der Vorrat an Einträgen -----------------------------------
     Jeder Eintrag: titel, link, thema, text (Originaltext für den
     Textauszug) und die vereinfachten Fassungen zum Vergleichen.
  ---------------------------------------------------------------- */
  const vorrat = new Map();       // Schlüssel: Link ohne „#…“ bzw. Link

  function aufnehmen(e) {
    const schluessel = e.link;
    const alt = vorrat.get(schluessel);
    if (alt) {                    // gleiche Seite: Text ergänzen
      alt.text += " " + (e.text || "");
      alt.imText = vereinfachen(alt.text);
      if (e.gewicht > alt.gewicht) {
        alt.titel = e.titel; alt.thema = e.thema || alt.thema; alt.gewicht = e.gewicht;
        alt.imTitel = vereinfachen(alt.titel);
      }
      return;
    }
    e.imTitel = vereinfachen(e.titel);
    e.imText  = vereinfachen(e.titel + " " + (e.thema || "") + " " + (e.worte || "") + " " + (e.text || ""));
    e.text    = e.text || "";
    vorrat.set(schluessel, e);
  }

  // a) Führungen aus touren-daten.js
  TOUREN.forEach((t) => aufnehmen({
    titel: t.titel, link: t.seite, gewicht: 3,
    thema: t.uebersicht ? "Themenübersicht" : t.thema, worte: t.worte, text: ""
  }));

  // b) Guides aus stadtfuehrer-daten.js
  function guidesAufnehmen(liste) {
    (liste || []).forEach((g) => {
      const sprachen = (g.sprachen || []).map((c) => SPRACHWOERTER[c] || c).join(" ");
      const kurz = (g.sprachen || []).map((c) => c.toUpperCase()).join(", ");
      aufnehmen({
        titel: g.name, link: "stadtfuehrer.html#guide-" + (g.bild || ""), gewicht: 3, guide: true,
        thema: "Guide" + (kurz ? " · " + kurz : "") +
               ((g.stichworte || []).length ? " · " + g.stichworte.join(", ") : ""),
        worte: "Guide Gästeführer Stadtführer " + (g.stichworte || []).join(" ") + " " + sprachen,
        text: ""
      });
    });
  }

  if (typeof stadtfuehrerListe !== "undefined") {
    guidesAufnehmen(stadtfuehrerListe);
  } else {
    // Datei laden, ohne sie fest in jede Seite einzubauen
    fetch("stadtfuehrer-daten.js")
      .then((r) => (r.ok ? r.text() : ""))
      .then((code) => {
        if (!code) return;
        guidesAufnehmen(new Function(code + "\n;return stadtfuehrerListe;")());
        if (sucheingabe.value.trim()) anzeigen(sucheingabe.value);
      })
      .catch(() => {});
  }

  /* ---- c) Alle Unterseiten einlesen (einmal, im Hintergrund) ---- */
  let seitenStatus = "offen";     // offen -> laedt -> fertig

  function textVon(knoten) {
    return (knoten ? knoten.textContent : "").replace(/\s+/g, " ").trim();
  }

  function seiteAuswerten(adresse, html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const haupt = doc.querySelector("main") || doc.body;
    if (!haupt) return [];

    const h1 = textVon(doc.querySelector("h1")) ||
               textVon(doc.querySelector("title")).split(" – ")[0];

    // Karten auf Themenseiten: jede Karte ist ein eigener Treffer
    haupt.querySelectorAll("li.viertel[id]").forEach((karte) => {
      karte.querySelectorAll(".viertel__anfrage, [data-tour]").forEach((k) => k.remove());  // „Tour anfragen“ nicht mitlesen
      const titelLink = karte.querySelector(".viertel__titel a");
      const ziel = titelLink ? titelLink.getAttribute("href") : adresse + "#" + karte.id;
      aufnehmen({
        titel: textVon(karte.querySelector(".viertel__titel")) || h1,
        link: ziel, thema: h1, gewicht: 2, text: textVon(karte)
      });
      karte.remove();             // nicht doppelt im Seitentext zählen
    });

    // Navigation, Fußzeile, Formulare und Knöpfe nicht mitlesen
    haupt.querySelectorAll("nav, footer, script, style, form, .knopfreihe").forEach((n) => n.remove());

    aufnehmen({ titel: h1, link: adresse, thema: "Seite", gewicht: 1, text: textVon(haupt) });

    // Weitere Unterseiten, die hier verlinkt sind
    return Array.from(doc.querySelectorAll('a[href$=".html"], a[href*=".html#"]'))
      .map((a) => a.getAttribute("href").split("#")[0])
      .filter((h) => /^[a-z0-9-]+\.html$/i.test(h));
  }

  function alleSeitenLaden() {
    if (seitenStatus !== "offen" || !window.fetch || !window.DOMParser) return;
    seitenStatus = "laedt";

    const gesehen = new Set();
    let warteschlange = STARTSEITEN.map((s) => [s, 0]);
    let laufend = 0;

    function weiter() {
      while (laufend < 6 && warteschlange.length) {
        const [adresse, tiefe] = warteschlange.shift();
        if (gesehen.has(adresse) || gesehen.size > 150) continue;
        gesehen.add(adresse);
        laufend++;
        fetch(adresse)
          .then((r) => (r.ok ? r.text() : ""))
          .then((html) => {
            if (!html) return;
            const links = seiteAuswerten(adresse, html);
            if (tiefe < 2) links.forEach((l) => warteschlange.push([l, tiefe + 1]));
          })
          .catch(() => {})
          .finally(() => {
            laufend--;
            weiter();
          });
      }
      if (!warteschlange.length && laufend === 0 && seitenStatus !== "fertig") {
        seitenStatus = "fertig";
        NICHT_DURCHSUCHEN.forEach((s) => vorrat.delete(s));
        if (sucheingabe.value.trim()) anzeigen(sucheingabe.value);
      }
    }
    // Startseite & Co. liefern nur Links, ihr Text kommt nicht in die Treffer
    weiter();
  }

  /* ---- Suchen ------------------------------------------------------ */
  function suchen(eingabe) {

    const woerter = vereinfachen(eingabe).split(" ").filter(Boolean);
    if (!woerter.length) return { fuehrungen: [], guides: [] };

    const gefunden = [];

    vorrat.forEach((e, schluessel) => {
      if (NICHT_DURCHSUCHEN.includes(schluessel)) return;
      if (!woerter.every((w) => e.imText.includes(w))) return;

      let punkte = e.gewicht + (e.thema === "Seite" ? -6 : 0);
      woerter.forEach((w) => {
        if (e.imTitel.startsWith(w))                       punkte += 8;
        else if (e.imTitel.includes(w))                    punkte += 5;
        else if (vereinfachen(e.thema).includes(w))        punkte += 3;
        else                                               punkte += 1;
      });
      gefunden.push({ e: e, punkte: punkte });
    });

    gefunden.sort((a, b) =>
      b.punkte - a.punkte || a.e.titel.localeCompare(b.e.titel, "de"));

    // Gleicher Titel doppelt (Karte auf der Themenseite und eigene
    // Detailseite)? Dann nur einmal zeigen – bevorzugt die Detailseite.
    const titel = new Map();
    gefunden.forEach((g) => {
      const t = g.e.imTitel, da = titel.get(t);
      if (!da || (da.e.link.includes("#") && !g.e.link.includes("#") && g.punkte >= da.punkte - 3)) titel.set(t, g);
    });
    const eindeutig = gefunden.filter((g) => titel.get(g.e.imTitel) === g).map((g) => g.e);

    // Erst die Führungen, dann – getrennt – die Guides
    return {
      fuehrungen: eindeutig.filter((e) => !e.guide).slice(0, HOECHSTENS_FUEHRUNGEN),
      guides:     eindeutig.filter((e) =>  e.guide).slice(0, HOECHSTENS_GUIDES)
    };
  }

  // Kurzer Textauszug, in dem das erste Suchwort vorkommt
  function auszug(e, eingabe) {
    if (!e.text) return "";
    const w = vereinfachen(eingabe).split(" ").filter(Boolean)[0];
    if (!w || e.imTitel.includes(w)) return "";
    const saetze = e.text.split(/(?<=[.!?•])\s+/);
    const satz = saetze.find((s) => vereinfachen(s).includes(w));
    if (!satz) return "";
    return satz.length > 140 ? satz.slice(0, 137).trim() + " …" : satz;
  }

  /* ---- Trefferliste aufbauen ------------------------------------ */
  function anzeigen(eingabe) {

    suchetreffer.innerHTML = "";

    if (!eingabe.trim()) {
      suchehinweis.textContent =
        "Tippen Sie einen Begriff ein – wir zeigen Ihnen passende Führungen und Guides.";
      return;
    }

    const ergebnis = suchen(eingabe);
    const anzahl = ergebnis.fuehrungen.length + ergebnis.guides.length;
    const nochAmLaden = seitenStatus !== "fertig";

    if (!anzahl) {
      if (nochAmLaden) {
        suchehinweis.textContent = "Einen Moment – wir durchsuchen alle Seiten …";
        return;
      }
      suchehinweis.innerHTML =
        "Dazu haben wir nichts gefunden. Schreiben Sie uns gern – wir stellen " +
        "auch eine Führung ganz nach Ihren Wünschen zusammen. " +
        '<a href="anfrage.html">Zur Anfrage</a>';
      return;
    }

    suchehinweis.textContent = (anzahl === 1 ? "1 Treffer" : anzahl + " Treffer") +
      (nochAmLaden ? " – wir durchsuchen noch weitere Seiten …" : "");

    function ueberschrift(text) {
      const zeile = document.createElement("li");
      zeile.className = "treffer__gruppe";
      zeile.textContent = text;
      suchetreffer.append(zeile);
    }

    if (ergebnis.fuehrungen.length) ueberschrift("Führungen");
    ergebnis.fuehrungen.forEach(trefferZeile);
    if (ergebnis.guides.length) ueberschrift("Guides");
    ergebnis.guides.forEach(trefferZeile);
  }

  function trefferZeile(t) {
    const eingabe = sucheingabe.value;
    const zeile = document.createElement("li");
    const link = document.createElement("a");
    link.className = "treffer";
    link.href = t.link;

    const titel = document.createElement("span");
    titel.className = "treffer__titel";
    titel.textContent = t.titel;

    const thema = document.createElement("span");
    thema.className = "treffer__thema";
    const text = auszug(t, eingabe);
    thema.textContent = text ? (t.thema && t.thema !== "Seite" ? t.thema + ": " : "") + text
                             : (t.thema === "Seite" ? "Unterseite" : t.thema);

    link.append(titel, thema);
    zeile.append(link);
    suchetreffer.append(zeile);
  }

  /* ---- Auf- und zuklappen ---------------------------------------- */
  function sucheOeffnen() {
    suchbereich.hidden = false;
    suchknopf.setAttribute("aria-expanded", "true");
    menueSchliessen();
    sucheingabe.focus();
    sucheingabe.select();
    alleSeitenLaden();
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
