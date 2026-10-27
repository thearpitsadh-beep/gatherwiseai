# GatherWise AI

GatherWise AI is a warm, local-first planning workspace for weddings, birthdays, anniversaries and community celebrations. It brings the event brief, budget, timeline, vendors and guests into one calm dashboard.

## Included

- Event creation with validation-friendly required fields
- Wedding demo for a 150-person, INR 5,00,000 celebration
- Dashboard countdown, budget overview, guest responses and next action
- Editable preparation timeline with synchronized progress
- Budget allocations and expense entry with INR formatting
- Guest list with RSVP controls and deletion
- Vendor tracker and vendor-question checklist
- JSON export
- Local fallback planning template with transparent demo-mode labeling
- Responsive, reduced-motion-aware visual system

## Run locally

```bash
pnpm install
pnpm dev
```

Then open `http://localhost:3000`.

## Checks

- `pnpm build` — production build

## Data and privacy

MVP data is stored in versioned browser local storage (`gatherwise.events.v1`). It is device/browser-specific and is not a cloud backup or multi-user database. No guest contact details are sent anywhere by this version. A future live planner route should keep `GEMINI_API_KEY` server-side, minimize payloads, validate structured output, and disclose external AI processing before sending event details.

## Deployment

Import the repository into Vercel or use the v0 Publish flow. No environment variables are required for the local fallback experience. Add `GEMINI_API_KEY` and optionally `GEMINI_MODEL` only when a server-side Gemini route is implemented.

## Known limitations

Vendor add/edit, print view, CSV export, cloud sync, and live Gemini generation are intentionally left as the next production increment rather than represented as fake functionality. The current demo prioritizes a complete local-first core journey and clearly labels template output.
