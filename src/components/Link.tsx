import {ComponentProps} from "solid-js";
import {A} from "solid-start";

export default function Link(props: ComponentProps<typeof A>) {
    return <A class="text-sky-600 hover:underline" {...props}/>
}