# Quick Start

Let's get building!

## Setting Up Notix

### 1. Set Up Vite

Run the Vite initializer and select the **Vanilla + TypeScript** template.

```
npm create vite@latest my-notix-app -- --template vanilla-ts
cd my-notix-app
npm install
```

### 2. Install Notix

Then, install the library from npm.

```bash
npm install notix
```

### 3. Configure TypeScript

Notix uses its own JSX engine, so you need to tell TypeScript to use it. Add these two lines in your `compilerOptions` in `tsconfig.json`:

```json
    "jsx": "react-jsx",
    "jsxImportSource": "notix"
```

### 4. Bind Notix

Rename `src/main.ts` to `main.tsx` (or whatever else you choose) so it can be interpreted as containing JSX code.

Then, at the root of your `index.html`, point a script to Notix.

```html
<script type="module" src="/src/main.tsx"></script>
```

Then, to tell Notix where it is, bind it to the document body in your TSX file.

```ts
import { bind } from "notix";

bind(document.body);
```

### 5. Start the Server

Run the `dev` script to start Vite.

```bash
npm run dev
```

Now, you can start coding.

## Writing JSX

JSX is like HTML inside of JavaScript. Notix takes that literally - any JSX code is literally translated to HTML.

The root of your app is always inside the app() function.

```tsx
import { bind, app } from "notix";

bind(document.body);

app(
    <div class="mainContainer">
        <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/8b/Sonic_from_Sonic_Frontiers_trailer.jpg"
            width="500"
            class="heroImage"
            alt="Sonic the hedgehog, as depicted in the Sonic Frontiers announcement trailer."
        />
        <br />
        <span style="color: blue">This is Sonic! Isn't he so cool?</span>
    </div>,
);
```

---

**Next:** [States and Effects](<./01 States & Effects.md>)
