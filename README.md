# B1 Properties - Luxury Real Estate Platform

A high-performance, secure, and visually stunning real estate platform built for modern property browsing and booking.

## 🚀 Technologies Used

### Frontend Core
- **Framework:** [Next.js 16.1.6](https://nextjs.org/) (App Router & Turbopack)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & [tw-animate-css](https://github.com/mardan-shah/tw-animate-css)

### UI Components & Libraries
- **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Carousels:** [Embla Carousel](https://www.embla-carousel.com/) & [React Multi Carousel](https://github.com/joshuacc/react-multi-carousel)
- **State/Data:** [Radix UI](https://www.radix-ui.com/) primitives (Dialog, Popover, Select, Checkbox, etc.)
- **Date Handling:** [date-fns](https://date-fns.org/)
- **Parallax:** [react-parallax](https://github.com/RRCode/react-parallax)

## ✨ Key Features

- **Dynamic Property Listings:** Specialized sections for Private Listings, Sold Properties, and New Opportunities.
- **Advanced Image Viewer:** A custom-built `ImageWrapper` with support for:
  - Zoom-in/out functionality.
  - Full-screen lightbox gallery.
  - Optimized lazy loading with AVIF/WebP support.
  - Blur-up placeholders for better perceived performance.
- **Appointment Booking:** Integrated scheduling system with custom date and time selectors.
- **Agent Profiles:** Dedicated pages for real estate experts.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing.

## 🛡️ Security & Performance Optimizations

### Security
- **Next.js Security Headers:** Configured with strict headers including:
  - `Strict-Transport-Security` (HSTS)
  - `X-Frame-Options: DENY` (Anti-Clickjacking)
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
- **Vulnerability Management:** Regularly audited and patched against known CVEs (zero vulnerabilities in current build).

### Performance
- **Image Optimization:** 
  - Priority support for AVIF and WebP formats.
  - Intelligent LCP (Largest Contentful Paint) optimization for Hero sections.
  - `placeholder="blur"` implemented across major components.
- **Build System:** Optimized for Nixpacks/Docker deployments with Node 22+ support.
- **Turbopack:** Faster development cycles and optimized production builds.

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js:** v22 or higher
- **npm:** v10 or higher

### Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mardan-shah/b1properties.git
   cd b1properties
   ```

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```
   *Note: `--legacy-peer-deps` is required for certain React 19 compatibility layers.*

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📂 Directory Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components and section blocks.
- `components/ui/`: Core primitive components (Radix-based).
- `lib/`: Utility functions and shared data logic.
- `public/`: Static assets, fonts, and local images.
- `types/`: TypeScript interface and type definitions.

---

Built with ❤️ for B1 Properties.
