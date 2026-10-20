/* ================================================================
   FLAGGEN ODER TEXTKÜRZEL – einheitlich
   Prüft einmal, ob der Browser/das Betriebssystem Länderflaggen als
   Emoji darstellen kann (z. B. Mac, iPhone, Android: ja; Windows: nein,
   dort erscheinen nur Buchstaben).

   - Flaggen werden dargestellt  -> alle Sprachen zeigen ihre Flagge.
   - Flaggen fehlen              -> alle Sprachen zeigen ihr Textkürzel
                                    (DE, EN, FR …) im bisherigen Kreis,
                                    auch Català.

   Gilt für jedes Element mit class="flagge" und data-code="xx".
   Eingebunden in index.html und stadtfuehrer.html. Nachträglich
   erzeugte Elemente: flaggenAnwenden(containerElement) aufrufen.
=================================================================== */
(function () {
  "use strict";

  function flaggenUnterstuetzt() {
    try {
      var c = document.createElement("canvas");
      c.width = 64;
      c.height = 40;
      var ctx = c.getContext("2d", { willReadFrequently: true });
      if (!ctx) return false;
      ctx.textBaseline = "top";
      ctx.font = '28px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
      ctx.fillStyle = "#000";
      ctx.fillText("\uD83C\uDDE9\uD83C\uDDEA", 0, 0); // Flagge Deutschland
      var d = ctx.getImageData(0, 0, 64, 40).data;
      // Echte Flagge enthält das kräftige Rot des Streifens;
      // als Buchstaben gezeichnet wäre alles schwarz/grau.
      for (var i = 0; i < d.length; i += 4) {
        if (d[i + 3] > 200 && d[i] > 200 && d[i + 1] < 80 && d[i + 2] < 80) return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  var mitFlaggen = flaggenUnterstuetzt();
  // Buchstaben als Regional-Indicator-Zeichen: Geräte ohne Flaggen-Emoji
  // zeigen sie als zwei Buchstaben (DE, EN …) – genau so wie bisher,
  // mit dem vorhandenen Kreis-Layout der Klasse ".flagge".
  // Abweichungen vom Sprachkürzel: Tschechisch wird als CZ angezeigt.
  var anzeigeKuerzel = { cs: "CZ" };

  function alsBuchstaben(code) {
    var out = "";
    code = (anzeigeKuerzel[code] || code).toUpperCase();
    for (var i = 0; i < code.length; i++) {
      out += String.fromCodePoint(0x1F1E6 + code.charCodeAt(i) - 65);
    }
    return out;
  }

  function anwenden(wurzel) {
    if (mitFlaggen) return;
    var knoten = (wurzel || document).querySelectorAll(".flagge[data-code]");
    for (var i = 0; i < knoten.length; i++) {
      var el = knoten[i];
      if (el.getAttribute("data-kuerzel")) continue;
      el.setAttribute("data-kuerzel", "1");
      el.textContent = alsBuchstaben(el.getAttribute("data-code"));
    }
  }

  window.flaggenAnwenden = anwenden;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { anwenden(document); });
  } else {
    anwenden(document);
  }
})();
