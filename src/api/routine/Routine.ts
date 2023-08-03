/* eslint-disable @typescript-eslint/no-explicit-any */
import Condition from "~/api/condition/Condition";
import Action from "~/api/action/Action";

export default interface Routine {
    name: string
    conditions: Condition<any>[]
    actions: Action<any>[]
}