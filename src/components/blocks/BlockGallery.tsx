import {For} from "solid-js";
import BlockCard from "~/components/blocks/BlockCard";
import {useNavigate} from "@solidjs/router";
import BlockFactory from "~/api/block/BlockFactory";
import {AnyBlock} from "~/api/block/Block";
import BackButton from "~/components/BackButton";

export function BlockGallery(props: {
    factory: BlockFactory,
    title: string,
    type: "actions" | "conditions",
    add: (value: AnyBlock) => void
}) {
    const navigate = useNavigate()
    const metas = props.factory.getRegisteredBlockMetas();

    return (
        <main>
            <BackButton/>
            <h1 class={"text text-5xl mx-12 mt-12 font-bold"}>
                {props.title}
            </h1>
            <div class={"flex flex-col m-12"}>
                <For each={metas}>{metadata =>
                    <BlockCard
                        metadata={metadata}
                        class={"hover:scale-[1.03] transition cursor-pointer"}
                        onClick={() => {
                            if (metadata.form)
                                navigate(`/pick/${props.type}/${metadata.id}`)
                            else {
                                props.add(metadata.createWithNoParams!())
                                history.back()
                            }
                        }}
                    />
                }</For>
            </div>
        </main>
    )
}