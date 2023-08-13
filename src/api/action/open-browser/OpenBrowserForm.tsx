import {BlockFormProps} from "~/api/block/BlockMetadata";
import OpenBrowserAction, {OpenBrowserData} from "~/api/action/open-browser/OpenBrowserAction";
import BlockForm from "~/api/condition/BlockForm";
import {createSignal} from "solid-js";
import Column from "~/components/layout/Column";

export default function OpenBrowserForm(props: BlockFormProps<OpenBrowserData>) {
    const [url, setURL] = createSignal(props.data?.url || "")

    function submit() {
        props.submit(new OpenBrowserAction({
            url: url(),
        }))
    }

    return <BlockForm
        configProps={props}
        submit={submit}
        title="Opens a URL in the browser"
        disabled={url().length == 0}
    >
        <Column>
            <label for="url" class={"mx-2"}>
                URL to open
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