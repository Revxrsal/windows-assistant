import {Condition} from "~/conditions/Condition";
import {TestCondition} from "~/conditions/TestCondition";
import {FunCondition} from "~/conditions/FunCondition";

// eslint-disable-next-line @typescript-eslint/no-explicit-any,no-unused-vars
export const conditionsById: Record<number, (data: any) => Condition> = {
    0: (data) => new TestCondition(data),
    1: (data) => new FunCondition(data)
};

export function createCondition<T extends Condition>(data: { id: number }): T {
    const factory = conditionsById[data.id]
    if (factory != undefined)
        return factory(data) as T
    throw new Error(`Cannot find a condition with id ${data.id}`)
}
