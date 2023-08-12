import {BlockFormProps} from "~/api/block/BlockMetadata";
import RunProgramAction, {RunProgramData} from "~/api/action/run-program/RunProgramAction";
import BlockForm from "~/api/condition/BlockForm";
import {createSignal} from "solid-js";
import FileInput from "~/components/input/FileInput";

export default function RunProgramForm(props: BlockFormProps<RunProgramData>) {
    const [path, setPath] = createSignal(props.data?.path || "")
    const [args, setArgs] = createSignal(props.data?.args || "")

    function submit() {
        props.submit(new RunProgramAction({
            path: path(),
            args: args()
        }))
    }


    return <BlockForm
        configProps={props}
        submit={submit}
        title="Run a program"
        disabled={path().length == 0}
    >
        <FileInput
            path={path}
            setPath={setPath}
        />
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