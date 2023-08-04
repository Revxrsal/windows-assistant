/* eslint-disable @typescript-eslint/no-explicit-any */
import {onCleanup} from "solid-js";
import {Directive} from "~/components/directive/index";

export const clickOutside: Directive<VoidFunction> = (el, callback) => {
    const onClick = (e: MouseEvent) => {
        if (e.target instanceof Element && !el.contains(e.target))
            callback();
    };
    document.body.addEventListener("click", onClick);
    onCleanup(() => document.body.removeEventListener("click", onClick))
}
