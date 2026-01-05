## Graphic Designer Portfolio (Abenime)

Modern single-page-style portfolio for Abenezer Tilahun (Abenime) featuring animated hero, floating navigation, filterable work gallery, courses/resources, blog, testimonials, and a contact form with toast feedback. Built with Vite, React, TypeScript, Tailwind, shadcn-ui, React Query, and Framer Motion.

### Highlights

- Floating sidebar/nav with tooltips, mobile slide-out menu, and page transition animations.
- Particle hero and glow/gradient accents, glassmorphism cards, animated stats, and scroll indicators.
- Works gallery with category filters plus detailed case-study pages (challenge, solution, services, gallery).
- Courses/resources with type filter (video vs resource), pricing, and learnings/inclusions detail pages.
- Blog with featured article layout and content pages; testimonials grid with ratings and avatars.
- Contact page with validated form, toast success message, and social/availability blocks.

### Tech Stack

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn-ui + Radix primitives
- Framer Motion animations; tsParticles background
- React Router v6; React Query for data fetching/state
- Lucide icons, Sonner + shadcn toasts

### Getting Started

1. Prereqs: Node 18+ and npm.
2. Install: `npm install`
3. Develop: `npm run dev` (opens Vite dev server with HMR)
4. Lint: `npm run lint`
5. Build: `npm run build`
6. Preview production build: `npm run preview`

### Project Structure

- `src/pages` – Routed views: Index, About, Works, WorkDetail, Courses, CourseDetail, Blog, BlogDetail, Testimonials, Contact, NotFound.
- `src/components` – Layout shell, floating nav, animated elements, page transitions, particle background, shadcn UI pieces.
- `src/data` – JSON data sources for profile, works, courses, blog posts, testimonials.
- `src/lib/api.ts` – Mock API over local JSON with simulated latency for React Query.
- `src/types` – Shared TypeScript types for data objects.

### Content & Customization

- Update portfolio copy and stats in `src/data/profile.json` (name, tagline, bio, skills, tools, timeline, social links, availability, stats).
- Manage works in `src/data/works.json` (featured flag drives homepage selection; includes services, challenge/solution, gallery images).
- Manage courses/resources in `src/data/courses.json` (type `video` or `resource` controls badges/CTA; includes pricing and learning outcomes or inclusions).
- Manage blog posts in `src/data/blog.json` (slug, excerpt, markdown-like paragraph blocks split by blank lines).
- Manage testimonials in `src/data/testimonials.json` (name, role/company, rating, project tag, avatar).
- Animations, transitions, and particle settings live in `src/components` (e.g., `AnimatedElements.tsx`, `PageTransition.tsx`, `ParticleBackground.tsx`).

### Routing Overview

- `/` landing with hero, stats, featured works, CTA.
- `/about` profile, philosophy, skills, tools, timeline.
- `/works` grid with category filters; `/works/:slug` detail.
- `/courses` list with type filters; `/courses/:slug` detail.
- `/blog` list with featured card; `/blog/:slug` article page.
- `/testimonials` client feedback grid.
- `/contact` contact info, socials, availability, and form with toast confirmation.

### Deployment Notes

- Static-ready build via `npm run build`; output lives in `dist/` for static hosting or any SPA-friendly host.
- No external APIs required—data is local JSON; ensure correct base path if hosting under a subpath (configure `vite.config.ts` `base` if needed).

### Contributing

1. Create a feature branch.
2. Keep TypeScript strictness and linting happy (`npm run lint`).
3. Open a PR describing UI/UX changes, data updates, and testing steps.
