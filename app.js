/* ═══════════════════════════════════════════════
   PURSUE PROJECT — app.js
   ═══════════════════════════════════════════════ */

'use strict';

// ─── STATE ──────────────────────────────────────────────────────────────────
const state = {
  lang: localStorage.getItem('pursue_lang') || 'es',
  stories: [],
  filter: 'all',
  region: 'all',
  yearFilter: 'all',
  search: '',
};

// ─── TRANSLATIONS ────────────────────────────────────────────────────────────
const i18n = {
  es: {
    search_placeholder: 'Buscar documentos, agencias, regiones...',
    filter_all: 'TODOS',
    filter_1940s: 'AÑOS 40',
    filter_1950s: 'AÑOS 50',
    filter_1960s: 'AÑOS 60',
    filter_1970s: 'AÑOS 70',
    filter_2020s: 'AÑOS 2020+',
    filter_fbi: 'ARCHIVOS FBI',
    filter_nasa: 'NASA',
    filter_dow: 'MISIONES DOW',
    filter_aaro: 'AARO',
    filter_dos: 'ESTADO',
    filter_classified: 'CLASIFICADO',
    access_file: 'ACCEDER AL ARCHIVO',
    view_details: 'VER DETALLES',
    source_label: 'Fuente oficial',
    no_results: 'No se encontraron archivos en esta categoría.',
    results_count: (n) => `${n} archivo${n !== 1 ? 's' : ''} encontrado${n !== 1 ? 's' : ''}`,
    lang_btn: 'ENG',
    subtitle: 'Los Archivos Abiertos',
    subtitle2: 'Análisis Histórico y Operativo',
    stat_docs: 'DOCUMENTOS',
    stat_years: 'AÑOS DE HISTORIA',
    stat_agencies: 'AGENCIAS',
    stat_countries: 'PAÍSES',
    map_label: '— Filtrar por región',
    timeline_label: '— Navegar por años',
    filter_label: '— Filtrar por agencia / época',
    close: 'CERRAR',
  },
  en: {
    search_placeholder: 'Search documents, agencies, regions...',
    filter_all: 'ALL',
    filter_1940s: '1940s',
    filter_1950s: '1950s',
    filter_1960s: '1960s',
    filter_1970s: '1970s',
    filter_2020s: '2020s+',
    filter_fbi: 'FBI FILES',
    filter_nasa: 'NASA',
    filter_dow: 'DOW MISSIONS',
    filter_aaro: 'AARO',
    filter_dos: 'STATE DEPT',
    filter_classified: 'CLASSIFIED',
    access_file: 'ACCESS FILE',
    view_details: 'VIEW DETAILS',
    source_label: 'Official source',
    no_results: 'No files found in this category.',
    results_count: (n) => `${n} file${n !== 1 ? 's' : ''} found`,
    lang_btn: 'ESP',
    subtitle: 'The Open Files',
    subtitle2: 'Historical and Operational Analysis',
    stat_docs: 'DOCUMENTS',
    stat_years: 'YEARS OF HISTORY',
    stat_agencies: 'AGENCIES',
    stat_countries: 'COUNTRIES',
    map_label: '— Filter by region',
    timeline_label: '— Navigate by year',
    filter_label: '— Filter by agency / era',
    close: 'CLOSE',
  }
};

function t(key, ...args) {
  const val = i18n[state.lang][key];
  return typeof val === 'function' ? val(...args) : val;
}

// ─── REGIONS CONFIG ──────────────────────────────────────────────────────────
const REGIONS = [
  { key: 'all',          label_es: 'Todas las regiones', label_en: 'All regions' },
  { key: 'usa',          label_es: 'Estados Unidos',     label_en: 'United States' },
  { key: 'space',        label_es: 'Espacio exterior',   label_en: 'Outer Space' },
  { key: 'middle-east',  label_es: 'Oriente Medio',      label_en: 'Middle East' },
  { key: 'iraq',         label_es: 'Irak',               label_en: 'Iraq' },
  { key: 'syria',        label_es: 'Siria',              label_en: 'Syria' },
  { key: 'europe',       label_es: 'Europa',             label_en: 'Europe' },
  { key: 'pacific',      label_es: 'Pacífico',           label_en: 'Pacific' },
  { key: 'japan',        label_es: 'Japón',              label_en: 'Japan' },
  { key: 'germany',      label_es: 'Alemania',           label_en: 'Germany' },
  { key: 'africa',       label_es: 'África',             label_en: 'Africa' },
  { key: 'central-asia', label_es: 'Asia Central',       label_en: 'Central Asia' },
  { key: 'classified',   label_es: 'Clasificado',        label_en: 'Classified' },
];

