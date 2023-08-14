import {useNavigate, useParams} from "@solidjs/router";
import {setStorage, storage} from "~/data/Routines";
import RoutineForm from "~/components/routine/EditRoutineForm";
import {createStore, produce, SetStoreFunction, Store} from "solid-js/store";
import {createRenderEffect, createSignal} from "solid-js";
import Routine from "~/api/routine/Routine";
import DeleteConfirmationModal from "~/components/modal/DeleteConfirmationModal";

export default function EditRoutine() {
    const params = useParams();
    const navigate = useNavigate()
    const routineIndex = () => storage.routines.findIndex(s => s.id == params.id)!;
    const [routine, setRoutineSignal] = createSignal<Store<Routine>>()
    const [setRoutine, setSetRoutine] = createSignal<SetStoreFunction<Routine>>()
    const [confirmDialog, setConfirmDialog] = createSignal(false)
    createRenderEffect(() => {
        const [store, setStore] = createStore(storage.routines[routineIndex()])
        setRoutineSignal(store)
        setSetRoutine(() => setStore)
    })
    return <>
        <DeleteConfirmationModal
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
            onConfirm={() => {
                setStorage("routines", v => v.filter(ir => ir.id !== routine()?.id))
                navigate("/routines")
            }}
        />
        <RoutineForm
            routine={{...routine()!}}
            setRoutine={setRoutine()!}
            replace={true}
            onFinish={(routine) => {
                setStorage("routines", produce((r) => r[routineIndex()] = routine))
            }}
            onDelete={() => setConfirmDialog(true)}
        />
    </>
}