/* eslint-disable @typescript-eslint/no-explicit-any */
import Condition from "~/api/condition/Condition";
import Action from "~/api/action/Action";
import {generateRandomId} from "~/api/utils/utils";

export default interface Routine {
    enabled: boolean
    id: string
    name: string
    conditions: Condition<any>[]
    actions: Action<any>[]
}

export function createEmptyRoutine(): Routine {
    return {
        enabled: true,
        id: generateRandomId().toString(),
        actions: [],
        conditions: [],
        name: ""
    }
}
