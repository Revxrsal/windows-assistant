import {BlockGallery} from "~/components/blocks/BlockGallery";
import {setRoutineInForm} from "~/routes/routines/new";
import {conditions} from "~/api/condition/ConditionRegistry";
import {AnyCondition} from "~/api/condition/Condition";

export default function PickCondition() {
    return (
        <BlockGallery
            add={condition => {
                setRoutineInForm(`conditions`, v => [...v, condition as AnyCondition])
            }}
            factory={conditions}
            title={"Pick a condition"}
            type="conditions"
        />
    )
}