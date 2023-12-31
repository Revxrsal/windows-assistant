import BlockMetadata from "~/api/block/BlockMetadata";
import {ComponentProps, JSX, JSXElement, splitProps} from "solid-js";
import {BsTrash} from "solid-icons/bs";

export interface BlockCardProps extends ComponentProps<"div"> {
    class?: string
    description?: string
    metadata: BlockMetadata
    icon?: JSX.Element
}

export default function BlockCard(props: BlockCardProps) {
    const [local, divProps] = splitProps(props, ["metadata", "description", "class"])
    return <div
        class={`select-none bg-stone-200 dark:bg-stone-900 m-3
         content-center items-center justify-between
         h-20 rounded-xl flex drop-shadow-md ${local.class || ""}`}
        {...divProps}>
        <div class={"flex justify-center items-center"}>
            <div
                class={`${props.metadata.backgroundClass} w-16 h-16 rounded-full p-4 m-4 justify-center
             text-center items-center flex`}>
                <div class={"text-stone-800 fill-stone-800"}>
                    {props.metadata.icon({size: 28})}
                </div>
            </div>
            <div class={"text"}>
                <p class={"font-bold text-xl"}>{local.metadata.displayName}</p>
                <p>{props.description || props.metadata.description}</p>
            </div>
        </div>
        {props.icon}
    </div>
}