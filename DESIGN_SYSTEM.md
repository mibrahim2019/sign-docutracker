# Docutracker Design System

A complete, portable reference for replicating the Docutracker UI in any project. Every token, component class string, layout pattern, and interaction convention is documented here with exact values.

---

## Table of Contents

1. [Foundation / Tech Stack](#1-foundation--tech-stack)
2. [Design Tokens](#2-design-tokens)
3. [Dark Mode](#3-dark-mode)
4. [Global Base Styles](#4-global-base-styles)
5. [Component Catalog](#5-component-catalog)
6. [Higher-Level Components](#6-higher-level-components)
7. [Custom Icons](#7-custom-icons)
8. [Custom Hooks](#8-custom-hooks)
9. [Layout Patterns](#9-layout-patterns)
10. [Navigation Patterns](#10-navigation-patterns)
11. [Form Patterns](#11-form-patterns)
12. [Feedback and State Patterns](#12-feedback-and-state-patterns)
13. [Animation Conventions](#13-animation-conventions)
14. [Interaction States and Accessibility](#14-interaction-states-and-accessibility)
15. [Responsive Design Conventions](#15-responsive-design-conventions)

---

## 1. Foundation / Tech Stack

### Core Libraries

| Library | Purpose |
|---|---|
| **Tailwind CSS v3** | Utility-first styling |
| **Shadcn UI** | Component primitives built on Radix UI |
| **Radix UI** | Headless, accessible component primitives |
| **class-variance-authority (cva)** | Typed component variant definitions |
| **clsx + tailwind-merge** | Conditional class merging with conflict resolution |
| **framer-motion** | Declarative animations and transitions |
| **react-hook-form** | Form state management |
| **zod** | Schema validation (forms and API) |
| **@hookform/resolvers** | Bridges zod schemas to react-hook-form |
| **lucide-react** | Icon library (longhand naming: `HomeIcon` not `Home`) |
| **remix-themes** | Dark mode theme provider |
| **@tanstack/react-table** | Headless data table |
| **cmdk** | Command palette component |
| **react-day-picker** | Calendar/date picker |

### Tailwind Plugins

```js
plugins: [
  require('tailwindcss-animate'),        // data-state animations
  require('@tailwindcss/typography'),     // prose styling
  require('@tailwindcss/container-queries'), // @container queries
  addVariablesForColors,                  // custom: flattens all colors to CSS vars on :root
]
```

The `addVariablesForColors` plugin flattens every Tailwind color into a CSS variable on `:root`. For example, `colors.primary.DEFAULT` becomes `--primary`.

### The `cn()` Utility

All components use `cn()` for class merging. It combines `clsx` (conditional classes) with `tailwind-merge` (resolves Tailwind conflicts):

```ts
import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Usage:

```tsx
<div className={cn('base-classes', { 'active-class': isActive }, className)} />
```

---

## 2. Design Tokens

### 2.1 Semantic Color Palette -- Light Mode

All values are HSL components (hue saturation% lightness%) consumed via `hsl(var(--token))`.

```css
:root, .dark-mode-disabled {
  --background: 0 0% 100%;
  --foreground: 222.2 47.4% 11.2%;

  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;

  --popover: 0 0% 100%;
  --popover-foreground: 222.2 47.4% 11.2%;

  --card: 0 0% 100%;
  --card-border: 214.3 31.8% 91.4%;
  --card-border-tint: 112 205 159;
  --card-foreground: 222.2 47.4% 11.2%;

  --field-card: 95 74% 90%;
  --field-card-border: 95.08 71.08% 67.45%;
  --field-card-foreground: 222.2 47.4% 11.2%;

  --widget: 0 0% 97%;
  --widget-foreground: 0 0% 95%;

  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;

  --primary: 95.08 71.08% 67.45%;
  --primary-foreground: 95.08 71.08% 10%;

  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;

  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;

  --destructive: 0 100% 50%;
  --destructive-foreground: 210 40% 98%;

  --ring: 95.08 71.08% 67.45%;
  --radius: 0.5rem;
  --warning: 54 96% 45%;
  --gold: 47.9 95.8% 53.1%;
}
```

### 2.2 Semantic Color Palette -- Dark Mode

```css
.dark:not(.dark-mode-disabled) {
  --background: 0 0% 14.9%;
  --foreground: 0 0% 97%;

  --muted: 0 0% 23.4%;
  --muted-foreground: 0 0% 85%;

  --popover: 0 0% 14.9%;
  --popover-foreground: 0 0% 90%;

  --card: 0 0% 14.9%;
  --card-border: 0 0% 27.9%;
  --card-border-tint: 112 205 159;
  --card-foreground: 0 0% 95%;

  --widget: 0 0% 14.9%;
  --widget-foreground: 0 0% 18%;

  --border: 0 0% 27.9%;
  --input: 0 0% 27.9%;
  --field-border: 214.3 31.8% 91.4%;

  --primary: 95.08 71.08% 67.45%;
  --primary-foreground: 95.08 71.08% 10%;

  --secondary: 0 0% 23.4%;
  --secondary-foreground: 95.08 71.08% 67.45%;

  --accent: 0 0% 27.9%;
  --accent-foreground: 95.08 71.08% 67.45%;

  --destructive: 0 87% 62%;
  --destructive-foreground: 0 87% 19%;

  --ring: 95.08 71.08% 67.45%;
  --radius: 0.5rem;
  --warning: 54 96% 45%;
  --gold: 47.9 95.8% 53.1%;
}
```

### 2.3 Recipient Colors

Six named colors for multi-signer differentiation, rotated by index:

```css
--recipient-green: 100 48% 55%;
--recipient-blue: 212 56% 50%;
--recipient-purple: 266 100% 64%;
--recipient-orange: 36 92% 54%;
--recipient-yellow: 51 100% 43%;
--recipient-pink: 313 65% 57%;
```

Tailwind mapping: `recipient-green` through `recipient-pink`, used as `hsl(var(--recipient-*))`.

Each recipient color has a full style map:

```ts
type RecipientColorStyles = {
  base: string;        // ring color + hover background
  baseRing: string;    // rgba for programmatic use
  baseRingHover: string;
  baseTextHover: string;
  fieldButton: string; // border + hover styles for field buttons
  fieldItem: string;   // field item container
  fieldItemInitials: string;
  comboxBoxTrigger: string; // combobox ring + shadow
  comboxBoxItem: string;
};
```

Rotation: `AVAILABLE_RECIPIENT_COLORS[index % 6]` (green, blue, purple, orange, yellow, pink).

### 2.4 Brand Color Palettes

Three fixed hex palettes (50-950 scales):

**documenso** (brand green):

| Step | Hex |
|---|---|
| DEFAULT | `#A2E771` |
| 50 | `#FFFFFF` |
| 100 | `#FDFFFD` |
| 200 | `#E7F9DA` |
| 300 | `#D0F3B7` |
| 400 | `#B9ED94` |
| 500 | `#A2E771` |
| 600 | `#83DF41` |
| 700 | `#66C622` |
| 800 | `#4D9619` |
| 900 | `#356611` |
| 950 | `#284E0D` |

**dawn** (warm neutral):

| Step | Hex |
|---|---|
| DEFAULT | `#aaa89f` |
| 50 | `#f8f8f8` |
| 100 | `#f1f1ef` |
| 200 | `#e6e5e2` |
| 300 | `#d4d3cd` |
| 400 | `#b9b7b0` |
| 500 | `#aaa89f` |
| 600 | `#88857a` |
| 700 | `#706e65` |
| 800 | `#5f5d55` |
| 900 | `#52514a` |
| 950 | `#2a2925` |

**water** (blue):

| Step | Hex |
|---|---|
| DEFAULT | `#d7e4f3` |
| 50 | `#f3f6fb` |
| 100 | `#e3ebf6` |
| 200 | `#d7e4f3` |
| 300 | `#abc7e5` |
| 400 | `#82abd8` |
| 500 | `#658ecc` |
| 600 | `#5175bf` |
| 700 | `#4764ae` |
| 800 | `#3e538f` |
| 900 | `#364772` |
| 950 | `#252d46` |

### 2.5 Extended Color Scales (new-* system)

Full 50-950 HSL scales. These do NOT change between light and dark mode.

**new-neutral:**

```css
--new-neutral-50: 0, 0%, 96%;    --new-neutral-100: 0, 0%, 91%;
--new-neutral-200: 0, 0%, 82%;   --new-neutral-300: 0, 0%, 69%;
--new-neutral-400: 0, 0%, 53%;   --new-neutral-500: 0, 0%, 43%;
--new-neutral-600: 0, 0%, 36%;   --new-neutral-700: 0, 0%, 31%;
--new-neutral-800: 0, 0%, 27%;   --new-neutral-900: 0, 0%, 24%;
--new-neutral-950: 0, 0%, 9%;
```

**new-white:**

```css
--new-white-50: 0, 0%, 5%;     --new-white-60: 0, 0%, 6%;
--new-white-100: 0, 0%, 10%;   --new-white-200: 0, 0%, 20%;
--new-white-300: 0, 0%, 30%;   --new-white-400: 0, 0%, 40%;
--new-white-500: 0, 0%, 50%;   --new-white-600: 0, 0%, 60%;
--new-white-700: 0, 0%, 80%;   --new-white-800: 0, 0%, 90%;
--new-white-900: 0, 0%, 100%;
```

**new-primary (green):**

```css
--new-primary-50: 98, 73%, 97%;   --new-primary-100: 95, 73%, 94%;
--new-primary-200: 94, 70%, 87%;  --new-primary-300: 95, 71%, 81%;
--new-primary-400: 95, 71%, 74%;  --new-primary-500: 95, 71%, 67%;
--new-primary-600: 95, 71%, 54%;  --new-primary-700: 95, 71%, 41%;
--new-primary-800: 95, 71%, 27%;  --new-primary-900: 95, 72%, 14%;
--new-primary-950: 95, 72%, 7%;
```

**new-info (blue):**

```css
--new-info-50: 210, 54%, 95%;   --new-info-100: 211, 57%, 90%;
--new-info-200: 212, 55%, 80%;  --new-info-300: 212, 56%, 70%;
--new-info-400: 212, 56%, 60%;  --new-info-500: 212, 56%, 50%;
--new-info-600: 212, 56%, 40%;  --new-info-700: 212, 56%, 30%;
--new-info-800: 212, 55%, 20%;  --new-info-900: 211, 57%, 10%;
--new-info-950: 214, 54%, 5%;
```

**new-error (red):**

```css
--new-error-50: 4, 80%, 96%;    --new-error-100: 3, 78%, 91%;
--new-error-200: 3, 79%, 83%;   --new-error-300: 3, 79%, 74%;
--new-error-400: 3, 79%, 66%;   --new-error-500: 4, 79%, 57%;
--new-error-600: 3, 79%, 46%;   --new-error-700: 3, 79%, 34%;
--new-error-800: 3, 79%, 23%;   --new-error-900: 3, 79%, 11%;
--new-error-950: 3, 80%, 6%;
```

**new-warning (amber):**

```css
--new-warning-50: 39, 100%, 96%;   --new-warning-100: 40, 100%, 93%;
--new-warning-200: 39, 100%, 86%;  --new-warning-300: 39, 100%, 79%;
--new-warning-400: 39, 100%, 71%;  --new-warning-500: 39, 100%, 64%;
--new-warning-600: 39, 100%, 57%;  --new-warning-700: 39, 100%, 43%;
--new-warning-800: 39, 100%, 29%;  --new-warning-900: 39, 100%, 14%;
--new-warning-950: 38, 100%, 7%;
```

**Surface:**

```css
--new-surface-black: 0, 0%, 0%;
--new-surface-white: 0, 0%, 91%;
```

### 2.6 Tailwind Color Mapping

Every semantic color maps to its CSS variable:

```js
colors: {
  border: 'hsl(var(--border))',
  'field-border': 'hsl(var(--field-border))',
  input: 'hsl(var(--input))',
  ring: 'hsl(var(--ring))',
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
  secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
  warning: { DEFAULT: 'hsl(var(--warning))' },
  destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
  muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
  accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
  popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
  card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
  'field-card': { DEFAULT: 'hsl(var(--field-card))', border: 'hsl(var(--field-card-border))', foreground: 'hsl(var(--field-card-foreground))' },
  widget: { DEFAULT: 'hsl(var(--widget))', foreground: 'hsl(var(--widget-foreground))' },
  recipient: { green: 'hsl(var(--recipient-green))', blue: 'hsl(var(--recipient-blue))', purple: 'hsl(var(--recipient-purple))', orange: 'hsl(var(--recipient-orange))', yellow: 'hsl(var(--recipient-yellow))', pink: 'hsl(var(--recipient-pink))' },
}
```

### 2.7 Typography

**Font families:**

```css
:root {
  --font-sans: 'Inter';
  --font-signature: 'Caveat';
  --font-noto: 'Noto Sans', 'Noto Sans Korean', 'Noto Sans Japanese', 'Noto Sans Chinese';
}
```

Tailwind mapping:

```js
fontFamily: {
  sans: ['var(--font-sans)', ...defaultFontFamily.sans],
  signature: ['var(--font-signature)'],
  noto: ['var(--font-noto)'],
}
```

**Font definitions:**

| Font | Weights | Style | Format |
|---|---|---|---|
| Inter | 100-900 | normal | truetype-variations |
| Inter | 100-900 | italic | truetype-variations |
| Caveat | 400-600 | normal | truetype-variations |
| Noto Sans | 100-900 | normal | truetype-variations |
| Noto Sans Korean | 100-900 | normal | truetype-variations |
| Noto Sans Japanese | 100-900 | normal | truetype-variations |
| Noto Sans Chinese | 100-900 | normal | truetype-variations |

All use `font-display: swap`.

**Font feature settings:** `'rlig' 1, 'calt' 1` (contextual alternates and required ligatures).

### 2.8 Border Radius

Base: `--radius: 0.5rem` (8px).

| Token | Value |
|---|---|
| `sm` | `calc(var(--radius) - 4px)` = 4px |
| `md` | `calc(var(--radius) - 2px)` = 6px |
| `DEFAULT` | `calc(var(--radius) - 3px)` = 5px |
| `lg` | `var(--radius)` = 8px |
| `xl` | `calc(var(--radius) + 2px)` = 10px |
| `2xl` | `calc(var(--radius) + 4px)` = 12px |

### 2.9 Shadows

```css
--shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
--shadow-xs:  0 1px 3px 0px hsl(0 0% 0% / 0.05);
--shadow-sm:  0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1);
--shadow:     0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1);
--shadow-md:  0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 2px 4px -1px hsl(0 0% 0% / 0.1);
--shadow-lg:  0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 4px 6px -1px hsl(0 0% 0% / 0.1);
--shadow-xl:  0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 8px 10px -1px hsl(0 0% 0% / 0.1);
--shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);
```

### 2.10 Z-Index Layers

| Layer | Z-Index | Usage |
|---|---|---|
| Content | default | Normal page content |
| Popover/Dropdown | `z-50` | Dropdown menus, popovers |
| Header | `z-[60]` | Sticky app header |
| Sheet | `z-[61]` | Side sheet overlays |
| Dialog | `z-[1000]` | Modal dialogs |
| Select content | `z-[1001]` | Select dropdowns inside dialogs |
| Toast | `z-[1001]` | Toast notifications |
| Tooltip | `z-9999` | Tooltip overlays |

### 2.11 Breakpoints

| Token | Width | Note |
|---|---|---|
| `sm` | 640px | Tailwind default |
| `md` | 768px | Tailwind default |
| `lg` | 1024px | Tailwind default |
| `xl` | 1280px | Tailwind default |
| `2xl` | 1536px | Tailwind default |
| `3xl` | 1920px | Custom |
| `4xl` | 2560px | Custom |
| `5xl` | 3840px | Custom |
| `print` | `{ raw: 'print' }` | Print media query |

### 2.12 Other Tokens

**Aspect ratios:**

```js
aspectRatio: { 'signature-pad': '16 / 7' }
```

**Background images:**

```js
backgroundImage: {
  'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
}
```

**Keyframes:**

```js
keyframes: {
  'accordion-down': { from: { height: 0 }, to: { height: 'var(--radix-accordion-content-height)' } },
  'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: 0 } },
  'caret-blink': { '0%,70%,100%': { opacity: '1' }, '20%,50%': { opacity: '0' } },
}
```

**Animations:**

```js
animation: {
  'accordion-down': 'accordion-down 0.2s ease-out',
  'accordion-up': 'accordion-up 0.2s ease-out',
  'caret-blink': 'caret-blink 1.25s ease-out infinite',
}
```

---

## 3. Dark Mode

### Implementation

Dark mode uses a CSS class strategy with a custom Tailwind variant:

```js
darkMode: ['variant', '&:is(.dark:not(.dark-mode-disabled) *)']
```

The `dark` class is toggled on the `<html>` element by `remix-themes` `ThemeProvider`.

### The `.dark-mode-disabled` Escape Hatch

Adding `.dark-mode-disabled` to any ancestor forces its descendants to use light-mode token values, even when the global theme is dark. The `:root` selector is paired with `.dark-mode-disabled` so they share the same light-mode values.

### Token Behavior Across Themes

| Category | Changes in dark mode? |
|---|---|
| Semantic colors (`--background`, `--foreground`, etc.) | Yes |
| Recipient colors (`--recipient-*`) | No |
| Extended scales (`--new-*`) | No |
| Brand palettes (`documenso`, `dawn`, `water`) | No (hex values) |
| `--radius` | No |
| `--warning`, `--gold` | No |

### Theme Switcher UI

Three options: Light, Dark, System. Pill-shaped toggle:

```
Container: bg-muted flex items-center gap-x-1 rounded-full p-1
Button:    text-muted-foreground relative z-10 flex h-8 w-8 items-center justify-center rounded-full
Active:    bg-background absolute inset-0 rounded-full
           + mix-blend-color-burn (light mode)
           + mix-blend-exclusion (dark/system mode)
Icons:     h-5 w-5 (SunIcon, MoonIcon, MonitorIcon)
```

---

## 4. Global Base Styles

### CSS Reset Layer

```css
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: 'rlig' 1, 'calt' 1;
  }
}
```

### Custom Scrollbar

```css
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  background: transparent;
  border-radius: 10px;
  scrollbar-gutter: stable;
}
```

### Gradient Border Mask

Used by the Card component for gradient borders:

```css
.gradient-border-mask::before {
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
}
```

### Print Styles

```css
.print-provider {
  @page {
    margin: 1in;
    size: A4;
  }
}
```

---

## 5. Component Catalog

### 5.1 Button

**Variant definitions (cva):**

```
Base: inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
      disabled:opacity-50 disabled:pointer-events-none ring-offset-background

Variants:
  default:     bg-primary text-primary-foreground hover:bg-primary/90
  destructive: bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive
  outline:     border border-input hover:bg-accent hover:text-accent-foreground
  secondary:   bg-secondary text-secondary-foreground hover:bg-secondary/80
  ghost:       hover:bg-accent hover:text-accent-foreground
  link:        underline-offset-4 hover:underline text-primary
  none:        (empty)

Sizes:
  default: h-10 py-2 px-4
  sm:      h-9 px-3 rounded-md
  lg:      h-11 px-8 rounded-md
```

**Loading state:** When `loading={true}`, a `<Loader>` spinner appears with `animate-spin`. Loader sizes: default/lg = `h-5 w-5`, sm = `h-4 w-4`.

**Props:** `variant`, `size`, `asChild` (renders as Slot), `loading`.

### 5.2 Badge

```
Base: inline-flex items-center rounded-md text-xs font-medium ring-1 ring-inset w-fit

Variants:
  neutral:     bg-gray-50 text-gray-600 ring-gray-500/10
               dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/20
  destructive: bg-red-50 text-red-700 ring-red-600/10
               dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20
  warning:     bg-yellow-50 text-yellow-800 ring-yellow-600/20
               dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20
  default:     bg-green-50 text-green-700 ring-green-600/20
               dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20
  secondary:   bg-blue-50 text-blue-700 ring-blue-700/10
               dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30

Sizes:
  small:   px-1.5 py-0.5 text-xs
  default: px-2 py-1.5 text-xs
  large:   px-3 py-2 text-sm
```

Uses `role="status"`.

### 5.3 Alert

```
Base: relative w-full rounded-lg p-4
      [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4
      [&>svg+div]:translate-y-[-3px] [&>svg~*]:pl-8

Variants:
  default:     bg-green-50 text-green-700 [&_.alert-title]:text-green-800 [&>svg]:text-green-400
  neutral:     bg-gray-50 dark:bg-neutral-900/20 text-muted-foreground [&_.alert-title]:text-foreground
  secondary:   bg-blue-50 text-blue-700 [&_.alert-title]:text-blue-800 [&>svg]:text-blue-400
  destructive: bg-red-50 text-red-700 [&_.alert-title]:text-red-800 [&>svg]:text-red-400
  warning:     bg-yellow-50 text-yellow-700 [&_.alert-title]:text-yellow-800 [&>svg]:text-yellow-400

Padding:
  tighter: p-2
  tight:   px-4 py-2
  default: p-4
```

Compound components: `AlertTitle` (`alert-title text-base font-medium`), `AlertDescription` (`text-sm`).

### 5.4 Input

```
bg-background border-input ring-offset-background placeholder:text-muted-foreground/40
focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2
text-base file:border-0 file:bg-transparent file:text-sm file:font-medium
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
```

Error state: when `aria-invalid` is truthy, applies `ring-2 !ring-red-500 transition-all`.

### 5.5 Textarea

```
border-input ring-offset-background placeholder:text-muted-foreground/40
focus-visible:ring-ring flex h-20 w-full rounded-md border bg-transparent
px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2
focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
```

Error state: same as Input (`ring-2 !ring-red-500 transition-all` on `aria-invalid`).

### 5.6 Label

```
text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70
```

When `required={true}`: appends `<span className="text-destructive ml-1 inline-block font-medium">*</span>`.

### 5.7 Checkbox

```
Root:      border-input bg-background ring-offset-background focus-visible:ring-ring
           data-[state=checked]:border-primary data-[state=checked]:bg-primary
           peer h-4 w-4 shrink-0 rounded-sm border
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
           disabled:cursor-not-allowed disabled:opacity-50

Indicator: text-primary-foreground flex items-center justify-center
Check:     h-3 w-3 stroke-[3px]
```

### 5.8 Switch

```
Root:  focus-visible:ring-ring focus-visible:ring-offset-background
       data-[state=checked]:bg-primary data-[state=unchecked]:bg-input
       peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full
       border-2 border-transparent transition-colors
       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
       disabled:cursor-not-allowed disabled:opacity-50

Thumb: bg-background pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0
       transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0
```

### 5.9 Select

```
Trigger:   border-input ring-offset-background placeholder:text-muted-foreground
           focus:ring-ring flex h-10 w-full items-center justify-between rounded-md
           border bg-transparent px-3 py-2 text-sm
           focus:outline-none focus:ring-2 focus:ring-offset-2
           disabled:cursor-not-allowed disabled:opacity-50
           (ChevronDown icon: h-4 w-4 opacity-50)

Content:   bg-popover text-popover-foreground animate-in fade-in-80
           relative z-[1001] min-w-[8rem] overflow-hidden rounded-md border shadow-md
           (position=popper adds translate-y-1)

Item:      focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default
           select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none
           data-[disabled]:pointer-events-none data-[disabled]:opacity-50
           (Check indicator: h-4 w-4, positioned absolute left-2)

Label:     py-1.5 pl-8 pr-2 text-sm font-semibold
Separator: bg-muted -mx-1 my-1 h-px
```

Loading state: `loading` prop shows a centered `Loader` spinner with `h-5 w-5 animate-spin`.

### 5.10 Card

Compound components:

```
Card:           bg-background text-foreground group relative rounded-lg border-2
                backdrop-blur-[2px] (when backdropBlur=true)
                shadow-[0_0_0_4px_theme(colors.gray.100/70%),...]

CardHeader:     flex flex-col space-y-1.5 p-6
CardTitle:      text-lg font-semibold leading-none tracking-tight
CardDescription: text-muted-foreground text-sm
CardContent:    p-6 pt-0
CardFooter:     flex items-center p-6 pt-0
```

Special props: `gradient` (applies gradient-border-mask with configurable `degrees`), `spotlight`, `backdropBlur` (default true).

### 5.11 Dialog

```
Overlay:     fixed inset-0 z-50 bg-background/80 backdrop-blur-sm
             transition-all duration-100
             data-[state=closed]:animate-out data-[state=closed]:fade-out
             data-[state=open]:fade-in

Content:     fixed z-50 grid w-full gap-4 border bg-background p-6 shadow-lg
             animate-in data-[state=open]:fade-in-90
             data-[state=open]:slide-in-from-bottom-10
             sm:max-w-lg sm:rounded-lg sm:zoom-in-90
             data-[state=open]:sm:slide-in-from-bottom-0
             position=start: rounded-b-xl
             position=end:   rounded-t-xl

Header:      flex flex-col space-y-1.5 text-center sm:text-left
Footer:      flex flex-col-reverse space-y-2 space-y-reverse
             sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0
Title:       truncate text-lg font-semibold tracking-tight
Description: text-sm text-muted-foreground

Close:       absolute right-4 top-4 rounded-sm opacity-70
             ring-offset-background transition-opacity hover:opacity-100
             focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
             (X icon: h-4 w-4)
```

Positions: `start` (top on mobile, default), `end` (bottom on mobile), `center`.

### 5.12 Sheet

```
Base: fixed z-[61] scale-100 gap-4 bg-background p-6 opacity-100 shadow-lg border

Position variants:
  top:    animate-in slide-in-from-top w-full duration-300
  bottom: animate-in slide-in-from-bottom w-full duration-300
  left:   animate-in slide-in-from-left h-full duration-300
  right:  animate-in slide-in-from-right h-full duration-300

Size (for top/bottom):
  content: max-h-screen    default: h-1/3    sm: h-1/4
  lg: h-1/2    xl: h-5/6    full: h-screen

Size (for left/right):
  content: max-w-screen    default: w-1/3    sm: w-1/4
  lg: w-1/2    xl: w-5/6    full: w-screen

Overlay: fixed inset-0 z-[61] bg-background/80 backdrop-blur-sm
         data-[state=closed]:animate-out data-[state=closed]:fade-out
         data-[state=open]:fade-in

Header: flex flex-col space-y-2 text-center sm:text-left
Footer: flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2
Title:  text-lg font-semibold text-foreground
Desc:   text-sm text-muted-foreground
```

### 5.13 Toast

```
Base: data-[swipe=move]:transition-none group relative pointer-events-auto
      flex w-full items-center justify-between space-x-4 overflow-hidden
      rounded-md border p-6 pr-8 shadow-lg transition-all
      data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]
      data-[swipe=cancel]:translate-x-0
      data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]
      data-[state=open]:animate-in data-[state=closed]:animate-out
      data-[swipe=end]:animate-out data-[state=closed]:fade-out-80
      data-[state=open]:slide-in-from-top-full
      data-[state=open]:sm:slide-in-from-bottom-full
      data-[state=closed]:slide-out-to-right-full

Variants:
  default:     bg-background border
  destructive: group destructive border-destructive bg-destructive text-destructive-foreground

Viewport: fixed top-0 z-[1001] flex max-h-screen w-full flex-col-reverse p-4
          sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]

Title: text-sm font-semibold
Desc:  text-sm opacity-90

Close: text-foreground/50 hover:text-foreground absolute right-2 top-2 rounded-md p-1
       opacity-100 transition-opacity md:opacity-0 group-hover:md:opacity-100
       group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50

Action: ring-offset-background hover:bg-secondary
        group-[.destructive]:border-destructive/30
        group-[.destructive]:hover:border-destructive/30
        group-[.destructive]:hover:bg-destructive
        group-[.destructive]:hover:text-destructive-foreground
        inline-flex h-8 shrink-0 items-center justify-center rounded-md
        border bg-transparent px-3 text-sm font-medium transition-colors
```

### 5.14 Toggle

```
Base: inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors
      data-[state=on]:bg-accent data-[state=on]:text-accent-foreground
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
      disabled:pointer-events-none disabled:opacity-50 ring-offset-background
      hover:bg-muted hover:text-muted-foreground

Variants:
  default: bg-transparent
  outline: bg-transparent border border-input hover:bg-accent hover:text-accent-foreground

Sizes:
  default: h-10 px-3
  sm:      h-9 px-2.5
  lg:      h-11 px-5
```

### 5.15 Spinner

```
Base: text-muted-foreground animate-spin

Sizes:
  default: h-6 w-6
  sm:      h-4 w-4
  lg:      h-8 w-8
```

`SpinnerBox`: wraps Spinner in `flex items-center justify-center rounded-lg`.

### 5.16 Avatar

```
Root:     relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full
Image:    aspect-square h-full w-full
Fallback: bg-muted flex h-full w-full items-center justify-center rounded-full
```

`AvatarWithText` compound:

```
Container:    flex w-full max-w-xs items-center gap-2
Avatar:       dark:border-border h-10 w-10 border-2 border-solid border-white
FallbackText: text-xs text-gray-400
TextSection:  flex flex-col truncate text-left text-sm font-normal
PrimaryText:  text-foreground truncate
SecondaryText: text-muted-foreground truncate text-xs
```

### 5.17 Table

```
Wrapper:  w-full overflow-auto (or overflow-hidden when overflowHidden=true)
Table:    w-full caption-bottom text-sm
Header:   [&_tr]:border-b
Body:     [&_tr:last-child]:border-0
Footer:   bg-primary text-primary-foreground font-medium
Row:      hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors
Head:     text-muted-foreground h-12 px-4 text-left align-middle font-medium
          [&:has([role=checkbox])]:pr-0
Cell:     p-4 align-middle [&:has([role=checkbox])]:pr-0  (+ truncate when truncate=true)
Caption:  text-muted-foreground mt-4 text-sm
```

### 5.18 Tabs

```
List:    bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1

Trigger: ring-offset-background focus-visible:ring-ring
         data-[state=active]:bg-background data-[state=active]:text-foreground
         inline-flex items-center justify-center whitespace-nowrap rounded-sm
         px-3 py-1.5 text-sm font-medium transition-all
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
         disabled:pointer-events-none disabled:opacity-50
         data-[state=active]:shadow-sm

Content: ring-offset-background focus-visible:ring-ring mt-2
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
```

### 5.19 Accordion

```
Item:    border-b

Trigger: flex flex-1 items-center justify-between py-4 font-medium
         transition-all hover:underline [&[data-state=open]>svg]:rotate-180
         (ChevronDown icon: h-4 w-4 transition-transform duration-200)

Content: data-[state=closed]:animate-accordion-up
         data-[state=open]:animate-accordion-down
         overflow-hidden text-sm transition-all
         (inner div: pb-4 pt-0)
```

### 5.20 Tooltip

```
Content: bg-popover z-9999 text-popover-foreground animate-in fade-in-50
         data-[side=bottom]:slide-in-from-top-1
         data-[side=left]:slide-in-from-right-1
         data-[side=right]:slide-in-from-left-1
         data-[side=top]:slide-in-from-bottom-1
         overflow-hidden rounded-md border px-3 py-1.5 text-sm shadow-md

Default sideOffset: 4
```

### 5.21 Popover

```
Content: bg-popover text-popover-foreground animate-in
         data-[side=bottom]:slide-in-from-top-2
         data-[side=left]:slide-in-from-right-2
         data-[side=right]:slide-in-from-left-2
         data-[side=top]:slide-in-from-bottom-2
         z-50 w-72 rounded-md border p-4 shadow-md outline-none

Default align: center, sideOffset: 4
```

`PopoverHover`: hover-triggered popover with 200ms close delay.

### 5.22 DropdownMenu

```
Content:       bg-popover text-popover-foreground animate-in
               data-[side=bottom]:slide-in-from-top-2
               data-[side=left]:slide-in-from-right-2
               data-[side=right]:slide-in-from-left-2
               data-[side=top]:slide-in-from-bottom-2
               z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md

Item:          focus:bg-accent focus:text-accent-foreground
               relative flex cursor-pointer select-none items-center rounded-sm
               px-2 py-1.5 text-sm outline-none transition-colors
               data-[disabled]:pointer-events-none data-[disabled]:opacity-50

CheckboxItem:  focus:bg-accent focus:text-accent-foreground
               relative flex cursor-default select-none items-center rounded-sm
               py-1.5 pl-8 pr-2 text-sm outline-none transition-colors
               (Check indicator: absolute left-2 h-4 w-4)

RadioItem:     Same as CheckboxItem (Circle indicator: h-2 w-2 fill-current)

Label:         px-2 py-1.5 text-sm font-semibold
Separator:     bg-muted -mx-1 my-1 h-px
Shortcut:      ml-auto text-xs tracking-widest opacity-60
SubTrigger:    focus:bg-accent data-[state=open]:bg-accent
               (ChevronRight: ml-auto h-4 w-4)
```

### 5.23 Progress

```
Root:      bg-secondary relative h-4 w-full overflow-hidden rounded-full
Indicator: bg-primary h-full w-full flex-1 transition-all
           (style: translateX(-${100 - value}%))
```

### 5.24 Separator

```
bg-border shrink-0
horizontal: h-[1px] w-full
vertical:   h-full w-[1px]
```

### 5.25 Skeleton

```
bg-muted animate-pulse rounded-md
```

### 5.26 Form

Compound components:

```
FormItem:        space-y-2 (wraps each field group)
FormLabel:       (Label component, supports required prop)
FormControl:     (Slot -- passes aria-invalid, aria-describedby automatically)
FormDescription: text-muted-foreground text-sm
FormMessage:     text-xs text-red-500
                 (animated: framer-motion opacity 0->1, y: -10->0 on enter; opacity 0, y: 10 on exit)
```

`FormControl` automatically sets `aria-invalid={!!error}` and links `aria-describedby` to description and message IDs.

### 5.27 DataTable

Built on `@tanstack/react-table`. Key props:

- `columns`, `data` -- table content
- `perPage`, `currentPage`, `totalPages`, `onPaginationChange` -- manual pagination
- `skeleton: { enable, rows, component }` -- loading state
- `error: { enable }` -- error state
- `emptyState` -- custom empty content
- `enableRowSelection`, `rowSelection`, `onRowSelectionChange` -- row selection
- `onRowClick` -- row click handler

### 5.28 DataTablePagination

```
Container:   flex flex-wrap items-center justify-between gap-x-4 gap-y-4 px-2
Info:        flex-1 text-sm text-muted-foreground
PerPage:     flex items-center gap-x-2
             Label: whitespace-nowrap text-sm font-medium
             Select: h-8 w-[70px]
PageInfo:    flex items-center text-sm font-medium md:justify-center
NavButtons:  h-8 w-8 p-0 variant="outline"
             First/Last: hidden h-8 w-8 p-0 lg:flex (hidden on mobile)
             Icons: h-4 w-4
```

Rows per page options: `[10, 20, 30, 40, 50]`.

### 5.29 Signature Pad

Tabbed interface (Draw / Type / Upload) with `aspect-signature-pad` (16/7 ratio).

```
Tab container: border-border flex flex-wrap border-b
Active tab:    text-foreground + bottom indicator (bg-foreground/40 h-0.5 rounded-full)
Inactive tab:  text-muted-foreground hover:text-foreground
Canvas area:   relative flex aspect-signature-pad items-center justify-center
               rounded-md border border-border bg-neutral-50 text-center dark:bg-background
Type input:    w-full bg-transparent px-4 text-center font-signature text-7xl
```

Dialog variant wraps the pad in a dialog with a clickable preview.

### 5.30 Other Components

| Component | Base Classes |
|---|---|
| **ScrollArea** | Radix ScrollArea with ScrollBar (orientation: horizontal/vertical) |
| **RadioGroup** | Radix RadioGroup with custom styling |
| **Slider** | Radix Slider |
| **Collapsible** | Radix Collapsible |
| **AlertDialog** | Radix AlertDialog (action/cancel pattern) |
| **ContextMenu** | Same class patterns as DropdownMenu |
| **Menubar** | Same class patterns as DropdownMenu |
| **HoverCard** | Radix HoverCard |
| **NavigationMenu** | Radix NavigationMenu |
| **Calendar** | react-day-picker based |
| **Command** | cmdk-based command palette |
| **PinInput** | OTP-style segmented input |
| **PasswordInput** | Input with visibility toggle |
| **Combobox** | Popover + Command searchable select |
| **MultiSelect** | Tag-style multi-select with search and creation |
| **MultiSelectCombobox** | Combobox variant of multi-select |
| **Stepper** | Multi-step wizard |

---

## 6. Higher-Level Components

These are domain-specific composite components built from the primitives.

### Animation

| Component | Description |
|---|---|
| **AnimateGenericFadeInOut** | `motion.section` wrapper with `opacity: 0 -> 1 -> 0` transitions |

### Common

| Component | Description |
|---|---|
| **ClientOnly** | Renders children only after hydration (prevents SSR mismatches) |
| **CopyTextButton** | Copy-to-clipboard button with animated copied/uncopied states |
| **LanguageSwitcherDialog** | Language picker using CommandDialog |

### Document

| Component | Description |
|---|---|
| **DocumentEmailCheckboxes** | 8 email notification checkboxes with tooltips |
| **DocumentGlobalAuthAccessSelect** | Multi-select for access authentication methods |
| **DocumentGlobalAuthActionSelect** | Multi-select for action authentication methods |
| **DocumentReadOnlyFields** | Read-only field display with recipient color coding |
| **DocumentSendEmailMessageHelper** | Available template variables reference |
| **DocumentShareButton** | Share dialog with link generation |
| **DocumentSignatureSettingsTooltip** | Tooltip explaining signature types |
| **DocumentVisibilitySelect** | Visibility setting selector |
| **ExpirationPeriodPicker** | Duration/disabled/inherit mode picker |

### Recipient

| Component | Description |
|---|---|
| **RecipientActionAuthSelect** | Auth method multi-select for recipients |
| **RecipientAutocompleteInput** | Autocomplete with Popover + Command |
| **RecipientRoleSelect** | Role selector with role icons and tooltips |

### Field

| Component | Description |
|---|---|
| **FieldTooltip** | Positioned tooltip for document fields |
| **EnvelopeFieldTooltip** | Envelope-specific positioned tooltip |
| **FieldContainerPortal** | Portal for rendering fields at PDF coordinates |
| **FieldRootContainer** | Root container for field positioning |

### PDF

| Component | Description |
|---|---|
| **PDFViewerKonva** | PDF viewer using Konva + react-pdf (renderer: editor/preview/signing) |
| **PDFViewerKonvaLazy** | Lazy-loaded wrapper with React Suspense |

### Special

| Component | Description |
|---|---|
| **SigningCard** | Signing card displaying name and signature |
| **SigningCard3D** | 3D mouse-tracking variant using framer-motion transforms |

---

## 7. Custom Icons

Two custom SVG icons compatible with the LucideIcon interface:

| Icon | Description |
|---|---|
| **SignatureIcon** | Custom signature drawing icon |
| **VerifiedIcon** | Custom verified/check badge icon |

Import:

```ts
import { SignatureIcon } from '@documenso/ui/icons/signature';
import { VerifiedIcon } from '@documenso/ui/icons/verified';
```

### Icon Conventions

- Library: `lucide-react`
- Always use longhand names: `HomeIcon`, `SettingsIcon`, `ArrowRightIcon` (not `Home`, `Settings`, `ArrowRight`)
- Common sizes:
  - Small (inline, buttons, menus): `h-4 w-4`
  - Medium (cards, sections): `h-6 w-6`
  - Large (empty states, features): `h-8 w-8`
  - Extra small (nested): `h-3 w-3`
- Chevron icons in selects/accordions always use `h-4 w-4`

---

## 8. Custom Hooks

### `useDebounce<T>(value: T, delay?: number): T`

Debounces a reactive value. Default delay: 500ms.

### `useHydrated(): boolean`

Returns `true` once the component has hydrated on the client. Uses `useSyncExternalStore`.

### `useRecipientColors(index: number): RecipientColorStyles`

Returns a `RecipientColorStyles` object for the given index, rotating through 6 colors (green, blue, purple, orange, yellow, pink).

### `useToast()`

Returns `{ toasts, toast, dismiss }`. `toast()` accepts `{ title?, description?, variant?, duration? }`.

### `useStep()`

Must be used within a `<Stepper>`. Returns:

```ts
{
  isCompleting: boolean;
  stepIndex: number;
  currentStep: number;
  totalSteps: number;
  isFirst: boolean;
  isLast: boolean;
  nextStep: () => void;
  previousStep: () => void;
}
```

---

## 9. Layout Patterns

### Page Container

The universal content wrapper:

```
mx-auto w-full max-w-screen-xl px-4 md:px-8
```

Max width: 1280px. Padding scales from 16px (mobile) to 32px (md+).

### Sidebar + Content Grid

Used by settings and admin pages:

```
Container: grid grid-cols-12 gap-x-8
Sidebar:   col-span-12 md:col-span-3
Content:   col-span-12 md:col-span-9
```

On mobile, both stack to full width.

### Sticky Header

```
Container: sticky top-0 z-[60]
Inner:     mx-auto max-w-screen-xl (with responsive padding)
```

### Centered Auth Pages

```
Outer: min-h-screen flex flex-col items-center justify-center
Card:  w-screen max-w-lg px-4
Inner: border-border rounded-xl border bg-neutral-100 p-6
```

### Full-Screen Editor

```
Outer: h-screen w-screen
Content: h-[calc(100vh-4rem)]  (below the header)
```

### Page Header Pattern

```tsx
<div className="mb-8">
  <h1 className="text-3xl font-bold">Page Title</h1>
  <p className="text-muted-foreground mt-1">Description text</p>
</div>
```

### Settings Header

```tsx
<SettingsHeader title="Section Title" subtitle="Description" hideDivider={false}>
  {/* Optional action buttons */}
</SettingsHeader>
```

Includes an `<hr className="my-4" />` divider unless `hideDivider` is true.

### Main Content Area

```
main: mt-8 pb-8 md:mt-12 md:pb-12
```

### Banner Pattern

Full-width colored bars at the top of the page:

```
Outer:  full-width with background color
Inner:  mx-auto flex max-w-screen-xl items-center justify-center px-4 py-2/py-3 text-sm font-medium
```

---

## 10. Navigation Patterns

### Desktop Navigation

Horizontal nav in the header:

```
Container: ml-8 hidden flex-1 items-center gap-x-12 md:flex md:justify-between
Links:     text-muted-foreground dark:text-muted-foreground/60 font-medium leading-5
           hover:opacity-80 rounded-md
           focus-visible:ring-ring ring-offset-background
           focus-visible:outline-none focus-visible:ring-2
Active:    text-foreground dark:text-muted-foreground
```

### Mobile Navigation

Sheet-based slide-in menu:

```
SheetContent: flex w-full max-w-[350px] flex-col
Logo:         dark:invert
Links:        text-foreground hover:text-foreground/80
              flex items-center gap-2 text-2xl font-semibold
Nav:          mt-8 flex w-full flex-col items-start gap-y-4
Footer:       mt-auto flex w-full flex-col space-y-4 self-end
InboxBadge:   bg-primary text-primary-foreground
              flex h-6 min-w-[1.5rem] items-center justify-center
              rounded-full px-1.5 text-xs font-semibold
```

### Settings Sidebar

```
Container: flex flex-col gap-y-2
Buttons:   variant="ghost" className="w-full justify-start"
Active:    bg-secondary
SubNav:    pl-8 (for nested items)
```

### Breadcrumbs

```
Container: flex flex-1 items-center text-sm font-medium text-muted-foreground
           hover:text-muted-foreground/80
Separator: px-3 (contains "/")
Icons:     mr-2 h-4 w-4
```

### Command Menu

Global search triggered by `Cmd+K` / `Ctrl+K`. Uses the `Command` primitive with a `CommandDialog` overlay.

---

## 11. Form Patterns

### Complete Form Recipe

```tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required.' }),
  email: z.string().email(),
});

type FormData = z.infer<typeof schema>;

const form = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: { name: '', email: '' },
});

return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <fieldset
        className="flex h-full flex-col space-y-4"
        disabled={form.formState.isSubmitting}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" loading={form.formState.isSubmitting}>
          Submit
        </Button>
      </fieldset>
    </form>
  </Form>
);
```

### Key Patterns

- **Fieldset disabled**: Always wrap form content in `<fieldset disabled={form.formState.isSubmitting}>` to disable all inputs during submission.
- **FormMessage animation**: Error messages animate in with framer-motion (opacity + y-axis slide).
- **FormControl aria linking**: Automatically sets `aria-invalid` and `aria-describedby` on the wrapped input.
- **Required indicator**: `<FormLabel required>` appends a red asterisk.
- **Cross-field validation**: Use `.refine()` on the schema for field comparisons.
- **Manual errors**: `form.setError('field', { type: 'manual', message: '...' })`.

### Dialog-Embedded Forms

- Prevent closing during submission: `onOpenChange={(v) => !form.formState.isSubmitting && setOpen(v)}`
- Reset form on close: `useEffect(() => { form.reset(); }, [open, form])`

---

## 12. Feedback and State Patterns

### Toast Notifications

```ts
const { toast } = useToast();

// Success
toast({
  title: 'Success',
  description: 'Operation completed.',
  duration: 5000,
});

// Error
toast({
  title: 'Error occurred',
  description: 'Something went wrong.',
  variant: 'destructive',
});
```

Position: top of screen on mobile, bottom-right on desktop. Z-index: 1001.

### Error Pages

`GenericErrorLayout` component:

- Animated background pattern
- Configurable error code map (404, 500, etc.)
- Primary and secondary action buttons (defaults: Home, Go Back)

### Empty States

Centered layout pattern:

```tsx
<div className="flex flex-col items-center justify-center">
  <Icon className="text-muted-foreground/60 h-12 w-12" />
  <h3 className="text-foreground mt-6 font-medium">No items found</h3>
  <p className="text-muted-foreground/80 mt-1 text-center text-sm">
    Description text
  </p>
</div>
```

### Loading States

- **Tables**: `DataTable` `skeleton` prop renders pulsing `<Skeleton />` rows
- **Centered spinner**: `<SpinnerBox />` (flex centered container with Spinner)
- **Buttons**: `<Button loading={true}>` shows inline spinner
- **Selects**: `<SelectTrigger loading={true}>` replaces content with spinner

### Status Indicators

Color-coded icon + text:

| Status | Icon Color |
|---|---|
| PENDING | `text-blue-600 dark:text-blue-300` |
| COMPLETED | `text-green-500 dark:text-green-300` |
| DRAFT | `text-yellow-500 dark:text-yellow-200` |
| REJECTED | `text-red-500 dark:text-red-300` |
| INBOX | `text-muted-foreground` |

### Banners

| Banner | Styling |
|---|---|
| **AppBanner** | Custom `background` and `color` from settings. Inner: `mx-auto max-w-screen-xl px-4 py-3 text-sm font-medium` |
| **VerifyEmailBanner** | `bg-yellow-200 dark:bg-yellow-400`. Text: `text-yellow-900`. Alert icon: `mr-2.5 h-5 w-5` |

### Document Dropzone

Three-card fan animation:

```
Enabled hover:  cards spread out, lines and icon turn documenso green
                group-hover:border-documenso/80
                group-hover:text-documenso

Disabled hover: cards shift slightly, turn destructive red
                group-hover:border-destructive/10
                group-hover:text-destructive
```

Cards use `aspect-[3/4] w-24 rounded-lg border bg-white/80 backdrop-blur-sm`.

---

## 13. Animation Conventions

### Framer Motion Patterns

**Fade in/out wrapper:**

```tsx
<motion.section
  key={motionKey}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  {children}
</motion.section>
```

**Form error messages:**

```tsx
<motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 10 }}
>
  <p className="text-xs text-red-500">{error}</p>
</motion.div>
```

**Dropzone card fan (stagger):**

```ts
hover: { transition: { staggerChildren: 0.05 } }
```

**3D card transforms:** Mouse position tracking with `rotateX`, `rotateY`, `perspective`.

**Spring animations (disabled dropzone):**

```ts
{ type: 'spring', duration: 0.3, stiffness: 500 }
```

### Tailwind Data-Attribute Animations

Used extensively on Radix components via `tailwindcss-animate`:

```
data-[state=open]:fade-in-90
data-[state=open]:slide-in-from-bottom-10
data-[state=open]:sm:slide-in-from-bottom-0
data-[state=open]:zoom-in-90
data-[state=closed]:fade-out
data-[state=closed]:fade-out-80
data-[state=closed]:slide-out-to-right-full
data-[state=closed]:animate-out
data-[side=bottom]:slide-in-from-top-1
data-[side=left]:slide-in-from-right-1
data-[side=right]:slide-in-from-left-1
data-[side=top]:slide-in-from-bottom-1
animate-in
```

### Keyframe Animations

| Animation | Duration | Easing |
|---|---|---|
| `accordion-down` | 0.2s | ease-out |
| `accordion-up` | 0.2s | ease-out |
| `caret-blink` | 1.25s | ease-out (infinite) |
| `animate-spin` | built-in | linear (infinite) |
| `animate-pulse` | built-in | ease-in-out (infinite) |

### Disabling Animations

For testing or accessibility:

```html
<style>
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
  }
</style>
```

---

## 14. Interaction States and Accessibility

### Focus Ring

The universal focus pattern:

```
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2
ring-offset-background
```

### Disabled States

**Buttons:**

```
disabled:opacity-50 disabled:pointer-events-none
```

**Inputs:**

```
disabled:cursor-not-allowed disabled:opacity-50
```

### Hover Patterns

| Context | Classes |
|---|---|
| Default button | `hover:bg-primary/90` |
| Ghost button | `hover:bg-accent hover:text-accent-foreground` |
| Outline button | `hover:bg-accent hover:text-accent-foreground` |
| Secondary button | `hover:bg-secondary/80` |
| Link | `hover:opacity-80` |
| Nav link | `hover:opacity-80` |
| Table row | `hover:bg-muted/50` |
| Dropdown item | `focus:bg-accent focus:text-accent-foreground` |
| Active nav | `bg-secondary` |

### Group Hover

```
Dropzone:    group-hover:border-documenso/80, group-hover:text-documenso
Toast close: md:opacity-0 group-hover:md:opacity-100
```

### Transitions

| Context | Class |
|---|---|
| Buttons | `transition-colors` |
| Toast close | `transition-opacity` |
| Input error ring | `transition-all` |
| Table rows | `transition-colors` |
| Accordion trigger | `transition-all` |
| Switch | `transition-colors` (root), `transition-transform` (thumb) |

### Screen Reader

`sr-only` is used for:

- Icon-only buttons (pagination, close, undo)
- Form labels that are visually hidden
- State change announcements

### ARIA Patterns

| Component | ARIA |
|---|---|
| Badge | `role="status"` |
| Alert | `role="alert"` |
| Input/Textarea | `aria-invalid` triggers error ring styling |
| FormControl | Auto-sets `aria-invalid`, `aria-describedby` |
| Separator | `decorative` prop controls `aria-hidden` |

### Responsive Visibility

| Pattern | Meaning |
|---|---|
| `hidden md:flex` | Hidden on mobile, flex on md+ |
| `hidden md:block` | Hidden on mobile, block on md+ |
| `md:hidden` | Visible on mobile, hidden on md+ |
| `flex md:hidden` | Flex on mobile, hidden on md+ |
| `hidden lg:flex` | Hidden until lg, then flex |
| `col-span-12 md:col-span-3` | Full width on mobile, 1/4 on md+ |

---

## 15. Responsive Design Conventions

### Mobile-First Approach

All styles are written mobile-first. Breakpoint prefixes (`md:`, `lg:`, etc.) add overrides for larger screens.

### Breakpoint Usage

| Breakpoint | Common Changes |
|---|---|
| **Base** (< 640px) | Stack layouts, full-width elements, sheet-based navigation, larger touch targets |
| **md** (768px) | Sidebar layouts begin, desktop nav appears, mobile nav hides, side-by-side grids |
| **lg** (1024px) | First/last pagination buttons appear, wider gaps |
| **xl** (1280px) | Max container width reached |

### Container Strategy

```
mx-auto w-full max-w-screen-xl px-4 md:px-8
```

Content is capped at 1280px with responsive horizontal padding.

### Grid Patterns

```
Settings/Admin:
  grid grid-cols-12 gap-x-8
  Sidebar: col-span-12 md:col-span-3
  Content: col-span-12 md:col-span-9

Mobile: both sections stack to col-span-12
```

### Typography Scaling

```
Input:      text-base md:text-sm  (larger on mobile for accessibility)
Page title: text-2xl md:text-3xl (or text-3xl font-bold consistently)
```

### Spacing Scaling

```
Main content: mt-8 pb-8 md:mt-12 md:pb-12
```

### Navigation Responsiveness

- **Desktop nav**: `hidden md:flex` -- horizontal links visible on md+
- **Mobile nav**: Sheet component, hamburger button visible below md
- **Settings nav**: Desktop sidebar `hidden md:flex`, mobile version `md:hidden` wraps horizontally

### Dialog Responsiveness

- Mobile: Dialogs attach to top (`rounded-b-xl`) or bottom (`rounded-t-xl`)
- Desktop: Centered with `sm:max-w-lg sm:rounded-lg`
- Footer: `flex-col-reverse` on mobile, `sm:flex-row sm:justify-end` on desktop
