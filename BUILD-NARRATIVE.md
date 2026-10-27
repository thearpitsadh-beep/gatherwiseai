# Build narrative

GatherWise AI is designed around a simple product promise: reduce the mental load of hosting a meaningful celebration. The interface uses a forest-and-ivory palette with coral moments for action, serif display type for warmth, and compact information cards for planning density.

The MVP is a Next.js App Router client experience with a typed domain model in `lib/gatherwise.ts`, pure budget/date helpers, and a focused presentation layer in `components/gatherwise-app.tsx`. Events are normalized around stable IDs and serialized to local storage so a first-time user can create, edit, revisit and refresh without an account.

The planning flow intentionally distinguishes template output from live AI output. The current environment has no configured Gemini route, so the demo action creates a local, deterministic planning template and states that limitation in the UI. The intended next step is a server-only structured Gemini route using the variables in `.env.example`, schema validation, bounded retries, request limits and clear external-processing disclosure.

The main trade-off is breadth: the core event lifecycle is usable and visually coherent, while cloud persistence, live model calls, and additional exports are explicitly documented rather than simulated. This avoids inventing vendor availability, contacts, bookings or AI claims.

## Build-in-public draft

I built GatherWise AI, a thoughtful planning workspace for celebrations. The goal was not another checklist app, but a calmer way to bring a date, guest list, budget and the small human details of an event into one place. I focused on a complete local-first journey, transparent fallback behavior when AI is not configured, and an interface that feels welcoming enough to use for something important. The biggest lesson: a trustworthy product is often defined as much by what it refuses to pretend as by what it can generate.
