# Design Reference - LearnUp Template

Ce fichier documente les composants et patterns de design inspirés du template LearnUp (https://learnup-shreethemes.netlify.app/home-2).

## Sources
- Template principal : [LearnUp Home-2](https://learnup-shreethemes.netlify.app/home-2)
- Technologie : Bootstrap 5
- Éditeur : Shreethemes

---

## Boutons

### Styles de base

#### Bouton principal (Primary)
```html
<!-- Structure HTML à documenter -->
<button class="btn btn-primary">Texte du bouton</button>
```

**Propriétés CSS :**
- Couleur de fond :
- Couleur du texte :
- Border-radius :
- Padding :
- Effets hover :
- Transitions :

#### Bouton secondaire (Secondary)
```html
<button class="btn btn-secondary">Texte du bouton</button>
```

#### Bouton outline
```html
<button class="btn btn-outline-primary">Texte du bouton</button>
```

### Variantes spéciales

#### Bouton avec icône
```html
<!-- À documenter -->
```

#### Bouton avec effet shine/glow
```html
<!-- Structure similaire à btn-shine utilisé dans les pages orientation -->
```

---

## Accordéons

### Structure de base
```html
<!-- Structure Bootstrap 5 accordion à documenter -->
<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse">
        Header
      </button>
    </h2>
    <div class="accordion-collapse collapse show">
      <div class="accordion-body">
        Contenu
      </div>
    </div>
  </div>
</div>
```

**Styles personnalisés :**
- Background des items :
- Couleur des headers :
- Icônes collapse/expand :
- Animations :
- Bordures et espacements :

### Variantes
- Accordéon flush (sans bordures)
- Accordéon avec icônes personnalisées
- Accordéon coloré

---

## Carousels / Sliders

### Carousel Bootstrap
```html
<!-- Structure carousel Bootstrap 5 -->
<div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <!-- Contenu -->
    </div>
  </div>
  <button class="carousel-control-prev" type="button">
    <span class="carousel-control-prev-icon"></span>
  </button>
  <button class="carousel-control-next" type="button">
    <span class="carousel-control-next-icon"></span>
  </button>
</div>
```

### Slick Carousel (utilisé dans le projet)
**Note :** Le projet utilise déjà Slick Carousel (voir `importmap.php`)

**Configuration type :**
```javascript
$('.slider').slick({
  dots: true,
  arrows: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [...]
});
```

---

## Cards

### Card de base
```html
<div class="card">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Titre</h5>
    <p class="card-text">Description</p>
    <a href="#" class="btn btn-primary">Action</a>
  </div>
</div>
```

### Variantes de cards
- Card avec overlay
- Card avec gradient
- Card avec hover effect
- Card avec badge/label
- Card horizontale

**Styles personnalisés à documenter :**
- Shadow effects
- Border-radius
- Hover animations
- Color overlays

---

## Sections Hero

### Hero standard
```html
<section class="hero-section">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-6">
        <h1>Titre principal</h1>
        <p>Description</p>
        <div class="hero-cta">
          <a href="#" class="btn btn-primary">CTA 1</a>
          <a href="#" class="btn btn-outline-light">CTA 2</a>
        </div>
      </div>
      <div class="col-lg-6">
        <!-- Image ou illustration -->
      </div>
    </div>
  </div>
</section>
```

### Hero avec gradient
**Référence :** Pages orientation du projet utilisent déjà ce pattern
```css
background: linear-gradient(145deg, #6ee7b7 0%, #34d399 50%, #10b981 100%);
```

### Hero avec éléments décoratifs
- Blobs animés
- Patterns SVG en overlay
- Cercles flottants
- Formes géométriques

---

## Couleurs et Gradients

### Palette principale
**À documenter depuis LearnUp :**
- Couleur primaire :
- Couleur secondaire :
- Couleur accent :
- Couleurs neutres :

### Gradients utilisés
```css
/* Gradient 1 */
background: linear-gradient(...);

/* Gradient 2 */
background: linear-gradient(...);
```

**Comparaison avec le projet actuel :**
- `text-main` : Couleur principale du projet
- `btn-main` : Style de bouton principal
- Gradient vert émeraude (pages orientation)

---

## Typographie

### Hiérarchie des titres
```css
h1 { ... }
h2 { ... }
h3 { ... }
```

**Standard du projet pour les h2 de sections :**
```html
<h2 class="display-6 fw-bold mb-4">
  Titre avec <span class="text-main">mot-clé</span>
</h2>
```

### Styles de texte
- Paragraphes
- Lead text
- Small text
- Text colors
- Font weights

---

## Layouts et Grilles

### Bento Grid
**Note :** Mentionné dans CLAUDE.md comme layout innovant pour les pages orientation
```html
<!-- Structure bento grid à documenter -->
```

### Timeline
```html
<!-- Structure timeline à documenter -->
```

### Stepper
```html
<!-- Structure stepper à documenter -->
```

---

## Animations et Effets

### Effets hover
- Cards
- Boutons
- Images
- Links

### Animations au scroll
- Fade in
- Slide in
- Scale
- Reveal effects

### Animations continues
- Float (utilisé dans les pages orientation)
- Pulse
- Rotation
- Glow/Shine effect

**Exemples du projet :**
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
```

---

## Composants spécifiques

### Formulaires
- Champs de texte
- Select (Select2 utilisé dans le projet)
- Checkboxes et radios
- Validation states
- Formulaires de contact

### Navigation
- Navbar
- Breadcrumbs
- Pagination
- Tabs

### Autres éléments
- Badges
- Alerts
- Modals
- Tooltips
- Progress bars

---

## Responsive Design

### Breakpoints Bootstrap 5
```css
/* xs: <576px */
/* sm: ≥576px */
/* md: ≥768px */
/* lg: ≥992px */
/* xl: ≥1200px */
/* xxl: ≥1400px */
```

### Patterns responsive
- Colonnes qui s'empilent
- Images fluides
- Navigation mobile
- Typographie responsive

---

## Notes d'implémentation

### Assets du projet
- JavaScript : `assets/app.js`
- CSS principal : `assets/css/styles.css`
- Librairies disponibles : Bootstrap 5.3, jQuery 3.7, Select2, Slick Carousel, Stimulus, Turbo

### Conventions du projet
- Toujours utiliser les classes Bootstrap quand possible
- Couleur principale : classe `text-main` ou `btn-main`
- Hero sections : utiliser gradient vert émeraude pour les pages orientation
- Titres h2 : classes `display-6 fw-bold mb-4`
- Ne pas inventer de statistiques

### Pour ajouter une documentation
1. Visiter https://learnup-shreethemes.netlify.app/home-2
2. Inspecter le composant souhaité
3. Copier la structure HTML
4. Noter les classes CSS utilisées
5. Documenter les effets et animations
6. Ajouter des captures d'écran si nécessaire
