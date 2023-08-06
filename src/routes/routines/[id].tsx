import {useParams} from "@solidjs/router";
import {setStorage, storage} from "~/sample/Routines";
import RoutineForm from "~/components/routine/EditRoutineForm";
import {createStore, produce, SetStoreFunction, Store} from "solid-js/store";
import {createRenderEffect, createSignal} from "solid-js";
import Routine from "~/api/routine/Routine";

export default function EditRoutine() {
    const params = useParams();
    const routineIndex = () => storage.routines.findIndex(s => s.id == params.id)!;
    const [routine, setRoutineSignal] = createSignal<Store<Routine>>()
    const [setRoutine, setSetRoutine] = createSignal<SetStoreFunction<Routine>>()
    createRenderEffect(() => {
        const [store, setStore] = createStore(storage.routines[routineIndex()])
        setRoutineSignal(store)
        setSetRoutine(() => setStore)
    })
    return <RoutineForm
        routine={routine()!}
        setRoutine={setRoutine()!}
        replace={true}
        onFinish={(routine) => {
            setStorage("routines", produce((r) => r[routineIndex()] = routine))
        }}
    />
}