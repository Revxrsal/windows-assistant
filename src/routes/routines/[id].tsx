import {Params, useParams} from "@solidjs/router";
import {setStorage, storage} from "~/sample/Routines";
import RoutineForm from "~/components/routine/EditRoutineForm";
import {createStore, produce} from "solid-js/store";
import {createMemo} from "solid-js";

export default function EditRoutine() {
    const params = useParams();
    const id = createMemo(() => parseInt(params.id))
    const routineIndex = () => storage.routines.findIndex(s => s.id == id())!;
    const [routine, setRoutine] = createStore(storage.routines[routineIndex()])
    return <RoutineForm
        routine={routine}
        setRoutine={setRoutine}
        replace={true}
        onFinish={(routine) => {
            setStorage("routines", produce((r) => r[routineIndex()] = routine))
        }}
    />
}