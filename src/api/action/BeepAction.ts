import {BasicAction} from "~/api/action/Action";
import {invoke} from "@tauri-apps/api";
import {FaSolidVolumeHigh} from "solid-icons/fa";
import BlockMetadata from "~/api/block/BlockMetadata";
import BlockFactory from "~/api/block/BlockFactory";

const ID = "beep"

const METADATA: BlockMetadata = {
    id: ID,
    displayName: "Beep",
    description: "Plays a beep sound",
    backgroundClass: "bg-sky-500 dark:bg-sky-300",
    icon: (props) => FaSolidVolumeHigh(props)
}

export default class BeepAction implements BasicAction {

    metadata = METADATA;

    async execute(): Promise<void> {
        return invoke("beep")
    }

    static register(factory: BlockFactory) {
        factory.register(ID, METADATA, () => new BeepAction());
    }
}