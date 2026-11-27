# CLAUDE.md

## Tech Stack

- Plain HTML, CSS, and JavaScript only.
- No frameworks or libraries (no React, Vue, Tailwind, etc.).
- No build step: files are opened or served exactly as written.

## Project Structure

- `index.html` – portal homepage with the tool cards
- `tools/` – one HTML page per tool (`ohms-law.html` – Ohm's law calculator)
- `css/style.css` – shared styles and the light/dark colours
- `js/theme.js` – light/dark theme toggle, loaded on every page
- `js/ohms-law.js` – Ohm's law calculator logic
- `README.md` – short project readme
- `CLAUDE.md` – this file (guidance for Claude)

As files are added, keep them in these simple folders, and update this section.

## Key Requirements

1. Every page must be responsive and work on desktop, tablet, and phone.
2. Users can toggle between a light and a dark theme. The default is the light theme.
3. Text must stay easy to read, with good contrast, in both the light and the dark theme.

## Feature Plan

A web portal where **students** try out small **Electrical Engineering** tools.

### Portal structure

- **Homepage (`index.html`):** a short welcome line and a grid of tool cards. Each card shows the tool's name and a one-line description, and links to the tool.
- **Opening a tool:** the visitor clicks a card and goes to that tool's own page in `tools/`.
- **Getting back:** every page shares the same header. Clicking the portal name in the header returns the visitor to the homepage, and each tool page also has a "Back to all tools" link.
- **Shared on every page:** the header with the light/dark theme toggle (light by default, and the choice is remembered), the responsive layout, and readable colours.
- **Adding a tool later:** create `tools/<tool-name>.html` (plus `js/<tool-name>.js` if needed) and add one card for it on the homepage. Nothing else changes.

### Phases

**Phase 1: portal + Ohm's law calculator**
- [x] Portal: homepage, shared header with theme toggle, and a placeholder "Tool 1 — coming soon" card whose page opens and returns via the portal navigation. Simple neutral styling; visual design to be chosen later.
- [x] Ohm's law calculator (replaced the placeholder card): the student enters any two of voltage (V), current (A), resistance (Ω) and power (W) and presses Calculate. The tool shows the other two, with worked steps (e.g. `V = I × R = 2 A × 5 Ω = 10 V`).
  - Clear error messages: wrong number of values, negative values, division by zero.
  - Zero is allowed, except where it would mean dividing by zero.
  - Base units only, answers rounded to 4 significant figures (shown with "≈" when rounded), placeholder name "EE Tool Portal".

**Phase 2: unit prefixes**
- Accept and show prefixes such as mA, kΩ and MΩ.

**Phase 3: more tools**
- Add tools one at a time, for example a resistor colour code reader, a voltage divider, and a series/parallel resistor calculator.

## Rules for Claude

- Explain technical terms in plain language.
- Ask before making big changes.
- When something is unclear, ask rather than guess.
