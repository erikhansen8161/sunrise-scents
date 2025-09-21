n# Sunrise Scents - Luxury Perfume Website

A modern, elegant TypeScript React website for Sunrise Scents luxury perfume business.

## Features

- **Modern Design**: Clean, luxury-focused design with beautiful gradients and animations
- **Responsive**: Fully responsive design that works on all devices
- **TypeScript**: Full TypeScript support for better development experience
- **Component-Based**: Modular React components for easy maintenance and expansion

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── HeroSection.tsx # Landing page hero
│   ├── FeaturedCollections.tsx
│   ├── AboutSection.tsx
│   └── TestimonialsSection.tsx
├── pages/              # Page components
│   └── LandingPage.tsx # Main landing page
├── App.tsx             # Main app component
├── index.tsx           # App entry point
└── index.css           # Global styles
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Design System

### Colors
- **Primary Gold**: #D4AF37 - Main brand color
- **Accent Rose**: #E8B4CB - Secondary accent
- **Accent Lavender**: #C8A8D8 - Tertiary accent
- **Primary Dark**: #1a1a1a - Dark backgrounds
- **Text Colors**: Various shades for hierarchy

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Components
- Responsive navigation with mobile menu
- Animated hero section with floating elements
- Featured collections grid
- About section with statistics
- Testimonials carousel
- Comprehensive footer with newsletter signup

## Next Steps

This is a base landing page ready for expansion. You can add:
- Individual collection pages
- Product detail pages
- Shopping cart functionality
- User authentication
- Blog/content pages
- Contact forms

## Customization

The design uses CSS custom properties (variables) for easy theming. Modify the `:root` variables in `index.css` to change the color scheme and styling.
