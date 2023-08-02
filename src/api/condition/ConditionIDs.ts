import {BatteryCondition} from "~/conditions/BatteryCondition";
import {TimeCondition} from "~/conditions/TimeCondition";
import ItemFactory from "~/api/common/ItemFactory";
import Condition from "~/api/condition/Condition";

export const BATTERY_ID = "battery"
export const TIME_ID = "time"

const factory = new ItemFactory<Condition>()

factory.register(BATTERY_ID, (data) => new BatteryCondition(data))
factory.register(TIME_ID, (data) => new TimeCondition(data))
