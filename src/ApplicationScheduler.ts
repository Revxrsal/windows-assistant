import Routine from "~/api/routine/Routine";
import {Accessor} from "solid-js";

export default class ApplicationScheduler {

    poll(routines: Accessor<Routine[]>) {
        const routinesExecuted: Record<string, boolean> = {}
        setInterval(async () => {
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
                            delete routinesExecuted[`${routine.id}/${condition.metadata.id}`]
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
        }, 100);
    }

}