import BlockMetadata from "~/api/block/BlockMetadata";
import {ComponentProps, splitProps} from "solid-js";

export interface BlockCardProps extends ComponentProps<"div"> {
    class?: string
    description?: string
    metadata: BlockMetadata
}

export default function BlockCard(props: BlockCardProps) {
    const [local, divProps] = splitProps(props, ["metadata", "description", "class"])
    return <div
        class={`select-none bg-stone-200 dark:bg-stone-900
         content-center items-center py-11 m-3 min-w-[300px] 
         h-20 rounded-xl flex drop-shadow-md ${local.class || ""}`}
        {...divProps}>
        <div
            class={`${local.metadata.backgroundClass} w-16 h-16 rounded-full p-4 m-4 justify-center text-center items-center flex`}>
            <div class={"text-stone-800 fill-stone-800"}>
                {local.metadata.icon({size: 28})}
            </div>
        </div>
        <div class={"text"}>
            <p class={"font-bold text-xl"}>{local.metadata.displayName}</p>
            <p>{local.description || local.metadata.description}</p>
        </div>
    </div>
}