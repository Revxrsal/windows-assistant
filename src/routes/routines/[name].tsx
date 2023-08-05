import {useParams} from "@solidjs/router";
import {routines, setRoutines} from "~/sample/Routines";
import {setRoutine} from "~/routes/routines/new";
import RoutineForm from "~/components/routine/EditRoutineForm";

export default function EditRoutine() {
    const {name} = useParams();
    const routineIndex = routines.findIndex(s => s.name == name)!;
    setRoutine(routines[routineIndex]);
    return <RoutineForm
        replace={true}
        onFinish={routine => setRoutines(routineIndex, routine)}
    />
}