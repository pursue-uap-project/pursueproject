# Project PURSUE — Contexto para Claude Code

## Qué es esto
Archivo digital bilingüe (ES/EN) de documentos desclasificados UAP del programa PURSUE del Departamento de Guerra de EE.UU. (lanzado el 8 de mayo de 2026). Web estática publicada en GitHub Pages, sin frameworks ni build steps.

**URL pública:** https://zaswear.github.io/pursueproject  
**Fuente oficial:** https://www.war.gov/UFO/  
**Repo:** https://github.com/zaswear/pursueproject

---

## Stack Técnico
- **HTML5 / CSS3 / JS vanilla (ES6+)** — sin frameworks, sin npm, sin build step
- **Google Fonts** (CDN): Bebas Neue, DM Serif Display, IBM Plex Mono, Libre Baskerville
- **flagcdn.com** — banderas para el toggle de idioma
- **GitHub Pages** — hosting desde rama `main`, carpeta raíz
- **GitHub Actions** — detección automática diaria de nuevos documentos en war.gov

---

## Estructura de Archivos

```
pursueproject/
├── index.html                  ← Toda la UI (170 líneas, HTML semántico limpio)
├── styles.css                  ← Todos los estilos (CSS custom properties)
├── app.js                      ← Toda la lógica (535 líneas, vanilla JS)
├── stories.json                ← Base de datos de documentos (84 KB, 63 entradas)
├── img/                        ← Imágenes locales (47 archivos, ~23 MB)
│   ├── nasa-uap-*.jpg          ← Fotos misiones NASA
│   └── fbi-photo-*.png/jpg     ← Fotos desclasificadas FBI
├── .github/
│   └── workflows/
│       └── update-stories.yml  ← GitHub Action de auto-actualización
├── README.md
├── CONTRIBUTING.md
└── LICENSE                     ← CC0 1.0 (dominio público)
```

---

## Archivo Clave: `stories.json`

Es la única base de datos. Cada entrada sigue este schema exacto:

```json
{
  "id": "unique-kebab-id",
  "meta": "1972 · NASA · UNCLASSIFIED",
  "year": "1972",
  "agency": "NASA",
  "region": "space",
  "tags": ["apollo", "1970s", "transcript"],
  "title_es": "Título en español",
  "title_en": "Title in English",
  "body_es": "Descripción completa en español (2-4 frases).",
  "body_en": "Full description in English (2-4 sentences).",
  "image": "https://url-de-imagen-o-cadena-vacía",
  "url": "https://www.war.gov/medialink/ufo/release_1/archivo.pdf"
}
```

**Valores válidos para `agency`:** `FBI` | `NASA` | `DOW` | `AARO` | `DOS` | `USAF` | `WAR DEPARTMENT` | `CLASSIFIED`

**Valores válidos para `region`:** `usa` | `space` | `middle-east` | `iraq` | `syria` | `europe` | `pacific` | `japan` | `germany` | `africa` | `central-asia` | `classified`

**Validar JSON antes de push:**
```bash
python3 -c "import json; json.load(open('stories.json'))"
```

---

## Lógica de `app.js`

**Estado global:** `lang`, `stories`, `filter`, `region`, `yearFilter`, `search`

**Funciones principales:**
- `loadStories()` — fetch + parse de stories.json
- `initApp()` — inicializa timeline, filtros, stats, IntersectionObserver
- `applyFilters()` — filtra por las 4 dimensiones (AND logic): búsqueda + categoría + región + año
- `renderStories()` — renderiza resultados con highlights de búsqueda
- `setupSearch()` — input handler + dropdown de sugerencias
- `toggleLanguage()` — toggle ES/EN, persiste en localStorage

**Shortcuts de teclado:** `Ctrl+K` (foco búsqueda), `Esc` (cerrar modales)

**i18n:** objeto estático en app.js con claves ES/EN. Clases `.es` / `.en` en HTML controlan visibilidad. `data-i18n` para texto dinámico.

---

## Estilos (`styles.css`)

**Paleta de colores (CSS custom properties):**
- Fondo: `#050507` (negro)
- Acento: `#f4650a` (naranja)
- Texto: `#f0ede8` (blanco roto)
- Grises: `#7a7870`, `#b5b2aa`

**Tipografía:**
- Titulares: Bebas Neue
- Display: DM Serif Display
- Cuerpo: Libre Baskerville
- Mono: IBM Plex Mono

**Efecto scanlines:** overlay visual CSS puro (no tocar sin motivo)

---

## GitHub Action (`update-stories.yml`)

- **Trigger:** diario a las 08:00 UTC + manual dispatch
- **Runtime:** Python 3.11 + Playwright (Chromium headless)
- **Permisos:** `contents: write`, `pull-requests: write`
- **Qué hace:** navega war.gov/UFO, detecta nuevos archivos en `medialink/ufo/release_1/`, compara con stories.json, abre PR con entradas placeholder si hay novedades

Para disparar manualmente: Actions → "Check for new PURSUE documents" → Run workflow

---

## Convenciones

- No usar frameworks JS ni npm — todo vanilla en los tres archivos principales
- No añadir carpetas nuevas sin actualizar este CLAUDE.md
- El JSON debe ser válido — validar antes de push
- Las imágenes locales van en `/img/` — referenciar como `img/nombre.ext`
- Las imágenes de war.gov se referencian directamente por URL (son públicas)
- Nunca subir API keys (no hay ninguna actualmente)
- El `id` de cada entrada en stories.json debe ser único y en kebab-case
- `body_es` y `body_en` deben existir siempre (nunca dejar vacío)
