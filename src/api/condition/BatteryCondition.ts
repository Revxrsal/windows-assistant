import Condition from "~/api/condition/Condition";
import {BsBatteryHalf} from "solid-icons/bs";
import BlockMetadata from "~/api/block/BlockMetadata";
import BlockFactory from "~/api/block/BlockFactory";

const ID = "battery"

const METADATA: BlockMetadata = {
    id: ID,
    displayName: "Battery",
    description: "Triggered when the battery reaches a certain level",
    backgroundClass: "bg-yellow-500 dark:bg-yellow-300",
    icon: (props) => BsBatteryHalf(props)
}

export interface BatteryConditionData {
    battery: number
}

export class BatteryCondition implements Condition<BatteryConditionData> {

    metadata = METADATA;
    data: BatteryConditionData;

    constructor(data: BatteryConditionData) {
        this.data = data
    }

    async eval(): Promise<boolean> {
        return true
    }

    static register(factory: BlockFactory) {
        factory.register(ID, METADATA, (data) => new BatteryCondition(data))
    }

}