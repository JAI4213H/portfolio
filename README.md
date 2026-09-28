# Jai Tanwar — ML Enthusiast Portfolio

Premium React + Vite portfolio for Jai, focused on machine learning, experimentation, systems, and continuous learning.

## Run locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Main files

- `src/main.jsx` — portfolio content, navigation, accordion interactions, project data, social links, scroll-spy, and reveal logic.
- `src/styles.css` — visual system, responsive layouts, hover states, accordion transitions, scroll reveals, and reduced-motion support.
- `src/assets/jai-background.png` — supplied hero/background image.

## Current portfolio structure

- Home — Jai / ML Enthusiast hero.
- Work — expandable Machine Learning, Deep Learning, Systems, and LLM sections.
- Projects — compact selected projects, including Basic Python Projects with nested sub-projects, plus ongoing Forensic AI and ChoixModel entries.
- About — personal approach and Currently Learning list.
- Contact — GitHub, LinkedIn, and Instagram.

## Interaction details

- Hovering `Jai` in the top-left smoothly reveals `Jai Tanwar` without shifting the header layout.
- The top-right duplicate name has been removed.
- Navigation underline follows the visible section and updates while scrolling.
- Work categories expand/collapse with animated panels.
- Project rows use compact hover states; Basic Python Projects exposes its three sub-projects through an expandable nested list.
- Scroll reveals use Intersection Observer and respect `prefers-reduced-motion`.
- No fake metrics, certifications, clients, achievements, or progress percentages were added.

## Notes

The final source was packaged from the edited project. In the build environment used for this delivery, `npm install` timed out while fetching dependencies, so a successful production build is not claimed.
