/**
 * Fabrique little-rock-nine.pptx à partir du même contenu et des mêmes photos
 * que index.html.
 *
 *   npm install pptxgenjs      (une seule fois)
 *   node build-pptx.js
 */
const path = require("path");
const PptxGenJS = require("pptxgenjs");

const DIR = __dirname;
const img = (name) => path.join(DIR, "images", name);

/* ---- palette : encre froide, papier gris, un seul accent rouge oxyde ---- */
const INK = "141618";
const INK_SOFT = "2A2E32";
const PAPER = "F1F2F3";
const CARD = "FFFFFF";
const WHITE = "FFFFFF";
const STAMP = "8F2F24"; // accent sur fond clair
const STAMP_LT = "CD7264"; // accent sur fond sombre
const MUTED = "787F86";
const MUTED_LT = "9AA1A8";
const RULE = "D2D5D9";
const BODY_INK = "31363B";

const HEAD = "Arial";
const BODY = "Cambria";

const W = 13.333;
const M = 0.75; // marge latérale

const pres = new PptxGenJS();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.author = "Little Rock Nine";
pres.title = "Little Rock Nine — septembre 1957";

/* ---------- briques réutilisées d'une diapositive à l'autre ---------- */

// Étiquette en capitales espacées : le motif qui revient sur chaque diapositive.
function eyebrow(slide, text, y, onDark) {
  slide.addText(text, {
    x: M, y, w: 8, h: 0.28,
    isTextBox: true, margin: 0,
    fontFace: HEAD, fontSize: 10, bold: true, charSpacing: 2.4,
    color: onDark ? STAMP_LT : STAMP,
  });
}

function title(slide, text, y, onDark, w) {
  slide.addText(text, {
    x: M, y, w: w || 11.8, h: 1.15,
    isTextBox: true, margin: 0,
    fontFace: HEAD, fontSize: 34, bold: true, charSpacing: -0.3,
    lineSpacingMultiple: 0.92,
    color: onDark ? WHITE : INK,
  });
}

function credit(slide, text, x, y, w, onDark) {
  slide.addText(text, {
    x, y, w, h: 0.3,
    isTextBox: true, margin: 0,
    fontFace: HEAD, fontSize: 7.5,
    color: onDark ? MUTED_LT : MUTED,
  });
}

function caption(slide, text, x, y, w, onDark) {
  slide.addText(text, {
    x, y, w, h: 0.5,
    isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 10, lineSpacingMultiple: 1.06,
    color: onDark ? "C7CCD1" : BODY_INK,
  });
}

function photo(slide, file, x, y, w, h) {
  slide.addImage({ path: img(file), x, y, w, h, sizing: { type: "cover", w, h } });
}

/* =====================================================================
   1 — Titre et contexte
   ===================================================================== */
{
  const s = pres.addSlide();
  s.background = { color: INK };

  eyebrow(s, "LITTLE ROCK, ARKANSAS", 0.72, true);

  s.addText("LITTLE\nROCK\nNINE", {
    x: M, y: 1.12, w: 6.2, h: 2.35,
    isTextBox: true, margin: 0,
    fontFace: HEAD, fontSize: 50, bold: true, charSpacing: -1,
    lineSpacingMultiple: 0.86, color: WHITE,
  });

  s.addText("SEPTEMBRE 1957", {
    x: M, y: 3.55, w: 6.2, h: 0.45,
    isTextBox: true, margin: 0,
    fontFace: HEAD, fontSize: 21, charSpacing: 1, color: "AEB4BA",
  });

  const context = [
    ["17 MAI 1954", "Brown v. Board of Education : la Cour suprême juge la ségrégation scolaire inconstitutionnelle."],
    ["TROIS ANS PLUS TARD", "Dans le Sud, presque rien n'a bougé. Les États retardent, contournent, refusent."],
    ["RENTRÉE 1957", "Neuf adolescents noirs s'inscrivent à Central High School, lycée blanc de près de 2 000 élèves."],
  ];
  context.forEach(([label, text], i) => {
    const y = 4.35 + i * 0.92;
    s.addText(label, {
      x: M, y, w: 6.2, h: 0.24, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 9, bold: true, charSpacing: 1.8, color: STAMP_LT,
    });
    s.addText(text, {
      x: M, y: y + 0.24, w: 6.1, h: 0.6, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 12.5, lineSpacingMultiple: 1.08, color: "D8DBDE",
    });
  });

  photo(s, "central2024.jpg", 7.45, 0.72, 5.15, 3.05);
  credit(s, "Central High School aujourd'hui — Xiquinho Silva, CC BY 2.0", 7.45, 3.85, 5.15, true);

  photo(s, "protest1959.jpg", 7.45, 4.32, 5.15, 2.45);
  credit(s, "Rassemblement ségrégationniste, Capitole de l'Arkansas, 1959 — John T. Bledsoe, Library of Congress", 7.45, 6.85, 5.15, true);

  s.addNotes(
    "Brown v. Board of Education (17 mai 1954) déclare la ségrégation scolaire inconstitutionnelle. " +
    "Trois ans plus tard, l'Arkansas n'a toujours rien appliqué. Central High School comptait près de 2 000 élèves, tous blancs."
  );
}

