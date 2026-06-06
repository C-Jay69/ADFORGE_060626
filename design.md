# AdForge Design System

## Vibe
Dark/cinematic — performance marketing SaaS. Feels like a war room, not a productivity app.
Bold, confident, motion-driven. Every element earns its place.

## Colors
```
Background:    #080C14   (near-black with navy undertone)
Surface:       #0F1623   (card/panel backgrounds)
Surface Alt:   #141D2E   (elevated surfaces)
Border:        #1E2D45   (subtle borders)

Gradient 1:    #3B82F6 → #8B5CF6  (blue → purple, primary brand gradient)
Gradient 2:    #6366F1 → #EC4899  (indigo → pink, secondary accent)
Accent Blue:   #3B82F6
Accent Purple: #8B5CF6
Accent Pink:   #EC4899
Accent Cyan:   #06B6D4

Text Primary:  #F1F5F9
Text Muted:    #64748B
Text Subtle:   #334155
```

## Typography
- Display: 'Syne' — heavy, geometric, commanding (headlines)
- Body: 'Plus Jakarta Sans' — clean, modern, readable
- Mono: system-ui monospace (code/labels)

## Spacing & Layout
- Container max: 1280px, centered
- Section padding: 6rem vertical
- Cards: rounded-2xl, border border-[#1E2D45], bg-[#0F1623]
- Grid-breaking layouts — asymmetric, intentional

## Motion
- Page load: staggered fade-up reveals (each 80ms offset)
- Hover: subtle scale(1.02) + glow on interactive cards
- Gradient text: animated gradient shift on key headlines
- Background: subtle animated mesh/noise gradient

## Anti-patterns to avoid
- No plain white backgrounds
- No round pill buttons (use sharp-ish rounded-lg max)
- No centered text walls
- No gradients on everything — use sparingly for emphasis
