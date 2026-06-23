import { effect } from "../core/effect";

export function toKebab(key: string): string {
    return key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

export function setStyleProp(
    element: HTMLElement | SVGElement,
    key: string,
    val: unknown,
) {
    const elStyle = (element as HTMLElement).style;
    if (!elStyle) return;

    const valueStr = val == null || val === "" ? "" : String(val);

    if (key.startsWith("--")) {
        elStyle.setProperty(key, valueStr);
    } else {
        elStyle.setProperty(toKebab(key), valueStr);
    }
}

export function setStyle(element: HTMLElement | SVGElement, styleVal: unknown) {
    if (typeof styleVal === "string") {
        element.setAttribute("style", styleVal);
        return;
    }

    if (typeof styleVal === "object" && styleVal !== null) {
        Object.entries(styleVal as Record<string, unknown>).forEach(
            ([key, propVal]) => {
                if (typeof propVal === "function") {
                    effect(() => {
                        setStyleProp(
                            element,
                            key,
                            (propVal as () => unknown)(),
                        );
                    });
                } else {
                    setStyleProp(element, key, propVal);
                }
            },
        );
    }
}

export function setClass(element: Element, val: unknown): void {
    let classStr = "";

    if (Array.isArray(val)) {
        classStr = val.filter(Boolean).join(" ");
    } else if (typeof val === "object" && val !== null) {
        classStr = Object.entries(val as Record<string, unknown>)
            .filter(([, enabled]) => !!enabled)
            .map(([className]) => className)
            .join(" ");
    } else {
        classStr = val ? String(val) : "";
    }

    if (classStr) {
        element.setAttribute("class", classStr);
    } else {
        element.removeAttribute("class");
    }
}
