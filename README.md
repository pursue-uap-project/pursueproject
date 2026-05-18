# 🟠 PROJECT PURSUE — Open Archive of Anomalous Phenomena

> **80 years of UAP sightings declassified by the U.S. Department of War**  
> Live: [zaswear.github.io/pursueproject](https://zaswear.github.io/pursueproject) · Source: [war.gov/UFO](https://www.war.gov/UFO/)

---

![PURSUE Banner](https://www.war.gov/medialink/ufo/release_1/nasa-uap-vm6-apollo-17-1972.jpg)

*Official NASA photograph from Apollo 17 (1972) — declassified via PURSUE Release 1*

---

## What is PURSUE?

On **May 8, 2026**, the U.S. Department of War launched the **PURSUE program** — Presidential Unsealing and Reporting System for UAP Encounters — by direct presidential order. This is the first coordinated mass declassification of UAP documents in U.S. history, involving agencies including the FBI, NASA, AARO, the Department of State, INDOPACOM, and the Air Force.

This project is a **fully functional, searchable, bilingual archive** of all publicly released PURSUE documents.

---

## 🚀 Features

### 🔎 Real-Time Intelligent Search
- Searches titles, metadata, body text, tags, and agencies in both Spanish and English
- Dropdown suggestions as you type
- Keyboard shortcut: `Ctrl+K` to focus search

### 🗂️ Multi-Dimensional Filtering
- **By agency:** FBI, NASA, DOW, AARO, State Dept, Classified
- **By era:** 1940s, 1950s, 1960s, 1970s, 2020s+
- **By region:** USA, Middle East, Iraq, Syria, Europe, Pacific, Japan, Space, Africa...
- **By year:** Interactive clickable timeline

### 📅 Dynamic Timeline
- Auto-generated from `stories.json` data
- Each year is clickable — filters to that year's documents
- Labels include mission names (GEMINI 7, APOLLO, FOO FIGHTERS...)

### 🌍 ES / EN Bilingual
- Full interface and document descriptions in Spanish and English
- Language preference saved in localStorage
- Single click toggle with flag indicator

### 📋 Detail Modal
- Click "View Details" on any card for the full document description
- Direct link to the official war.gov PDF/file

### 📸 Image Lightbox
- Click any document image to view full-size
- 8 FBI Series A PNG photos + 24 FBI Series B JPG photos + 6 NASA mission photos + historical documents (Milwaukee 1974, Siberia map, case enclosures)

---

## 📦 Document Coverage — Release 1 (119+ files)

| Category | Documents |
|---|---|
| FBI Case 62-HQ-83894 | 10 sections + 7 serials + Sub A |
| FBI General Files (1946-48) | 2 volumes |
| NASA Transcripts & Debriefs | Apollo 11, 12, 17 · Gemini 7 · Skylab |
| NASA Photographs | 6 official mission photos |
| DOW Military Mission Reports | 40+ reports (Iraq, Syria, Gulf, Greece, Djibouti...) |
| WWII Documents (1944-45) | Foo Fighters — 415th Night Fighter Sq. |
| Historical Incident Summaries | 233 cases (3 volumes) |
| FBI Photographs | 8 PNG + 14 PDF (Series A & B) |
| State Department Cables | Papua New Guinea 1985, Kazakhstan 1994 |
| Strategic Analysis | "UFOs and Defense: What Should We Prepare For?" |
| AARO Briefing Slides | Western U.S. Event — May 8, 2026 |
| Classified (Agency 059) | 3 files, agency identity unknown |

---

## 🔧 Project Structure

```
pursueproject/
├── index.html          # Main interface (clean HTML, no inline JS/CSS)
├── styles.css          # All styles
├── app.js              # All logic: loading, search, filters, timeline, i18n
├── stories.json        # Database of declassified cases (63+ entries)
├── .github/
│   └── workflows/
│       └── update-stories.yml  # Auto-update GitHub Action
├── img/                # Local images (42 files: FBI Series A+B, NASA, historical)
├── CLAUDE.md           # Project context for Claude Code
└── README.md
```

---

## 🛠️ Technical Stack

- **Pure HTML/CSS/JS** — no frameworks, no build tools, no dependencies
- **stories.json** as the data source — add new documents without touching code
- **GitHub Pages** for hosting — free, fast, version-controlled
- **GitHub Actions** for auto-updates when new PURSUE releases drop

---

## 🔄 Auto-Update System

A GitHub Action runs every Tuesday at 08:00 UTC and checks `war.gov/UFO` for new documents. When new PDFs are detected, it updates `stories.json` automatically via a pull request.

To trigger manually:
```
Actions → "Check for new PURSUE documents" → Run workflow
```

---

## 📜 Official Sources

All documents are public and freely accessible at:

- **PURSUE Portal:** https://www.war.gov/UFO/
- **Direct file base:** `https://www.war.gov/medialink/ufo/release_1/`

Key documents:
- [USPER Statement (SECRET//NOFORN)](https://www.war.gov/medialink/ufo/release_1/usper-statement-redacted.pdf)
- [Western U.S. Event Slides — AARO](https://www.war.gov/medialink/ufo/release_1/western_us_event_slides_5.08.2026.pdf)
- [Apollo 17 Transcript 1972](https://www.war.gov/medialink/ufo/release_1/nasa-uap-d2-apollo-17-transcript-1972.pdf)
- [FBI Case 62-HQ-83894 Section 1](https://www.war.gov/medialink/ufo/release_1/65_hs1-834228961_62-hq-83894_section_1.pdf)
- [Foo Fighters WWII 1944-45](https://www.war.gov/medialink/ufo/release_1/331_120752_numeric_files_1944–1945_37153_german_armament_equipment_documents.pdf)

---

## 🤝 Contributing

This archive is in constant expansion. PURSUE releases new documents in waves.

**To add new documents:**
1. Add an entry to `stories.json` following the existing schema
2. Open a Pull Request

**Schema:**
```json
{
  "id": "unique-id",
  "meta": "YEAR · AGENCY · CLASSIFICATION",
  "year": "2024",
  "agency": "FBI",
  "region": "usa",
  "tags": ["tag1", "tag2"],
  "title_es": "Título en español",
  "title_en": "Title in English",
  "body_es": "Descripción completa en español...",
  "body_en": "Full description in English...",
  "image": "https://url-to-image-or-empty-string",
  "url": "https://www.war.gov/medialink/ufo/release_1/filename.pdf"
}
```

---

## 📄 License

[CC0-1.0](LICENSE) — Public Domain. Use freely, no attribution required.

---

*"The government didn't close the case. It divided it into sections. Stamped it SECRET. And in 2026, published it — without an answer."*
