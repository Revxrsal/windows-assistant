import {ComponentProps, splitProps} from "solid-js";

export interface TextProps extends ComponentProps<"p"> {
    class?: string
}

export default function Text(props: TextProps) {
    const [local, pProps] = splitProps(props, ["class"]);
    return <p class={`text ${local.class || ""}`} {...pProps}/>;
}