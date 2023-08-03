import {AnyCondition} from "~/api/condition/Condition";
import {AnyAction} from "~/api/action/Action";
import Routine from "~/api/routine/Routine";
import {BatteryCondition} from "~/api/condition/BatteryCondition";
import {TimeCondition} from "~/api/condition/TimeCondition";
import BeepAction from "~/api/action/BeepAction";

export const Conditions: AnyCondition[] = [
    new BatteryCondition({
        battery: 30
    }),
    new TimeCondition({
        time: 12
    }),
];

export const Actions: AnyAction[] = [
    new BeepAction()
]

export const Routines: Routine[] = [
    {
        name: "Sample",
        actions: Actions,
        conditions: Conditions
    }
]