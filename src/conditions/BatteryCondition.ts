import Condition from "~/api/condition/Condition";
import {BATTERY_ID} from "~/api/condition/ConditionIDs";

const NAME = "Battery"
const DESC = "Triggered when the battery reaches a certain level"
const CLASS = "bg-green-600 dark:bg-green-300"

export interface BatteryConditionData {
    battery: number
}

export class BatteryCondition implements Condition {
    id = BATTERY_ID;
    name = NAME;
    description = DESC;
    class = CLASS;

    private data: BatteryConditionData;

    constructor(data: BatteryConditionData) {
        this.data = data
    }

    async eval(): Promise<boolean> {
        return true
    }
}