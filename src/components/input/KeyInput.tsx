import {createSignal, onCleanup} from "solid-js";
import {reconcile, SetStoreFunction} from "solid-js/store";
import KeyCombinationData, {
    combinationToString,
    createEmptyCombination
} from "~/api/condition/keyboard/KeyboardCombinationData";

export default function KeyInput(props: {
    data: KeyCombinationData,
    setData: SetStoreFunction<KeyCombinationData>
}) {
    const [listening, setListening] = createSignal(false);
    let lastInput = Date.now()

    function listener(event: KeyboardEvent) {
        if (listening()) {
            if (event.code === "Escape") {
                setListening(false);
                return;
            }
            const time = Date.now()
            if (time - lastInput >= 1000) {
                props.setData(reconcile(createEmptyCombination()))
            }
            lastInput = Date.now()
            const code = event.code

            if (event.ctrlKey)
                props.setData("ctrl", true)

            if (event.shiftKey)
                props.setData("shift", true)

            if (event.altKey)
                props.setData("alt", true)

            if (code === "Tab")
                props.setData("tab", true);

            if (code === "Enter")
                props.setData("enter", true)

            if (event.metaKey)
                props.setData("windows", true)

            if (code.startsWith("Alt") || code.startsWith("Control")
                || code.startsWith("Enter") || code.startsWith("Tab")
                || code.startsWith("Meta") || code.startsWith("Shift"))
                return;
            if (code.startsWith("Key")) {
                props.setData("key", code.substring(3))
            } else if (code.startsWith("Digit")) {
                props.setData("key", code.substring(5))
            } else {
                props.setData("key", code)
            }
            // noinspection JSDeprecatedSymbols
            props.setData("keyCode", event.keyCode)
        }
    }

    document.addEventListener("keydown", listener)
    onCleanup(() => {
        setListening(false);
        document.removeEventListener("keydown", listener);
    })
    return (
        <div class={"flex flex-col justify-around content-center items-center"}>
            <p class={"mb-5 text text-3xl"}>
                {combinationToString(props.data)}
            </p>
            <button class={"bg-rose-900 text-stone-200 p-3 rounded transition-all w-32 focus:outline-none"} classList={{
                "bg-rose-800": listening(),
                "ring": listening(),
                "ring-red-500": listening()
            }}
                    onClick={() => setListening(v => !v)}>
                {listening() ? "Recording..." : "Record"}
            </button>
        </div>
    );
}