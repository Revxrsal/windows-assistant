import Condition from "~/api/condition/Condition";
import {BsClockFill} from "solid-icons/bs";
import BlockMetadata from "~/api/block/BlockMetadata";
import BlockFactory from "~/api/block/BlockFactory";

const ID = "time"

const METADATA: BlockMetadata = {
    id: ID,
    displayName: "Time",
    backgroundClass: "bg-sky-400 dark:bg-sky-300",
    description: "Triggered on specific times",
    icon: (props) => BsClockFill(props)
}

export interface TimeConditionData {
    time: number
}

export class TimeCondition implements Condition<TimeConditionData> {

    metadata = METADATA;

    public data: TimeConditionData;

    constructor(data: TimeConditionData) {
        this.data = data
    }

    async eval(): Promise<boolean> {
        return true
    }

    static register(factory: BlockFactory) {
        factory.register(ID, METADATA, (data) => new TimeCondition(data))
    }
}