import Routine from "~/api/routine/Routine";
import {Accessor, createEffect} from "solid-js";
import {createMutable} from "solid-js/store";

/**
 * Loads the executed routines stored in the local storage, or an empty value if none.
 */
function loadRoutinesExecuted() {
    return JSON.parse(localStorage.getItem("assistant.routinesExecuted") || "{}")
}

/**
 * Contains the data of routines that have executed
 */
const routinesExecuted: Record<string, boolean> = createMutable(loadRoutinesExecuted());

/**
 * Stores the routines executed, so everything works consistently across app refreshes
 * and restarts
 */
createEffect(() => localStorage.setItem("assistant.routinesExecuted", JSON.stringify(routinesExecuted)))

/**
 * Generates a secret (__ASSISTANT__poll) function on the window property
 * that polls conditions. This secret function is invoked by Rust on
 * a fixed interval.
 *
 * @param routines Routines to poll
 */
export function addPollFunction(routines: Accessor<Routine[]>) {
    Object.defineProperty(window, "__ASSISTANT__poll", {
        value: async () => poll(routines),
        writable: false,
        configurable: true
    })
}

/**
 * Polls all routines' conditions and executes actions as needed
 *
 * @param routines Routines to poll
 */
async function poll(routines: Accessor<Routine[]>) {
    for (const routine of routines()) {
        if (routine.conditions.length == 0)
            continue
        let allConditionsAreMet = true
        for (const condition of routine.conditions) {
            const isMet = await condition.eval()
            if (!isMet) {
                allConditionsAreMet = false
                // mark condition as failed once, so if it's true next time we trigger it.
                if (condition.triggersOnce)
                    routinesExecuted[`${routine.id}/${condition.metadata.id}`] = false
                break
            }
            if (condition.triggersOnce) {
                const routineHasRun = routinesExecuted[`${routine.id}/${condition.metadata.id}`] || false
                if (routineHasRun) {
                    allConditionsAreMet = false
                    break
                }
                routinesExecuted[`${routine.id}/${condition.metadata.id}`] = true
            }
        }
        if (allConditionsAreMet)
            routine.actions.forEach(c => c.execute())
    }
}
