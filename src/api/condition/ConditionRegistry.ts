import BlockFactory from "~/api/block/BlockFactory";
import {BatteryLevelCondition} from "~/api/condition/battery/BatteryLevelCondition";
import {IsChargingCondition} from "~/api/condition/battery/IsChargingCondition";
import {KeyCombinationCondition} from "~/api/condition/keyboard/KeyCombinationCondition";

export const conditions = new BlockFactory("condition")

export function registerConditions() {
    BatteryLevelCondition.register(conditions)
    IsChargingCondition.register(conditions)
    KeyCombinationCondition.register(conditions)
}