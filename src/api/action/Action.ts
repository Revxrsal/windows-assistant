import {Block, NoData} from "~/api/block/Block";

/**
 * Represents an action that takes no data
 */
export type BasicAction = Action<NoData>

/**
 * Represents a generic action. This should only be used in
 * places that do not care about the action's inner data type,
 * for example the storage or the web component
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyAction = Action<any>

/**
 * Represents an action that runs
 */
export default interface Action<T> extends Block<T> {

    /**
     * Executes the given action
     */
    execute(): Promise<void>

}