/* =====================================================================
   2 — Les acteurs et la chronologie
   ===================================================================== */
{
  const s = pres.addSlide();
  s.background = { color: PAPER };

  eyebrow(s, "2 → 25 SEPTEMBRE 1957", 0.55, false);
  title(s, "VINGT-TROIS JOURS\nDEVANT UNE PORTE", 0.9, false, 7.6);

  // Orval Faubus, en haut à droite
  s.addImage({ path: img("faubus.jpg"), x: 11.55, y: 0.62, w: 1.05, h: 1.05, rounding: true, sizing: { type: "cover", w: 1.05, h: 1.05 } });
  s.addText(
    [
      { text: "ORVAL FAUBUS", options: { fontFace: HEAD, fontSize: 10.5, bold: true, charSpacing: 1, color: INK, breakLine: true } },
      { text: "Gouverneur de l'Arkansas. Il envoie la Garde nationale bloquer l'entrée du lycée.", options: { fontFace: BODY, fontSize: 9, color: MUTED } },
    ],
    { x: 8.5, y: 0.66, w: 2.9, h: 1.0, isTextBox: true, margin: 0, align: "right", lineSpacingMultiple: 1.05 }
  );

  // axe de la chronologie
  const tlY = 2.42;
  s.addShape(pres.ShapeType.line, { x: M + 0.05, y: tlY, w: 11.6, h: 0, line: { color: RULE, width: 1 } });

  const steps = [
    ["2 SEPT.", "Le gouverneur Faubus déploie la Garde nationale d'Arkansas « pour maintenir l'ordre ». Elle bloque l'entrée.", false],
    ["4 SEPT.", "Elizabeth Eckford, 15 ans, n'a pas reçu le message : sa famille n'a pas le téléphone. Elle arrive seule, face à la foule.", true],
    ["23 SEPT.", "Les neuf entrent par une porte latérale. Plus de mille personnes se massent dehors ; la police les fait ressortir.", false],
    ["24 SEPT.", "Eisenhower fédéralise la Garde et envoie la 101e Division aéroportée.", false],
    ["25 SEPT.", "Escortés par les parachutistes, les neuf entrent en cours. Première journée complète.", true],
  ];
  const colW = 2.16;
  steps.forEach(([day, text, key], i) => {
    const x = M + i * (colW + 0.25);
    s.addShape(pres.ShapeType.ellipse, {
      x: x + 0.01, y: tlY - 0.055, w: 0.11, h: 0.11,
      fill: { color: key ? STAMP : PAPER },
      line: { color: key ? STAMP : MUTED, width: 0.75 },
    });
    s.addText(day, {
      x, y: tlY + 0.16, w: colW, h: 0.24, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 10.5, bold: true, charSpacing: 1.4, color: STAMP,
    });
    s.addText(text, {
      x, y: tlY + 0.42, w: colW, h: 1.05, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 10, lineSpacingMultiple: 1.06, color: BODY_INK,
    });
  });

  // les deux photographies clés
  photo(s, "eckford.jpg", M, 4.15, 3.5, 2.55);
  credit(s, "Elizabeth Eckford, 4 sept. 1957 — Will Counts / AP, domaine public", M, 6.78, 3.5, false);

  photo(s, "airborne.jpg", 4.45, 4.15, 3.5, 2.55);
  credit(s, "La 101e aéroportée escorte les élèves — U.S. Army, domaine public", 4.45, 6.78, 3.5, false);

  // la citation
  s.addImage({ path: img("eisenhower.jpg"), x: 8.35, y: 4.15, w: 1.0, h: 1.0, rounding: true, sizing: { type: "cover", w: 1.0, h: 1.0 } });
  s.addText("« La loi de la foule ne peut pas l'emporter sur les décisions des tribunaux. »", {
    x: 8.35, y: 5.3, w: 4.25, h: 1.0, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 15, italic: true, lineSpacingMultiple: 1.08, color: INK,
  });
  s.addText(
    [
      { text: "DWIGHT D. EISENHOWER — 24 SEPTEMBRE 1957", options: { fontFace: HEAD, fontSize: 8.5, bold: true, charSpacing: 1, color: MUTED, breakLine: true } },
      { text: "« Mob rule cannot be allowed to override the decisions of our courts. »", options: { fontFace: BODY, fontSize: 8.5, color: MUTED } },
    ],
    { x: 8.35, y: 6.33, w: 4.25, h: 0.7, isTextBox: true, margin: 0, lineSpacingMultiple: 1.1 }
  );

  s.addNotes(
    "Elizabeth Eckford est arrivée seule le 4 septembre parce que sa famille n'avait pas le téléphone et n'a pas reçu le message de Daisy Bates, " +
    "présidente de la NAACP en Arkansas, qui organisait les trajets. Le 23 septembre, les neuf entrent enfin, mais la foule oblige la police à les faire ressortir. " +
    "Le 24, Eisenhower envoie 1 200 parachutistes de la 101e ; chaque élève reçoit un garde personnel."
  );
}

