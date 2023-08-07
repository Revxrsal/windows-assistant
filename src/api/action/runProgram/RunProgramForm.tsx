import {BlockFormProps} from "~/api/block/BlockMetadata";
import RunProgramAction, {RunProgramData} from "~/api/action/runProgram/RunProgramAction";
import BlockForm from "~/api/condition/BlockForm";
import {createMemo, createSignal, onCleanup} from "solid-js";
import {listen, UnlistenFn} from "@tauri-apps/api/event";
import {invoke} from "@tauri-apps/api";
import {getBaseFileName} from "~/api/utils/utils";

export default function RunProgramForm(props: BlockFormProps<RunProgramData>) {
    const [path, setPath] = createSignal(props.data?.path || "")
    const [args, setArgs] = createSignal(props.data?.args || "")
    const fileName = createMemo(() => getBaseFileName(path()))

    function submit() {
        props.submit(new RunProgramAction({
            path: path(),
            args: args()
        }))
    }

    const [removeListener, setRemoveListener] = createSignal<UnlistenFn>()

    listen('tauri://file-drop', event => {
        const path = (event.payload as string[])[0]
        setPath(path)
    }).then(v => setRemoveListener(() => v))
    onCleanup(() => removeListener()?.())
    return <BlockForm
        configProps={props}
        submit={submit}
        title="Run a program"
        disabled={path().length == 0}
    >
        <div class={`
            bg-stone-200 dark:bg-stone-900 hover:scale-[1.02] transition
            content-center items-center text-center justify-center cursor-pointer select-none
            opacity-60
            outline-dotted outline-stone-400
            text font-semibold
            h-20 min-w-[300px]
            rounded-xl
            flex drop-shadow-md`}
             onClick={async () => {
                 const file: string = await invoke("open_file_dialog")
                 setPath(file)
             }}
        >
            <span
                class={"text-xl text-center px-4"}>{fileName() || `Drop your program here, or click to choose one`}</span>
        </div>
        <>
            <label for="args">
                Run arguments (optional)
            </label>
            <input
                type="text"
                name="args"
                value={args()}
                onInput={event => setArgs(event.target.value)}
                class={"bg-stone-300 font-mono w-96 text-sm dark:bg-stone-900 p-2 m-4 border-none text focus:outline-none rounded shadow-lg"}
            />
        </>
    </BlockForm>
}