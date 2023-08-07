import Condition from "~/api/condition/Condition";
import {BsBatteryHalf} from "solid-icons/bs";
import BlockMetadata, {BlockFormProps} from "~/api/block/BlockMetadata";
import BlockFactory from "~/api/block/BlockFactory";
import {createSignal} from "solid-js";
import BlockForm from "~/api/condition/BlockForm";
import {RangeInput} from "~/components/RangeInput";

const ID = "battery"

export function BatteryForm(props: BlockFormProps<BatteryConditionData>) {
    const [value, setValue] = createSignal(
        props.data?.battery || 5
    );

    function submit() {
        props.submit(new BatteryCondition({
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

export interface BatteryConditionData {
    battery: number
}

const METADATA: BlockMetadata = {
    id: ID,
    displayName: "Battery level",
    description: "Triggered when the battery reaches a certain level",
    backgroundClass: "bg-yellow-500 dark:bg-yellow-300",
    icon: (props) => BsBatteryHalf(props),
    form: (props) => BatteryForm(props)
}

export class BatteryCondition implements Condition<BatteryConditionData> {

    metadata = METADATA;
    triggersOnce = true;
    data: BatteryConditionData;

    description = () => `When battery reaches ${this.data.battery}%`

    constructor(data: BatteryConditionData) {
        this.data = data
    }

    async eval(): Promise<boolean> {
        return true
    }

    static register(factory: BlockFactory) {
        factory.register(ID, METADATA, (data) => new BatteryCondition(data))
    }


}