import {ComponentProps, splitProps} from "solid-js";

export default function Title(props: ComponentProps<"h1">) {
    const [local, h1Props] = splitProps(props, ["class"])
    return <h1
        class={`text-6xl m-12 font-bold text ${local.class || ""}`}
        aria-label="title"
        {...h1Props}
    />;
}