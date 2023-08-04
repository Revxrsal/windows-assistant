import Condition from "~/api/condition/Condition";
import {BsClockFill} from "solid-icons/bs";
import BlockMetadata, {BlockFormProps} from "~/api/block/BlockMetadata";
import BlockFactory from "~/api/block/BlockFactory";
import {createSignal} from "solid-js";
import BlockForm from "~/api/condition/BlockForm";
import {RangeInput} from "~/components/RangeInput";

const ID = "time"

const METADATA: BlockMetadata = {
    id: ID,
    displayName: "Time",
    backgroundClass: "bg-sky-400 dark:bg-sky-300",
    description: "Triggered on specific times",
    icon: (props) => BsClockFill(props),
    form: (props) => TimeForm(props)
}

export function TimeForm(props: BlockFormProps) {
    const [value, setValue] = createSignal(5);

    function submit() {
        props.submit(new TimeCondition({
            time: value()
        }))
    }

    return (
        <BlockForm submit={submit} title={METADATA.displayName}>
            <p class="mx-4 mt-12 mb-0 text font-semibold">
                When it's
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

export interface TimeConditionData {
    time: number
}

export class TimeCondition implements Condition<TimeConditionData> {

    metadata = METADATA;
    data: TimeConditionData;

    description = () => `Triggered on ${this.data.time}`;

    constructor(data: TimeConditionData) {
        this.data = data
    }

    async eval(): Promise<boolean> {
        return true
    }

    static register(factory: BlockFactory) {
        factory.register(ID, METADATA, (data) => new TimeCondition(data))
    }
}