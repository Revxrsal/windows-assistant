import {BlockFormProps} from "~/api/block/BlockMetadata";
import BlockForm from "~/api/condition/BlockForm";
import {createSignal} from "solid-js";
import Column from "~/components/layout/Column";
import SetBackgroundAction, {SetBackground} from "~/api/action/set-background/SetBackgroundAction";

export default function SetBackgroundForm(props: BlockFormProps<SetBackground>) {
    const [url, setURL] = createSignal(props.data?.url || "")

    function submit() {
        props.submit(new SetBackgroundAction({
            url: url(),
        }))
    }

    return <BlockForm
        configProps={props}
        submit={submit}
        title="Set desktop background"
        disabled={url().length == 0}
    >
        <Column>
            <label for="url" class={"mx-2"}>
                Background to set
            </label>
            <input
                type="text"
                name="url"
                value={url()}
                onInput={event => setURL(event.target.value)}
                class={"bg-stone-300 w-[36rem] text-sm dark:bg-stone-900 p-2 my-4 border-none text focus:outline-none rounded shadow-lg"}
            />
        </Column>
    </BlockForm>
}