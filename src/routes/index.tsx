import {createSignal, Show} from "solid-js";
import {Portal} from "solid-js/web";
import BlockCard from "~/components/blocks/BlockCard";
import {conditions} from "~/api/condition/ConditionRegistry";
import {clickOutside} from "~/components/directive/clickOutside";

function Dialog(props: { dismiss: () => void }) {
    return <main ref={el => {
        clickOutside(el, () => props.dismiss())
    }} class={"left-0 top-0 z-[1055] h-full w-full outline-none"}>
        <BlockCard metadata={conditions.getRegisteredBlockMetas()[0]}/>
    </main>
}

export default function Home() {
    const [show, setShow] = createSignal(false);
    return (
        <main>
            <Show when={show()}>
                <Portal>
                    <Dialog dismiss={() => setShow(false)}/>
                </Portal>
            </Show>
            <h1 class="text-6xl m-12 font-bold text">Windows Assistant</h1>
            <h2 class="text-4xl m-12 font-bold text">Getting started</h2>
            <button
                class="bg-blue-500 transition duration-300 mx-12 my-4
                 rounded shadow-lg min-w-32 max-w-xl h-14 text-xl text-stone-800 hover:scale-105"
                onClick={() => setShow(true)}
            >
                Show dialog
            </button>
        </main>
    )
}