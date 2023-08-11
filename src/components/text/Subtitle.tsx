import {ComponentProps} from "solid-js";
import Title from "~/components/text/Title";

export default function Subtitle(props: ComponentProps<"h1">) {
    return <Title class={"text-4xl"} {...props}/>
}