# Extras

That's the gist of it, but Notix has a few more extra features that you may find useful.

## Components

You can create entire reusable components, a major departure from `.appendChild()` hell. To do this, define a function starting with a capital letter.

```tsx
function ReusableButton() {
    return (
        <button
            onClick={() => {
                console.log("Button clicked.");
            }}
        >
            Click me to log to the console.
        </button>
    );
}

return (
    <>
        <ReusableButton />
        <ReusableButton />
        <ReusableButton />
    </>,)
```

Any parameters in a component are their props. The prop `children` will always be the component's children. If there is more than one child, it will be an array.

```tsx
interface ReusableInputProps {
    color: string;
    children: any;
}
function ReusableDiv({ color, children }: ReusableInputProps) {
    return (
        <div placeholder={color} style={{ background: color }}>
            {children}
        </div>
    );
}
return (
    <>
        <ReusableDiv color="lightblue">
            <span>I love being reusable.</span>
        </ReusableDiv>
    </>,
);
```

## Aliases

Notix has an alias for addEventListener, and it is simply `.on()`

```tsx
button.on("click", () => { ... })
```

## SVGs

Notix fully supports using SVGs inline, and they support all standard Notix features like states and effects.

```tsx
const r = state(25);

return (
    <>
        <svg width="100" height="100">
            <circle cx="50" cy="50" r={() => String(r())} fill="steelblue" />
        </svg>
        <input
            type="range"
            min="0"
            max="50"
            value={String(r())}
            onInput={(e: InputEvent) => {
                r(Number((e.target as HTMLInputElement).value));
            }}
        />
    </>
);
```

---

### Congratulations!

With that, you are ready to start building intuitive, beautiful apps with Notix. Just a few last things to keep in mind:

- **Be mindful:** With great power comes great responsibility. Notix is still built over Vanilla at the end of the day.
- **Be patient:** Programming isn't easy.
- **Have fun:** Optional but recommended. Not always possible.

Good luck! (You won't need it.)
