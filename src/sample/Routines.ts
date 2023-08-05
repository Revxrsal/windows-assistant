import Routine from "~/api/routine/Routine";
import {createStore} from "solid-js/store";
import {createEffect} from "solid-js";

export const [routines, setRoutines] = createStore<Routine[]>(
    loadStoredRoutines()
);

function loadStoredRoutines(): Routine[] {
    const stored = localStorage?.getItem("routines")
    if (stored == null)
        return []
    return JSON.parse(stored)
}

export function createEmptyRoutine(): Routine {
    return {actions: [], conditions: [], name: ""}
}

createEffect(() => localStorage.setItem("routines", JSON.stringify(routines)))
