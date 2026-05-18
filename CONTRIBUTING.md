# Contributing to PROJECT PURSUE

Thank you for helping expand this archive. Every new document entry makes the collection more complete.

---

## How to add a new document

All documents live in `stories.json`. Each entry follows this schema:

```json
{
  "id": "unique-lowercase-id",
  "meta": "YEAR · AGENCY · CLASSIFICATION LEVEL",
  "year": "2024",
  "agency": "FBI",
  "region": "usa",
  "tags": ["2020s", "fbi", "witness", "classified"],
  "title_es": "Título en español",
  "title_en": "Title in English",
  "body_es": "Descripción completa en español (2-4 frases mínimo).",
  "body_en": "Full description in English (minimum 2-4 sentences).",
  "image": "https://url-to-image-or-empty-string",
  "images": ["img/photo-1.jpg", "img/photo-2.jpg"],
  "url": "https://www.war.gov/medialink/ufo/release_1/filename.pdf"
}
```

### Field reference

| Field | Required | Notes |
|---|---|---|
| `id` | ✅ | Unique. Use lowercase, hyphens only. Example: `fbi-serial-220` |
| `meta` | ✅ | Format: `YEAR · AGENCY · CLASSIFICATION`. Shown on the card. |
| `year` | ✅ | 4-digit string: `"2024"`. Used by the timeline. |
| `agency` | ✅ | One of: `FBI` `NASA` `DOW` `AARO` `DOS` `USAF` `WAR DEPARTMENT` `CLASSIFIED` |
| `region` | ✅ | One of: `usa` `space` `middle-east` `iraq` `syria` `europe` `pacific` `japan` `germany` `africa` `central-asia` `classified` |
| `tags` | ✅ | Array of strings. Include the era (`1940s`, `1950s`... `2020s`) and relevant keywords. |
| `title_es` | ✅ | Spanish title shown on the card. |
| `title_en` | ✅ | English title shown on the card. |
| `body_es` | ✅ | Spanish description. Minimum 2 sentences. Be factual. |
| `body_en` | ✅ | English description. Same content as `body_es`. |
| `image` | ✅ | URL or local path (`img/file.jpg`) to the main image, or `""` if none. |
| `images` | ➖ | Optional array of image paths for multi-image galleries. When present, replaces `image` in the card and renders clickable thumbnails. Keep `image` set to the first item as fallback. |
| `url` | ✅ | Direct URL to the official PDF/file on war.gov. |

---

## Finding new documents

All PURSUE Release 1 documents are accessible at:

```
https://www.war.gov/UFO/
https://www.war.gov/medialink/ufo/release_1/
```

When new releases are published, the GitHub Action in `.github/workflows/update-stories.yml` will detect them automatically and open a Pull Request with placeholder entries that need descriptions.

---

## Steps to contribute

1. **Fork** this repository
2. **Edit** `stories.json` — add your entry at the end of the array
3. **Validate** your JSON is valid (paste it into [jsonlint.com](https://jsonlint.com))
4. **Open a Pull Request** with a title like `Add: dow-uap-d12 Iraq May 2022`

### Quick validation check

```bash
python3 -c "import json; json.load(open('stories.json')); print('JSON valid ✓')"
```

---

## Guidelines

- **Be factual.** Descriptions should reflect what the document actually contains, not speculation.
- **Both languages required.** Every entry needs `title_es`, `title_en`, `body_es`, and `body_en`.
- **Use official URLs only.** Only link to `war.gov` or other official government sources.
- **No duplicate IDs.** Check that your `id` doesn't already exist in the file.
- **Images from war.gov.** If you include an image, use the official URLs from PURSUE Release 1.

---

## Document categories that still need entries

These files from Release 1 don't have individual entries yet:

- FBI Case 62-HQ-83894 — Sections 1-10 individually
- FBI Case 62-HQ-83894 — Serials 130, 153, 220, 403, 438, 449 individually  
- FBI Photos Series B — b1, b3, b4, b5, b7, b8, b9, b10, b11, b12, b13, b14, b24
- DOW Mission Reports — d4, d5, d6, d7 (Arabian Gulf 2020) individually
- DOW Mission Reports — d60, d61, d62, d63 (Persian Gulf/Hormuz 2020) individually
- 059UAP files — 059uap00011, 059uap00012, 059uap00013 individually

---

## Questions?

Open an [Issue](https://github.com/zaswear/pursueproject/issues) on GitHub.
