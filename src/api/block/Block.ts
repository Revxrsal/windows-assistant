import BlockMetadata from "~/api/block/BlockMetadata";

/**
 * A type that semantically means this block takes no data
 */
export interface NoData {
}

/**
 * Represents a generic block. This should only be used in
 * places that do not care about the block's inner data type,
 * for example the storage or the web component
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyBlock = Block<any>

/**
 * Represents a block that evaluates to something
 */
export interface Block<T> {

    /**
     * Data for this block
     */
    data?: T

    /**
     * Contains information about this block
     */
    metadata: BlockMetadata

    /**
     * Returns a description that describes this block with the data it has.
     *
     * This *should* use the data. For example, a BatteryCondition's description
     * will be ("Triggered when battery reaches 30%"), where 30 is specified
     * in its data.
     */
    description: () => string

}