/* =====================================================================
   3 — La réalité à l'école
   ===================================================================== */
{
  const s = pres.addSlide();
  s.background = { color: PAPER };

  eyebrow(s, "ANNÉE SCOLAIRE 1957-1958", 0.55, false);
  title(s, "ENTRER ÉTAIT LE PLUS FACILE", 0.9, false, 8.2);

  const nine = [
    ["01", "ERNEST GREEN", "Premier diplômé noir de Central High, mai 1958"],
    ["02", "ELIZABETH ECKFORD", "Seule face à la foule, 4 septembre"],
    ["03", "JEFFERSON THOMAS", ""],
    ["04", "TERRENCE ROBERTS", ""],
    ["05", "CARLOTTA WALLS", "La plus jeune des neuf"],
    ["06", "MINNIJEAN BROWN", "Expulsée en février 1958"],
    ["07", "GLORIA RAY", ""],
    ["08", "THELMA MOTHERSHED", ""],
    ["09", "MELBA PATTILLO", ""],
  ];
  const cw = 2.4, ch = 0.95, gx = 0.15, gy = 0.14, x0 = M, y0 = 2.15;
  nine.forEach(([n, name, note], i) => {
    const x = x0 + (i % 3) * (cw + gx);
    const y = y0 + Math.floor(i / 3) * (ch + gy);
    s.addShape(pres.ShapeType.rect, { x, y, w: cw, h: ch, fill: { color: CARD }, line: { color: "E5E7E9", width: 0.75 } });
    s.addText(n, {
      x: x + 0.16, y: y + 0.09, w: cw - 0.3, h: 0.2, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 8, charSpacing: 1.2, color: MUTED,
    });
    s.addText(name, {
      x: x + 0.16, y: y + 0.28, w: cw - 0.3, h: 0.25, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 10.5, bold: true, charSpacing: -0.1, color: INK,
    });
    if (note) {
      s.addText(note, {
        x: x + 0.16, y: y + 0.54, w: cw - 0.3, h: 0.36, isTextBox: true, margin: 0,
        fontFace: BODY, fontSize: 8.5, lineSpacingMultiple: 1.02, color: STAMP,
      });
    }
  });

  photo(s, "nine-group.jpg", 8.4, y0, 4.2, 3.13);
  credit(s, "Les neuf reçus par le maire de New York — Walter Albertin, Library of Congress", 8.4, y0 + 3.2, 4.2, false);

  const facts = [
    ["TOUS LES JOURS", "Insultes et crachats dans les couloirs. Bousculades dans les escaliers. De l'eau brûlante dans les douches."],
    ["LES GARDES", "Ils ne pouvaient pas entrer partout : ni dans les vestiaires, ni dans les toilettes. C'est là que ça se passait."],
    ["FÉVRIER 1958", "Minnijean Brown est expulsée après avoir répondu à ses harceleuses. Aucun élève blanc ne l'a été."],
  ];
  facts.forEach(([label, text], i) => {
    const x = M + i * (3.74 + 0.3);
    s.addText(label, {
      x, y: 5.6, w: 3.74, h: 0.24, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 9.5, bold: true, charSpacing: 1.6, color: STAMP,
    });
    s.addText(text, {
      x, y: 5.87, w: 3.74, h: 0.9, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 11.5, lineSpacingMultiple: 1.08, color: BODY_INK,
    });
  });

  s.addNotes(
    "Les neuf avaient entre 14 et 16 ans. Minnijean Brown est d'abord suspendue en décembre 1957, puis expulsée en février 1958 ; " +
    "des cartons « One down… eight to go » circulent alors dans le lycée. Elle termine sa scolarité à New York."
  );
}

