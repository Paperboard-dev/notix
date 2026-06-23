export type AnyFn = (...args: any[]) => any;

export interface NotixElement {
    tag: string | ((...args: any[]) => any);
    props: Record<string, any>;
    key?: string;
}
