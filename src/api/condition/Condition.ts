import {Component, JSX} from "solid-js";
import {IconProps} from "solid-icons";

/**
 * Represents a condition that evaluates to a boolean.
 */
export default interface Condition {

    /**
     * A unique ID for this condition. This is specified in 'ConditionIDs.ts'
     */
    id: string

    /**
     * The name of the condition
     */
    name: string

    /**
     * The description of the condition
     */
    description: string

    /**
     * The class displayed for the background for the icon of the
     * condition.
     */
    backgroundClass: string

    /**
     * The icon of the condition
     */
    icon: Component<IconProps>

    /**
     * Evaluates this condition. This function should generally
     * be fast and non-blocking, as it may be invoked repeatedly.
     */
    eval: () => Promise<boolean>
}