import {createSignal} from "solid-js";
import Modal from "~/components/modal/Modal";
import Title from "~/components/text/Title";

export default function Home() {
    const [show, setShow] = createSignal(false);
    return (
        <main>
            <Title size={6}>Windows Assistant</Title>
            <Title size={4}>Getting started</Title>
            <button
                class="mx-12 bg-blue-600 w-32 text-stone-200 h-10 rounded hover:scale-105 transition"
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