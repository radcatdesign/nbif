# No Biggie, I'm Fine

A collection of stories, things, and creatures for whatever you're carrying.

One self-contained page with four views: Home, Stories, About, each story's own page, and Story mode, a book you read one page at a time. Hash routes (`#stories`, `#about`, `#story-stuck`, `#book`, `#book-stuck`) switch between views, so it runs on any static host.

## What's where

```
public/          what Vercel serves (built, don't edit by hand)
  index.html     the whole site, fonts and art inlined
  og.png         share image
src/
  template.html  styles
  markup.html    page markup
  app.js         stories, practices, routing, the book
  art/*.json     traced creature illustrations (SVG path data)
  fonts/         Covered By Your Grace, Instrument Serif, DM Mono (woff2)
  build.py       stitches it all into public/index.html
design/          original mockups
```

## Editing

1. Change `src/template.html` (styles), `src/markup.html` (page markup) or `src/app.js` (stories, practices, the book).
2. Rebuild:

   ```
   pip install numpy pillow
   python3 src/build.py
   ```

3. Commit `src/` and `public/` together and push to `main`.

Stories live in the `STORIES` list in `src/app.js`. Each story carries its own `practices`, so every story ships with what helped.

## Hosting

**Staging:** GitHub Pages at https://radcatdesign.github.io/nbif/. Every push to `main` runs `.github/workflows/pages.yml`, which publishes the `public/` folder.

**Going live:** `vercel.json` is already set up. Import this repo into Vercel (output directory `public`, no build step), then point nobiggieimfine.com at the Vercel project.

## Design rules

- Stories are always black background, white text.
- Practices are always white background, black text.
- Submissions are two steps: the story, then the practice that helped.

## Story mode

The book is paginated in the browser, so it re-flows to fit any screen: two-page spreads on wide screens, one page on phones. Stories always open on a right-hand page. Story text is set on black pages, what helped on white pages.
