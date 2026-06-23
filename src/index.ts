import { state } from "./core/state";
import { effect } from "./core/effect";
import { bind, app } from "./dom/dom";
import { animate } from "./css/animate";
import { setStyle, setClass } from "./css/style";

import "./dom/dom";
import "./css/animate";

import { Fragment } from "./dom/jsx-runtime";

export { bind, app, effect, state, animate, Fragment, setStyle, setClass };
export type { StateNode } from "./core/state";
export type { AnimateOptions } from "./css/animate";
