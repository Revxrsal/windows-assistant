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
     * Whether should this condition trigger only once. For example, if
     * the condition is true at T=0, and remains true at T=1,
     * actions will not be re-triggered unless triggersOnce is
     * false.
     *
     * If a condition is true at T=1, false at T=2, true at T=3, it will
     * be re-triggered.
     */
    triggersOnce: boolean

    /**
     * Evaluates this condition. This function should generally
     * be fast and non-blocking, as it may be invoked repeatedly.
     */
    eval: () => Promise<boolean>
}