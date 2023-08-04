/* eslint-disable no-unused-vars */
import NewItemButton from "~/components/NewItemButton";
import {createSignal, For} from "solid-js";
import {createStore, reconcile} from "solid-js/store";
import BlockCard from "~/components/blocks/BlockCard";
import {AnyCondition} from "~/api/condition/Condition";
import {AnyAction} from "~/api/action/Action";
import {useNavigate} from "@solidjs/router";
import {conditions} from "~/api/condition/ConditionRegistry";

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
                <NewItemButton
                    class="bg-green-600 dark:bg-green-300"
                    text="Add condition"
                    onClick={() => navigate("/pick/conditions")}
                />
                <For each={state.conditions}>{condition =>
                    <BlockCard description={condition.description()} metadata={condition.metadata}/>
                }</For>
            </div>
            <p class="mx-12 text font-bold text-xl">
                then...
            </p>
            <div class={"flex flex-col m-4"}>
                <NewItemButton
                    class="bg-blue-600 dark:bg-blue-300"
                    text="Add action"
                    onClick={() => navigate("/pick/actions")}
                />
                <For each={state.actions}>{action =>
                    <BlockCard metadata={action.metadata}/>
                }</For>
            </div>
            <button
                class={"bg-blue-600 w-32 h-10 rounded m-12 text enabled:hover:scale-105 disabled:opacity-40 transition"}
                disabled={state.conditions.length == 0 || state.actions.length == 0 || state.name.length == 0}
                onClick={() => setState({name: "", conditions: [], actions: []})}
            >
                Create
            </button>
        </main>
    )
}