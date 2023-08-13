import {ComponentProps, splitProps} from "solid-js";

export interface IconButtonProps extends ComponentProps<"button"> {
    class?: string
}

export default function IconButton(props: IconButtonProps) {
    const [local, buttonProps] = splitProps(props, ["class"]);
    return <button class={`icon-button ${local.class || ""}`} {...buttonProps}/>;
}