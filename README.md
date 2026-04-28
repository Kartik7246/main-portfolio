# kartik — Portfolio (Next.js)

A full-stack & mobile engineer portfolio built with Next.js 14, TypeScript, and Tailwind CSS.

## Design

- **Color palette**: Deep black (`#0a0a0a`) background, warm cream text (`#e8e0d5`), gold accent (`#c9a96e`)
- **Typography**: Playfair Display (serif, display) + DM Sans (body) + DM Mono (labels/code)
- **Style**: Editorial dark luxury — refined minimalist with italic serif accents

## Project Structure

```
portfolio/
├── app/
│   ├── globals.css          # CSS variables, typography, animations
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Home page — composes all widgets
│
├── components/
│   └── home_widgets/        # Each section is its own widget component
│       ├── index.ts         # Barrel export
│       ├── Navbar.tsx       # Fixed top nav with scroll behavior
│       ├── HeroSection.tsx  # Landing hero with headline + CTA
│       ├── StackSection.tsx # Tech stack 2×2 grid cards
│       ├── WorkSection.tsx  # Filterable project portfolio grid
│       ├── ExperienceSection.tsx  # Timeline with sticky header
│       ├── TeamSection.tsx  # Studio team member cards
│       ├── ContactSection.tsx     # Contact form with project type selector
│       └── Footer.tsx       # Footer with social links
│
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Sections

| # | Section | Widget File |
|---|---------|------------|
| 01 | About / Hero | `HeroSection.tsx` |
| 02 | Tech Stack | `StackSection.tsx` |
| 03 | Navigation | `Navbar.tsx` |
| 04 | Selected Work | `WorkSection.tsx` |
| 05 | Experience | `ExperienceSection.tsx` |
| 06 | The Studio (Team) | `TeamSection.tsx` |
| 07 | Contact | `ContactSection.tsx` |

## Customization

### Personal info
Edit content directly in each widget file. All data is defined as typed arrays at the top of each component.

### Colors
All colors use CSS custom properties defined in `globals.css`. Change `--accent` to update the gold tone.

### Fonts
Google Fonts are imported in `globals.css`. Replace the import URL to swap fonts.
# main-portfolio
