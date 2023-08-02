import BlockMetadata from "~/api/block/BlockMetadata";

export interface BlockCardProps {
    metadata: BlockMetadata
}

export default function BlockCard(props: BlockCardProps) {
    return <div class="
    bg-stone-200 dark:bg-stone-900
    content-center
    items-center py-11 m-3 min-w-[300px]
    h-20 rounded-xl flex drop-shadow-md"
    >
        <div
            class={`${props.metadata.backgroundClass} w-16 h-16 rounded-full p-4 m-4 justify-center text-center items-center flex`}>
            <div class={"text-stone-800 fill-stone-800"}>
                {props.metadata.icon({size: 28})}
            </div>
        </div>
        <div class={"text"}>
            <p class={"font-bold text-xl"}>{props.metadata.displayName}</p>
            <p>{props.metadata.description}</p>
        </div>
    </div>
}