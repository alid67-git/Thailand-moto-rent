# Thailand Moto Rent

Multi-partner motorcycle rental marketplace for Thailand.  
Uber-style platform where independent rental companies list bikes under shared platform rules.

**This project is completely separate from Cudy / Cudy Orders.**

## MVP scope (phase 1)

- Web-first, mobile-responsive UI
- Partner onboarding (manual approval first)
- Bike listings with transparent pricing
- Booking flow (search → select → reserve)
- Platform rules enforced for all partners
- Payments & live tracking → later phases

## Tech stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**

## Project structure

```
src/
  app/           # Pages & layout
  components/    # UI components
  lib/           # Rules, sample data, helpers
  types/         # Domain models (Partner, Bike, Booking)
docs/
  PLATFORM_RULES.md   # Business rules reference
  ROADMAP.md          # Development phases
```

## Getting started

```bash
cd "C:\Users\Ali\Documents\ThailandMotoRent"
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001)

## Open in Cursor

**File → Open Folder** → `C:\Users\Ali\Documents\ThailandMotoRent`

Do not use the `cudy Cursor` folder for this project.

## Next steps

1. Define partner contract & commission model
2. Add database (PostgreSQL + Prisma)
3. Authentication (customer + partner roles)
4. Booking API & payment integration (Stripe / local TH)
5. Admin panel for rule enforcement
