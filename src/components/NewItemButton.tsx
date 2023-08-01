import BlockIcon from "~/components/blocks/BlockIcon";
import {BsPlusLg} from "solid-icons/bs";

export default function NewItemButton() {
    return <button
        class="bg-stone-200 dark:bg-stone-900
            content-center items-center
            opacity-50
            outline-dotted outline-stone-400
            text font-semibold
            py-11 m-3
            h-20 min-w-[300px]
            rounded-xl
            flex drop-shadow-md">
        <BlockIcon icon={<BsPlusLg size={28}/>} class="bg-green-200 dark:bg-green-300"/>
        <span class="text-xl">Add condition...</span>
    </button>
}