import {BatteryCondition} from "~/conditions/BatteryCondition";
import {TimeCondition} from "~/conditions/TimeCondition";
import {registerCondition} from "~/api/condition/ConditionFactory";

export const BATTERY_ID = "battery"
export const TIME_ID = "time"

registerCondition(BATTERY_ID, (data) => new BatteryCondition(data))
registerCondition(TIME_ID, (data) => new TimeCondition(data))
