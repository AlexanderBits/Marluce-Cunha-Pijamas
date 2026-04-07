# Behaviors: Jalecos Conforto

## Interaction Model
Mostly **Static** with **Click-driven** navigation and **Scroll-driven** header effects. No complex scroll-reveal animations detected.

## Detailed Behaviors

### 1. Header (Navigation)
- **Desktop (Sticky):** 
  - The main header section (Logo, Search, Icons) is sticky.
  - **Trigger:** Immediate on scroll.
  - **Styles:** Gains a solid white background and a subtle shadow (`0 2px 5px rgba(0,0,0,0.1)`).
- **Mobile (Non-sticky):** 
  - Follows standard document flow.
- **Mobile Menu:** 
  - Side drawer opens from the left.
  - **Color:** Navy blue background.
  - **Interactions:** Categories have expand/collapse chevrons.

### 2. Product Cards
- **Hover (Desktop):** 
  - **Image Swap:** Replaces the primary image with a secondary image (`src` switch).
  - **Transition:** Quick fade/opacity transition.
- **Badges:** Standard labels like "DESTAQUE" or "LANÇAMENTO" pinned to corners.

### 3. Carousels (Swiper.js)
- **Hero Banners:** Auto-playing, draggable, with pagination dots.
- **Product Carousels:** Draggable on mobile, arrows on desktop.

### 4. Interactive Elements
- **Category Circles:** Hover effect on labels/images.
- **WhatsApp Button:** Floating action button (FAB) fixed at bottom-right.
- **Gender Filters (Category Pages):** Toggle state between "Masculino" and "Feminino".

## Key Breakpoints
- **Desktop:** > 1024px (Horizontal menu, sticky header, multi-column grid).
- **Tablet:** 768px - 1024px (Layout shifts, some columns stack).
- **Mobile:** < 768px (Hamburger menu, 2-column product grid).
