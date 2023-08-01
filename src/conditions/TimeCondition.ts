import Condition from "~/api/condition/Condition";
import {TIME_ID} from "~/api/condition/ConditionIDs";

const NAME = "Time"
const DESC = "Triggered on specific times"
const CLASS = "bg-sky-600 dark:bg-sky-300"

export interface TimeConditionData {
    time: number
}

export class TimeCondition implements Condition {
    id = TIME_ID
    name = NAME;
    description = DESC;
    class = CLASS;

    private data: TimeConditionData;

    constructor(data: TimeConditionData) {
        this.data = data
    }

    async eval(): Promise<boolean> {
        return true
    }
}