import Condition from "~/api/condition/Condition";
import Action from "~/api/action/Action";

export default interface Routine {
    name: string
    conditions: Condition[]
    actions: Action[]
}