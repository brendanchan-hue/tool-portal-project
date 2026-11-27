# CLAUDE.md

## Tech Stack

- Plain HTML, CSS, and JavaScript only.
- No frameworks or libraries (no React, Vue, Tailwind, etc.).
- No build step: files are opened or served exactly as written.

## Project Structure

The project is nearly empty for now.

- `README.md` – short project readme
- `CLAUDE.md` – this file (guidance for Claude)

As files are added, keep them at the top level or in simple folders (for example `css/`, `js/`, `images/`), and update this section.

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
- Homepage with one tool card.
- Ohm's law calculator: the student enters any two of voltage (V), current (A), resistance (Ω) and power (W). The tool shows the other two, with worked steps (e.g. `V = I × R = 2 A × 5 Ω = 10 V`).
- Clear error messages: wrong number of values, negative values, division by zero.
- Base units only, answers rounded to 4 significant figures, placeholder name "EE Tool Portal".

**Phase 2: unit prefixes**
- Accept and show prefixes such as mA, kΩ and MΩ.

**Phase 3: more tools**
- Add tools one at a time, for example a resistor colour code reader, a voltage divider, and a series/parallel resistor calculator.

## Rules for Claude

- Explain technical terms in plain language.
- Ask before making big changes.
- When something is unclear, ask rather than guess.
