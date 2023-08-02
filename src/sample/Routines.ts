import {BatteryCondition} from "~/conditions/BatteryCondition";
import Condition from "~/api/condition/Condition";
import {TimeCondition} from "~/conditions/TimeCondition";
import Action from "~/api/action/Action";
import {BEEP_ACTION} from "~/api/action/BeepAction";

export const Conditions: Condition[] = [
    new BatteryCondition({
        battery: 30
    }),
    new TimeCondition({
        time: 12
    }),
];

export const Actions: Action[] = [
    BEEP_ACTION
]