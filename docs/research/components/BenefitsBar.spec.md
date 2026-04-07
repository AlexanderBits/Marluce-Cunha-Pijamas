# Benefits Bar Specification: Jalecos Conforto

## Overview
- **Target file:** `src/components/BenefitsBar.tsx`
- **Interaction model:** Static multi-column on desktop, horizontal scroll on mobile.

## Components Structure

### Layout
- **Desktop:** Flex row, 4 items equally spaced.
- **Mobile:** Horizontal scroll container with items side-by-side.
- **Background:** `#ffffff` (White) or Very light grey `#f5f5f5`.

### Items (Icon + Text)
- **Container:** Flex row items.
- **Icon:** Pink/Red color `#c62828`. Size ~32px.
- **Title:** Uppercase, Bold (weight 700), Color Navy `#1a237e`. Size 14px.
- **Subtitle:** Regular (weight 400), Color Grey `#666666`. Size 12px.

## Content (Verbatim)

1. **FRETE FIXO e GRÁTIS**
   - Subtitle: Confira condições
2. **COMPRA SEGURA**
   - Subtitle: ambiente protegido
3. **TROCA FÁCIL**
   - Subtitle: 7 dias para trocar
4. **CASHBACK***
   - Subtitle: 10% OFF para sua Próxima Compra

## Assets
- Use Lucide icons: `Truck`, `ShieldCheck`, `Box`, `Ticket`.
- Color: `#c62828`.
