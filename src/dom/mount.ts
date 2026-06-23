import { NotixElement } from "../types";
import { effect } from "../core/effect";
import { setProp } from "./props";

let _document: Document = typeof document !== "undefined" ? document : (null as any);

export function setDocument(doc: Document) {
    _document = doc;
}

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

const SVG_ROOT_TAGS = new Set([
    "svg", "circle", "path", "g", "line", "rect", "ellipse", "polygon", "polyline", 
    "text", "tspan", "defs", "linearGradient", "radialGradient", "stop", "clipPath",
    "mask", "pattern", "image", "use", "symbol", "animate", "filter", "foreignObject"
]);

function isSvgTag(tag: string, parent: Element | null): boolean {
    if (SVG_ROOT_TAGS.has(tag)) return true;
    if (parent?.namespaceURI === SVG_NAMESPACE) return true;
    return false;
}

export function isNotixElement(obj: unknown): obj is NotixElement {
    return (
        obj !== null &&
        typeof obj === "object" &&
        "tag" in (obj as object) &&
        "props" in (obj as object)
    );
}

// Main recursive mount function
export function mount(value: unknown, parent: Element, anchor: Node | null = null): Node[] {
    if (value === null || value === undefined || typeof value === "boolean") {
        return [];
    }

    if (Array.isArray(value)) {
        return value.flatMap((item) => mount(item, parent, anchor));
    }

    // Functions are treated as reactive content. We wrap them in marker comments.
    if (typeof value === "function") {
        const start = _document.createComment("$");
        const end = _document.createComment("/$");
        parent.insertBefore(start, anchor);
        parent.insertBefore(end, anchor);

        effect(() => {
            if (!start.parentNode) return;

            // Clear old nodes inside markers
            let node = start.nextSibling;
            while (node && node !== end) {
                const next = node.nextSibling;
                parent.removeChild(node);
                node = next;
            }

            // Mount new content
            mount((value as () => unknown)(), parent, end);
        });

        return [start, end];
    }

    if (isNotixElement(value)) {
        if (typeof value.tag === "function") {
            return mount(value.tag(value.props), parent, anchor);
        }

        const tag = value.tag as string;
        const props = value.props ?? {};

        const el = isSvgTag(tag, parent)
            ? _document.createElementNS(SVG_NAMESPACE, tag)
            : _document.createElement(tag);

        Object.entries(props).forEach(([key, propVal]) => {
            if (key === "children") return;

            if (key.startsWith("on") && key.length > 2 && typeof propVal === "function") {
                const eventName = key.slice(2).toLowerCase();
                el.addEventListener(eventName, propVal as EventListener);
            } else if (typeof propVal === "function" && key !== "ref") {
                effect(() => {
                    setProp(el, key, (propVal as () => unknown)(), effect);
                });
            } else {
                setProp(el, key, propVal, effect);
            }
        });

        if ("children" in props) {
            mount(props.children, el);
        }

        parent.insertBefore(el, anchor);
        return [el];
    }

    const text = _document.createTextNode(String(value));
    parent.insertBefore(text, anchor);
    return [text];
}
