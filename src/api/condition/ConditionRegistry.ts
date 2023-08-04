import BlockFactory from "~/api/block/BlockFactory";
import {BatteryCondition} from "~/api/condition/BatteryCondition";

export const conditions = new BlockFactory("condition")

export function registerConditions() {
    BatteryCondition.register(conditions)
}