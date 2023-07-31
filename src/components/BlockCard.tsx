import {JSX} from "solid-js";

export interface BlockCardProps {
    icon: JSX.Element,
    class: string,
    title: string,
    description: string
}

export default function BlockCard(props: BlockCardProps) {
    return <div class="
    bg-stone-200 dark:bg-stone-900
    content-center
    items-center py-11 m-3 min-w-[300px]
    h-20 rounded-xl flex drop-shadow-md"
    >
        <div
            class={`${props.class} w-16 h-16 rounded-full p-4 m-4 justify-center text-center items-center flex`}>
            <div class={"text-stone-800 fill-stone-800"}>
                {props.icon}
            </div>
        </div>
        <div class={"text"}>
            <p class={"font-bold text-xl"}>{props.title}</p>
            <p class={""}>{props.description}</p>
        </div>
    </div>
}