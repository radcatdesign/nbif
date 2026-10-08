# No Biggie, I'm Fine

A collection of stories, things, and creatures for whatever you're carrying.

One self-contained page: home, story pages with their practices, a swipe deck, a story submission page, and a shop. Hash routes (`#story-stuck`, `#deck`, `#submit`, `#store`) switch between views, so it runs on any static host.

## What's where

```
public/          what Vercel serves (built, don't edit by hand)
  index.html     the whole site, fonts and art inlined
  og.png         share image
src/
  template.html  markup and styles
  app.js         stories, practices, products, deck, forms, cart
  art/*.json     traced creature illustrations (SVG path data)
  fonts/         Covered By Your Grace, Instrument Serif, DM Mono (woff2)
  build.py       stitches it all into public/index.html
design/          original mockups
```

## Editing

1. Change `src/template.html` (layout, styles) or `src/app.js` (copy, stories, practices, products).
2. Rebuild:

   ```
   pip install numpy pillow
   python3 src/build.py
   ```

3. Commit `src/` and `public/` together and push. Vercel deploys every push to `main`.

Stories live in the `STORIES` list in `src/app.js`. Each story carries its own `practices`, so every story ships with what helped.

## Design rules

- Stories are always black background, white text.
- Practices are always white background, black text.
- Submissions are two steps: the story, then the practice that helped.

## Not wired up yet

- Story submissions and the cart don't send anywhere. Both are front-end only.
- Saved deck cards and story drafts live in the visitor's browser (localStorage).
