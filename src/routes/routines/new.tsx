import NewItemButton from "~/components/NewItemButton";
import BlockCard from "~/components/BlockCard";
import {For} from "solid-js";
import Conditions from "~/sample/Conditions";

function Subtitle(props: { text: string }) {
    return <p class="mx-12 my-7 text font-bold text-2xl">{props.text}</p>
}

export default function NewRoutine() {
    return (
        <main class="flex h-full flex-col">
            <Subtitle text="New routine"/>
            <div class={"justify-center flex flex-col title m-12 mt-0"}>
                <input type="text" placeholder={"Routine name..."}
                       class="border-none outline-none
                       text-blue-800 dark:text-blue-400
                       bg-stone-100 dark:bg-stone-800"/>
            </div>
            <p class="mx-12 text font-bold text-xl">When...</p>
            <div class={"flex flex-col m-4"}>
                <NewItemButton
                    class="bg-green-600 dark:bg-green-300"
                    text="Add condition"
                />
                {/*<For each={Conditions}>{condition =>*/}
                {/*    <BlockCard*/}
                {/*        icon={condition.icon({size: 28})}*/}
                {/*        title={condition.name}*/}
                {/*        class={condition.backgroundClass}*/}
                {/*        description={condition.description}/>*/}
                {/*}</For>*/}
            </div>
        </main>
    )
}