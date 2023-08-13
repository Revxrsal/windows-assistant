import {ComponentProps, splitProps} from "solid-js";

export type ButtonVariant = "primary" | "secondary" | "outline"

export interface ButtonProps extends ComponentProps<"button"> {
    variant?: ButtonVariant,
    class?: string
}

function getClass(variant: ButtonVariant) {
    switch (variant) {
        case "secondary":
            return "secondary-button"
        case "outline":
            return "outline-button"
        case "primary":
            return "primary-button"
    }
}

export default function Button(props: ButtonProps) {
    const [local, buttonProps] = splitProps(props, ["variant", "class"]);
    return <button class={`${getClass(local.variant || "primary")} ${local.class || ""}`} {...buttonProps}/>;
}