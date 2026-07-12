---
name: Organic Tech
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#424845'
  inverse-surface: '#303030'
  inverse-on-surface: '#f2f0f0'
  outline: '#727975'
  outline-variant: '#c1c8c4'
  surface-tint: '#49645a'
  primary: '#173128'
  on-primary: '#ffffff'
  primary-container: '#2d473e'
  on-primary-container: '#98b5a9'
  inverse-primary: '#b0cdc1'
  secondary: '#895100'
  on-secondary: '#ffffff'
  secondary-container: '#fdad51'
  on-secondary-container: '#714200'
  tertiary: '#2e2c24'
  on-tertiary: '#ffffff'
  tertiary-container: '#44423a'
  on-tertiary-container: '#b2aea3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cbe9dc'
  primary-fixed-dim: '#b0cdc1'
  on-primary-fixed: '#052018'
  on-primary-fixed-variant: '#324c43'
  secondary-fixed: '#ffdcbc'
  secondary-fixed-dim: '#ffb86b'
  on-secondary-fixed: '#2c1700'
  on-secondary-fixed-variant: '#683d00'
  tertiary-fixed: '#e7e2d6'
  tertiary-fixed-dim: '#cac6bb'
  on-tertiary-fixed: '#1d1c15'
  on-tertiary-fixed-variant: '#49473e'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  headline-lg:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
This design system bridges the gap between precision technology and organic warmth. Inspired by a palette of forest greens, warm ambers, and soft creams, the aesthetic is "Sophisticated Naturalism." It targets users who value tactile quality and professional reliability without the sterility of traditional enterprise software.

The visual style is **Corporate / Modern** but softened by a **Tactile** influence. It utilizes high-quality typography and generous whitespace to create a calm, focused environment. The emotional response should be one of "approachable expertise"—software that feels as well-crafted as a physical object.

## Colors
The palette is rooted in the natural world to evoke stability and warmth.
- **Primary (#2D473E):** A deep forest green used for high-authority elements, primary actions, and headings. It provides the "Precision" in the system.
- **Secondary (#F5A64B):** A warm amber used for highlights, notifications, and secondary interactive states. It provides the "Pulse" and energy.
- **Surface (#F9F4E8):** A soft cream that replaces pure white to reduce eye strain and provide a premium, paper-like background.
- **Neutral:** A range of desaturated greens and warm greys used for secondary text and borders to maintain harmony with the primary palette.

Contrast is strictly managed: primary green and secondary amber must maintain a 4.5:1 ratio against the cream background for all essential information.

## Typography
The system exclusively uses **Geist** to maintain a clean, technical, and developer-friendly edge. The mono-linear construction of Geist balances the organic color palette, ensuring the interface remains grounded in its technological purpose.

Headlines use tighter tracking and heavier weights to establish a clear hierarchy. Body text is optimized for readability with a generous 1.6 line-height. Labels are used for metadata and small UI elements, often employing a slightly heavier weight to maintain legibility against the cream background.

## Layout & Spacing
The design system utilizes a **Fluid Grid** model based on an 8px square rhythm. This ensures consistent alignment across all components and screen sizes.

- **Desktop:** 12-column grid with a max-width of 1440px. 24px gutters provide ample breathing room between content blocks.
- **Tablet:** 8-column grid with 20px gutters.
- **Mobile:** 4-column grid with 16px gutters and 16px side margins.

Horizontal spacing (margins and padding) should always be a multiple of the `base` unit. Larger vertical gaps (`xl`) are encouraged between distinct sections to reinforce the minimal, uncluttered aesthetic.

## Elevation & Depth
Depth is conveyed through **Tonal Layers** and **Ambient Shadows**. Instead of high-contrast black shadows, this system uses "Tinted Ambient Shadows"—soft, diffused shadows that incorporate a hint of the primary green (#2D473E) to feel more integrated with the surface.

- **Level 0 (Base):** The Cream surface (#F9F4E8).
- **Level 1 (Raised):** Used for cards and secondary buttons. Uses a very subtle 2px border (10% opacity Primary Green) or a soft 4px blur shadow.
- **Level 2 (Overlay):** Used for dropdowns and modals. Features a deeper, 12px blur shadow with 8% opacity of the Primary Green.

Interactive elements use a "press" metaphor: on hover, elevation increases slightly; on click, it flattens to Level 1.

## Shapes
The shape language is defined by a **Rounded** (0.5rem / 8px) corner radius. This "Round Eight" approach softens the technical nature of the Geist typeface and aligns with the organic themes of the brand.

- **Standard Elements:** 8px radius (Buttons, Input fields, Chips).
- **Large Containers:** 16px radius (Cards, Modals).
- **Full Round:** Used specifically for tags and pill-style indicators to differentiate them from actionable buttons.

## Components
- **Buttons:** Primary buttons are solid Forest Green (#2D473E) with Cream text. Secondary buttons use a Forest Green outline. Ghost buttons use Forest Green text with no background.
- **Input Fields:** Use a 1px border of 20% Forest Green on the Cream background. Focus states transition the border to solid Amber (#F5A64B) with a soft amber outer glow.
- **Chips:** Small, pill-shaped indicators. Use a light tint of the Primary Green (5-10% opacity) for a subtle "pressed-in" look.
- **Cards:** Use a 16px corner radius. Backgrounds can be white or a 2% darker shade of the base Cream to create subtle definition without heavy borders.
- **Lists:** Separated by thin, low-opacity (5%) horizontal lines. High-contrast Primary Green text for headers, Neutral grey for supporting text.
- **Checkboxes/Radios:** When active, these are filled with the Secondary Amber to provide a warm, distinct signal of selection.