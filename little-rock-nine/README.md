# Little Rock Nine — présentation interactive

Cinq diapositives sur l'intégration de Central High School (Little Rock,
Arkansas) en septembre 1957.

## Ouvrir la présentation

Double-cliquez sur **`index.html`**. Aucune installation, aucun serveur :
le fichier s'ouvre directement dans un navigateur.

## Naviguer

| Action | Comment |
| --- | --- |
| Diapositive suivante | bouton **Suivant**, flèche <kbd>→</kbd>, ou balayage vers la gauche |
| Diapositive précédente | bouton **Précédent**, flèche <kbd>←</kbd>, ou balayage vers la droite |
| Aller à une diapositive | les pastilles en bas à droite, ou l'adresse `index.html#3` |
| Début / fin | <kbd>Début</kbd> et <kbd>Fin</kbd> |
| Crédit d'une photo | passer la souris dessus (ou la toucher sur mobile) |
| Toutes les sources | bouton **Crédits** en bas de page |

La présentation s'adapte au thème clair ou sombre du système, et au format
téléphone comme au vidéoprojecteur.

## Version autonome (un seul fichier)

Pour envoyer la présentation sans le dossier `images/` :

```
python3 build-standalone.py
```

Le script écrit `little-rock-nine-standalone.html`, qui contient les photos
encodées à l'intérieur du fichier. L'option `--body-only` produit un fragment
sans `<head>`/`<body>`, pour les plateformes qui les ajoutent elles-mêmes.

## Sources des images

Toutes les photos viennent de Wikimedia Commons. Elles sont dans le domaine
public ou sous licence Creative Commons ; les licences CC BY et CC BY-SA
imposent de citer l'auteur, ce que fait le panneau **Crédits** de la page.

| Fichier | Sujet | Auteur | Licence |
| --- | --- | --- | --- |
| `central2024.jpg` | Central High School, 2024 | Xiquinho Silva | CC BY 2.0 |
| `protest1959.jpg` | Rassemblement ségrégationniste, Capitole de l'Arkansas, 1959 | John T. Bledsoe — Library of Congress `ppmsca.03090` | domaine public |
| `eckford.jpg` | Elizabeth Eckford, 4 septembre 1957 | Will Counts — diffusée par l'Associated Press sans mention de copyright | domaine public |
| `airborne.jpg` | La 101ᵉ aéroportée escorte les élèves | U.S. Army | domaine public |
| `eisenhower.jpg` | Portrait officiel d'Eisenhower, 1959 | Maison-Blanche | domaine public |
| `faubus.jpg` | Gouverneur Orval Faubus | University of Arkansas, annuaire *Razorback* 1959 | domaine public |
| `nine-group.jpg` | Les neuf reçus par le maire de New York | Walter Albertin — Library of Congress `cph.3c25125` | domaine public |
| `goldmedal.jpg` | Médaille d'or du Congrès, 1999 | United States Mint | domaine public |
| `lbj3.jpg` | Ernest Green, Carlotta Walls LaNier, Terrence Roberts | Lauren Gerson — LBJ Library | domaine public |
| `bench.jpg` | Banc commémoratif d'Elizabeth Eckford | Ser Amantio di Nicolao | CC BY-SA 4.0 |
| `melba.jpg` | Melba Pattillo Beals escortée lors d'une commémoration | U.S. Army | CC BY 2.0 |
| `thennow.jpg` | Portraits « hier et aujourd'hui » dans le lycée | Adam Jones, Ph.D. | CC BY-SA 3.0 |

## Modifier le contenu

Tout tient dans `index.html` : le texte des diapositives se trouve dans les
balises `<section class="slide">`, la mise en forme dans le `<style>` en haut
du fichier, la navigation dans le `<script>` en bas.

Pour ajouter une diapositive, copiez une section existante, donnez-lui un
`id` suivant (`slide-6`) et ajoutez l'attribut `hidden` : le compteur, la barre
de progression et les pastilles s'ajustent tout seuls.
