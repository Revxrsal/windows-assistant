/* eslint-disable no-unused-vars */
import {createStore} from "solid-js/store";
import {createEmptyRoutine, setStorage} from "~/sample/Routines";
import RoutineForm from "~/components/routine/EditRoutineForm";

export default function NewRoutine() {
    const [routine, setRoutine] = createStore(createEmptyRoutine())
    return <RoutineForm
        routine={routine}
        setRoutine={setRoutine}
        replace={false}
        onFinish={routine => setStorage("routines", v => [...v, routine])}
    />
}