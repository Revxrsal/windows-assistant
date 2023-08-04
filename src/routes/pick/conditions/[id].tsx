/* eslint-disable @typescript-eslint/no-explicit-any */
import {conditions} from "~/api/condition/ConditionRegistry";
import {useLocation, useNavigate, useParams} from "@solidjs/router";
import {BlockFormProps} from "~/api/block/BlockMetadata";
import {setState} from "~/routes/routines/new";
import {AnyCondition} from "~/api/condition/Condition";
import {ConfigState} from "~/routes/pick/actions/[id]";

export default function ConfigureCondition() {
    const {id} = useParams();
    const navState = useLocation<ConfigState>().state;
    const navigate = useNavigate()
    const metadata = conditions.getMetadata(id)

    const formProps: BlockFormProps<any> = {
        replace: navState?.replaceIndex != undefined,
        submit: (block) => {
            if (navState?.replaceIndex != undefined)
                setState("conditions", navState.replaceIndex, "data", block.data);
            else
                setState("conditions", v => [...v, block as AnyCondition]);
            navigate("/routines/new")
        },
        data: navState?.data
    }
    return <main>
        {metadata.form && metadata.form(formProps)}
    </main>
}