# Header Specification: Jalecos Conforto

## Overview
- **Target file:** `src/components/Header.tsx`
- **Screenshot:** `docs/design-references/jalecosconforto/desktop_full.png`
- **Interaction model:** Sticky on desktop, click-driven mobile menu.

## Components Structure

### 1. Top Bar (Desktop Only)
- **Background:** `#1a237e` (oklch(0.27 0.12 264))
- **Height:** 32px
- **Content:**
  - Left: "Olá, seja bem-vindo(a)!"
  - Right: Phone, "Rastrear minha compra", Social Icons (FB, IG, Pin, TikTok).
- **Text:** White, 12px.

### 2. Main Header
- **Background:** `#ffffff`
- **Sticky:** On scroll (Desktop only), adds shadow `0 2px 4px rgba(0,0,0,0.05)`.
- **Layout:** Flex row (Logo | Search | Actions).
- **Search Bar:**
  - **Shape:** Pill (borderRadius: 50px).
  - **Background:** `#f5f5f5` (Default), `#ffffff` (Focus).
  - **Border:** 1px solid `#e0e0e0`.
  - **Icon:** magnifying glass on the right.
- **Actions:**
  - "Precisa de ajuda?" (HelpIcon)
  - "Minha conta" (UserIcon)
  - "Meu carrinho" (CartIcon with red badge)

### 3. Navigation Bar (Desktop)
- **Background:** `#1a237e`
- **Links:** Uppercase, Bold, White text.
- **Items:** MAIS VENDIDOS, JALECO, SCRUB FEMININO, SCRUB MASCULINO, SCRUB PLUS SIZE, CATEGORIAS.

### 4. Mobile Header
- **Layout:** Row 1 (Hamburger | Logo | Cart) | Row 2 (Search Bar).
- **Search Bar:** 100% width below logo.

## Assets
- **Logo:** `public/images/logo.png`
- **Icons:** LogoIcon, SearchIcon, UserIcon, CartIcon, HelpIcon from `icons.tsx`.

## Computed Styles
- **Primary Navy:** `oklch(0.27 0.12 264)`
- **Header Height:** ~120px total (Top Bar + Main + Nav).
