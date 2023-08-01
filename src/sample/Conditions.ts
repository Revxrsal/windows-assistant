import {BatteryCondition} from "~/conditions/BatteryCondition";
import Condition from "~/api/condition/Condition";
import {TimeCondition} from "~/conditions/TimeCondition";

const Conditions: Condition[] = [
    new BatteryCondition({
        battery: 30
    }),
    new TimeCondition({
        time: 12
    }),
];

export default Conditions;