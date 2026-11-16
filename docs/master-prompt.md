# Master Prompt: India Citizen Help Chatbot

Copy everything below the line into Claude Code (or any coding agent).

---

You are a senior full-stack engineer and product designer. Build an all-India
citizen help chatbot (web, mobile-first) in the existing React + Vite + MUI +
Supabase project. Hindi and English from day one (language toggle), designed
for low-end Android phones and poor networks.

## Modules
1. **Emergency & Safety (highest priority, always one tap away)**
2. **Sarkari Yojana finder** (eligibility, documents, how to apply)
3. **State-wise Laws** (challan, alcohol, tobacco, consumer, FIR, RTI, cyber, etc.)

## Global flow
- Language select -> State/UT select (all 28 states + 8 UTs) -> module/topic or
  free question. Remember choices locally; allow change anytime.
- A fixed red "SOS / Emergency" button is visible on every screen.

## Module 1: Emergency & Safety
- Big tap-to-call (`tel:`) buttons, working offline once loaded:
  - 112 national emergency (all-in-one)
  - 100 Police, 101 Fire, 102/108 Ambulance (108 availability differs by state)
  - 1091 and 181 Women helpline, 1098 Childline, 1930 Cyber fraud/crime,
    14567 Senior citizen helpline, 15100 NALSA free legal aid
  - VERIFY every number against official sources before shipping; store them
    in a table with source_url and last_verified_at; allow per-state overrides.
- Women safety: what to do now (safe-steps checklist), how to file FIR / Zero
  FIR, One Stop Centres (Sakhi), domestic violence and POCSO basics, how to
  report cyber harassment, share-live-location with a trusted contact
  (opens WhatsApp/SMS with a pre-filled message + Google Maps link; no data
  stored on our server).
- Nearest police station and government hospital: ask for browser location
  permission (explain why). Use a places/OSM Overpass lookup through a
  server-side function (Supabase Edge Function) so keys are not exposed in
  the client. Show name, distance, phone, "Call" and "Directions" buttons.
  If location is denied, fall back to state -> district selection and a
  curated list. Say clearly when data may be incomplete.
- Medical emergency guidance: first-aid basics only, always "call 108/112
  now" first. No diagnosis, no medicine dosing.
- Safety: if the user message suggests immediate danger, self-harm or
  violence, stop normal flow and show emergency numbers first.

## Module 2: Sarkari Yojana
- Curated `schemes` table: name (en/hi), level, state, category, benefit,
  structured eligibility (age, income, gender, category, occupation, land,
  disability, residence), documents[], how_to_apply[], official_url, helpline,
  deadline, source_url, last_verified_at.
- Deterministic eligibility engine (pure function with unit tests). The LLM
  must never decide eligibility.
- Profile Q&A one question at a time, then ranked matches with reasons.

## Module 3: State-wise Laws
- Layers: central, state, dynamic (challan amounts, dry days).
- `laws` table: topic, level, state, title, rule_summary, penalty, act_name,
  section (old+new numbering, e.g. IPC and BNS), source_url, notification_ref,
  effective_from, last_verified_at. Separate `challans` table per
  state/violation.
- Answer only from verified records using retrieval (RAG) with citations:
  section, source link, last-verified date. Decide central vs state first.

## Answering rules (all modules)
- Grounded answers only. Not in the database -> "mujhe pakka nahi pata" +
  official link/helpline. Never guess or invent numbers, fines or sections.
- Records older than 6 months show a "may have changed" warning. Unverified
  state/topic shows "coming soon" (be honest about coverage).
- Disclaimer on legal/medical/scheme answers: information only, not
  professional advice; suggest NALSA / doctor / department.
- Never ask for Aadhaar number, OTP, passwords or bank details. Warn about
  fake agents and fake websites.
- Do not help evade law enforcement or commit offences.
- Store minimal data; no personal data by default; consent for anything saved.

## Tech requirements
- React + MUI, accessible, large touch targets, works on slow 3G, PWA-ready.
- Supabase: Postgres tables above with RLS (public read of verified content,
  no public write), Edge Functions for places lookup and LLM calls. Secrets
  only in server-side env, never in client code.
- LLM (Claude API) used only for understanding the question and explaining
  retrieved records in simple language; keep temperature low; include
  citations in output.
- Admin page (auth required) to add/edit records and mark verified.
- Feedback buttons ("sahi / galat jawab") and "report wrong info".

## Deliverables and order
1. Data schema + migrations + seed (central laws core, emergency numbers,
   3-4 states: UP, Maharashtra, Delhi, Karnataka; topics: challan, alcohol,
   tobacco, consumer complaint; 20-30 schemes).
2. Emergency module and nearest police/hospital lookup.
3. Language + state selection and chat UI.
4. Eligibility engine + unit tests; laws retrieval with citations.
5. Admin verification page.
6. Test set of 100 hand-checked questions; report accuracy. Do not claim
   completion until the safety and "don't guess" rules pass tests.
Work in small commits and explain each step briefly.
