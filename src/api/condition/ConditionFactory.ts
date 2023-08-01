/* eslint-disable @typescript-eslint/no-explicit-any,no-unused-vars */

import Condition from "~/api/condition/Condition";

const idToCondition: Record<string, (data: any) => Condition> = {}

export function registerCondition(name: string, factory: (data: any) => Condition) {
    idToCondition[name] = factory
}

export function fromData<T extends Condition>(data: { id: number }): T {
    const factory = idToCondition[data.id]
    if (factory != undefined)
        return factory(data) as T
    throw new Error(`Cannot find a condition with id ${data.id}`)
}
