import {BlockGallery} from "~/components/blocks/BlockGallery";
import {setRoutine} from "~/routes/routines/new";
import {conditions} from "~/api/condition/ConditionRegistry";
import {AnyCondition} from "~/api/condition/Condition";

export default function PickCondition() {
    return (
        <BlockGallery
            add={condition => {
                setRoutine(`conditions`, v => [...v, condition as AnyCondition])
            }}
            factory={conditions}
            title={"Pick a condition"}
            type="conditions"
        />
    )
}