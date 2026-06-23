import { setStyle, setClass } from "../css/style";

export function setProp(element: Element, key: string, val: unknown) {
    if (key === "class" || key === "className") {
        setClass(element, val);
        return;
    }

    if (key === "style") {
        setStyle(element as HTMLElement, val);
        return;
    }

    if (key === "ref") {
        if (typeof val === "function") {
            val(element);
        } else if (val && typeof val === "object" && "current" in val) {
            (val as { current: Element }).current = element;
        }
        return;
    }

    // Prefer DOM properties for plain HTML elements (e.g. checked, disabled, value)
    if (!(element instanceof SVGElement) && key in element) {
        try {
            (element as any)[key] = val == null ? "" : val;
            return;
        } catch {
            // Read-only property fallback
        }
    }

    if (val === false || val == null) {
        element.removeAttribute(key);
    } else {
        element.setAttribute(key, String(val));
    }
}
