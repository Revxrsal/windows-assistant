/* eslint-disable no-unused-vars */
import NewItemButton from "~/components/NewItemButton";
import {createSignal, For} from "solid-js";
import {createStore} from "solid-js/store";
import BlockCard from "~/components/blocks/BlockCard";
import {AnyCondition} from "~/api/condition/Condition";
import {AnyAction} from "~/api/action/Action";
import {Actions, Conditions} from "~/sample/Routines";

function Subtitle(props: { text: string }) {
    return <p class="mx-12 my-7 text font-bold text-2xl">{props.text}</p>
}

export default function NewRoutine() {
    const [name, setName] = createSignal("Sa");
    const [conditions, setConditions] = createStore<AnyCondition[]>(Conditions);
    const [actions, setActions] = createStore<AnyAction[]>(Actions);
    return (
        <main>
            <Subtitle text="New routine"/>
            <div class={"justify-center flex flex-col title m-12 mt-0"}>
                <input type="text" placeholder="Routine name..."
                       class="border-none outline-none
                       text-blue-800 dark:text-blue-400
                       bg-stone-100 dark:bg-stone-800"
                       value={name()}
                       onChange={e => setName(e.target.value)}/>
            </div>
            <p class="mx-12 text font-bold text-xl">
                When all the below conditions are met
            </p>
            <div class={"flex flex-col m-4"}>
                <NewItemButton
                    class="bg-green-600 dark:bg-green-300"
                    text="Add condition"
                />
                <For each={conditions}>{condition =>
                    <BlockCard metadata={condition.metadata}/>
                }</For>
            </div>
            <p class="mx-12 text font-bold text-xl">
                then...
            </p>
            <div class={"flex flex-col m-4"}>
                <NewItemButton
                    class="bg-blue-600 dark:bg-blue-300"
                    text="Add action"
                />
                <For each={actions}>{action =>
                    <BlockCard metadata={action.metadata}/>
                }</For>
            </div>
        </main>
    )
}