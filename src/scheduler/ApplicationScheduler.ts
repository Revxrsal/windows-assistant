import Routine from "~/api/routine/Routine";
import {Accessor} from "solid-js";
import {shouldExecute} from "~/scheduler/RoutineTriggerControl";

export type ConditionsEntry = Record<string, boolean>;
export type TriggeredConditionsMap = Record<string, ConditionsEntry>

/**
 * Loads the executed routines stored in the local storage, or an empty value if none.
 */
function loadTriggeredConditions(): TriggeredConditionsMap {
    return JSON.parse(localStorage.getItem("assistant.triggeredConditions") || "{}")
}

/**
 * Contains the data of routines that have executed
 */
const triggeredConditions = loadTriggeredConditions();

/**
 * Stores the triggered conditions, so everything works consistently across
 * app refreshes and restarts
 */
export function saveTriggeredConditions() {
    localStorage.setItem("assistant.triggeredConditions", JSON.stringify(triggeredConditions));
}

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
 * Returns the corresponding [RoutineTriggerControl] for
 * the given routine, or creates a new one.
 *
 * @param routine Routine to get for
 */
function getTriggeredConditions(routine: Routine): Record<string, boolean> {
    let control = triggeredConditions[routine.id]
    if (!control) {
        control = {}
        triggeredConditions[routine.id] = control
    }
    return control
}

/**
 * Clears the triggered conditions of a specific routine
 *
 * @param routine The routine to clear for
 */
function clearTriggeredConditions(routine: Routine) {
    triggeredConditions[routine.id] = {}
}

/**
 * Polls all routines' conditions and executes actions as needed
 *
 * @param routines Routines to poll
 */
async function poll(routines: Accessor<Routine[]>) {
    for (const routine of routines()) {
        const control = getTriggeredConditions(routine)
        const exec = await shouldExecute(
            routine,
            control,
            () => clearTriggeredConditions(routine)
        )
        if (exec)
            routine.actions.forEach(c => c.execute())
    }
}
