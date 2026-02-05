# Specification

## Summary
**Goal:** Build a ready-to-use “KDS Ai Image Generator Pro” app with a responsive dark-studio UI, a dashboard linking to a catalog of AI-style image tools, local/offline processing previews, and authenticated project persistence.

**Planned changes:**
- Create the app shell (header + responsive sidebar/top nav), consistent layout, and a dashboard page that links to all tools.
- Implement a Tools catalog with dedicated pages/routes for: Logo Maker, Mockup Creator, Mini World Generator, Barbershop Stylist, Outpainting, POV Hand Creator, Background Removal, AI Retouch, Product Photographer, Sketch & Pencil Art, Wedding & Prewedding Editor, ID Photo Booth, Architectural Design Visualizer, Maternity Photo Editor, Big Head Caricature Generator, Infographic Poster Creator, Photo Restoration, Fashion Model Generator, Banner Design, Baby & Kids Photo Editor, Religious Event Photo Editor, Graduation Photo Editor, Age Transformation Filter, Magic Eraser, Collage Maker, and Filter Usia (Age Filter).
- For each tool page: add a preset selector (≥5 unique presets), an “Advanced settings” area (≥8 mixed input fields), and a per-tool reset-to-default action.
- Provide a unified Workspace on every tool page with Input (upload and/or blank canvas where relevant), Preview, and Output sections with PNG export; clearly mark required vs optional inputs and show English validation messaging when required uploads are missing.
- Implement offline-capable, client-side processing for every tool using Canvas/Web APIs; label approximate results as “Local processing preview”.
- Add authenticated backend persistence for saved projects/tool runs (tool type, preset, config values, timestamps, input/output asset references/metadata) with “My Projects” list, view, rename, and delete; restoring saved preset/config when reopening.
- Add an English-only “How it works” help section on every tool page describing inputs, presets, and advanced settings (no external AI/provider claims).
- Apply a consistent “dark studio” theme across the app (charcoal/graphite base, warm accent like amber/coral, high-contrast panels, subtle grain texture) and avoid a blue/purple primary theme.
- Include generated static brand assets (app logo + dashboard hero/banner background) stored under `frontend/public/assets/generated` and referenced directly by the frontend.

**User-visible outcome:** Users can navigate a multi-tool image studio, configure each tool via presets and advanced settings, run local/offline processing with live preview and PNG export, and (when signed in) save, reopen, rename, and delete their tool runs/projects.
