/* eslint-disable @typescript-eslint/no-namespace */
import {JSX} from "solid-js";
import Accessor = JSX.Accessor;

export type Directive<P = true> = (el: Element, props: P) => void

declare module "solid-js" {
    namespace JSX {
        interface Directives {
            clickOutside: () => void;
        }
    }
}