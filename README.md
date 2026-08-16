# Ledger — E-Business Card Maker

A small React app that turns a business name/domain and a distributor's name, position,
and contact info into a downloadable digital business card (PNG).

Built with React + Tailwind CSS, inspired by
[kaydo1506/Business-Card-Creator](https://github.com/kaydo1506/Business-Card-Creator).

## Features

- Simple form for: business name, domain, distributor name, position, email, phone
- Live card preview that updates as you type
- One-click **Download as PNG** (powered by [`html-to-image`](https://github.com/bubkoo/html-to-image))
- Distinct "ledger / letterpress" card design: brass rule frame, monogram seal, typeset
  in Fraunces + Inter + IBM Plex Mono

## Setup

```bash
npm install
npm start
```

Then open http://localhost:3000.

## Build for production

```bash
npm run build
```

 The optimized static site is output to `/build`.

## Project structure

```
src/
  App.js                    # layout, state, PNG export logic
  index.js / index.css      # entry point + Tailwind directives
  components/
    BusinessForm.jsx        # the input form (business + distributor fields)
    BusinessCard.jsx        # the card itself (forwardRef target for export)
public/
  index.html                # loads Google Fonts (Fraunces / Inter / IBM Plex Mono)
tailwind.config.js           # color/type design tokens
```

## Customizing the card

- Colors, fonts, and the "ledger lines" background live in `tailwind.config.js`.
- The card layout (monogram, rule, corner ticks) lives in `src/components/BusinessCard.jsx`.
- Form fields live in `src/components/BusinessForm.jsx` — add a field there and it will
  automatically flow into `values` in `App.js`; wire it into `BusinessCard.jsx` to display it.

## License

MIT — do whatever you like with it.
