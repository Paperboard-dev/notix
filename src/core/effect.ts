export let activeEffect: ReactiveEffect | null = null;

export interface ReactiveEffect {
    (): void;
    cleanups: Set<() => void>;
}

// Runs a function and re-runs it when any read state changes.
export function effect(fn: () => any): () => void {
    const run: ReactiveEffect = () => {
        // Unsubscribe from previous states to avoid memory leaks/stale runs
        run.cleanups.forEach((cleanup) => cleanup());
        run.cleanups.clear();

        const prevEffect = activeEffect;
        activeEffect = run;
        try {
            return fn();
        } finally {
            activeEffect = prevEffect; // Restore outer effect for nesting
        }
    };

    run.cleanups = new Set();
    run();
    return run;
}
