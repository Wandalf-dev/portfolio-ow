# Historique des modifications

## 2025-11-27

### Suppression elements decoratifs "trait" (accent-line, feature-accent)

**Fichiers modifies:**

Pages orientation (CSS uniquement, pas d'elements HTML utilisant ces classes):
- `templates/front/orientation/devenir-freelance.html.twig` - CSS `.accent-line` supprime
- `templates/front/orientation/formations-carte.html.twig` - CSS `.accent-line` supprime
- `templates/front/orientation/reconversion.html.twig` - CSS `.accent-line` supprime

Pages chez-gdu (CSS + HTML):
- `templates/front/chez-gdu/research.html.twig` - CSS `.feature-accent` + 3 elements HTML `<div class="feature-accent">` supprimes
- `templates/front/chez-gdu/partenariat.html.twig` - CSS `.feature-accent` + 3 elements HTML `<div class="feature-accent">` supprimes
- `templates/front/chez-gdu/devenir-formateur.html.twig` - CSS `.feature-accent` + 3 elements HTML `<div class="feature-accent">` supprimes

**Non modifies (pas d'elements trait):**
- `templates/front/orientation/alternance.html.twig` - Le `diagonal-badge` est un badge texte, pas un trait
- `templates/front/orientation/metiers-recrutent.html.twig` - Aucun element trait
- `templates/front/chez-gdu/marketplace.html.twig` - Aucun element trait
- `templates/front/chez-gdu/method.html.twig` - Aucun element trait
- `templates/front/chez-gdu/financement.html.twig` - Aucun element trait

---

### Ajout motif background hero pages orientation

**Fichiers modifiés:** Toutes les pages orientation (6 fichiers)
- `templates/front/orientation/formations-carte.html.twig`
- `templates/front/orientation/devenir-freelance.html.twig`
- `templates/front/orientation/metiers-recrutent.html.twig`
- `templates/front/orientation/reconversion.html.twig`
- `templates/front/orientation/trouver-emploi.html.twig`
- `templates/front/orientation/alternance.html.twig`

**Changements:**
- Remplacement du pattern SVG (croix très discrètes) par un motif composite moderne
- Nouveau motif : cercles blancs semi-transparents + lignes diagonales subtiles
- 3 couches de gradients radiaux et linéaires avec opacités variées (0.1, 0.08, 0.03)
- Tailles différentes (80px, 60px, 40px) pour créer de la profondeur
- Motif visible mais sobre, ajoute de la texture au dégradé vert

---

### Corrections section "Comment ça marche" (formations-carte)

**Fichier modifié:** `templates/front/orientation/formations-carte.html.twig`

**Changements:**
- Fix bug visuel : ligne de progression qui apparaissait au-dessus des cercles lors du hover
- Suppression de la transition sur `.step-circle` (transform scale) qui causait le bug de z-index
- Ligne convertie en élément HTML `<div class="process-line">` au lieu de pseudo-élément
- Hauteur fixe `height: 130px` sur `.step-content` pour uniformiser les blocs
- Display flex pour alignement correct du contenu

---

### Refonte complète page "Formations à la carte" (EPCT)

**Fichier modifié:** `templates/front/orientation/formations-carte.html.twig`

**Changements:**
- **Hero et CTA** : Conservés identiques (cohérence DA)
- **Section intro** : Image `formations-carte.webp` + badges (Formats courts, Ciblé métier, Flexible, Certifiant)
- **Section "Comment ça marche" UNIQUE** : 4 étapes horizontales
  - Cercles avec icônes connectés par une ligne verte gradient
  - Numéros dans des badges circulaires
  - Hover : cercles changent de couleur + cards montent
  - Responsive : devient grille 2x2 puis colonne
- **Section domaines TABS INTERACTIFS UNIQUE** : Bootstrap Nav-tabs
  - 6 onglets : Marketing, Dev Web, Design, Data, Cyber, IA
  - Contenu dynamique avec grande icône + description + tags
  - Onglets pill-style avec hover et active states verts
- **Section avantages avec images** :
  - 3 cards avec images : `carte_flexibilite.webp`, `carte_specificite.webp`, `carte_accessibilite.webp`
  - Design : image en haut + icône flottante + texte centré
- Responsive optimisé

---

### Refonte complète page "Devenir Freelance" (EPCT)

**Fichier modifié:** `templates/front/orientation/devenir-freelance.html.twig`

**Changements:**
- **Hero et CTA** : Conservés identiques (cohérence DA)
- **Section intro** : Image `freelance.webp` + badges visuels (Liberté, Flexibilité, Autonomie, Revenus)
- **Section comparatif UNIQUE** : Tableau visuel "Salarié vs Freelance"
  - 2 colonnes côte à côte avec 6 points de comparaison
  - Colonne Freelance mise en avant (bordure verte, header vert)
  - Hover avec translation
- **Section parcours ACCORDEON** : 5 étapes interactives Bootstrap Collapse
  - Numéros dans des carrés verts
  - Clic pour voir/cacher le détail
  - Design moderne avec hover states
- **Section compétences ALTERNEES** : 3 blocs image + texte
  - Images : `freelance_autonomie.webp`, `freelance_diversite.webp`, `freelance_avantage.webp`
  - Layout alternée gauche/droite
  - Listes avec icônes check vertes
- Responsive optimisé

---

### Refonte complète page "Métiers qui recrutent" (v2 - EPCT)

**Fichier modifié:** `templates/front/orientation/metiers-recrutent.html.twig`

**Image ajoutée:** `public/images/metiers_right.webp` (depuis gducampus.com)

**Changements (après workflow EPCT):**
- **Hero et CTA** : Identiques aux autres pages orientation (cohérence DA)
- **Section "Pourquoi"** : Layout image + liste interactive (conservée)
- **Section avantages** : Cards avec icônes (style reconversion)
  - 3 cards blanches avec icône carré arrondi vert
  - Barre verte animée en haut au hover
  - Design éprouvé et stable
- **Section métiers** : Grille 2x3 + image (style gducampus.com)
  - Image à gauche (col-lg-5)
  - 6 job-cards à droite (col-lg-7)
  - Cards avec bordure gauche verte + hover translateX
  - Icône + titre + description courte
- CSS simplifié sans positionnement absolu ni CSS Grid complexe
- Responsive Bootstrap standard (row/col)

---

### Refonte complète page "Reconversion professionnelle"

**Fichier modifié:** `templates/front/orientation/reconversion.html.twig`

**Changements:**
- Retour à la palette **vert émeraude** (#10b981, #34d399) pour cohérence DA
- Hero avec badge "Nouveau départ professionnel" (titre tout blanc, sans jaune)
- 2 images : `reconversion.webp` et `reconversion_competence.webp`
- Section intro avec image + badge superposé
- Section "Pourquoi se reconvertir" avec 3 cards animées
- Section avantages avec liste interactive animée
- **Section compétences DIFFÉRENTE** : timeline horizontale avec cercles alternés haut/bas
  - Design unique qui se démarque des autres pages
  - 6 étapes avec icônes dans des cercles connectés par une ligne
  - Animation hover sur chaque étape
- CTA vert cohérent
- Responsive optimisé

---

### Optimisation UX page "Trouver un emploi"

**Fichier modifié:** `templates/front/orientation/trouver-emploi.html.twig`

**Changements:**
- Suppression section stats (données non représentatives)
- Refonte timeline "Votre parcours vers l'emploi" en stepper vertical moderne
- Animations hover sur les listes : translation, background gradient, bordure, scale icône
- Barre de progression animée sur les skill cards au hover
- CSS simplifié et optimisé pour performances
- Design plus épuré et professionnel

---

### Refonte page "Trouver un emploi"

**Fichier modifié:** `templates/front/orientation/trouver-emploi.html.twig`

**Changements:**
- Design unique avec nouvelles sections: Stats impactantes, Features avec images alternées, Timeline 5 étapes, Compétences clés
- Conservation du hero et CTA style original (gradient vert emeraude)
- Ajout d'images et contenu enrichi pour différencier la page

---

### Harmonisation design pages orientation

**Fichiers modifiés:** 6 pages orientation

**Changements:**
- Couleur uniforme: gradient vert emeraude (`#6ee7b7 → #34d399 → #10b981`)
- Texte blanc avec text-shadow pour lisibilité
- Span accent: jaune crème (`#fef9c3`)
- Suppression des boutons CTA dans les heroes
- Ajout effet shine sur boutons CTA (section finale)

---

### Refonte complète page "Alternance" (EPCT workflow)

**Fichier modifié:** `templates/front/orientation/alternance.html.twig`

**Changements (designs 100% uniques):**
- **Hero et CTA** : Conservés identiques (gradient vert + blobs + pattern SVG)
- **Section Split Diagonal** : Image avec clip-path diagonal + badge "Formation & Entreprise"
  - Image : `alternance.webp` avec effet clip-path polygon
  - Hover : scale 1.08 sur l'image
- **Section Bento Grid UNIQUE** : Layout asymétrique CSS Grid
  - 1 card large (2x2) : Rémunération
  - 2 cards medium (2x1) : Expérience + Diplôme
  - Hover avec tilt 3D (rotateX) et barre verte animée en haut
- **Section Timeline Circulaire UNIQUE** : Visualisation SVG du rythme 3j/2j
  - SVG avec 2 segments animés (Entreprise 60% vert foncé, École 40% vert clair)
  - Centre avec ratio "3/2" en grand
  - Légende avec barres de couleur
- **Section Tabs Contrats** : Bootstrap tabs stylisés
  - Apprentissage vs Professionnalisation
  - Grilles info avec 4 points clés
  - Listes avantages avec checkmarks
- **Section Carousel Domaines** : Slick Carousel dynamique
  - 6 domaines en cards avec header gradient vert
  - Auto-play 3s, 3 slides visibles (responsive 2 puis 1)
  - Navigation dots + arrows personnalisés
- **JavaScript** : jQuery + Slick Carousel CDN
- Images utilisées : `alternance.webp`, `accueil_alternance.webp` (fallback)
- Responsive complet : grille 1 colonne mobile, tabs verticaux, timeline adaptée

### Suppression effets hover page Alternance

**Fichier modifié:** `templates/front/orientation/alternance.html.twig`

**Changements:**
- Suppression de tous les effets `:hover` sur les images et cartes
- Suppression des transitions et animations au survol
- Image diagonal : plus de scale au hover
- Bento cards : plus de translateY, rotateX ni changement d'ombre
- Icônes bento : plus de rotation ni changement de couleur
- Tabs : plus de changement de background au hover
- Carousel cards : plus de translateY ni changement de bordure
- Boutons Slick : plus de changement de gradient au hover
- Bouton CTA shine : effet shine supprimé
- Design statique, sans mouvement au survol

### Fix effet cadre carousel Slick (Alternance)

**Fichier modifie:** `templates/front/orientation/alternance.html.twig`

**Probleme:** Effet de "cadre" visible autour du carousel (ombres coupees nettement par overflow:hidden)

**Solution appliquee:**
- Masque CSS (`mask-image`) avec gradient sur `.slick-list` pour fondu progressif sur les bords (4% -> 96%)
- Padding augmente sur wrapper (30px vertical) pour laisser respirer les ombres en haut/bas
- Ombre des cards reduite (`0 2px 12px` au lieu de `0 4px 20px`) pour rester proportionnelle
- Suppression de `overflow: visible !important` devenu inutile
- Nettoyage des declarations CSS dupliquees
- Fleches de navigation et dots preserves (masque uniquement sur slick-list)

---

### Harmonisation couleurs page Financement (Chez GDU)

**Fichier modifie:** `templates/front/chez-gdu/financement.html.twig`

**Changements:**
- Hero : gradient vert remplace par violet `#f472b6 → #a855f7 → #818cf8`
- Boutons filtres hover : bordure et texte verts remplaces par violet `#a855f7`
- Boutons filtres actifs : gradient vert remplace par violet `#a855f7 → #818cf8`
- Cards hover : halo vert remplace par violet `rgba(168, 85, 247, 0.4)`
- Boutons "En savoir plus" hover : gradient vert remplace par violet `#a855f7 → #818cf8`
- Coherence avec les autres pages Chez GDU (method, research, marketplace, etc.)

---

### Refactoring CSS - Extraction des styles inline

**Objectif:** Extraire tous les blocs `<style>` inline des templates Twig vers des fichiers CSS externes, organisés via AssetMapper/importmap.

**Architecture CSS:**
- `assets/css/pages/common.css` - Styles communs à toutes les pages
- `assets/css/pages/orientation.css` - Styles partagés section orientation
- `assets/css/pages/chez-gdu.css` - Styles partagés section chez-gdu
- `assets/css/pages/orientation/{page}.css` - Styles spécifiques par page
- `assets/css/pages/chez-gdu/{page}.css` - Styles spécifiques par page

**Fichiers CSS créés (Chez GDU - 7 fichiers):**
- `assets/css/pages/chez-gdu/method.css`
- `assets/css/pages/chez-gdu/research.css`
- `assets/css/pages/chez-gdu/temoignage.css`
- `assets/css/pages/chez-gdu/marketplace.css`
- `assets/css/pages/chez-gdu/partenariat.css`
- `assets/css/pages/chez-gdu/devenir-formateur.css`
- `assets/css/pages/chez-gdu/financement.css`

**Fichiers CSS créés (Orientation - 6 fichiers):**
- `assets/css/pages/orientation/formations-carte.css`
- `assets/css/pages/orientation/alternance.css`
- `assets/css/pages/orientation/reconversion.css`
- `assets/css/pages/orientation/metiers-recrutent.css`
- `assets/css/pages/orientation/trouver-emploi.css`
- `assets/css/pages/orientation/devenir-freelance.css`

**importmap.php:** 13 nouveaux entrypoints CSS ajoutés

**Templates nettoyés (13 fichiers):**
- Suppression des blocs `<style>` inline
- Ajout des appels `{{ importmap('...') }}` dans `{% block stylesheets %}`
- Pattern: `pages-common-css` → `{section}-css` → `{section}-{page}-css`

---

### Suppression superposition images page Méthode Pédagogique

**Fichiers modifiés:**
- `templates/front/chez-gdu/method.html.twig` - Suppression image secondaire superposée
- `assets/css/pages/chez-gdu/method.css` - Suppression styles `.img-collage` inutilisés

**Changements:**
- Section "Pédagogie par projet" : suppression de l'image secondaire `mentor.jpg` qui se superposait à l'image principale
- Suppression de la classe `img-collage` et des styles associés (`.img-secondary`, `.img-top-right`, `.img-bottom-left`)
- Simplification : une seule image avec classes Bootstrap standard (`rounded-4 shadow`)

---

### Déplacement styles inline vers CSS externe

**Fichiers modifiés:**
- `assets/css/pages/common.css` - Ajout de 3 nouvelles classes CSS
- `templates/partials/header.html.twig` - Suppression style inline logo
- `templates/partials/_training_card.html.twig` - Suppression style inline image
- `templates/front/training.html.twig` - Suppression 2 styles inline sticky

**Classes CSS ajoutées:**
- `.header-logo` - Largeur du logo (130px desktop, 100px tablet, 90px mobile)
- `.training-card-img` - Dimensions image card (180px desktop, 150px mobile)
- `.sticky-nav` - Navigation sticky (top: 0, z-index: 1000)
- `.sticky-course-sidebar` - Sidebar sticky (top: 100px, z-index: 100)

**Principe:** Les styles inline sont conservés uniquement pour les valeurs dynamiques (URLs via `asset()`, pourcentages calculés). Tout le reste est externalisé en CSS.

**Fix:** Ajout de `{{ importmap('pages-common-css') }}` dans `base.html.twig` pour charger les styles communs (dont `.header-logo`) sur toutes les pages.

---

### Création composants Twig réutilisables

**Composants créés:**
- `HeroOrientationComponent` (hero_orientation) - Hero standardisé pour les pages orientation
- `CTAGreenComponent` (cta_green) - Section CTA finale verte

**Fichiers créés:**
- `src/Components/HeroOrientationComponent.php`
- `templates/components/hero_orientation.html.twig`
- `src/Components/CTAGreenComponent.php`
- `templates/components/cta_green.html.twig`

**Exemple d'utilisation (reconversion.html.twig):**
```twig
{# AVANT: ~20 lignes de HTML répété #}
{# APRÈS: #}
{{ component('hero_orientation', {
    title: 'Reconversion professionnelle',
    description: "La reconversion professionnelle..."
}) }}

{{ component('cta_green', {
    title: 'Prêt à réinventer votre avenir ?',
    description: "N'attendez plus..."
}) }}
```

**Bénéfices:**
- Réduction duplication code (hero répété 6x, CTA 3x)
- Maintenance centralisée (1 seul endroit à modifier)
- Cohérence visuelle garantie entre toutes les pages

**Pages migrées vers les composants (6 pages orientation):**
- ✅ reconversion.html.twig - Hero + CTA
- ✅ alternance.html.twig - Hero
- ✅ devenir-freelance.html.twig - Hero
- ✅ formations-carte.html.twig - Hero
- ✅ metiers-recrutent.html.twig - Hero + CTA
- ✅ trouver-emploi.html.twig - Hero + CTA

**Réduction de code:**
- Avant : ~120 lignes de HTML répété (6 pages × 20 lignes)
- Après : ~30 lignes (6 appels composants)
- **Gain : -75% de code répété**

---

## 2025-11-28

### Documentation design - Référence LearnUp template

**Fichier créé:** `.claude/design-reference.md`

**Contenu:**
- Structure de documentation pour composants UI du template LearnUp (https://learnup-shreethemes.netlify.app/home-2)
- Sections préparées : Boutons (primary, outline, avec icône, shine), Accordéons, Carousels/Sliders, Cards, Hero sections, Couleurs/Gradients, Typographie, Layouts (Bento Grid, Timeline, Stepper), Animations/Effets, Formulaires, Navigation
- Notes d'implémentation avec conventions du projet (Bootstrap 5, classes `text-main`/`btn-main`, gradient vert émeraude orientation)
- Comparaison avec composants existants du projet (Slick Carousel, Select2, pages orientation)
- Instructions pour compléter la documentation : visiter le site, inspecter, copier structure HTML/CSS
- À compléter progressivement selon les besoins du projet
