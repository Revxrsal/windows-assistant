import {BlockFormProps} from "~/api/block/BlockMetadata";
import {KeyCombinationCondition,} from "~/api/condition/keyboard/KeyCombinationCondition";
import BlockForm from "~/api/condition/BlockForm";
import {createStore} from "solid-js/store";
import SwitchButton from "~/components/input/SwitchButton";
import KeyInput from "~/components/input/KeyInput";
import KeyCombinationData, {createEmptyCombination} from "~/api/condition/keyboard/KeyboardCombinationData";

export default function KeyCombinationForm(props: BlockFormProps<KeyCombinationData>) {
    const [data, setData] = createStore<KeyCombinationData>(
        props.data ? {...props.data} : createEmptyCombination()
    )

    function submit() {
        props.submit(new KeyCombinationCondition({...data}))
    }

    return <BlockForm
        title={"Key combination"}
        configProps={props}
        submit={submit}
        disabled={false}
    >
        <KeyInput data={data} setData={setData}/>
        <div class={"grid grid-cols-2"}>
            <SwitchButton
                label="Alt"
                checked={data.alt}
                onClick={() => setData("alt", v => !v)}
            />
            <SwitchButton
                label="Ctrl"
                checked={data.ctrl}
                onClick={() => setData("ctrl", v => !v)}
            />
            <SwitchButton
                label="Tab"
                checked={data.tab}
                onClick={() => setData("tab", v => !v)}
            />
            <SwitchButton
                label="Enter"
                checked={data.enter}
                onClick={() => setData("enter", v => !v)}
            />
            <SwitchButton
                label="Shift"
                checked={data.shift}
                onClick={() => setData("shift", v => !v)}
            />
            <SwitchButton
                label="Windows"
                checked={data.windows}
                onClick={() => setData("windows", v => !v)}
            />
        </div>
    </BlockForm>
}