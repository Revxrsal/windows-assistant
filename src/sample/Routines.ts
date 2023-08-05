import Routine from "~/api/routine/Routine";
import {createStore} from "solid-js/store";
import {createEffect} from "solid-js";

export const [routines, setRoutines] = createStore<Routine[]>([]);

export function createEmptyRoutine(): Routine {
    return {actions: [], conditions: [], name: ""}
}

createEffect(() => localStorage.setItem("routines", JSON.stringify(routines)))
