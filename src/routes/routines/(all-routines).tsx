import {BsGear, BsTrash} from "solid-icons/bs";
import {createSignal, For, onMount, Show} from "solid-js";
import {useNavigate} from "solid-start";
import Routine from "~/api/routine/Routine";
import Title from "~/components/text/Title";
import {setStorage, storage} from "~/sample/Routines";
import IconButton from "~/components/button/IconButton";
import Row from "~/components/layout/Row";
import {FaSolidPause, FaSolidPlay} from "solid-icons/fa";
import DeleteConfirmationModal from "~/components/modal/DeleteConfirmationModal";
import Column from "~/components/layout/Column";
import Button from "~/components/button/Button";

function RoutineBlock(props: { routine: Routine }) {
    const navigate = useNavigate();
    const [confirmDialog, setConfirmDialog] = createSignal(false)
    return (
        <>
            <DeleteConfirmationModal
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
                onConfirm={() => {
                    setStorage("routines", v => v.filter(ir => ir.id !== props.routine?.id));
                }}
            />

            <Row
                class={`px-12 mx-6 my-6 text p-12 items-center content-center justify-between
                        bg-stone-300 dark:bg-stone-900 
                        shadow-md rounded-xl hover:scale-[1.02] 
                        transition duration-200 
                        cursor-pointer`
                }
                onClick={() => navigate(`/routines/${props.routine.id}`)}
            >
                <p class={"text-xl font-bold"}>{props.routine.name}</p>
                <Row class={"center"}>
                    <IconButton
                        class={"mx-3 hover:bg-blue-600 hover:text-stone-200"}
                        onClick={e => {
                            e.stopPropagation();
                        }}>
                        <BsGear size={24}/>
                    </IconButton>
                    <IconButton
                        class={"mx-3 text-red-00 hover:bg-red-500 hover:text-stone-200"}
                        onClick={e => {
                            e.stopPropagation();
                            setConfirmDialog(true)
                        }}>
                        <BsTrash size={24}/>
                    </IconButton>
                    <IconButton
                        class={"ml-3 fill-green-500 hover:bg-green-600 hover:fill-stone-200"}
                        onClick={e => {
                            e.stopPropagation();
                            setStorage(
                                "routines",
                                r => r.id === props.routine.id,
                                "enabled",
                                v => !v
                            );
                        }}
                    >
                        {props.routine.enabled ? <FaSolidPause size={24}/> : <FaSolidPlay size={24}/>}
                    </IconButton>
                </Row>
            </Row>
        </>
    );
}

function RoutinesGrid() {
    return (
        <>
            <Title size={5}>My Routines</Title>
            <div class={"grid xl:grid-cols-2 lg:grid-cols-1"}>
                <For each={storage.routines}>
                    {(routine) => <RoutineBlock routine={routine}/>}
                </For>
            </div>
        </>
    )
}

export default function AllRoutines() {
    const navigate = useNavigate();
    return (
        <main>
            <Show when={storage.routines.length == 0} fallback={<RoutinesGrid/>}>
                <Column class={"center align-middle select-none"}>
                    <Title
                        size={4}
                        class={"text mx-12 text-center"}
                    >
                        You haven't got any routines!
                    </Title>
                    <img
                        src="empty-box.png"
                        alt="No routines (Empty box)"
                        class={"aspect-square w-64 h-64"}
                    />
                    <Title size={1} class={"font-normal"}>
                        <Button
                            class={"w-64 h-14"}
                            onClick={() => navigate("/routines/new")}
                        >
                            Create a routine
                        </Button>
                    </Title>
                </Column>
            </Show>
        </main>
    );
}
