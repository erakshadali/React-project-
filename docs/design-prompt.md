# Design Prompt: India Citizen Help Chatbot (for Claude Design)

Copy everything below the line.

---

Design a modern, top-notch, mobile-first UI for an all-India citizen help chatbot. Deliver a high-fidelity interactive prototype (mobile 360-430px first, then tablet and desktop) in light and dark mode, with Hindi and English text.

## Product
Users pick a language and their state/UT (or detect it by location), then get help with: (1) Emergency & Women Safety, (2) Sarkari Yojana (government schemes), (3) State-wise Laws (challan, alcohol, tobacco, consumer, FIR, RTI, cyber). Many users are on low-end Android phones, slow networks, with low literacy: clarity and trust matter more than decoration.

## Design principles
- Emergency first: a red SOS button is always visible and one tap away; tap-to-call tiles for 112, 100, 102/108, 1091, 181, 1098, 1930.
- Calm, trustworthy, friendly. Civic-tech feel, not corporate. Plain words, large type, icons with labels.
- Modern chat design: clean message bubbles, streaming typing indicator, quick-reply chips, rich answer cards, smooth transitions.
- Accessibility: WCAG AA contrast, min 48px touch targets, readable Devanagari and Latin fonts (e.g. Noto Sans Devanagari + Inter/Poppins), supports large text, never rely on color alone.

## Visual system
- Palette (define as tokens, light + dark):
  - Primary: deep indigo/blue for trust (#3347D6 range) with soft tints
  - Accent: saffron/amber (#FF9F1C) for highlights and CTAs
  - Success/green (#1FA971) for verified
  - Danger/red (#E5383B) reserved for SOS and emergencies only
  - Neutrals: warm greys; surfaces with subtle gradient and glass (blur) panels
  - Optional subtle tricolour accent (saffron / white / green) used sparingly, never as flag imitation
- Rounded 16-24px cards, soft layered shadows, consistent 8px spacing grid, subtle gradient hero header.
- Iconography: one consistent rounded icon set.

## Screens
1. Splash/onboarding: logo, language chooser (Hindi / English / more), short trust message.
2. State selection: search + grid/list of 28 states and 8 UTs, "Use my location" button, remember choice.
3. Home: greeting, state chip (changeable), large module cards (Emergency, Schemes, Laws), recent questions, search/ask bar.
4. Chat: bubbles, quick-reply chips, rich cards (scheme card, law card with section + source link + "last verified" badge, challan fine table), feedback (sahi / galat), voice input button, typing animation.
5. Emergency & Safety: SOS hero, number tiles, women-safety checklist, "Share my live location" action, "Nearest police / hospital" list with distance, Call and Directions buttons, map preview.
6. Scheme finder: step-by-step profile questions with progress bar, results list with eligibility reasons, documents checklist, how-to-apply steps.
7. Laws: topic grid, answer view with citation, central-vs-state tag, "may have changed" warning for old records, disclaimer strip.
8. Settings: language, state, text size, dark mode, privacy.
9. States: loading skeletons, offline banner, empty, error, "not sure / coming soon", location-denied fallback.

## Motion and animation (tasteful, fast, purposeful)
- Spring-based micro-interactions (150-300 ms): button press, chip select, card hover/lift.
- Message bubbles slide/fade in; typing indicator with three bouncing dots; streaming text.
- Page transitions with shared-element feel; staggered list/card entrance.
- SOS button gentle pulse; success tick animation; skeleton shimmer.
- Respect prefers-reduced-motion: provide a reduced version. Keep 60fps on low-end phones.

## Deliverables
- Design tokens (colors, type scale, spacing, radius, shadow, motion durations/easings) for light and dark.
- Component library: buttons, chips, cards, bubbles, inputs, bottom nav, top bar, SOS button, number tile, badge, toast, skeleton.
- All screens above at mobile, tablet, desktop; clickable prototype of the main flow: onboarding -> state -> home -> chat answer -> emergency.
- Notes for developers mapping to React + MUI theme (theme object with the tokens).
