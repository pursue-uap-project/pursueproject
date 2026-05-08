# 🟣 PROJECT PURSUE — Open Archive of Anomalous Phenomena (UAP)

**PROJECT PURSUE** is an interactive digital archive that gathers, organizes, and presents declassified cases related to Unidentified Anomalous Phenomena (UAP). The project combines **historical documents**, **military reports**, **space transcripts**, **analog photographs**, **diplomatic cables**, and **FBI files**, all integrated into a modern, navigable, and "Top Secret" aesthetic interface.

The objective is to offer an immersive and functional experience for exploring decades of official declassified material.

---

## 🚀 Main Features

### 📁 Dynamic Data Management
Cases are not hardcoded into the HTML. They are loaded from a structured file (`stories.json`), which allows:
- Adding new documents without touching the source code.
- Maintaining a clean and scalable database.
- Simultaneous integration of reports in multiple languages.

### 🔎 Intelligent Search Engine
A real-time filtering system that searches through:
- Case titles.
- Metadata (Agencies, years).
- Document body (including "redacted" keywords).

### 🗂️ Intelligence Filters (Metadata)
The system automatically extracts tags from the `meta` field:
- **Chronology:** Navigation by decades.
- **Agencies:** NASA, FBI, WAR DEPARTMENT, AARO, etc.
- **Regions:** Cases in Syria, Iraq, Japan, USA, and outer space.

### 📅 Interactive Timeline
A dynamically generated timeline that groups records by year, allowing researchers to jump to specific historical periods with a single click.

---

## 🔧 Technical Workflow

1. **Fetch:** The `app.js` script consumes the `stories.json` file.
2. **Processing:** Years and agencies are extracted to build filter buttons and the timeline automatically.
3. **Rendering:** Case cards are generated using JS literal templates, injecting security seals (`TOP SECRET`, `DECLASS`) based on their category.
4. **Tooltips:** The word "PURSUE" in the header includes a technical tooltip with the breakdown of the presidential acronym.

---

## 📜 Project Goal

PURSUE is an information organization tool. Its purpose is to:
- **Centralize** documents that are usually scattered across various government portals.
- **Facilitate** technical analysis and the reading of files with redactions.
- **Preserve** the historical memory of encounters reported by military and civilian personnel.

---

## 📂 Project Structure

```text
pursueproject/
│
├── index.html          # Main interface
├── styles.css          # Archive styles
├── app.js              # Logic for loading, filters, timeline, and rendering
├── stories.json        # Database of declassified cases
└── img/                # Images associated with the cases

---

## 🌐 Live Demo

You can explore the archive here:  
👉 **[https://zaswear.github.io/pursueproject/](https://zaswear.github.io/pursueproject/)**

---

## 🤝 Contributions

This archive is in constant expansion. If you have access to new declassified documents or improvements for the search engine, Pull Requests are welcome.