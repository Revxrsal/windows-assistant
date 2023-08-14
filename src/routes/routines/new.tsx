/* eslint-disable no-unused-vars */
import {createStore} from "solid-js/store";
import {setStorage} from "~/data/Routines";
import RoutineForm from "~/components/routine/EditRoutineForm";
import {createEmptyRoutine} from "~/api/routine/Routine";

export default function NewRoutine() {
    const [routine, setRoutine] = createStore(createEmptyRoutine())
    return <RoutineForm
        routine={routine}
        setRoutine={setRoutine}
        replace={false}
        onFinish={routine => setStorage("routines", v => [...v, routine])}
    />
}