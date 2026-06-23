import { jsx } from "./jsx-runtime";

export function jsxDEV(tag: any, props: any, key: any, ...ignoredDevArgs: any[]): any {
    return jsx(tag, props, key);
}

export { Fragment } from "./jsx-runtime";
export type { JSX } from "./jsx-runtime";
