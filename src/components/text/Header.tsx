import {ComponentProps, splitProps} from "solid-js";

/**
 * Since PostCSS will delete unused classes, it may delete
 * them since we evaluate them at runtime. Keeping this here
 * will tell PostCSS that it is being used
 */
// noinspection JSUnusedLocalSymbols
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
const _sizes = "text-xl text-2xl text-3xl text-4xl text-5xl text-6xl"

export interface TitleProps extends ComponentProps<"h1"> {
    size: 1 | 2 | 3 | 4 | 5 | 6
}

export default function Header(props: TitleProps) {
    const [local, h1Props] = splitProps(props, ["size", "class"])
    return <h1
        class={`text-${props.size == 1 ? "" : props.size}xl m-12 font-bold text ${local.class || ""}`}
        aria-label="title"
        {...h1Props}
    />;
}