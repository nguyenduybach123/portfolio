# Portfolio Website

A modern, responsive portfolio website built with Next.js 16, TailwindCSS, and shadcn/ui.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS v4
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Package Manager:** pnpm

## 📁 Project Structure

```
my-portfolio/
├── app/                      # Next.js App Router
│   ├── globals.css          # Global styles & CSS variables
│   ├── layout.tsx           # Root layout with Header/Footer
│   └── page.tsx             # Homepage with all sections
├── components/
│   ├── layout/              # Layout components
│   │   ├── header.tsx       # Navigation header
│   │   └── footer.tsx       # Footer with social links
│   ├── sections/            # Page sections
│   │   ├── hero-section.tsx
│   │   ├── about-section.tsx
│   │   ├── projects-section.tsx
│   │   ├── skills-section.tsx
│   │   └── contact-section.tsx
│   └── ui/                  # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       └── badge.tsx
├── data/
│   └── portfolio-data.ts    # Centralized portfolio data
├── lib/
│   └── utils.ts             # Utility functions (cn helper)
├── types/
│   └── index.ts             # TypeScript type definitions
├── public/                  # Static assets
├── components.json          # shadcn/ui configuration
└── tailwind.config.ts       # Tailwind configuration
```

## 🎨 Sections

1. **Hero Section** - Eye-catching introduction with CTA buttons
2. **About Section** - Personal information and value propositions
3. **Projects Section** - Featured projects with technology tags
4. **Skills Section** - Categorized technical skills
5. **Contact Section** - Contact form and social links

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd my-portfolio
```

2. Install dependencies
```bash
pnpm install
```

3. Run the development server
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Customization

### Update Personal Information

Edit [`data/portfolio-data.ts`](data/portfolio-data.ts) to customize:
- Personal details
- Projects
- Skills
- Social links

### Modify Sections

Each section is a separate component in [`components/sections/`](components/sections/). Edit them individually to change content or layout.

### Add More UI Components

To add more shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

For example:
```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

### Styling

- Global styles: [`app/globals.css`](app/globals.css)
- Color scheme: TailwindCSS variables in `globals.css`
- Component styles: Inline with TailwindCSS classes

## 🎨 Color Customization

The color scheme uses CSS variables defined in `globals.css`. Customize the colors in the `:root` and `.dark` selectors to match your brand.

## 📦 Build for Production

```bash
pnpm build
pnpm start
```

## 🚀 Deployment

This project is ready to deploy on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- Any platform supporting Next.js

### Deploy to Vercel

```bash
pnpm vercel
```

or connect your GitHub repository to Vercel for automatic deployments.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/my-portfolio](https://github.com/yourusername/my-portfolio)
