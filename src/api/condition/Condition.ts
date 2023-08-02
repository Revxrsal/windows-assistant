import {Block, NoData} from "~/api/block/Block";

/**
 * A condition that takes no data
 */
export type BasicCondition = Condition<NoData>

/**
 * Represents a generic condition. This should only be used in
 * places that do not care about the condition's inner data type,
 * for example the storage or the web component
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyCondition = Condition<any>

/**
 * Represents a condition that evaluates to a boolean.
 */
export default interface Condition<T> extends Block<T> {

    /**
     * Evaluates this condition. This function should generally
     * be fast and non-blocking, as it may be invoked repeatedly.
     */
    eval: () => Promise<boolean>
}