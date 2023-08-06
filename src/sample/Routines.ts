import Routine from "~/api/routine/Routine";
import {createStore} from "solid-js/store";
import {actions, registerActions} from "~/api/action/ActionRegistry";
import {conditions, registerConditions} from "~/api/condition/ConditionRegistry";
import {createEffect} from "solid-js";
import {generateRandomId} from "~/api/utils/utils";

registerConditions();
registerActions();

export interface Storage {
    routines: Routine[]
}

export const [storage, setStorage] = createStore<Storage>({
    routines: loadStoredRoutines()
})

export function loadStoredRoutines(): Routine[] {
    const stored = localStorage?.getItem("routines")
    if (stored == null)
        return []
    const routines: Routine[] = JSON.parse(stored)
    for (const routine of routines) {
        for (let i = 0; i < routine.actions.length; i++) {
            let action = routine.actions[i];
            action = actions.dataToBlock(action.metadata.id, action.data || {})
            routine.actions[i] = action
        }
        for (let i = 0; i < routine.conditions.length; i++) {
            let condition = routine.conditions[i];
            condition = conditions.dataToBlock(condition.metadata.id, condition.data || {})
            routine.conditions[i] = condition
        }
    }
    return routines
}

createEffect(() => localStorage.setItem("routines", JSON.stringify([...storage.routines])))

export function createEmptyRoutine(): Routine {
    return {id: generateRandomId().toString(), actions: [], conditions: [], name: ""}
}

