import {useParams} from "@solidjs/router";
import {setStorage, storage} from "~/sample/Routines";
import {setFormRoutine} from "~/routes/routines/new";
import RoutineForm from "~/components/routine/EditRoutineForm";
import {createEffect, createRenderEffect, onMount} from "solid-js";
import {produce} from "solid-js/store";

export default function EditRoutine() {
    const params = useParams();
    const routineIndex = storage.routines.findIndex(s => s.name == params.id)!;
    const routine = storage.routines[routineIndex]
    onMount(() => {
        setFormRoutine(produce((v) => {
            v.name = routine.name
            v.actions = routine.actions
            v.conditions = routine.conditions
        }))
    })
    createEffect(() => setFormRoutine(() => storage.routines[routineIndex]))
    return <RoutineForm
        replace={true}
        onFinish={(routine) => {
            setStorage("routines", produce((r) => r[routineIndex] = routine))
        }}
    />
}