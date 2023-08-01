/* eslint-disable @typescript-eslint/no-explicit-any,no-unused-vars */

import {BatteryCondition} from "~/conditions/BatteryCondition";
import {TimeCondition} from "~/conditions/TimeCondition";
import Condition from "~/api/condition/Condition";
import {BATTERY_ID, TIME_ID} from "~/api/condition/ConditionIDs";

register(BATTERY_ID, (data) => new BatteryCondition(data))
register(TIME_ID, (data) => new TimeCondition(data))

const idToCondition: Record<string, (data: any) => Condition> = {}

function register(name: string, factory: (data: any) => Condition) {
    idToCondition[name] = factory
}

export function fromData<T extends Condition>(data: { id: number }): T {
    const factory = idToCondition[data.id]
    if (factory != undefined)
        return factory(data) as T
    throw new Error(`Cannot find a condition with id ${data.id}`)
}
