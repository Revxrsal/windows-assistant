import {BlockGallery} from "~/components/blocks/BlockGallery";
import {setRoutineInForm} from "~/routes/routines/new";
import {AnyAction} from "~/api/action/Action";
import {actions} from "~/api/action/ActionRegistry";

export default function PickAction() {
    return (
        <BlockGallery
            add={action => {
                setRoutineInForm(`actions`, v => [...v, action as AnyAction])
            }}
            factory={actions}
            title="Pick an action"
            type="actions"
        />
    )
}