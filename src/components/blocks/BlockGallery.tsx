import {For} from "solid-js";
import BlockCard from "~/components/blocks/BlockCard";
import BlockFactory from "~/api/block/BlockFactory";
import BlockMetadata from "~/api/block/BlockMetadata";
import Column from "~/components/layout/Column";

export function BlockGallery(props: {
    factory: BlockFactory,
    title: string,
    onBlockClick: (meta: BlockMetadata) => void
}) {
    const metas = props.factory.getRegisteredBlockMetas();

    return (
        <Column>
            <For each={metas}>{metadata =>
                <BlockCard
                    metadata={metadata}
                    class={"hover:scale-[1.02] transition cursor-pointer"}
                    onClick={() => props.onBlockClick(metadata)}
                />
            }</For>
        </Column>
    )
}