import {useNavigate, useParams} from "@solidjs/router";
import {setStorage, storage} from "~/sample/Routines";
import RoutineForm from "~/components/routine/EditRoutineForm";
import {createStore, produce, SetStoreFunction, Store} from "solid-js/store";
import {createRenderEffect, createSignal} from "solid-js";
import Routine from "~/api/routine/Routine";
import Modal from "~/components/modal/Modal";

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
        <Modal
            show={confirmDialog}
            setShow={setConfirmDialog}
            heading={
                <h1 class="text-3xl font-bold">Are you sure?</h1>
            }
        >
            <p>Are you sure you want to delete this routine? This action cannot be undone!</p>
            <div class={"my-5"}/>
            <div class={"flex flex-row justify-around"}>
                <button
                    class="bg-stone-300 dark:bg-stone-700 p-3 rounded text hover:scale-[1.03] transition"
                    onClick={() => setConfirmDialog(false)}
                >
                    No, keep it
                </button>
                <button
                    class="bg-red-500 p-3 rounded text-stone-200 hover:scale-[1.03] transition"
                    onClick={() => {
                        setConfirmDialog(false)
                        setStorage("routines", v => v.filter(ir => ir.id !== routine()?.id))
                        navigate("/routines")
                    }}
                >
                    Yes, delete it
                </button>
            </div>
        </Modal>
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