import {For} from "solid-js";
import BlockCard from "~/components/blocks/BlockCard";
import {useNavigate} from "@solidjs/router";
import BlockFactory from "~/api/block/BlockFactory";
import {AnyBlock} from "~/api/block/Block";
import BackButton from "~/components/BackButton";
import BlockMetadata from "~/api/block/BlockMetadata";

export function BlockGallery(props: {
    factory: BlockFactory,
    title: string,
    onBlockClick: (meta: BlockMetadata) => void
}) {
    const navigate = useNavigate()
    const metas = props.factory.getRegisteredBlockMetas();

    return (
        <div class={"flex flex-col"}>
            <For each={metas}>{metadata =>
                <BlockCard
                    metadata={metadata}
                    class={"hover:scale-[1.02] transition cursor-pointer"}
                    onClick={() => props.onBlockClick(metadata)}
                />
            }</For>
        </div>
    )
}