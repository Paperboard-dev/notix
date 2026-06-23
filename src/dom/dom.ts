import { NotixElement } from "../types";
import { mount, setDocument } from "./mount";

export { mount };

// Simple EventTarget.on listener helper
if (typeof EventTarget !== "undefined" && !("on" in EventTarget.prototype)) {
    Object.defineProperty(EventTarget.prototype, "on", {
        value: function (
            this: EventTarget,
            event: string,
            handler: EventListenerOrEventListenerObject,
            options?: boolean | AddEventListenerOptions
        ) {
            this.addEventListener(event, handler, options);
            return this;
        },
        configurable: true,
        writable: true,
    });
}

let _root: Element | null = null;

export function bind(element: HTMLElement) {
    _root = element;
    setDocument(element.ownerDocument || document);
}

export function app(tree: NotixElement) {
    if (!_root) {
        bind(document.body);
    }
    mount(tree, _root!);
}
