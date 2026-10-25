/* ==================================================================
   POP-UP-BANNER AUF DER STARTSEITE
   ------------------------------------------------------------------
   NUR DIESEN BLOCK ÄNDERN:

     aktiv     true = Banner erscheint, false = Banner ist aus
     von / bis Zeitraum, in dem das Banner erscheint (JJJJ-MM-TT).
               Am Tag nach „bis“ verschwindet es von selbst.
     titel     Überschrift
     text      Kurzer Text (ein, zwei Sätze)
     linkText  Beschriftung des roten Knopfs (leer lassen = kein Knopf)
     link      Ziel des Knopfs, z. B. eine Seite wie "weihnachtsmaerkte.html"

   Das Banner erscheint einmal pro Besuch. Wer es schließt, sieht es
   erst beim nächsten Besuch wieder.
================================================================== */

const BANNER = {
  aktiv:    true,
  von:      "2026-10-25",
  bis:      "2026-11-08",
  titel:    "Willkommen auf unserer Probeseite",
  text:     "Dies ist nur eine Probeseite für den Verein. Hier stehen später Neuigkeiten – zum Beispiel Angebote für die weihnachtliche Führung durch die Düsseldorfer Altstadt.",
  linkText: "Zu den Weihnachtsmärkten",
  link:     "weihnachtsmaerkte.html"
};


/* ---- Ab hier muss nichts geändert werden -------------------------- */
(function () {
  "use strict";
  if (!BANNER.aktiv) return;

  const heute = new Date();
  const tag = heute.getFullYear() + "-" +
              String(heute.getMonth() + 1).padStart(2, "0") + "-" +
              String(heute.getDate()).padStart(2, "0");
  if ((BANNER.von && tag < BANNER.von) || (BANNER.bis && tag > BANNER.bis)) return;

  const SCHLUESSEL = "banner-gesehen:" + BANNER.titel;
  try { if (sessionStorage.getItem(SCHLUESSEL)) return; } catch (e) { /* egal */ }

  const huelle = document.createElement("div");
  huelle.className = "banner";
  huelle.innerHTML =
    '<div class="banner__karte" role="dialog" aria-modal="true" aria-labelledby="banner-titel">' +
      '<button class="banner__zu" type="button" aria-label="Hinweis schließen">' +
        '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>' +
      "</button>" +
      '<p class="augenbraue">Aktuelles</p>' +
      '<h2 id="banner-titel"></h2>' +
      '<p class="banner__text"></p>' +
      '<div class="banner__knoepfe"></div>' +
    "</div>";

  huelle.querySelector("h2").textContent = BANNER.titel;
  huelle.querySelector(".banner__text").textContent = BANNER.text;

  const knoepfe = huelle.querySelector(".banner__knoepfe");
  if (BANNER.linkText && BANNER.link) {
    const a = document.createElement("a");
    a.className = "knopf";
    a.href = BANNER.link;
    a.textContent = BANNER.linkText;
    knoepfe.append(a);
  }
  const spaeter = document.createElement("button");
  spaeter.type = "button";
  spaeter.className = "knopf knopf--rand";
  spaeter.textContent = "Schließen";
  knoepfe.append(spaeter);

  let vorherFokus = null;

  function schliessen() {
    huelle.remove();
    document.removeEventListener("keydown", taste);
    try { sessionStorage.setItem(SCHLUESSEL, "1"); } catch (e) { /* egal */ }
    if (vorherFokus && vorherFokus.focus) vorherFokus.focus();
  }
  function taste(e) { if (e.key === "Escape") schliessen(); }

  huelle.querySelector(".banner__zu").addEventListener("click", schliessen);
  spaeter.addEventListener("click", schliessen);
  huelle.addEventListener("click", (e) => { if (e.target === huelle) schliessen(); });
  knoepfe.querySelector("a")?.addEventListener("click", () => {
    try { sessionStorage.setItem(SCHLUESSEL, "1"); } catch (e) { /* egal */ }
  });

  // Kurz warten, damit die Seite zuerst sichtbar ist
  setTimeout(() => {
    vorherFokus = document.activeElement;
    document.body.append(huelle);
    document.addEventListener("keydown", taste);
    huelle.querySelector(".banner__zu").focus();
  }, 700);
})();
