/* eslint-disable no-unused-vars */
import NewItemButton from "~/components/NewItemButton";
import {createSignal, For} from "solid-js";
import {createStore} from "solid-js/store";
import BlockCard from "~/components/BlockCard";
import Condition from "~/api/condition/Condition";
import Action from "~/api/action/Action";
import {Actions, Conditions} from "~/sample/Routines";

function Subtitle(props: { text: string }) {
    return <p class="mx-12 my-7 text font-bold text-2xl">{props.text}</p>
}

export default function NewRoutine() {
    const [name, setName] = createSignal("");
    const [conditions, setConditions] = createStore<Condition[]>(Conditions);
    const [actions, setActions] = createStore<Action[]>(Actions);
    return (
        <main>
            <Subtitle text="New routine"/>
            <div class={"justify-center flex flex-col title m-12 mt-0"}>
                <input type="text" placeholder="Routine name..."
                       class="border-none outline-none
                       text-blue-800 dark:text-blue-400
                       bg-stone-100 dark:bg-stone-800"
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
                    <BlockCard
                        icon={condition.icon({size: 28})}
                        title={condition.displayName}
                        class={condition.backgroundClass}
                        description={condition.description}/>
                }</For>
            </div>
            <p class="mx-12 text font-bold text-xl">Then...</p>
            <div class={"flex flex-col m-4"}>
                <NewItemButton
                    class="bg-blue-600 dark:bg-blue-300"
                    text="Add action"
                />
                <For each={actions}>{action =>
                    <BlockCard
                        icon={action.icon({size: 28})}
                        title={action.displayName}
                        class={action.backgroundClass}
                        description={action.description}/>
                }</For>
            </div>
        </main>
    )
}