# Header Redesign — Spec

**Date:** 2026-05-15  
**Reference:** http://vismuth.ru/sp12sait  
**Goal:** Replicate the header exactly across all screen sizes.

---

## Layout

### Desktop (>960px)
3-column grid: `302px · 1fr · auto`

| Zone | Content |
|------|---------|
| Left | Logo `noroot.png`, 302px wide |
| Center | Nav links, `justify-content: center` |
| Right | Phone + "Записаться" button |

Container: `background #f5f5f5`, `min-height 80px`, `padding 0 20px`, sticky top.

### Mobile (≤960px)
- Bar: logo 240px left, burger right (3 lines, no border/background, color `#015442`)
- Bar min-height: `64px`, padding `0 20px`
- Burger opens a **right-side drawer** (sidebar) that slides in

---

## Nav Links (Desktop & Sidebar)

| Label | href | Notes |
|-------|------|-------|
| Врачи | `http://vismuth.ru/sp12doctor` | |
| Цены | `http://vismuth.ru/sp12price` | |
| Пациентам | — | No link |
| График работы | `/schedule` | Internal |
| О клинике | — | Has dropdown |

**О клинике dropdown:**
- Контакты → `http://vismuth.ru/sp12oclinic`
- Отзывы, Новости, Вакансии, 3D-тур → no links

### Link styles
- Font: Arial, `font-size 20px`, `color #101010`
- Hover/active: `color #015442` only — no background change
- Transition: `color 0.3s ease-in-out`
- Gap between items: `20px`

### Dropdown (О клинике — desktop only)
- Shows on hover
- Background `#f5f5f5`, `border-radius 10px`, `width 200px`
- Shadow: `0 4px 20px rgba(0,0,0,0.10)`
- Link font: Arial `18px`, `color #101010`, hover `#015442`
- Positioned below the trigger with `top: calc(100% + 10px)`

---

## Right Zone (Desktop)

**Phone:**  
`+7 343 200 20 12` → `tel:+73432002012`  
Font: Arial `16px`, `color #101010`, `letter-spacing 1px`

**"Записаться" button:**  
`href="https://sp12zapis.medap.me/"`, `target="_blank"`  
`background #015442`, `color white`, `border-radius 10px`  
`padding 12px 25px`, Arial `16px`, `letter-spacing 1px`  
Hover: `background #003b2e`

---

## Mobile Sidebar

- Slides in from right, `background #f5f5f5`
- Nav links: same font/color rules, `text-align right`, `align-items flex-end`
- "О клинике" expands inline (accordion), sub-items also right-aligned
- Below links: divider, phone, "Записаться" button (full width)
- Overlay behind sidebar closes it on click
- Breakpoint: `960px` (Tailwind arbitrary: `min-[960px]:` / `max-[959px]:`)

---

## Burger Button

- No border, no background
- Three `#015442` lines, `width 22px`, `height 2px`, `gap 5px`
- Toggles to X icon when sidebar is open

---

## Implementation Notes

- Replace `lg` (1024px) breakpoint with `min-[960px]` / `max-[959px]`
- Use Tailwind arbitrary values for all non-standard sizes
- `usePathname` active detection: compare to href, mark with `color #015442`
- Logo `src` keeps `process.env.NEXT_PUBLIC_BASE_PATH` prefix
