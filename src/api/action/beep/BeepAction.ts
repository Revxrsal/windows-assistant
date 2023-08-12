import {BasicAction} from "~/api/action/Action";
import {FaSolidVolumeHigh} from "solid-icons/fa";
import BlockMetadata from "~/api/block/BlockMetadata";
import BlockFactory from "~/api/block/BlockFactory";
import {beep} from "~/api/utils/fns";

const ID = "beep"

const METADATA: BlockMetadata = {
    id: ID,
    displayName: "Beep",
    description: "Plays a beep sound",
    backgroundClass: "bg-sky-500 dark:bg-sky-300",
    icon: (props) => FaSolidVolumeHigh(props),
    createWithNoParams: () => new BeepAction()
}

export default class BeepAction implements BasicAction {

    metadata = METADATA;
    description = () => "Play a beep sound";

    async execute(): Promise<void> {
        return beep()
    }

    static register(factory: BlockFactory) {
        factory.register(ID, METADATA, () => new BeepAction());
    }
}