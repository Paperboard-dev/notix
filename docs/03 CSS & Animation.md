# CSS and Animation

At this point, you have gotten comfortable with Notix's states and effects, and well as JSX and its abilities. Now, you can create beautiful designs with CSS!

Notix has a few functions that make working with CSS significantly easier.

## Importing Styles

Styles can be imported directly in your TypeScript file.

```ts
import "./styles.css";
```

This applies the styles globally.

## CSS Modules

Giving a CSS file the extension of `.module.css` makes it a CSS module, meaning its classes are only applied in the files where it's imported, so they won't conflict with other classes with the same names.

However, they are imported and used slightly differently.

```ts
import "./globalStyles.css"; // Contains globalClass
import styles from "./styles.module.css"; // Contains coolClass
```

`styles` is an object containing classes. You can apply classes by referencing their class names within the object.

```tsx
<div class={`globalClass ${styles.coolClass}`}></div>
// globalClass can be used everywhere
// coolClass can only be used in this file
```

Without CSS modules, if two files import CSS files that both have `.button` classes, they will overlap and cause conflict with each other. With CSS modules, every CSS file can have a `.button` class and they'll never overlap.

> _Note:_ when you expect an element with a CSS module in your browser, the classes will look something like `coolClass_a8f3c`. That's how CSS modules work - it guarantees they won't collide. You don't have to worry about this, it happens behind the scenes.

## Reactive Styles & Classes

You can set a CSS property to a function to put just that property in an effect, so it changes automatically.

```tsx
let blurriness = state(0);

let blurryText: Element;
return (
    <>
        <div
            ref={(e: Element) => {
                blurryText = e;
            }}
            style={{
                filter: () => `blur(${blurriness()}px)`, // With effect, automatically changes
                fontFamily: "sans-serif", // without effect
            }}
        >
            This text is {() => blurriness()}px blurry.
        </div>

        <input // Change blurriness
            type="range"
            min="0"
            max="5"
            value={String(blurriness())}
            onInput={(e: InputEvent) => {
                blurriness(Number((e.target as HTMLInputElement).value));
            }}
        />
    </>,
);
```

Classes can also be reactive in the same way.

```css
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.coolClass {
    color: red;
    font-family: monospace;
    width: fit-content;
    animation: rotate 1s infinite linear;
}
```

```tsx
let hasCoolClass = state(false);

let changingText: Element;
return (
    <div
        ref={(e: Element) => {
            changingText = e;
        }}
        class={() => ({ // Wrap the class list in a function!
            coolClass: hasCoolClass(),
        })}
        onClick={() => {
            hasCoolClass(!hasCoolClass()); // Toggles itself
        }}
    >
        Click me to toggle my cool effect. B)
    </div>,
);
```

## Animations

If you have CSS animations, Notix can trigger them with a single function!

```css
/* Imaginary CSS File */
@keyframes pulse {
    50% {
        transform: scale(1.25);
    }
}
.animatable {
    background: purple;
    color: white;
    will-change: transform;
}
```

```tsx
let animatable: Element;
return (
    <p
        class="animatable"
        ref={(e: Element) => {
            animatable = e;
        }}
        onClick={() => animate(animatable, "pulse", 300)}
        // Runs `@keyframes pulse` for 300 milliseconds.
    >
        Click me and I'll pulse!
    </p>
);
```

You can also use other CSS animation parameters.

```ts
animate(animatable, "pulse", 300, {
    delay: 500 // Wait 500ms before playing
    easing: "ease-in" // Ease in, but not out
    fillMode: "forwards" // Persist styles after animation completes
    direction: "reverse" // Play the animation in reverse
    iterationCount: 5 // Loop the animation 5 times in a row
})
```

## Set Class & Style

Notix has functions for setting styles and classes.

### setClass()

Write an object of classes with boolean values, and Notix will apply them to the element specified.

```ts
import { setClass } from "notix";

setClass(element, {
    myClass: true,
    iHateThisClass: false,
});
```

### setStyle()

Same concept.

```ts
setStyle(element, {
    border: "3px dashed #ff0000",
    padding: "15px",
});
```

---

**Next:** [Extras](<./04 Extras.md>)
