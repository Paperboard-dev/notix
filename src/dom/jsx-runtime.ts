import { NotixElement } from "../types";

export function jsx(tag: any, props: any, key?: string): NotixElement {
    return { tag, props, key };
}

export function jsxs(tag: any, props: any, key?: string): NotixElement {
    return jsx(tag, props, key);
}

export function Fragment(props: { children?: any }): any {
    return props.children;
}

export declare namespace JSX {
    type Element = NotixElement;
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}
