import {useNavigate} from "@solidjs/router";
import {For} from "solid-js";
import BlockCard from "~/components/blocks/BlockCard";
import NewItemButton from "~/components/NewItemButton";
import Routine from "~/api/routine/Routine";
import {routine, setRoutine} from "~/routes/routines/new";
import {createEmptyRoutine} from "~/sample/Routines";

export default function RoutineForm(props: {
    replace: boolean,
    onFinish: (routine: Routine) => void,
}) {
    const navigate = useNavigate();
    return (
        <main>
            <p class="mx-12 my-7 text font-bold text-2xl">
                {props.replace ? "Update routine" : "New routine"}
            </p>
            <div class={"justify-center flex flex-col title m-12 mt-0"}>
                <input type="text" placeholder="Routine name..."
                       class="border-none outline-none
                       text-blue-800 dark:text-blue-400
                       bg-stone-100 dark:bg-stone-800"
                       value={routine.name}
                       onInput={e => setRoutine(() => ({name: e.target.value}))}/>
            </div>
            <p class="mx-12 text font-bold text-xl">
                When all the below conditions are met
            </p>
            <div class={"flex flex-col m-4"}>
                <For each={routine.conditions}>{(condition, index) =>
                    <BlockCard
                        description={condition.description()}
                        class={`hover:scale-[1.02] transition ${condition.metadata.form ? "cursor-pointer" : ""}`}
                        metadata={condition.metadata}
                        onClick={() => {
                            if (condition.metadata.form)
                                navigate(`/pick/conditions/${condition.metadata.id}`, {
                                    state: {
                                        replaceIndex: index(),
                                        data: condition.data
                                    }
                                })
                        }}
                    />
                }</For>
                <NewItemButton
                    class="bg-green-600 dark:bg-green-300"
                    text="Add condition"
                    onClick={() => navigate("/pick/conditions")}
                />
            </div>
            <p class="mx-12 text font-bold text-xl">
                then...
            </p>
            <div class={"flex flex-col m-4"}>
                <For each={routine.actions}>{(action, index) =>
                    <BlockCard
                        description={action.description()}
                        class={`hover:scale-[1.02] transition ${action.metadata.form ? "cursor-pointer" : ""}`}
                        metadata={action.metadata}
                        onClick={() => {
                            if (action.metadata.form)
                                navigate(`/pick/actions/${action.metadata.id}`, {
                                    state: {
                                        replaceIndex: index(),
                                        data: action.data
                                    }
                                })
                        }}
                    />
                }</For>
                <NewItemButton
                    class="bg-blue-600 dark:bg-blue-300"
                    text="Add action"
                    onClick={() => navigate("/pick/actions")}
                />
            </div>
            <button
                class={"bg-blue-600 w-32 h-10 rounded m-12 text-stone-200 enabled:hover:scale-105 disabled:opacity-40 transition"}
                disabled={routine.conditions.length == 0 || routine.actions.length == 0 || routine.name.length == 0}
                onClick={() => {
                    props.onFinish({...routine})
                    setRoutine(createEmptyRoutine())
                }}
            >
                {props.replace ? "Update" : "Create"}
            </button>
        </main>
    )
}