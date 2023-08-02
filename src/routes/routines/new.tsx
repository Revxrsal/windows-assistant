import NewItemButton from "~/components/NewItemButton";
import {createSignal, For} from "solid-js";
import {createStore} from "solid-js/store";
import BlockCard from "~/components/BlockCard";
import Condition from "~/api/condition/Condition";

function Subtitle(props: { text: string }) {
    return <p class="mx-12 my-7 text font-bold text-2xl">{props.text}</p>
}

export default function NewRoutine() {
    const [name, setName] = createSignal("");
    const [conditions, setConditions] = createStore<Condition[]>([]);
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
            <p class="mx-12 text font-bold text-xl">When...</p>
            <div class={"flex flex-col m-4"}>
                <NewItemButton
                    class="bg-green-600 dark:bg-green-300"
                    text="Add condition"
                />
                <For each={conditions}>{condition =>
                    <BlockCard
                        icon={condition.icon({size: 28})}
                        title={condition.name}
                        class={condition.backgroundClass}
                        description={condition.description}/>
                }</For>
            </div>
        </main>
    )
}