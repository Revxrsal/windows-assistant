import BlockFactory from "~/api/block/BlockFactory";
import {BatteryCondition} from "~/api/condition/battery/BatteryCondition";

export const conditions = new BlockFactory("condition")

export function registerConditions() {
    BatteryCondition.register(conditions)
}