import {useNavigate, useParams} from "@solidjs/router";
import {BlockFormProps} from "~/api/block/BlockMetadata";
import {setState} from "~/routes/routines/new";
import {actions} from "~/api/action/ActionRegistry";
import {AnyAction} from "~/api/action/Action";

export default function ConfigureCondition() {
    const {id} = useParams();
    const navigate = useNavigate()
    const metadata = actions.getMetadata(id)
    const formProps: BlockFormProps = {
        submit: (block) => {
            setState("actions", v => [...v, block as AnyAction]);
            navigate("/routines/new")
        }
    }
    return <main>
        {metadata.form && metadata.form(formProps)}
    </main>
}