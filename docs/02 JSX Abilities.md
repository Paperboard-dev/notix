# JSX Abilities

When programming with JSX in Notix, there are a few things to keep in mind.

## Fragments

At the top level, JSX can only contain one element.

```tsx
app(
    <span>I'm Element 1</span>
    <span>I'm Element 2</span>
) // THIS IS INVALID!
```

To get around this, you can use a fragment, which is simply a wrapper.

```tsx
app(
    <>
        <span>I'm Element 1</span>
        <span>I'm Element 2</span>
    </>,
); // Works!
```

Fragments do not render in the DOM.

```html
<!-- Compiles to this: -->

<span>I'm Element 1</span>
<span>I'm Element 2</span>
<!-- Fragment doesn't exist here! -->
```

## References

In Notix, it's preferred to use element reference instead of `.getElementById`.

To do this, use the `ref` prop which returns a function containing a reference to the element as the first parameter.

```tsx
let divElement: Element; // Will contain a reference to the div element
return (
    <div
        ref={(e: Element) => {
            divElement = e; // Creates the reference
        }}
    ></div>
);
```

It's important to note that references and any DOM operations won't be valid until their element is mounted via `app()`.

```tsx
let divElement: Element;
let myCoolJSX = (
    <div
        ref={(e: Element) => {
            divElement = e;
        }}
    ></div>
);

console.log("Check out my cool element: " + divElement); // DOES NOT WORK! divElement never got a chance to be added to the DOM.
```

## Conditional Rendering

Entire elements can be placed inside a function, therefore ternary operations can be used to render elements.

```tsx
let show = state(true);

return (
    <>
        {() => (show() ? <p>Hello there!</p> : <p style={{color: "red"}}>GENERAL KENOBI!</p>)}
        <button onClick={() => show(!show())}>Toggle</button>
    </>,
);
```

---

**Next:** [CSS & Animation](<./03 CSS & Animation.md>)
