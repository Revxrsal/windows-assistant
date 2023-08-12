import Routine from "~/api/routine/Routine";
import {ConditionsEntry} from "~/scheduler/ApplicationScheduler";

/**
 * Tests whether should the routine execute its actions, taking
 * into consideration what was triggered in the last iteration.
 *
 * @param routine Routine to trigger for
 * @param triggeredConditions Entry to output data for
 * @param clearTriggeredConditions Clears all the triggered conditions
 */
export async function shouldExecute(
    routine: Routine,
    triggeredConditions: ConditionsEntry,
    clearTriggeredConditions: () => void
) {
    let allConditionsAreMet = true
    if (!routine.enabled || routine.conditions.length == 0)
        return false
    for (const condition of routine.conditions) {
        const isMet = await condition.eval()
        if (!isMet) {
            allConditionsAreMet = false
            // mark condition as failed once, so if it's true next time we trigger it.
            // setTriggeredConditions(routine.id, condition.metadata.id.toString(), false)
            if (condition.triggersOnce)
                clearTriggeredConditions()

            break
        }
        if (condition.triggersOnce) {
            const routineHasRun = triggeredConditions[condition.metadata.id.toString()] || false
            if (routineHasRun) {
                allConditionsAreMet = false
                continue
            }
            triggeredConditions[condition.metadata.id.toString()] = true
        }
    }
    return allConditionsAreMet
}