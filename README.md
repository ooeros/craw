# craw

This repository hosts a simple cross-platform eBook viewer.

## Mobile app

The `app` directory contains a minimal [Expo](https://expo.dev/) React Native
project. It displays the original `Paged_v4_3_2_paper_texture_plus.html`
inside a WebView and lets you pick and read local **PDF** and **EPUB** files.

### Running

```bash
cd app
npm install
npm start
```

Use the Expo client or native builds (`npm run android` / `npm run ios`) to
launch on a device or simulator.

### Testing

No automated tests are included; running `npm test` simply prints a message.
