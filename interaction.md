# Guide to Immersive Web Interaction & Navigation Patterns

This document catalogs the main patterns for organizing information and transitioning between content sections on the web. It focuses on interaction models rather than pure visual components or static styles.

## Core Categories

### 1. Navigation Patterns
How the user moves between discrete pieces of content.

- **Discrete / Click-based navigation**  
  Classic approach. User clicks links, buttons, menu items or tabs to jump to different sections or pages.  
  Common implementations: sticky header, sidebar navigation, tab bars, breadcrumbs.

- **Continuous / Scroll-based navigation**  
  Content is revealed progressively by scrolling. The scroll itself becomes the primary interaction.

- **Hybrid**  
  Combination of both (e.g. scroll within a long page + persistent menu for jumping).

### 2. Transition Patterns
How the visual change occurs when moving from one state or section to another.

| Pattern                        | Description                                                                 | Typical Trigger          | Visual Character                  |
|--------------------------------|-----------------------------------------------------------------------------|--------------------------|-----------------------------------|
| Instant / Hard cut             | Immediate change with no animation                                          | Click                    | Abrupt                            |
| Fade / Cross-fade              | Opacity transition between states                                           | Click or scroll          | Soft, elegant                     |
| Slide / Push                   | Content slides in from a direction                                          | Click or scroll          | Directional, common in carousels  |
| Full-page section snap         | Each major section fills the viewport; scrolls snap between them            | Scroll (often hijacked)  | Presentation-like                 |
| Morph / Transform              | Elements reshape, scale, or rearrange dramatically                          | Scroll progress          | Cinematic, storytelling           |
| Spatial / Zoom / Pan           | User appears to move through a continuous space                             | Scroll, drag, or gestures| Immersive, exploratory            |

### 3. Key Named Techniques

#### Scrollytelling (Scroll Storytelling)
Narrative technique where scrolling drives a sequential story. Content, illustrations, data visualizations or 3D elements transform, appear, or animate in sync with scroll position.  
Often combines sticky/pinned elements with progressive disclosure.  
Best for: product stories, data journalism, brand experiences, explainers.

#### Scroll Hijacking / Scroll Jacking
Technique that intercepts the browser’s native scroll behavior to control speed, direction, or to map scroll progress tightly to animations.  
Can produce very polished cinematic effects but risks poor usability if overused (users lose expected control).  
Modern best practice: prefer CSS Scroll-Driven Animations and `scroll-snap` over heavy JavaScript hijacking when possible.

#### Parallax Scrolling
Layered movement where background and foreground elements move at different speeds, creating an illusion of depth.  
Can be subtle (background only) or extreme (multiple layers + transforms).  
Often combined with scrollytelling.

#### Full-page / Fullscreen Scrolling (Section Snapping)
Page is divided into full-viewport sections. Scrolling (or buttons/keyboard) snaps cleanly from one section to the next, frequently with animated transitions (slide, fade, cube, etc.).  
Popular library: **fullPage.js**.  
Also achievable with pure CSS (`scroll-snap-type: y mandatory`) plus optional JavaScript for richer effects.

#### Horizontal Scrolling Sections
A section that scrolls sideways instead of (or in addition to) vertically. Useful for timelines, galleries or process steps.

#### Sticky / Pinned Elements
An element remains fixed in the viewport for a defined scroll range while other content moves around or over it. Core building block of most scrollytelling experiences.

#### Progressive Disclosure on Scroll
Information is revealed step-by-step as the user scrolls, rather than showing everything at once. Reduces cognitive load and creates pacing.

## Decision Framework

When choosing a pattern, consider:

1. **Content type**  
   - Linear story / product journey → Scrollytelling or full-page sections  
   - Reference / multi-topic → Discrete navigation + optional scroll  
   - Visual exploration → Spatial or parallax-heavy

2. **User expectations & accessibility**  
   - Prefer native scroll behavior when possible.  
   - Always provide alternative navigation (menu, keyboard).  
   - Respect `prefers-reduced-motion`.

3. **Performance**  
   - Heavy scroll-driven animations should use compositor-friendly properties (`transform`, `opacity`).  
   - Prefer CSS Scroll-Driven Animations API over continuous JavaScript scroll listeners.

4. **Device mix**  
   - Full-page snap and heavy hijacking can feel awkward on mobile. Provide responsive fallbacks.

## Recommended Technology Stack (2025–2026)

- **Pure CSS first**: `scroll-snap`, Scroll-Driven Animations (`animation-timeline: scroll()` / View Timelines), container queries.
- **Lightweight enhancement**: GSAP + ScrollTrigger (industry standard for complex timelines).
- **Full-page solution**: fullPage.js (or lighter alternatives / pure CSS snap).
- **3D / advanced**: Three.js or React Three Fiber coordinated with scroll progress.
- **Frameworks**: Works with any (React, Vue, Svelte, vanilla). Many have dedicated scroll libraries or hooks.

## Usability Guidelines

- Never trap the user. Always allow normal scrolling or provide clear exit controls.
- Keep individual scroll-driven sequences reasonably short.
- Provide visual progress indicators when the experience is long.
- Test with keyboard-only and screen-reader users.
- Offer a “reduce motion” mode that disables or simplifies dramatic transitions.

## Related Terms Glossary

- **Scroll-driven animations**: Animations whose progress is controlled by scroll position rather than time.
- **View Timeline**: CSS concept that ties animation progress to an element’s visibility within the scrollport.
- **One-page website / Single-page site**: Site that lives on a single HTML page, often using the patterns above.
- **Immersive web experience**: Broad term for sites that prioritize cinematic interaction over traditional document-like browsing.
- **Motion design / Motion UI**: Discipline concerned with the timing, easing and choreography of interface animations.
- **Interaction patterns**: Reusable solutions to common interaction problems (the broader category this guide belongs to).
