/* eslint-disable @typescript-eslint/no-explicit-any */
import {useLocation, useNavigate, useParams} from "@solidjs/router";
import {BlockFormProps} from "~/api/block/BlockMetadata";
import {setRoutine} from "~/routes/routines/new";
import {actions} from "~/api/action/ActionRegistry";
import {AnyAction} from "~/api/action/Action";

export interface ConfigState {
    replaceIndex?: number,
    data?: any
}

export default function ConfigureAction() {
    const {id} = useParams();
    const navState = useLocation<ConfigState>().state;
    const navigate = useNavigate()
    const metadata = actions.getMetadata(id)

    const formProps: BlockFormProps<any> = {
        replace: navState?.replaceIndex != undefined,
        submit: (block) => {
            if (navState?.replaceIndex != undefined)
                setRoutine("actions", navState.replaceIndex, "data", block.data);
            else
                setRoutine("actions", v => [...v, block as AnyAction]);
            navigate("/routines/new")
        },
        data: navState?.data
    }
    return <main>
        {metadata.form && metadata.form(formProps)}
    </main>
}