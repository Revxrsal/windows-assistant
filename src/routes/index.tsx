import {createSignal} from "solid-js";

export default function Home() {
    const [show, setShow] = createSignal(false);
    return (
        <main>
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