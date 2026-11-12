# Study: Sarkari Yojana Chatbot (India)

Status: DRAFT. Figures and scheme details below are from general knowledge and
MUST be verified against official portals before they go into the bot.

## 1. Problem
Many eligible Indians never receive government benefits because they do not
know the scheme exists, are unsure of eligibility, do not know which documents
are needed, or depend on middlemen who charge money for free services.

## 2. Users
| Segment | Traits | Needs |
|---|---|---|
| Rural / low-income adults | Low-end Android, patchy data, Hindi/regional, low literacy | Voice or very simple text, local language |
| Farmers | PM-Kisan, crop insurance, subsidies | State-specific schemes, deadlines |
| Students / parents | Scholarships, fee waivers | Eligibility by caste, income, course |
| Women / seniors / disabled | Pensions, widow/old-age, disability benefits | Simple eligibility, nearby office |
| Helpers (CSC operators, NGO workers) | Serve many people | Fast lookup, checklist per scheme |

## 3. Top questions to support (seed list, collect real ones next)
1. "Mere liye kaun si yojana hai?" (discovery by profile)
2. "Kya main ... ke liye eligible hoon?"
3. "Kaun se documents chahiye?"
4. "Apply kaise karun / kahan karun?"
5. "Last date kya hai?"
6. "Status kaise check karun?"
7. "Paisa nahi aaya / reject ho gaya, ab kya karun?"
8. "Ye fake to nahi? Kisi ko paise to nahi dene?"

## 4. Pain points
- Info scattered across central, state and district sites; often English-only.
- Eligibility rules differ by state, income, category, age.
- Document confusion (Aadhaar, income/caste certificate, bank linking, DBT).
- Middlemen and fake websites charging fees.
- Rejections with unclear reasons.

## 5. Data sources (verify; prefer official)
- myScheme (myscheme.gov.in): central + state scheme database.
- india.gov.in, state government portals.
- Ministry sites per scheme (e.g. PM-Kisan, Ayushman Bharat PM-JAY, NSP scholarships).
- Helplines: 1800-xxx numbers per scheme (verify each).
Process: build a structured `schemes` table by hand/curation first; do not
scrape and trust blindly. Every record stores source URL and last-verified date.

## 6. Scheme record schema (knowledge base)
- id, name (en/hi), level (central/state), state, category (farmer, health,
  education, pension, housing, women, disability, employment)
- benefit (text), eligibility rules (structured: age_min/max, income_max,
  gender, caste_category, occupation, land, disability, residence)
- documents[], how_to_apply[], official_url, helpline, deadline
- source_url, last_verified_at

## 7. Conversation design
1. Language choice (Hindi / English first).
2. Short profile questions, one at a time: state, age, gender, occupation,
   annual family income, category, disability, student?
3. Rule-based matching on the structured eligibility (NOT LLM guessing).
4. Show matched schemes with: benefit, why eligible, documents, how to apply,
   official link.
5. Follow-ups: documents list, application steps, status, rejection help.
6. Fallback: "Mujhe pakka nahi pata" + nearest CSC / helpline; never invent.

Principle: matching = deterministic rules; LLM only for language
understanding and friendly explanation, grounded in the knowledge base.

## 8. Risks and rules
- Wrong eligibility advice causes real harm: always show "final decision rests
  with the department", plus the official link.
- Never ask for Aadhaar number, OTP, bank details or passwords.
- Warn users: government schemes never need an agent fee; beware fake sites.
- Keep data fresh (schemes change); show last-verified date.
- Privacy: store minimal profile data, no PII by default, consent if saved.

## 9. Existing solutions and gaps
- myScheme portal: good data, weak conversational / vernacular / voice UX.
- Various WhatsApp/State bots: often one scheme or one state.
Gap: one multilingual conversational guide with document checklists, rejection
help and scam warnings.

## 10. Success metrics
- Correct-match accuracy against a hand-checked test set (target > 95%).
- Task completion: user gets scheme + documents + apply link.
- Time to answer; % conversations needing human fallback.
- User feedback (helpful / not helpful) per answer.

## 11. MVP scope (build order)
1. Curate 20-30 high-impact schemes (central + 2 states) into Supabase.
2. Eligibility engine (pure function + unit tests).
3. Chat UI in React (Hindi/English toggle), profile Q&A flow.
4. Scheme detail card: documents, steps, links, last-verified date.
5. Feedback + "report wrong info" button.
6. Later: voice input, more states/languages, WhatsApp, LLM explanations.

## 12. Open questions for the owner
- Target state(s) first?
- Who verifies scheme data regularly?
- Free public tool, or for CSC operators / NGOs?
