[![npm](https://img.shields.io/npm/v/notix)](https://npmjs.com/package/notix)

<p align="center"><img src="./branding/notixwordmark.svg" width="100" alt="Notix logo"></p>

---

Notix is a UI framework for the web that contains many of the basic benefits of a reactive framework, while keeping the simplicity and familiarity of Vanilla HTML/CSS/JS.

- **Direct DOM updates:** What you see is what you get. Notix directly uses the HTML DOM tree, and doesn't rerender entire elements by default. Therefore, you can interact with the elements themselves.
- **CSS friendly:** Notix is built to work great with CSS. Animations and variables are very simple to implement.
- **TypeScript friendly:** Notix is written in TypeScript and works great when using it.
- **Small footprint:** Notix is incredibly lightweight and has a small bundle size (4kb minified, 1.7kb gzipped), making it great for small-to-medium projects.

Getting started is super simple.

```tsx
import { state, app, bind } from "notix";

bind(document.body);

const count = state(0);

app(
    <button onClick={() => count(count() + 1)}>
        Clicked {() => count()} times
    </button>,
);
```

## Docs

I know you're excited to start coding, and the good news is..._that won't take long!_ Notix is very easy to get started with and you can be coding your first app in minutes.

- [Quick Start](<./docs/00 Quick Start.md>)
- [States & Effects](<./docs/01 States & Effects.md>)
- [JSX Abilities](<./docs/02 JSX Abilities.md>)
- [CSS & Animation](<./docs/03 CSS & Animation.md>)
- [Extras](<./docs/04 Extras.md>)

## Contributing

Feel free to submit Issues or Pull Requests! This project is in its earliest of early stages and any feedback does wonders.

## License

Notix is [MIT licensed](./LICENSE).
