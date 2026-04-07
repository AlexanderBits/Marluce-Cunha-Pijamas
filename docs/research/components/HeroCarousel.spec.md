# Hero Banner Carousel Specification

## Overview
- **Target file:** `src/components/HeroCarousel.tsx`
- **Interaction model:** Carousel (Swiper style) with autoplay and manual controls.
- **Aspect Ratio:** ~21:9 (Desktop), ~16:9 (Mobile).

## DOM Structure
- **Container:** Full-width wrapper with overflow-hidden.
- **Slide Track:** Flex container containing 6 slide frames.
- **Navigation:**
    - Absolute-positioned Chevron arrows (Left/Right).
    - Absolute-positioned Pagination Dots (Bottom Center).

## Computed Styles (Desktop 1440px)

### Container
- width: 100%
- height: auto (approx 500px)
- background: #f4f4f4 (placeholder before load)

### Slides
- width: 100%
- transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)
- objectFit: cover

### Navigation Dots
- size: 8px circles
- gap: 12px
- color-active: #152E66
- color-inactive: #cccccc
- bottom: 20px

## States & Behaviors

### Autoplay
- **Delay:** 5000ms
- **Action:** Transition right to the next slide. Loop to slide 1 after slide 6.

### Side Arrows (Hover Desktop)
- **Visibility:** Initially 0 opacity, fades in on container hover.
- **Manual Click:** Immediate transition to prev/next slide.

## Assets
1.  **Novidades:** `https://images.tcdn.com.br/img/img_prod/962160/687ac22d5c4a1_01.jpg`
2.  **Coleção Pétala:** `https://images.tcdn.com.br/img/img_prod/962160/698a6fd9d1c24_0215.png`
3.  **Frete Grátis/Fixo:** `https://images.tcdn.com.br/img/img_prod/962160/687102db42a8c_03.jpg`
4.  **Tecido Two Way:** `https://images.tcdn.com.br/img/img_prod/962160/698a6e40af766_0115.png`
5.  **Jalecos Points:** `https://bq-public-images.s3.amazonaws.com/images/ebc031b7-f1f9-48b0-b84c-c3c7da3bde4c/53df1915-919a-45bb-859f-c74dbc50069c.png`
6.  **Bordô com Viés:** `https://images.tcdn.com.br/img/img_prod/962160/687553c7ea5aa_06.jpg`

## Responsive Behavior
- **Mobile (390px):** The same images are used but scaled/cropped. Arrows are hidden to prevent accidental clicks during swiping. Pagination dots remain.
- **Mobile Interaction:** Swipe gestures enabled.