/* =====================================================================
   4 — Impact et héritage
   ===================================================================== */
{
  const s = pres.addSlide();
  s.background = { color: PAPER };

  eyebrow(s, "CE QUE ÇA A CHANGÉ", 0.55, false);
  title(s, "UN PRÉCÉDENT FÉDÉRAL", 0.9, false, 6.5);

  s.addText(
    "Pour la première fois depuis la Reconstruction, un président envoie l'armée fédérale dans le Sud pour faire appliquer les droits civiques. " +
    "Le message est clair : un État ne peut pas désobéir aux tribunaux.",
    { x: M, y: 2.15, w: 6.3, h: 1.0, isTextBox: true, margin: 0, fontFace: BODY, fontSize: 13.5, lineSpacingMultiple: 1.1, color: BODY_INK }
  );

  const milestones = [
    ["MAI 1958", "Ernest Green est diplômé de Central High. Martin Luther King est dans la salle."],
    ["1958-59", "« The Lost Year » : Faubus ferme tous les lycées de Little Rock plutôt que de les intégrer."],
    ["1998", "Central High devient site historique national."],
    ["1999", "Les neuf reçoivent la Médaille d'or du Congrès, remise par Bill Clinton."],
  ];
  milestones.forEach(([yr, text], i) => {
    const y = 3.5 + i * 0.86;
    s.addText(yr, {
      x: M, y: y + 0.03, w: 1.2, h: 0.28, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 10.5, bold: true, charSpacing: 1, color: STAMP,
    });
    s.addText(text, {
      x: M + 1.3, y, w: 5.0, h: 0.75, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 12.5, lineSpacingMultiple: 1.06, color: BODY_INK,
    });
  });

  photo(s, "goldmedal.jpg", 8.05, 1.7, 4.2, 3.68);
  credit(s, "Médaille d'or du Congrès, 1999 — United States Mint, domaine public", 8.05, 5.48, 4.2, false);

  s.addNotes(
    "L'envoi de la 101e aéroportée est le premier usage de l'armée fédérale dans le Sud pour protéger les droits civiques depuis la Reconstruction. " +
    "L'année suivante, Faubus ferme les lycées de Little Rock : c'est « The Lost Year »."
  );
}

