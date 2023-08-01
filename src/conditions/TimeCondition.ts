import Condition from "~/api/condition/Condition";
import {TIME_ID} from "~/api/condition/ConditionIDs";
import {IconProps} from "solid-icons";
import {BsClockFill} from "solid-icons/bs";

const NAME = "Time"
const DESC = "Triggered on specific times"
const CLASS = "bg-sky-400 dark:bg-sky-300"
const ICON = (props: IconProps) => BsClockFill(props)

export interface TimeConditionData {
    time: number
}

export class TimeCondition implements Condition {
    id = TIME_ID
    name = NAME;
    description = DESC;
    backgroundClass = CLASS;
    icon = ICON

    private data: TimeConditionData;

    constructor(data: TimeConditionData) {
        this.data = data
    }

    async eval(): Promise<boolean> {
        return true
    }
}