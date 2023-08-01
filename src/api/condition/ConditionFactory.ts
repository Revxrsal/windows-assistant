/* eslint-disable @typescript-eslint/no-explicit-any,no-unused-vars */

import Condition from "~/api/condition/Condition";

/**
 * Maps the IDs of conditions to factory functions
 */
const idToCondition: Record<string, (data: any) => Condition> = {}

/**
 * Registers a condition with the given ID and factory function
 *
 * @param id ID of the condition
 * @param factory The factory function of the condition
 */
export function registerCondition(id: string, factory: (data: any) => Condition) {
    idToCondition[id] = factory
}

/**
 * Constructs a condition from raw JSON data. This function must
 * be called carefully, as it does no property validation.
 *
 * @param data JSON data
 */
export function conditionFromData<T extends Condition>(data: any): T {
    const factory = idToCondition[data.id]
    if (factory != undefined)
        return factory(data) as T
    throw new Error(`Cannot find a condition with id '${data.id}'`)
}
