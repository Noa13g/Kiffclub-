# La Réserve — site vitrine

Site vitrine de **La Réserve**, pizzeria-restaurant avec cuisson au feu
de bois, à Cabriès (quartier Calas).

Le site est une **seule page longue** (`index.html`) accompagnée d'une
page de mentions légales. Il présente le restaurant, met en avant la
livraison gratuite du week-end, affiche la carte, les horaires, l'accès
et les avis.

> **Aucun outil compliqué n'est nécessaire.** Le site est écrit en
> HTML, CSS et JavaScript « classiques ». Il suffit d'ouvrir le fichier
> `index.html` dans un navigateur pour le voir. Pas d'installation, pas
> de « build », pas de base de données.

---

## 📁 Ce qu'il y a dans le dossier

```
la-reserve/
├── index.html            → la page principale (accueil, carte, horaires…)
├── mentions-legales.html → page des mentions légales
├── css/
│   └── style.css         → toute la mise en forme (couleurs, polices…)
├── js/
│   └── main.js           → les petites animations au défilement
├── images/               → les photos (avec son propre README)
│   └── README.md         → quelle photo va où, et quelles dimensions
├── README.md             → ce fichier
└── .gitignore
```

---

## ✏️ Comment modifier le site (guide débutant)

Vous n'avez besoin que d'un éditeur de texte (le **Bloc-notes** convient,
mais [Visual Studio Code](https://code.visualstudio.com/) est plus
confortable et gratuit).

### Changer les horaires

1. Ouvrez `index.html`.
2. Cherchez la section commentée **`5. HORAIRES & ACCÈS`**.
3. Modifiez les lignes du tableau (`<tr>…</tr>`) : chaque ligne = un jour.
4. **Pensez aussi** à mettre à jour le résumé des horaires dans le pied
   de page (cherchez le commentaire `7. PIED DE PAGE`).
5. Pour Google, mettez également à jour les horaires dans les
   **données structurées** en haut du fichier (bloc
   `openingHoursSpecification`, cherchez `application/ld+json`).

### Remplir la carte (plats et prix)

1. Ouvrez `index.html`, section **`4. LA CARTE`**.
2. Repérez les commentaires `À REMPLACER PAR LA VRAIE CARTE`.
3. Pour chaque plat, modifiez :
   - le **nom** dans `<p class="plat__nom">…</p>`
   - les **ingrédients** dans `<p class="plat__ingredients">…</p>`
   - le **prix** dans `<p class="plat__prix …">…</p>`
4. Pour afficher un vrai prix, remplacez :
   ```html
   <p class="plat__prix plat__prix--a-venir">prix à venir</p>
   ```
   par (exemple) :
   ```html
   <p class="plat__prix">13,50&nbsp;€</p>
   ```
   (On retire la classe `plat__prix--a-venir` quand le prix est connu.)
5. Pour ajouter un plat, copiez un bloc `<div class="plat …">…</div>`
   entier et collez-le à la suite, puis modifiez son contenu.

### Ajouter les photos

Tout est expliqué dans **`images/README.md`**. En résumé : déposez vos
photos dans le dossier `images/`, puis dans `index.html` remplacez le
bloc gris `<div class="placeholder">…</div>` par la balise `<img …>`
indiquée juste au-dessus dans le commentaire `PHOTO À VENIR`.

### Changer les couleurs ou les polices

Tout est regroupé au début de `css/style.css`, dans le bloc `:root`
(section **1. VARIABLES GLOBALES**). Modifiez une couleur à cet endroit
et elle change partout sur le site.

---

## 🚀 Mettre le site en ligne sur GitHub Pages (pas à pas)

GitHub Pages permet d'héberger ce site **gratuitement**.

1. **Créez un compte** sur [github.com](https://github.com) si ce n'est
   pas déjà fait.
2. **Créez un nouveau dépôt** (bouton *New repository*), par exemple
   nommé `la-reserve`. Laissez-le **public**.
3. **Envoyez les fichiers** dans ce dépôt. Deux méthodes :
   - **Simple** : sur la page du dépôt, cliquez *Add file → Upload files*
     et glissez-y tous les fichiers du projet.
   - **En ligne de commande** : voir la section « Commandes Git » plus bas.
4. Dans le dépôt, allez dans **Settings → Pages**.
5. À la rubrique *Build and deployment*, choisissez :
   - **Source** : *Deploy from a branch*
   - **Branch** : `main` et le dossier `/ (root)`, puis **Save**.
6. Patientez une à deux minutes. Rechargez la page : GitHub affiche
   l'adresse de votre site, du type
   `https://VOTRE-COMPTE.github.io/la-reserve/`.
7. C'est en ligne ! 🎉

---

## 🌐 Brancher un vrai nom de domaine (ex. `la-reserve-calas.fr`)

Une fois le site en ligne, vous pouvez utiliser votre propre adresse.

1. **Achetez un nom de domaine** chez un fournisseur (OVH, Gandi,
   Infomaniak…), par exemple `la-reserve-calas.fr`.
2. Dans **Settings → Pages** de votre dépôt GitHub, à la rubrique
   *Custom domain*, saisissez votre domaine puis **Save**. GitHub crée
   automatiquement un fichier `CNAME` dans le dépôt.
3. Chez votre fournisseur de domaine, dans la **zone DNS**, ajoutez :
   - Pour le domaine « nu » (`la-reserve-calas.fr`), quatre
     enregistrements **A** pointant vers les adresses de GitHub :
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
     `185.199.111.153`.
   - Pour la version `www`, un enregistrement **CNAME** pointant vers
     `VOTRE-COMPTE.github.io`.
4. Revenez dans **Settings → Pages** et cochez **Enforce HTTPS**
   (activez le cadenas de sécurité) dès qu'il devient disponible.
5. Le changement peut prendre quelques heures à se propager.

> Le guide officiel, en anglais, est ici :
> <https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site>

---

## 🔧 Commandes Git pour envoyer le site (méthode ligne de commande)

À lancer une fois dans le dossier du projet, en remplaçant l'URL par
celle de votre dépôt :

```bash
git init
git add .
git commit -m "Première version du site La Réserve"
git branch -M main
git remote add origin https://github.com/VOTRE-COMPTE/la-reserve.git
git push -u origin main
```

---

## ℹ️ Informations du restaurant

- **Nom** : La Réserve
- **Adresse** : 2 rue Baséli, 13480 Cabriès (quartier Calas)
- **Téléphone** : 04 42 69 00 87
- **Société** : MITOZZO SARL — RCS Aix-en-Provence 500 563 713
- **Note Google** : 4,3/5 (plus de 460 avis)
