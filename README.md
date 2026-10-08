# Clinica Cure Web Application

The frontend and digital portal for **Clinica Cure Hospital** (Bariatu, Ranchi). Built with Next.js 15, TypeScript, and Tailwind CSS.

---

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Check TypeScript types
npx tsc --noEmit

# Production build
npm run build
```

---

## Key Modules

- **Blood Bank & Donor Hub** (`/blood-bank`, `/blood-donation`): Real-time inventory table, voluntary registration flow, eligibility guides, myths vs. facts, and requisition modal.
- **Doctor Directory** (`/doctors`): Specialist listings, OPD schedules, OPD fees, and doctor bio cards.
- **Online Booking** (`/book-appointment`): Multi-step consultation booking flow.
- **Medical Blog** (`/blog`): Health articles, category filtering, search, and reading view.
- **Departments** (`/departments`): Clinical specialties overview.

---

## Configuration & Assets

- `config/site.ts`: Site-wide metadata, hospital phone numbers, addresses, OPD hours.
- `config/navigation.ts`: Header and footer menu links.
- `config/blood-bank.ts`: Default stock data, criteria, donation journey steps, and FAQs.
- `public/images/`: Optimized image assets for doctors, blood bank, and departments.
