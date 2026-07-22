/* =========================================================================
   LA RÉSERVE — JavaScript principal
   Un seul rôle ici : faire apparaître les éléments en douceur
   quand ils entrent dans l'écran, au fil du défilement.

   Aucune dépendance : c'est du JavaScript « vanilla » (natif).
   ========================================================================= */

/* On attend que toute la page soit chargée avant d'agir. */
document.addEventListener("DOMContentLoaded", function () {

  /* -----------------------------------------------------------------------
     1. Respect de la préférence « animations réduites »
     Si l'utilisateur a demandé moins d'animations dans son système,
     on n'anime rien : tout est affiché immédiatement.
     ----------------------------------------------------------------------- */
  var animationsReduites = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* On récupère tous les éléments à animer (classe .apparition). */
  var elements = document.querySelectorAll(".apparition");

  /* Sécurité : si le navigateur ne connaît pas IntersectionObserver,
     ou si les animations sont réduites, on affiche tout d'un coup. */
  if (animationsReduites || !("IntersectionObserver" in window)) {
    elements.forEach(function (el) {
      el.classList.add("visible");
    });
    return; // on s'arrête là
  }

  /* -----------------------------------------------------------------------
     2. Apparition au défilement (IntersectionObserver)
     Dès qu'un élément entre dans l'écran, on lui ajoute la classe
     .visible : le CSS s'occupe alors du fondu + de la translation.
     ----------------------------------------------------------------------- */
  var observateur = new IntersectionObserver(
    function (entrees) {
      entrees.forEach(function (entree) {
        if (entree.isIntersecting) {
          entree.target.classList.add("visible");
          /* Une fois l'élément apparu, on cesse de le surveiller
             (l'animation ne doit se jouer qu'une seule fois). */
          observateur.unobserve(entree.target);
        }
      });
    },
    {
      /* L'élément est considéré « visible » un peu avant d'être
         totalement à l'écran, pour un rendu plus naturel. */
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  /* On demande à l'observateur de surveiller chaque élément. */
  elements.forEach(function (el) {
    observateur.observe(el);
  });

  /* -----------------------------------------------------------------------
     3. Petit décalage progressif (effet « cascade »)
     Les plats et cartes qui se suivent apparaissent l'un après l'autre.
     On ajoute un léger retard de transition à chaque élément d'un groupe.
     ----------------------------------------------------------------------- */
  document.querySelectorAll("[data-cascade]").forEach(function (groupe) {
    var enfants = groupe.querySelectorAll(".apparition");
    enfants.forEach(function (enfant, index) {
      /* 90 ms de décalage entre chaque élément, plafonné à 6 pour
         éviter des attentes trop longues. */
      var retard = Math.min(index, 6) * 90;
      enfant.style.transitionDelay = retard + "ms";
    });
  });
});
