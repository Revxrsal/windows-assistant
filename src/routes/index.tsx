import {createSignal} from "solid-js";
import Modal from "~/components/modal/Modal";

export default function Home() {
    const [show, setShow] = createSignal(false);
    return (
        <main>
            <h1 class="text-6xl m-12 font-bold text">Windows Assistant</h1>
            <h2 class="text-4xl m-12 font-bold text">Getting started</h2>
            <button
                class="mx-12 bg-blue-500 w-32 h-10 rounded hover:scale-105 transition"
                onClick={() => setShow(true)}
            >
                Open modal
            </button>
            <Modal
                show={show}
                setShow={setShow}
                heading={<h1 class="text-3xl font-bold">Hello</h1>}
            >
                <h1>Hello</h1>
            </Modal>
        </main>
    )
}