/* =====================================================================
   5 — Aujourd'hui
   ===================================================================== */
{
  const s = pres.addSlide();
  s.background = { color: INK };

  eyebrow(s, "AUJOURD'HUI", 0.62, true);
  title(s, "LE LIEU SE VISITE, LE LYCÉE FONCTIONNE", 0.98, true, 9.5);

  s.addText(
    "Sur le trottoir du 16e et Park Street, un banc rappelle celui où Elizabeth Eckford s'est assise le 4 septembre 1957, en attendant un bus, entourée par la foule.",
    { x: M, y: 2.15, w: 8.6, h: 0.6, isTextBox: true, margin: 0, fontFace: BODY, fontSize: 13, lineSpacingMultiple: 1.1, color: "C7CCD1" }
  );

  const today = [
    ["bench.jpg", "Le banc d'Elizabeth Eckford, reconstitué sur le trottoir.", "Ser Amantio di Nicolao, CC BY-SA 4.0"],
    ["melba.jpg", "La 101e escorte de nouveau Melba Pattillo Beals.", "U.S. Army, CC BY 2.0"],
    ["lbj3.jpg", "Ernest Green, Carlotta Walls LaNier, Terrence Roberts.", "Lauren Gerson, LBJ Library, domaine public"],
    ["thennow.jpg", "Chaque visage à 15 ans, et le même aujourd'hui.", "Adam Jones, Ph.D., CC BY-SA 3.0"],
  ];
  const cw5 = 2.74, gap5 = 0.28;
  today.forEach(([file, cap, cred], i) => {
    const x = M + i * (cw5 + gap5);
    photo(s, file, x, 2.95, cw5, 1.95);
    caption(s, cap, x, 5.0, cw5, true);
    credit(s, cred, x, 5.75, cw5, true);
  });

  s.addText("LE CHANGEMENT N'EST JAMAIS FACILE. IL RESTE POSSIBLE.", {
    x: M, y: 6.45, w: 11.8, h: 0.5, isTextBox: true, margin: 0,
    fontFace: HEAD, fontSize: 20, bold: true, charSpacing: 0.4, color: WHITE,
  });

  s.addNotes(
    "Central High School est le seul établissement scolaire des États-Unis encore en activité à l'intérieur d'un site historique national.\n\n" +
    "Crédits photographiques (toutes les images viennent de Wikimedia Commons) :\n" +
    "• Central High School 2024 — Xiquinho Silva, CC BY 2.0\n" +
    "• Rassemblement ségrégationniste 1959 — John T. Bledsoe, Library of Congress ppmsca.03090, domaine public\n" +
    "• Elizabeth Eckford 1957 — Will Counts, diffusée par l'Associated Press sans mention de copyright, domaine public\n" +
    "• 101e aéroportée — U.S. Army, domaine public\n" +
    "• Portrait d'Eisenhower 1959 — Maison-Blanche, domaine public\n" +
    "• Orval Faubus — University of Arkansas, annuaire Razorback 1959, domaine public\n" +
    "• Les neuf à New York — Walter Albertin, Library of Congress cph.3c25125, domaine public\n" +
    "• Médaille d'or du Congrès — United States Mint, domaine public\n" +
    "• Ernest Green, Carlotta Walls LaNier, Terrence Roberts — Lauren Gerson, LBJ Library, domaine public\n" +
    "• Banc commémoratif — Ser Amantio di Nicolao, CC BY-SA 4.0\n" +
    "• Melba Pattillo Beals — U.S. Army, CC BY 2.0\n" +
    "• Portraits « hier et aujourd'hui » — Adam Jones, Ph.D., CC BY-SA 3.0"
  );
}

pres.writeFile({ fileName: path.join(DIR, "little-rock-nine.pptx") })
  .then((f) => console.log("écrit :", f));
