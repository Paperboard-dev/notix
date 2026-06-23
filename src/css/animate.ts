export interface AnimateOptions {
    delay?: string | number;
    easing?: string;
    fillMode?: string;
    direction?: string;
    iterationCount?: string | number;
}

// Triggers a CSS keyframes animation by name and returns a Promise resolving on end/cancel.
export function animate(
    element: Element,
    name: string,
    duration: string | number,
    options: AnimateOptions = {},
): Promise<void> {
    return new Promise((resolve) => {
        const el = element as HTMLElement & SVGElement;

        const durStr =
            typeof duration === "number" ? `${duration}ms` : duration;
        const delayStr =
            options.delay !== undefined
                ? typeof options.delay === "number"
                    ? `${options.delay}ms`
                    : options.delay
                : "";

        // Reset animation by briefly setting name to none and forcing reflow.
        // Prevents getting stuck if the same animation is triggered again.
        el.style.animationName = "none";
        void el.offsetWidth;

        el.style.animationName = name;
        el.style.animationDuration = durStr;
        el.style.animationTimingFunction = options.easing || "";
        el.style.animationDelay = delayStr;
        el.style.animationDirection = options.direction || "";
        el.style.animationFillMode = options.fillMode || "both";
        el.style.animationIterationCount =
            options.iterationCount !== undefined
                ? String(options.iterationCount)
                : "";

        function handleEnd(event: Event) {
            const animEvent = event as AnimationEvent;
            if (
                animEvent.target === element &&
                animEvent.animationName === name
            ) {
                cleanup();
                resolve();
            }
        }

        function cleanup() {
            element.removeEventListener("animationend", handleEnd);
            element.removeEventListener("animationcancel", handleEnd);
        }

        element.addEventListener("animationend", handleEnd);
        element.addEventListener("animationcancel", handleEnd);
    });
}

// Patch Element.prototype.animate to support string-first calls (CSS keyframes)
if (typeof Element !== "undefined") {
    const nativeAnimate = Element.prototype.animate;

    Element.prototype.animate = function (
        this: Element,
        keyframesOrName: unknown,
        optionsOrDuration?: unknown,
        extraOptions?: AnimateOptions,
    ): any {
        if (typeof keyframesOrName === "string") {
            return animate(
                this,
                keyframesOrName,
                optionsOrDuration as string | number,
                extraOptions,
            );
        }
        return nativeAnimate.call(
            this,
            keyframesOrName as any,
            optionsOrDuration as any,
        );
    };
}
