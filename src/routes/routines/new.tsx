/* eslint-disable no-unused-vars */
import {createStore} from "solid-js/store";
import Routine from "~/api/routine/Routine";
import {createEmptyRoutine, setRoutines} from "~/sample/Routines";
import RoutineForm from "~/components/routine/EditRoutineForm";

export const [routine, setRoutine] = createStore<Routine>(
    createEmptyRoutine()
)

export default function NewRoutine() {
    return <RoutineForm
        replace={false}
        onFinish={routine => setRoutines(v => [...v, routine])}
    />
}