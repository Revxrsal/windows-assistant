import Condition from "~/api/condition/Condition";
import {BsBatteryHalf} from "solid-icons/bs";
import BlockMetadata, {BlockFormProps} from "~/api/block/BlockMetadata";
import BlockFactory from "~/api/block/BlockFactory";
import {createSignal} from "solid-js";
import BlockForm from "~/api/condition/BlockForm";
import {RangeInput} from "~/components/RangeInput";

const ID = "battery"

export function BatteryForm(props: BlockFormProps) {
    const [value, setValue] = createSignal(5);

    function submit() {
        props.submit(new BatteryCondition({
            battery: value()
        }))
    }

    return (
        <BlockForm submit={submit} title={"Battery level"}>
            <p class="mx-4 mt-12 mb-0 text font-semibold">
                When battery reaches...
            </p>
            <RangeInput
                class="m-12 w-64"
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