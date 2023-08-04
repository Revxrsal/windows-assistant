import {BlockGallery} from "~/components/blocks/BlockGallery";
import {setState} from "~/routes/routines/new";
import {conditions} from "~/api/condition/ConditionRegistry";
import {AnyCondition} from "~/api/condition/Condition";

export default function PickCondition() {
    return (
        <BlockGallery
            add={condition => {
                setState(`conditions`, v => [...v, condition as AnyCondition])
            }}
            factory={conditions}
            title={"Pick a condition"}
            type="conditions"
        />
    )
}