// ─── DATA LOADING ─────────────────────────────────────────────────────────────
async function loadStories() {
  try {
    const res = await fetch('stories.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    state.stories = await res.json();
    initApp();
  } catch (err) {
    console.error('Error loading stories.json:', err);
    document.getElementById('articleList').innerHTML =
      `<div class="no-results">Error loading files. Please refresh.</div>`;
  }
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
function initApp() {
  buildTimeline();
  buildRegionPins();
  updateStats();
  updateStaticText();
  applyFilters();
  setupObserver();
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function updateStats() {
  const agencies = new Set(state.stories.map(s => s.agency)).size;
  const countries = new Set(state.stories.map(s => s.region)).size;
  document.getElementById('stat-docs').textContent     = state.stories.length;
  document.getElementById('stat-years').textContent    = '80+';
  document.getElementById('stat-agencies').textContent = agencies;
  document.getElementById('stat-countries').textContent = countries;
}

// ─── TIMELINE ─────────────────────────────────────────────────────────────────
function buildTimeline() {
  const years = [...new Set(state.stories.map(s => s.year))].sort();
  const container = document.getElementById('timelineBar');
  container.innerHTML = years.map(y => `
    <div class="tl-item" onclick="filterByYear('${y}')" data-year="${y}">
      <div class="tl-dot"></div>
      <div class="tl-year">${y}</div>
      <div class="tl-label">${getYearLabel(y)}</div>
    </div>
  `).join('');
}

function getYearLabel(year) {
  const yr = parseInt(year);
  if (yr === 1944) return 'FOO FIGHTERS';
  if (yr === 1946 || yr === 1947 || yr === 1948) return 'FBI GEN.';
  if (yr === 1949) return 'FLYING DISCS';
  if (yr >= 1950 && yr <= 1960) return 'COLD WAR';
  if (yr === 1963) return 'SP.PROJECT';
  if (yr === 1965) return 'GEMINI 7';
  if (yr === 1969) return 'APOLLO';
  if (yr >= 1972 && yr <= 1973) return 'APOLLO/SKYLAB';
  if (yr === 1985) return 'PAPUA';
  if (yr === 1990) return 'FBI PHOTOS';
  if (yr === 1994) return 'KAZAKHSTAN';
  if (yr === 1996) return 'USAF RPT';
  if (yr === 2000) return 'VANDENBERG';
  if (yr === 2016) return 'SYRIA';
  if (yr >= 2020 && yr <= 2021) return 'GULF OPS';
  if (yr === 2022) return 'IRAQ/SYRIA';
  if (yr === 2023) return 'FBI/DOW';
  if (yr === 2024) return 'GLOBAL';
  if (yr === 2025) return 'ORBS/HQ';
  if (yr === 2026) return 'PURSUE';
  return '';
}

function filterByYear(year) {
  if (state.yearFilter === year) {
    state.yearFilter = 'all';
    document.querySelectorAll('.tl-item').forEach(el => el.classList.remove('active'));
  } else {
    state.yearFilter = year;
    document.querySelectorAll('.tl-item').forEach(el => {
      el.classList.toggle('active', el.dataset.year === year);
    });
  }
  applyFilters();
}

// ─── REGION PINS ──────────────────────────────────────────────────────────────
function buildRegionPins() {
  const container = document.getElementById('regionPins');
  container.innerHTML = REGIONS.map(r => `
    <div class="map-pin${r.key === 'all' ? ' active' : ''}" 
         data-region="${r.key}"
         onclick="filterByRegion('${r.key}')">
      <span class="es">${r.label_es}</span><span class="en">${r.label_en}</span>
    </div>
  `).join('');
  updateLangVisibility();
}

function filterByRegion(region) {
  state.region = region;
  document.querySelectorAll('.map-pin').forEach(el => {
    el.classList.toggle('active', el.dataset.region === region);
  });
  applyFilters();
}

// ─── FILTER LOGIC ─────────────────────────────────────────────────────────────
function applyFilters() {
  const q = state.search.toLowerCase().trim();

  const filtered = state.stories.filter(story => {
    // Text search
    const haystack = [
      story.title_es, story.title_en,
      story.body_es.slice(0, 400), story.body_en.slice(0, 400),
      story.meta, story.agency,
      (story.tags || []).join(' ')
    ].join(' ').toLowerCase();

    const matchesSearch = !q || q.split(' ').every(word => haystack.includes(word));

    // Agency/era filter
    let matchesCat = true;
    if (state.filter !== 'all') {
      const tags = (story.tags || []).join(' ').toLowerCase();
      const meta = story.meta.toLowerCase();
      const agency = story.agency.toLowerCase();
      matchesCat =
        tags.includes(state.filter) ||
        meta.includes(state.filter) ||
        agency.includes(state.filter);
    }

    // Region filter
    const matchesRegion = state.region === 'all' || story.region === state.region;

    // Year filter
    const matchesYear = state.yearFilter === 'all' || story.year === state.yearFilter;

    return matchesSearch && matchesCat && matchesRegion && matchesYear;
  });

  renderStories(filtered, q);
  updateResultsInfo(filtered.length);
}

// ─── RENDER ───────────────────────────────────────────────────────────────────
function renderStories(data, highlight = '') {
  const container = document.getElementById('articleList');
  container.innerHTML = '';

  if (data.length === 0) {
    container.innerHTML = `<div class="no-results">${t('no_results')}</div>`;
    return;
  }

  data.forEach(story => {
    const article = document.createElement('article');
    article.className = 'doc-item fade-in';
    article.dataset.id = story.id;

    const title    = state.lang === 'es' ? story.title_es : story.title_en;
    const body     = state.lang === 'es' ? story.body_es  : story.body_en;
    const hlTitle  = highlight ? highlightText(title, highlight) : title;
    const hlBody   = highlight ? highlightText(body,  highlight) : body;

    const imgHtml = story.image
      ? `<img src="${story.image}" class="doc-image" 
              alt="${title}" loading="lazy"
              onclick="openLightbox(this.src, '${escHtml(title)}')">
         <div class="image-caption">VISUAL REF · ${story.meta.split('·')[0].trim()}</div>`
      : '';

    const tagsHtml = (story.tags || []).slice(0, 4)
      .map(tag => `<span class="tag">${tag.toUpperCase()}</span>`).join('');

    article.innerHTML = `
      <div class="article-top">
        <span class="article-meta">${story.meta}</span>
        <div class="article-tags">${tagsHtml}</div>
      </div>
      <h2 class="article-title">${hlTitle}</h2>
      ${imgHtml}
      <div class="article-body"><p>${hlBody}</p></div>
      <div class="source-block">
        <span class="source-label es">${t('source_label')}</span>
        <span class="source-label en">${t('source_label')}</span>
        <a href="${story.url}" class="source-url" target="_blank" rel="noopener">
          ${story.url.split('/').pop()}
        </a>
      </div>
      <div class="article-actions">
        <a href="${story.url}" class="btn-download" target="_blank" rel="noopener">
          ${t('access_file')}
        </a>
        <button class="btn-secondary" onclick="openModal('${story.id}')">
          ${t('view_details')}
        </button>
      </div>
    `;

    container.appendChild(article);
    if (window._observer) window._observer.observe(article);
  });
}

function updateResultsInfo(count) {
  const el = document.getElementById('resultsInfo');
  if (el) el.textContent = t('results_count', count);
}

function highlightText(text, query) {
  if (!query) return text;
  const words = query.split(' ').filter(Boolean);
  let result = escHtml(text);
  words.forEach(word => {
    const re = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    result = result.replace(re, '<mark>$1</mark>');
  });
  return result;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── DETAIL MODAL ─────────────────────────────────────────────────────────────
function openModal(id) {
  const story = state.stories.find(s => s.id === id);
  if (!story) return;

  const title = state.lang === 'es' ? story.title_es : story.title_en;
  const body  = state.lang === 'es' ? story.body_es  : story.body_en;

  document.getElementById('modalMeta').textContent  = story.meta;
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').textContent  = body;
  document.getElementById('modalLink').href         = story.url;
  document.getElementById('modalLink').textContent  = t('access_file');
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────
function openLightbox(src, caption) {
  document.getElementById('lightboxImg').src             = src;
  document.getElementById('lightboxCaption').textContent = caption || '';
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

// ─── LANGUAGE ─────────────────────────────────────────────────────────────────
function toggleLanguage() {
  state.lang = state.lang === 'es' ? 'en' : 'es';
  localStorage.setItem('pursue_lang', state.lang);
  updateStaticText();
  updateLangVisibility();
  applyFilters();
}

function updateStaticText() {
  const l = state.lang;

  // Placeholder
  const si = document.getElementById('searchInput');
  if (si) si.placeholder = t('search_placeholder');

  // Lang btn
  const lb = document.getElementById('langBtn');
  if (lb) {
    const flag = l === 'es' ? 'us' : 'es';
    lb.innerHTML = `<img src="https://flagcdn.com/w20/${flag}.png" class="flag-icon" alt="flag"> ${t('lang_btn')}`;
  }

  // Static data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (i18n[l][key]) el.textContent = i18n[l][key];
  });

  // Filter buttons
  const filterMap = {
    'all': 'filter_all', '1940s': 'filter_1940s', '1950s': 'filter_1950s',
    '1960s': 'filter_1960s', '1970s': 'filter_1970s', '202': 'filter_2020s',
    'fbi': 'filter_fbi', 'nasa': 'filter_nasa', 'dow': 'filter_dow',
    'aaro': 'filter_aaro', 'dos': 'filter_dos', 'classified': 'filter_classified'
  };
  document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
    const f = btn.dataset.filter;
    if (filterMap[f]) btn.textContent = t(filterMap[f]);
  });

  // Subtitle
  document.querySelectorAll('[data-es], [data-en]').forEach(el => {
    const val = el.getAttribute(`data-${l}`);
    if (val) el.innerHTML = val;
  });
}

function updateLangVisibility() {
  document.querySelectorAll('.es, .en').forEach(el => {
    const show = el.classList.contains(state.lang);
    el.style.display = show ? '' : 'none';
  });
}

// ─── SEARCH ───────────────────────────────────────────────────────────────────
function setupSearch() {
  const input = document.getElementById('searchInput');
  const dropdown = document.getElementById('searchDropdown');

  input.addEventListener('input', () => {
    state.search = input.value;
    const q = state.search.toLowerCase().trim();

    if (!q) {
      dropdown.classList.remove('open');
      applyFilters();
      return;
    }

    // Quick suggestions
    const matches = state.stories.filter(s => {
      const hay = [s.title_es, s.title_en, s.meta, (s.tags||[]).join(' ')].join(' ').toLowerCase();
      return q.split(' ').every(w => hay.includes(w));
    }).slice(0, 6);

    if (!matches.length) {
      dropdown.innerHTML = `<div class="sd-none">${state.lang === 'es' ? 'Sin resultados para' : 'No results for'} "${input.value}"</div>`;
    } else {
      dropdown.innerHTML = matches.map(s => {
        const title = state.lang === 'es' ? s.title_es : s.title_en;
        return `<div class="sd-item" onclick="selectSuggestion('${s.id}')">
          <span class="sd-meta">${s.meta.split('·')[0].trim()}</span>
          <div class="sd-title">${title}</div>
        </div>`;
      }).join('');
    }

    dropdown.classList.add('open');
    applyFilters();
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('.search-container')) {
      dropdown.classList.remove('open');
    }
  });

  // Enter key
  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      state.search = '';
      input.value = '';
      dropdown.classList.remove('open');
      applyFilters();
    }
  });
}

function selectSuggestion(id) {
  const story = state.stories.find(s => s.id === id);
  if (!story) return;
  document.getElementById('searchDropdown').classList.remove('open');
  openModal(id);
}

// ─── FILTER BUTTONS ───────────────────────────────────────────────────────────
function setupFilterButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      state.filter = this.dataset.filter;
      applyFilters();
    });
  });
}

// ─── INTERSECTION OBSERVER ────────────────────────────────────────────────────
function setupObserver() {
  window._observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.08 });
}

// ─── SCROLL TOP ───────────────────────────────────────────────────────────────
window.onscroll = function () {
  const btn = document.getElementById('scrollTopBtn');
  if (btn) btn.style.display = window.scrollY > 400 ? 'block' : 'none';
};

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

// ─── KEYBOARD SHORTCUTS ───────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closeLightbox();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('searchInput')?.focus();
  }
});

// ─── BOOT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setupSearch();
  setupFilterButtons();
  updateStaticText();
  updateLangVisibility();
  loadStories();
});
