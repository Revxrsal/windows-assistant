import {JSX} from "solid-js";

export interface BlockIconProps {
    class: string,
    icon: JSX.Element
}

export default function BlockIcon(props: BlockIconProps) {
    return <div
        class={`${props.class} w-16 h-16 rounded-full p-4 m-4 justify-center text-center items-center flex`}>
        <div class={"text-stone-800 fill-stone-800"}>
            {props.icon}
        </div>
    </div>
}