import {JSX} from "solid-js";

export interface TextProps extends JSX.HTMLAttributes<HTMLParagraphElement> {
}

export function Text(props: TextProps) {
    return <p class="text-black dark:text-white" {...props}/>
}