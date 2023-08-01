import BlockIcon from "~/components/blocks/BlockIcon";
import {BsPlusLg} from "solid-icons/bs";
import {ComponentProps, splitProps} from "solid-js";

export interface NewItemButtonProps extends ComponentProps<"button"> {
    text: string
    class: string
}

export default function NewItemButton(props: NewItemButtonProps) {
    const [local, ...[buttonProps]] = splitProps(props, ["text", "class"])
    return <button
        class="bg-stone-200 dark:bg-stone-900
            content-center items-center
            opacity-60
            outline-dotted outline-stone-400
            text font-semibold
            py-11 m-3
            h-20 min-w-[300px]
            rounded-xl
            flex drop-shadow-md" {...buttonProps}>
        <BlockIcon icon={<BsPlusLg size={28}/>} class={local.class}/>
        <span class="text-xl">{local.text}</span>
    </button>
}