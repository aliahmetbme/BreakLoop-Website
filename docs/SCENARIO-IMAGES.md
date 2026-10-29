# Scenario imagery — 29 October 2026

Generated with the built-in image_gen tool. Fictional scenes, not real users/testimonials or device captures. No external image host, tracking, or dependencies were added. Both final images are 1200×800 WebP assets, optimized with existing Sharp; source generations remain in the Codex generated_images folder.

## Final project assets

- `public/images/scenario-study-v1.webp`: student distracted by a phone at a desk with open books.
- `public/images/scenario-evening-v1.webp`: person scrolling on a sofa as daylight fades.

These augment the existing RealLifeScenarios section without replacing any approved hero, logo, native mockup or Quiet Horizon asset. Localized alt text and an AI-illustration caption are in `lib/content.ts`. Fixed aspect ratios and responsive Next Image sizing prevent image-loading layout shifts.

The How It Works page also now reuses existing `preview-3.png` (Deep Focus) and `preview-1.png` (cooldown) in a ProductWalkthrough section. Existing illustrative-preview disclaimers remain. These are static interface concepts, not a claim of real-device screenshots or animated system-shield countdowns.

## Final prompt set

### Study image

Use case: photorealistic-natural. Asset type: wide editorial lifestyle photograph for the existing BreakLoop iOS digital wellbeing website, not a UI screenshot. Create one refined cinematic yet natural photograph, landscape 3:2 framing. A young adult university student sits at a desk with open textbooks and a notebook, pen resting unused, looking down at a smartphone in one hand instead of studying. Authentic ordinary moment of distraction, not despair or shame. Calm home study corner, daylight through a window, off-white walls, pale wood desk, subtle indigo and lavender accents in clothing and stationery. Editorial photography with realistic anatomy, soft natural light, restrained contrast, slight film texture, candid side three-quarter viewpoint. Show clearly readable story through pose and objects; smartphone display angled away, no readable UI, no app logos. Composition should work in a wide card crop with face, phone and books within central 80%. No text, lettering, watermarks, split panels, collage, advertising layout or added graphic overlays. Respectful, human, premium, quiet mood. This is a fictional illustrative scene, not a real customer testimonial.

### Evening image

Use case: photorealistic-natural. Asset type: wide editorial lifestyle photograph for BreakLoop iOS digital wellbeing website. One landscape 3:2 photograph, calm and premium, no graphic layout. A young adult reclines comfortably on a neutral sofa, still absorbed in scrolling on a smartphone while the room has grown dim towards evening. Their relaxed posture and the untouched book nearby suggest time passing unnoticed, without sadness, blame or caricature. A window shows soft twilight, warm small lamp, pale textured sofa, natural lived-in apartment, subtle muted lavender and indigo accents. Natural editorial lifestyle photography, realistic skin and anatomy, soft cinematic natural light, restrained contrast and slight film texture. Medium-wide side viewpoint includes person, phone and window; composition keeps essential story in central 80% for responsive wide crop. Phone screen angled away, no legible UI, no logos. Match a quiet off-white/indigo/lavender website visual identity. No text, no watermarks, no visible clocks with times, no before/after split, no collage, no fake app interface or testimonial styling. This is a fictional illustrative everyday scene.

## Verification

- Typecheck, production build, release safety tests and route/image checks passed.
- Existing CSS, assets, controls and legal content preservation checks passed. The baseline test now permits new assets while checking every original asset byte-for-byte.
- Browser: 16 combinations across EN/TR Home/How It Works at 320/390/768/1440 px, no document horizontal overflow. Photos loaded successfully; scenario desktop/light, mobile/dark and app-preview desktop screenshots inspected.
- No browser warning/error entries in the inspected session. No formal Core Web Vitals, real-device Safari or screen-reader audit was run.
- Evidence: `qa/scenario-images/desktop.jpg`, `mobile-dark.jpg`, `app-previews.jpg`.
- No commit, push or deployment. Existing legal/publication gates remain active.
