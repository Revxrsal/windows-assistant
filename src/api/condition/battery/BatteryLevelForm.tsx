import {BlockFormProps} from "~/api/block/BlockMetadata";
import {createSignal} from "solid-js";
import BlockForm from "~/api/condition/BlockForm";
import {RangeInput} from "~/components/RangeInput";
import {BatteryLevelCondition, BatteryConditionData} from "~/api/condition/battery/BatteryLevelCondition";

export default function BatteryLevelForm(props: BlockFormProps<BatteryConditionData>) {
    const [value, setValue] = createSignal(
        props.data?.battery || 5
    );

    function submit() {
        props.submit(new BatteryLevelCondition({
            battery: value()
        }))
    }

    return (
        <BlockForm
            configProps={props}
            submit={submit}
            title={"Battery level"}
        >
            <p class="mt-6 mb-0 text text-xl font-semibold">
                When battery reaches...
            </p>
            <RangeInput
                class="mt-6 w-64"
                label={value() + "%"}
                value={value}
                setValue={setValue}
                min={5}
                max={100}
            />
        </BlockForm>
    )
}