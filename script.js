/* ==================================================================
   Düsseldorfer Stadtführer e.V. – Menü auf Smartphone und Tablet
   Diese Datei macht nur eines: Menü auf, Menü zu.
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
    link.addEventListener("click", schliessen);
  });

  // Mit der Escape-Taste schließen
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") schliessen();
  });
}

function schliessen() {
  menue.classList.remove("offen");
  burger.setAttribute("aria-expanded", "false");
}
