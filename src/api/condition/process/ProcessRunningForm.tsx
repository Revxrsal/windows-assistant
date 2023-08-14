import {BlockFormProps} from "~/api/block/BlockMetadata";
import BlockForm from "~/api/condition/BlockForm";
import {createSignal} from "solid-js";
import {ProcessRunningCondition, ProcessRunningData} from "~/api/condition/process/IsProcessRunningCondition";
import FileInput from "~/components/input/FileInput";

export default function ProcessRunningForm(props: BlockFormProps<ProcessRunningData>) {
    const [path, setPath] = createSignal(
        props.data?.path || ""
    );

    function submit() {
        props.submit(new ProcessRunningCondition({
            path: path()
        }))
    }

    return (
        <BlockForm
            configProps={props}
            title={"When app starts"}
            submit={submit}
            disabled={path().length == 0}
        >
            <FileInput
                path={path}
                setPath={setPath}
                filters={[
                    ["Executable file", ["exe"]]
                ]}
            />
        </BlockForm>
    );
}