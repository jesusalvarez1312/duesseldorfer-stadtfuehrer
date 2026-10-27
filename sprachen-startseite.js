/* ==================================================================
   SPRACHUMSCHALTER DER STARTSEITE  (Deutsch · English · Español · Français)
   ------------------------------------------------------------------
   So funktioniert es:
   Jedes übersetzbare Element in index.html trägt ein Attribut
   data-i18n="schluessel". Der deutsche Text steht ganz normal im
   HTML. Hier unten stehen nur die Übersetzungen.

   DEUTSCHEN TEXT GEÄNDERT?
   Dann den passenden Schlüssel unten in allen drei Sprachen anpassen.
   Fehlt eine Übersetzung, erscheint automatisch der deutsche Text –
   es geht also nichts kaputt.

   NEUEN TEXT ÜBERSETZBAR MACHEN:
     1. Im HTML: <span data-i18n="mein_text">Deutscher Text</span>
     2. Hier in en, es und fr ergänzen:   mein_text: "…",
   Für Attribute (alt, placeholder, aria-label):
     data-i18n-attr="alt:mein_schluessel"

   Die gewählte Sprache merkt sich der Browser (Local Storage).
   Direkt verlinken geht auch: index.html?lang=en
================================================================== */

(function () {
  "use strict";

  const TEXTE = {

    /* ============================ ENGLISH ============================ */
    en: {
      seitentitel: "Guided tours in Düsseldorf – Düsseldorfer Stadtführer e.V.",
      skip: "Skip to content",
      sprachwahl: "Choose language",
      nav_touren: "Tours",
      nav_verein: "About us",
      nav_sprachen: "Languages",
      nav_anfrage: "Enquiry",
      nav_kontakt: "Contact",
      such_platzhalter: "Search (in German), e.g. Altbier, Kinder, Architektur",

      held_augenbraue: "The Düsseldorf insiders · since 1997",
      held_h1: "Düsseldorf explained by people<br>who call it <em>home</em>.",
      held_lead: "Personal. Knowledgeable. Passionate. We show you the most beautiful sides of our city – and the stories behind them.",
      held_alt: "The association's tour guides in front of a historic building in Düsseldorf",
      btn_guide: "Find a guide",
      btn_themen: "View topics",

      top_augenbraue: "Our most popular tours",
      top_h2: "Our Top 10",
      top_lead: "Our bestsellers at a glance. We are happy to adapt the starting point, end and duration to your wishes.",
      hinweis_deutsch: "Please note: the detailed tour pages are currently available in German only.",
      t1_titel: "Old Town",
      t1_satz: "Where Düsseldorf began: lanes, churches and stories in a small space.",
      t2_titel: "New Centre",
      t2_satz: "Kö-Bogen, Dreischeibenhaus, Hofgarten promenade: how a city reinvents itself.",
      t3_titel: "MedienHafen",
      t3_satz: "From coal and cranes to world-class architecture – the city's most spectacular transformation.",
      t4_titel: "The best of Düsseldorf",
      t4_satz: "All the highlights in a brisk two hours – ideal for a first visit.",
      t5_titel: "Culinary Düsseldorf",
      t5_satz: "Tasting your way through the Old Town and Carlstadt: mustard, cheese, Rhenish specialities and sweets.",
      t6_titel: "Altbier & the longest bar in the world",
      t6_satz: "Four brewery pubs, a copper kettle and the question: how long is the bar really?",
      t7_titel: "Little Tokyo",
      t7_satz: "One of the largest Japanese communities in Europe – right in front of the main station.",
      t8_titel: "Kaiserswerth",
      t8_satz: "Imperial palace on the Rhine and Fliedner's deaconry – Düsseldorf's second old town.",
      t9_titel: "Out and about with the night watchman",
      t9_satz: "Lantern, halberd, horn call: the Old Town and Kaiserswerth after dark.",
      t10_titel: "Bike tours",
      t10_satz: "See more of the city in less time: along the Rhine and through the neighbourhoods.",
      tour_anfragen: "Request tour",

      themen_augenbraue: "Our special tours",
      themen_h2: "Discover Düsseldorf with professional guides.",
      themen_p: "We are also happy to accompany you on your coach, combine topics or develop a tour tailored entirely to your wishes and needs – one that has never existed before.",
      btn_alle_themen: "Explore all topics",
      k_geschichte: "History & stories",
      k_kunst: "Art & culture",
      k_viertel: "Neighbourhoods",
      k_sport: "Active tours",
      k_familien: "Families & special needs",
      k_ausserhalb: "Tours outside Düsseldorf",

      verein_h2: "About us",
      verein_p1: "We are an association of qualified, self-employed tour guides in Düsseldorf. We are as colourful as Düsseldorf itself. Our members include experts in art and history, architects, journalists, educators, linguists and economists. Thanks to this wide range of expertise, we now have a real “treasure trove” of tours on more than 100 topics. Of course we also offer standard tours – but we love to be tailor-made.",
      verein_p2: "In 1997 a handful of experienced tour guides founded our association. Since then our members have also belonged to the <a href=\"https://www.bvgd.org\" target=\"_blank\" rel=\"noopener noreferrer\">BVGD</a>, the German professional association of tourist guides.",
      verein_p3: "Many of us hold the 3-star certification under the European training standard for tourist guides, DIN EN 15565. This makes us the guides in Düsseldorf with the “master's certificate” from the most demanding training programme for tourist guides in Germany. You are always in good hands with us!",
      verein_alt: "Cheerful group photo of the association's tour guides",
      btn_verein: "About the association",

      sprachen_h2: "We guide in<br>many languages",
      sprachen_p: "Tell us which language your group speaks – we'll find the right person.",

      buchung_augenbraue: "Simple. Personal. Uncomplicated.",
      buchung_h2: "Send us your enquiry",
      s1_h: "Choose a tour",
      s1_p: "Discover our tours and pick your favourite.",
      s2_h: "Choose a date",
      s2_p: "Pick your preferred date – we'll check availability.",
      s3_h: "Fine-tune your tour",
      s3_p: "Duration, special features or wishes – tell us what matters to you.",
      btn_anfrage: "Send enquiry",
      zusage_titel: "We'll get back to you <em>promptly</em>.",
      zusage_text: "Personal. Reliable. For your perfect tour.",

      kontakt_h2: "Contact the association",
      kontakt_p: "For press enquiries, questions about the association and large bookings, please contact the board.",
      label_mail: "Email",
      label_tel: "Phone",

      fuss_impressum: "Legal notice",
      fuss_datenschutz: "Privacy policy"
    },

    /* ============================ ESPAÑOL ============================ */
    es: {
      seitentitel: "Visitas guiadas en Düsseldorf – Düsseldorfer Stadtführer e.V.",
      skip: "Saltar al contenido",
      sprachwahl: "Elegir idioma",
      nav_touren: "Visitas",
      nav_verein: "Sobre nosotros",
      nav_sprachen: "Idiomas",
      nav_anfrage: "Solicitud",
      nav_kontakt: "Contacto",
      such_platzhalter: "Buscar (en alemán), p. ej. Altbier, Kinder, Architektur",

      held_augenbraue: "Los expertos de Düsseldorf · desde 1997",
      held_h1: "Düsseldorf contada por quienes<br>viven <em>aquí</em>.",
      held_lead: "Personal. Competente. Con pasión. Le mostramos los rincones más bonitos de nuestra ciudad, y las historias que esconden.",
      held_alt: "Las y los guías de la asociación delante de un edificio histórico de Düsseldorf",
      btn_guide: "Encontrar guía",
      btn_themen: "Ver temas",

      top_augenbraue: "Nuestras visitas más populares",
      top_h2: "Nuestro Top 10",
      top_lead: "Nuestros favoritos de un vistazo. Adaptamos con gusto el punto de inicio, el final y la duración a sus deseos.",
      hinweis_deutsch: "Tenga en cuenta: por ahora, las páginas detalladas de las visitas solo están disponibles en alemán.",
      t1_titel: "Casco antiguo",
      t1_satz: "Donde empezó Düsseldorf: callejuelas, iglesias e historias en muy poco espacio.",
      t2_titel: "Nuevo centro",
      t2_satz: "Kö-Bogen, Dreischeibenhaus, paseo del Hofgarten: así se reinventa una ciudad.",
      t3_titel: "MedienHafen",
      t3_satz: "Del carbón y las grúas a la arquitectura de primer nivel: la transformación más espectacular de la ciudad.",
      t4_titel: "Lo mejor de Düsseldorf",
      t4_satz: "Todos los lugares destacados en dos horas a buen ritmo: ideal para una primera visita.",
      t5_titel: "Düsseldorf gastronómica",
      t5_satz: "El casco antiguo y Carlstadt para degustar: mostaza, queso, especialidades renanas y dulces.",
      t6_titel: "Altbier y la barra más larga del mundo",
      t6_satz: "Cuatro cervecerías artesanales, una caldera de cobre y la pregunta: ¿cuánto mide realmente la barra?",
      t7_titel: "Pequeño Tokio",
      t7_satz: "Una de las mayores comunidades japonesas de Europa, justo delante de la estación central.",
      t8_titel: "Kaiserswerth",
      t8_satz: "Palacio imperial junto al Rin y la Diaconía de Fliedner: el segundo casco antiguo de Düsseldorf.",
      t9_titel: "Con el sereno",
      t9_satz: "Farol, alabarda y cuerno: el casco antiguo y Kaiserswerth al caer la noche.",
      t10_titel: "Rutas en bicicleta",
      t10_satz: "Más ciudad en menos tiempo: a lo largo del Rin y por los barrios.",
      tour_anfragen: "Solicitar visita",

      themen_augenbraue: "Nuestras visitas especiales",
      themen_h2: "Descubra Düsseldorf con guías profesionales.",
      themen_p: "También le acompañamos con gusto en su autocar, combinamos temas o diseñamos una visita totalmente adaptada a sus deseos y necesidades, que no existe en ningún otro sitio.",
      btn_alle_themen: "Descubrir todos los temas",
      k_geschichte: "Historia e historias",
      k_kunst: "Arte y cultura",
      k_viertel: "Barrios",
      k_sport: "Visitas deportivas",
      k_familien: "Familias y necesidades especiales",
      k_ausserhalb: "Excursiones fuera de Düsseldorf",

      verein_h2: "Sobre nosotros",
      verein_p1: "Somos una asociación de guías turísticos cualificados e independientes de Düsseldorf. Somos tan diversos como la propia ciudad. Entre nosotros hay especialistas en arte e historia, arquitectos, periodistas, pedagogos, filólogos y economistas. Gracias a esta amplia gama de conocimientos, contamos ya con un auténtico «tesoro» de visitas sobre más de 100 temas. Por supuesto, también ofrecemos visitas estándar, pero lo que más nos gusta es hacerlas a medida.",
      verein_p2: "En 1997, un puñado de guías con experiencia fundó nuestra asociación. Desde entonces, nuestros miembros forman parte también de la <a href=\"https://www.bvgd.org\" target=\"_blank\" rel=\"noopener noreferrer\">BVGD</a>, la asociación profesional alemana de guías turísticos.",
      verein_p3: "Muchos de nosotros tenemos la certificación de 3 estrellas según la norma europea de formación de guías DIN EN 15565. Somos, por tanto, los guías de Düsseldorf con el «título de maestría» del programa de formación para guías más exigente de Alemania. ¡Con nosotros está siempre en buenas manos!",
      verein_alt: "Foto de grupo alegre de las y los guías de la asociación",
      btn_verein: "Sobre la asociación",

      sprachen_h2: "Guiamos en<br>muchos idiomas",
      sprachen_p: "Díganos qué idioma habla su grupo y le buscaremos la persona adecuada.",

      buchung_augenbraue: "Sencillo. Personal. Sin complicaciones.",
      buchung_h2: "Envíenos su solicitud",
      s1_h: "Elija una visita",
      s1_p: "Descubra nuestras visitas y elija su favorita.",
      s2_h: "Elija una fecha",
      s2_p: "Indique la fecha que desee y comprobaremos la disponibilidad.",
      s3_h: "Concrete los detalles",
      s3_p: "Duración, particularidades o deseos: cuéntenos qué es importante para usted.",
      btn_anfrage: "Enviar solicitud",
      zusage_titel: "Le responderemos <em>en breve</em>.",
      zusage_text: "Personal. Fiable. Para su visita perfecta.",

      kontakt_h2: "Contacto con la asociación",
      kontakt_p: "Para consultas de prensa, preguntas sobre la asociación y encargos de grupos grandes, diríjase a la junta directiva.",
      label_mail: "Correo electrónico",
      label_tel: "Teléfono",

      fuss_impressum: "Aviso legal",
      fuss_datenschutz: "Privacidad"
    },

    /* ============================ FRANÇAIS =========================== */
    fr: {
      seitentitel: "Visites guidées à Düsseldorf – Düsseldorfer Stadtführer e.V.",
      skip: "Aller au contenu",
      sprachwahl: "Choisir la langue",
      nav_touren: "Visites",
      nav_verein: "À propos de nous",
      nav_sprachen: "Langues",
      nav_anfrage: "Demande",
      nav_kontakt: "Contact",
      such_platzhalter: "Rechercher (en allemand), p. ex. Altbier, Kinder, Architektur",

      held_augenbraue: "Les initiés de Düsseldorf · depuis 1997",
      held_h1: "Düsseldorf racontée par ceux<br>qui vivent <em>ici</em>.",
      held_lead: "Personnel. Compétent. Passionné. Nous vous montrons les plus beaux visages de notre ville – et les histoires qui se cachent derrière.",
      held_alt: "Les guides de l'association devant un bâtiment historique de Düsseldorf",
      btn_guide: "Trouver un guide",
      btn_themen: "Voir les thèmes",

      top_augenbraue: "Nos visites les plus demandées",
      top_h2: "Notre top 10",
      top_lead: "Nos incontournables en un coup d'œil. Nous adaptons volontiers le point de départ, l'arrivée et la durée à vos souhaits.",
      hinweis_deutsch: "Remarque : les pages détaillées des visites sont pour l'instant disponibles uniquement en allemand.",
      t1_titel: "Vieille ville",
      t1_satz: "Là où Düsseldorf a commencé : ruelles, églises et histoires dans un mouchoir de poche.",
      t2_titel: "Nouveau centre",
      t2_satz: "Kö-Bogen, Dreischeibenhaus, promenade du Hofgarten : comment une ville se réinvente.",
      t3_titel: "MedienHafen",
      t3_satz: "Du charbon et des grues à une architecture de renommée mondiale – la métamorphose la plus spectaculaire de la ville.",
      t4_titel: "Le meilleur de Düsseldorf",
      t4_satz: "Tous les incontournables en deux heures bien rythmées – idéal pour une première visite.",
      t5_titel: "Düsseldorf gourmande",
      t5_satz: "La vieille ville et la Carlstadt à déguster : moutarde, fromage, spécialités rhénanes et douceurs.",
      t6_titel: "Altbier et le plus long comptoir du monde",
      t6_satz: "Quatre brasseries artisanales, une cuve en cuivre et une question : quelle est la longueur réelle du comptoir ?",
      t7_titel: "Le petit Tokyo",
      t7_satz: "L'une des plus grandes communautés japonaises d'Europe – juste devant la gare centrale.",
      t8_titel: "Kaiserswerth",
      t8_satz: "Palais impérial au bord du Rhin et diaconie de Fliedner – la deuxième vieille ville de Düsseldorf.",
      t9_titel: "Avec le veilleur de nuit",
      t9_satz: "Lanterne, hallebarde, cor : la vieille ville et Kaiserswerth à la nuit tombée.",
      t10_titel: "Visites à vélo",
      t10_satz: "Plus de ville en moins de temps : le long du Rhin et à travers les quartiers.",
      tour_anfragen: "Demander cette visite",

      themen_augenbraue: "Nos visites thématiques",
      themen_h2: "Découvrez Düsseldorf avec des guides professionnels.",
      themen_p: "Nous vous accompagnons aussi volontiers dans votre autocar, combinons plusieurs thèmes ou concevons une visite entièrement adaptée à vos souhaits et besoins – une visite qui n'existe encore nulle part.",
      btn_alle_themen: "Découvrir tous les thèmes",
      k_geschichte: "Histoire et histoires",
      k_kunst: "Art et culture",
      k_viertel: "Quartiers",
      k_sport: "Visites sportives",
      k_familien: "Familles et besoins particuliers",
      k_ausserhalb: "Excursions hors de Düsseldorf",

      verein_h2: "À propos de nous",
      verein_p1: "Nous sommes une association de guides qualifiés et indépendants à Düsseldorf. Nous sommes aussi variés que Düsseldorf elle-même. Parmi nous, des spécialistes de l'art et de l'histoire, des architectes, des journalistes, des pédagogues, des linguistes et des économistes. Grâce à cette large palette de compétences, nous disposons aujourd'hui d'un véritable « trésor » de visites sur plus de 100 thèmes. Nous proposons bien sûr aussi des visites classiques – mais nous préférons le sur-mesure.",
      verein_p2: "En 1997, une poignée de guides expérimentés a fondé notre association. Depuis, nos membres font également partie du <a href=\"https://www.bvgd.org\" target=\"_blank\" rel=\"noopener noreferrer\">BVGD</a>, l'association professionnelle allemande des guides.",
      verein_p3: "Beaucoup d'entre nous sont titulaires de la certification 3 étoiles selon la norme européenne de formation des guides DIN EN 15565. Nous sommes ainsi les guides de Düsseldorf détenteurs du « brevet de maîtrise » du programme de formation le plus exigeant d'Allemagne. Avec nous, vous êtes toujours entre de bonnes mains !",
      verein_alt: "Photo de groupe joyeuse des guides de l'association",
      btn_verein: "À propos de l'association",

      sprachen_h2: "Nous guidons en<br>de nombreuses langues",
      sprachen_p: "Dites-nous quelle langue parle votre groupe – nous trouverons la bonne personne.",

      buchung_augenbraue: "Simple. Personnel. Sans complications.",
      buchung_h2: "Faites votre demande",
      s1_h: "Choisissez une visite",
      s1_p: "Découvrez nos visites et choisissez votre préférée.",
      s2_h: "Choisissez une date",
      s2_p: "Indiquez la date souhaitée – nous vérifions la disponibilité.",
      s3_h: "Précisez votre visite",
      s3_p: "Durée, particularités ou souhaits – dites-nous ce qui compte pour vous.",
      btn_anfrage: "Envoyer la demande",
      zusage_titel: "Nous vous répondons <em>rapidement</em>.",
      zusage_text: "Personnel. Fiable. Pour votre visite idéale.",

      kontakt_h2: "Contacter l'association",
      kontakt_p: "Pour les demandes de presse, les questions sur l'association et les grandes commandes, adressez-vous au comité directeur.",
      label_mail: "E-mail",
      label_tel: "Téléphone",

      fuss_impressum: "Mentions légales",
      fuss_datenschutz: "Confidentialité"
    }
  };


  /* ---- Ab hier muss nichts geändert werden -------------------------- */

  const SPRACHEN = ["de", "en", "es", "fr"];
  const SPEICHER = "sprache";

  const knoten = Array.from(document.querySelectorAll("[data-i18n]"));
  const original = new Map(knoten.map((k) => [k, k.innerHTML]));

  const attrKnoten = Array.from(document.querySelectorAll("[data-i18n-attr]"));
  const attrOriginal = new Map();        // deutsche Attribute merken
  attrKnoten.forEach((k) => {
    k.getAttribute("data-i18n-attr").split(";").forEach((paar) => {
      const attr = paar.split(":")[0];
      attrOriginal.set(k, Object.assign(attrOriginal.get(k) || {}, { [attr]: k.getAttribute(attr) || "" }));
    });
  });

  const titelOriginal = document.title;
  const hinweise = document.querySelectorAll("[data-nur-fremdsprache]");
  const knoepfe = document.querySelectorAll(".sprachwahl [data-lang]");

  function setzen(sprache) {
    if (!SPRACHEN.includes(sprache)) sprache = "de";
    const t = TEXTE[sprache] || {};

    knoten.forEach((k) => {
      const s = k.getAttribute("data-i18n");
      k.innerHTML = sprache !== "de" && t[s] !== undefined ? t[s] : original.get(k);
    });

    attrKnoten.forEach((k) => {
      k.getAttribute("data-i18n-attr").split(";").forEach((paar) => {
        const [attr, s] = paar.split(":");
        const wert = sprache !== "de" && t[s] !== undefined ? t[s] : attrOriginal.get(k)[attr];
        k.setAttribute(attr, wert);
      });
    });

    document.title = sprache !== "de" && t.seitentitel ? t.seitentitel : titelOriginal;
    document.documentElement.lang = sprache;
    hinweise.forEach((h) => { h.hidden = sprache === "de"; });
    knoepfe.forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === sprache ? "true" : "false"));

    try { localStorage.setItem(SPEICHER, sprache); } catch (e) { /* egal */ }
  }

  knoepfe.forEach((b) => b.addEventListener("click", () => setzen(b.dataset.lang)));

  // Start: ?lang=xx in der Adresse > gespeicherte Wahl > Deutsch
  let start = new URLSearchParams(location.search).get("lang");
  if (!start) {
    try { start = localStorage.getItem(SPEICHER); } catch (e) { start = null; }
  }
  setzen(start || "de");
})();
