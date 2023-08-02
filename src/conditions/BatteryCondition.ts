import Condition from "~/api/condition/Condition";
import {BATTERY_ID} from "~/api/condition/ConditionIDs";
import {BsBatteryHalf} from "solid-icons/bs";
import {IconProps} from "solid-icons";

const NAME = "Battery"
const DESC = "Triggered when the battery reaches a certain level"
const CLASS = "bg-yellow-500 dark:bg-yellow-300"
const ICON = (props: IconProps) => BsBatteryHalf(props)

export interface BatteryConditionData {
    battery: number
}

export class BatteryCondition implements Condition {
    id = BATTERY_ID;
    displayName = NAME;
    description = DESC;
    backgroundClass = CLASS;
    icon = ICON

    private data: BatteryConditionData;

    constructor(data: BatteryConditionData) {
        this.data = data
    }

    async eval(): Promise<boolean> {
        return true
    }
}