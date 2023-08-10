import Condition from "~/api/condition/Condition";
import {BsBatteryHalf} from "solid-icons/bs";
import BlockMetadata from "~/api/block/BlockMetadata";
import BlockFactory from "~/api/block/BlockFactory";
import BatteryForm from "~/api/condition/battery/BatteryForm";
import {invoke, tauri} from "@tauri-apps/api";

const ID = "battery"

export interface BatteryConditionData {
    battery: number
}

const METADATA: BlockMetadata = {
    id: ID,
    displayName: "Battery level",
    description: "Triggered when the battery reaches a certain level",
    backgroundClass: "bg-yellow-500 dark:bg-yellow-300",
    icon: (props) => BsBatteryHalf(props),
    form: (props) => BatteryForm(props)
}

export class BatteryCondition implements Condition<BatteryConditionData> {

    metadata = METADATA;
    triggersOnce = true;
    data: BatteryConditionData;

    description = () => `When battery reaches ${this.data.battery}%`

    constructor(data: BatteryConditionData) {
        this.data = data
    }

    async eval(): Promise<boolean> {
        const battery = (await invoke("get_battery") as number) * 100
        console.log("Battery: ", battery, "%")
        return battery <= this.data.battery
    }

    static register(factory: BlockFactory) {
        factory.register(ID, METADATA, (data) => new BatteryCondition(data))
    }
}