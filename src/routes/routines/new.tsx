/* eslint-disable no-unused-vars */
import NewItemButton from "~/components/NewItemButton";
import {For} from "solid-js";
import {createStore} from "solid-js/store";
import BlockCard from "~/components/blocks/BlockCard";
import {AnyCondition} from "~/api/condition/Condition";
import {AnyAction} from "~/api/action/Action";
import {useNavigate} from "@solidjs/router";

function Subtitle(props: { text: string }) {
    return <p class="mx-12 my-7 text font-bold text-2xl">{props.text}</p>
}

interface NewState {
    name: string
    actions: AnyAction[]
    conditions: AnyCondition[]
}

export const [state, setState] = createStore<NewState>(
    {
        name: "",
        actions: [],
        conditions: []
    }
)

export default function NewRoutine() {
    const navigate = useNavigate();
    return (
        <main>
            <Subtitle text="New routine"/>
            <div class={"justify-center flex flex-col title m-12 mt-0"}>
                <input type="text" placeholder="Routine name..."
                       class="border-none outline-none
                       text-blue-800 dark:text-blue-400
                       bg-stone-100 dark:bg-stone-800"
                       value={state.name}
                       onChange={e => setState(() => ({name: e.target.value}))}/>
            </div>
            <p class="mx-12 text font-bold text-xl">
                When all the below conditions are met
            </p>
            <div class={"flex flex-col m-4"}>
                <For each={state.conditions}>{(condition, index) =>
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
                <For each={state.actions}>{(action, index) =>
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
                disabled={state.conditions.length == 0 || state.actions.length == 0 || state.name.length == 0}
                onClick={() => setState({name: "", conditions: [], actions: []})}
            >
                Create
            </button>
        </main>
    )
}