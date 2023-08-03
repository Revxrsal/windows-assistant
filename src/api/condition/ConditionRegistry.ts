import BlockFactory from "~/api/block/BlockFactory";
import {BatteryCondition} from "~/api/condition/BatteryCondition";
import {TimeCondition} from "~/api/condition/TimeCondition";

export const conditions = new BlockFactory("condition")

export function registerConditions() {
    BatteryCondition.register(conditions)
    TimeCondition.register(conditions)
}