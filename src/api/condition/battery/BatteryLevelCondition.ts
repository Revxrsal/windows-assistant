import Condition from "~/api/condition/Condition";
import {BsBatteryHalf} from "solid-icons/bs";
import BlockMetadata from "~/api/block/BlockMetadata";
import BlockFactory from "~/api/block/BlockFactory";
import BatteryLevelForm from "~/api/condition/battery/BatteryLevelForm";
import {getBattery} from "~/api/utils/fns";

const ID = "battery-level"

export interface BatteryConditionData {
    battery: number
}

const METADATA: BlockMetadata = {
    id: ID,
    displayName: "Battery level",
    description: "Triggered when the battery reaches a certain level",
    backgroundClass: "bg-yellow-500 dark:bg-yellow-300",
    icon: (props) => BsBatteryHalf(props),
    form: (props) => BatteryLevelForm(props)
}

export class BatteryLevelCondition implements Condition<BatteryConditionData> {

    metadata = METADATA;
    triggersOnce = true;
    data: BatteryConditionData;

    description = () => `When battery reaches ${this.data.battery}%`

    constructor(data: BatteryConditionData) {
        this.data = data
    }

    async eval(): Promise<boolean> {
        const battery = await getBattery() * 100
        return battery <= this.data.battery
    }

    static register(factory: BlockFactory) {
        factory.register(ID, METADATA, (data) => new BatteryLevelCondition(data))
    }
}