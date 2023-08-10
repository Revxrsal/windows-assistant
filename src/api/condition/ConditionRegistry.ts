import BlockFactory from "~/api/block/BlockFactory";
import {BatteryLevelCondition} from "~/api/condition/battery/BatteryLevelCondition";
import {IsChargingCondition} from "~/api/condition/battery/IsChargingCondition";

export const conditions = new BlockFactory("condition")

export function registerConditions() {
    BatteryLevelCondition.register(conditions)
}