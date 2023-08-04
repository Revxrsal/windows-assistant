import {conditions} from "~/api/condition/ConditionRegistry";
import {useNavigate, useParams} from "@solidjs/router";
import {BlockFormProps} from "~/api/block/BlockMetadata";
import {setState} from "~/routes/routines/new";
import {AnyCondition} from "~/api/condition/Condition";

export default function ConfigureCondition() {
    const {id} = useParams();
    const navigate = useNavigate()
    const metadata = conditions.getMetadata(id)
    const formProps: BlockFormProps = {
        submit: (block) => {
            setState("conditions", v => [...v, block as AnyCondition]);
            navigate("/routines/new")
        }
    }
    return <main>
        {metadata.form && metadata.form(formProps)}
    </main>
}