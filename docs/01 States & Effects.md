# States & Effects

States and effects are the core of how Notix works. They're the bread and butter. The Tails and Knuckles if Notix is Sonic.

## States

States are variables with subscriptions. You can create a listener that gets notified when they change.

To create a state, import and call the `state` function with the value you want to set it to.

```ts
import { state } from "notix";

let count = state(0);
```

To change the value of a state, call its variable as a function with a value.

```ts
count(count() + 1); // count is now 1
```

To grab the value of a state, call it without a value.

```ts
count(); // returns 1
```

You can also attach listeners to states using `.on("change")`.

```ts
count.on("change", (newCount) => {
    console.log("The count has been changed to " + newCount);
});

count(count() + 1);

// "The count has been changed to 2"
```

States can be used with strings, arrays, booleans, or any other type.

## Effects

Effects run when created, then every time any state ran inside them changes, similar to listeners.

```ts
let count2 = state(0);
effect(() => {
    console.log(`COUNT STATUS: ${count()}, ${count2()}`);
});
// "COUNT STATUS: 1, 0"

count(count() + 1);
// "COUNT STATUS: 2, 0"

count2(count2() + 1);
// "COUNT STATUS: 2, 1"
```

Any TypeScript function written directly inside {curly brackets} inside JSX is automatically an effect.

```tsx
let countDisplay = (
    <span>
        Current count:
        {() => count()}
    </span>
);
// This span element will automatically update!

let badCountDisplay = (
    <span>
        Current count:
        {count()}
    </span>
);
// This span element will NOT automatically update.
```

The return value of effect is a function you can use to stop it.

```jsx
const stop = effect(() => { ... })
stop(); // Stops the effect
```

---

That's all you need to know to get started with Notix, but it has a few more features.

**Next:** [JSX Abilities](<./02 JSX Abilities.md>)
