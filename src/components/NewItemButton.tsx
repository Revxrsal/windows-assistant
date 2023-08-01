import BlockIcon from "~/components/blocks/BlockIcon";
import {BsPlusLg} from "solid-icons/bs";

export interface NewItemButtonProps {
    text: string
    class: string
}

export default function NewItemButton(props: NewItemButtonProps) {
    return <button
        class="bg-stone-200 dark:bg-stone-900
            content-center items-center
            opacity-60
            outline-dotted outline-stone-400
            text font-semibold
            py-11 m-3
            h-20 min-w-[300px]
            rounded-xl
            flex drop-shadow-md">
        <BlockIcon icon={<BsPlusLg size={28}/>} class={props.class}/>
        <span class="text-xl">{props.text}</span>
    </button>
}