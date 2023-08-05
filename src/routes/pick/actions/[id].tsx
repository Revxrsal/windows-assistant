/* eslint-disable @typescript-eslint/no-explicit-any */
import {useLocation, useNavigate, useParams} from "@solidjs/router";
import {BlockFormProps} from "~/api/block/BlockMetadata";
import {setRoutineInForm} from "~/routes/routines/new";
import {actions} from "~/api/action/ActionRegistry";
import {AnyAction} from "~/api/action/Action";

export interface ConfigState {
    replaceIndex?: number,
    data?: any
}

export default function ConfigureAction() {
    const params = useParams();
    const navState = useLocation<ConfigState>().state;
    const navigate = useNavigate()
    const metadata = actions.getMetadata(params.id)

    const formProps: BlockFormProps<any> = {
        replace: navState?.replaceIndex != undefined,
        submit: (block) => {
            if (navState?.replaceIndex != undefined) {
                setRoutineInForm("actions", navState.replaceIndex, "data", block.data);
                history.go(-1) // go to the edit form page. it's 1 since we didn't go to the block gallery
            } else {
                setRoutineInForm("actions", v => [...v, block as AnyAction]);
                history.go(-2) // go to the edit form page. it's 1 since we went to the block gallery
            }
        },
        data: navState?.data
    }
    return <main>
        {metadata.form && metadata.form(formProps)}
    </main>
}