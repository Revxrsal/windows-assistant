import {useParams} from "@solidjs/router";
import {setStorage, storage} from "~/sample/Routines";
import {setRoutineInForm} from "~/routes/routines/new";
import RoutineForm from "~/components/routine/EditRoutineForm";
import {createEffect} from "solid-js";
import {produce} from "solid-js/store";

export default function EditRoutine() {
    const params = useParams();
    const routineIndex = () => storage.routines.findIndex(s => s.name == params.id)!;
    createEffect(() => {
        const routine = storage.routines[routineIndex()]
        setRoutineInForm(routine)
    })
    return <RoutineForm
        replace={true}
        onFinish={(routine) => {
            setStorage("routines", produce((r) => r[routineIndex()] = routine))
        }}
    />
}