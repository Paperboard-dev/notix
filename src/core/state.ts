import { activeEffect } from "./effect";

export interface StateNode<T> {
    (): T;
    (newValue: T): void;
    on(eventType: "change", fn: (value: T) => void): void;
}

export function state<T>(initialValue: T): StateNode<T> {
    let _value = initialValue;
    const subscribers = new Set<() => void>();
    const eventListeners = new Map<string, Set<Function>>();

    const stateFn = function (newValue?: T) {
        if (arguments.length === 0) {
            // Getter: subscribe active effect
            if (activeEffect) {
                subscribers.add(activeEffect);
                const capturedEffect = activeEffect;
                activeEffect.cleanups.add(() => {
                    subscribers.delete(capturedEffect);
                });
            }
            return _value;
        }

        // Setter: update value and notify subscribers/listeners
        if (_value === newValue) return;
        _value = newValue!;

        // Snapshot to avoid issues if subscribers mutate subscribers mid-loop
        Array.from(subscribers).forEach((fn) => fn());
        eventListeners.get("change")?.forEach((fn) => fn(_value));
    };

    stateFn.on = function (eventType: "change", fn: (value: T) => void) {
        if (!eventListeners.has(eventType)) {
            eventListeners.set(eventType, new Set());
        }
        eventListeners.get(eventType)!.add(fn);
    };

    return stateFn as unknown as StateNode<T>;
}
