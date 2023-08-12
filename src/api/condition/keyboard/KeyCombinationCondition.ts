import Condition from "~/api/condition/Condition";
import BlockMetadata from "~/api/block/BlockMetadata";
import BlockFactory from "~/api/block/BlockFactory";
import {FaSolidKeyboard} from "solid-icons/fa";
import KeyCombinationForm from "~/api/condition/keyboard/KeyCombinationForm";
import KeyCombinationData, {combinationToString} from "~/api/condition/keyboard/KeyboardCombinationData";
import {isCombinationPressed} from "~/api/utils/fns";

const ID = "key-combination"

const METADATA: BlockMetadata = {
    id: ID,
    displayName: "Key combination",
    description: "Triggered when a specific combination is pressed",
    backgroundClass: "bg-rose-400 dark:bg-rose-400",
    icon: (props) => FaSolidKeyboard(props),
    form: (props) => KeyCombinationForm(props)
}

export class KeyCombinationCondition implements Condition<KeyCombinationData> {

    metadata = METADATA;
    triggersOnce = true;
    data: KeyCombinationData;

    description = () => `When user presses (${combinationToString(this.data)})`

    constructor(data: KeyCombinationData) {
        this.data = data
    }

    async eval(): Promise<boolean> {
        return isCombinationPressed(this.data)
    }

    static register(factory: BlockFactory) {
        factory.register(ID, METADATA, (data) => new KeyCombinationCondition(data))
    }
}