declare module "notix/jsx-runtime" {
    export function jsx(tag: any, props: any, key?: string): any;
    export function jsxs(tag: any, props: any, key?: string): any;
    export function Fragment(props: { children?: any }): any;
    export namespace JSX {
        export interface Element {
            tag: any;
            props: any;
        }
        export interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
}

declare module "notix/jsx-dev-runtime" {
    export function jsxDEV(tag: any, props: any, key: any, ...ignoredDevArgs: any[]): any;
    export { Fragment } from "notix/jsx-runtime";
    export * from "notix/jsx-runtime";
}

declare module "*.css" {}

declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
}

interface EventTarget {
    on(
        event: string,
        handler: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions
    ): this;
}

interface Element {
    animate(
        name: string,
        duration: string | number,
        options?: import("./css/animate").AnimateOptions
    ): Promise<void>;
}
