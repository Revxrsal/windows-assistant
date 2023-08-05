/* eslint-disable no-unused-vars */
import {createStore, produce, reconcile} from "solid-js/store";
import Routine from "~/api/routine/Routine";
import {createEmptyRoutine, setStorage} from "~/sample/Routines";
import RoutineForm from "~/components/routine/EditRoutineForm";
import {onMount} from "solid-js";

export const [formRoutine, setFormRoutine] = createStore<Routine>(
    createEmptyRoutine()
)

export default function NewRoutine() {
    onMount(() => {
        setFormRoutine(produce((v) => {
            v.name = ""
            v.actions = []
            v.conditions = []
        }))
    })
    return <RoutineForm
        replace={false}
        onFinish={routine => setStorage("routines", v => [...v, routine])}
    />
}