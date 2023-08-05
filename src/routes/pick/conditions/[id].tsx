/* eslint-disable @typescript-eslint/no-explicit-any */
import {conditions} from "~/api/condition/ConditionRegistry";
import {useLocation, useNavigate, useParams} from "@solidjs/router";
import {BlockFormProps} from "~/api/block/BlockMetadata";
import {setRoutineInForm} from "~/routes/routines/new";
import {AnyCondition} from "~/api/condition/Condition";
import {ConfigState} from "~/routes/pick/actions/[id]";

export default function ConfigureCondition() {
    const params = useParams();
    const navState = useLocation<ConfigState>().state;
    const navigate = useNavigate()
    const metadata = conditions.getMetadata(params.id)

    const formProps: BlockFormProps<any> = {
        replace: navState?.replaceIndex != undefined,
        submit: (block) => {
            if (navState?.replaceIndex != undefined) {
                setRoutineInForm("conditions", navState.replaceIndex, "data", block.data);
                history.go(-1) // go to the edit form page. it's 1 since we didn't go to the block gallery
            } else {
                setRoutineInForm("conditions", v => [...v, block as AnyCondition]);
                history.go(-2) // go to the edit form page. it's 1 since we went to the block gallery
            }
        },
        data: navState?.data
    }
    return <main>
        {metadata.form && metadata.form(formProps)}
    </main>
}