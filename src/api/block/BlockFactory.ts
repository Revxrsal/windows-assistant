/* eslint-disable @typescript-eslint/no-explicit-any,no-unused-vars */
import BlockMetadata from "~/api/block/BlockMetadata";
import {AnyBlock} from "~/api/block/Block";

/**
 * Handles serializing and deserializing blocks from and to JSON
 */
export default class BlockFactory {

    /**
     * The data type this block stores. Used for error messages
     */
    dataType: string

    constructor(dataType: string) {
        this.dataType = dataType;
    }

    /**
     * Maps the IDs of conditions to factory functions
     */
    private idToFactory: Record<string, (data: any) => any> = {}

    /**
     * Maps the IDs of conditions to a metadata
     */
    private idToMetadata: Record<string, BlockMetadata> = {}

    /**
     * Registers the given item to this factory
     *
     * @param id The item ID. This should be unique
     * @param metadata The item's metadata
     * @param factory The item's factory function from data
     */
    register(id: string, metadata: BlockMetadata, factory: (data: any) => any) {
        if (metadata.createWithNoParams == undefined && metadata.form == undefined)
            throw new Error(`${this.dataType} '${metadata.id}'s metadata does not define 'createWithNoParams' nor 'form'.
             You must specify either.`)
        this.idToFactory[id] = factory
        this.idToMetadata[id] = metadata
    }

    /**
     * Creates a block from the given data. This should mostly be
     * data returned from JSON.parse()
     *
     * @param id The ID of the block
     * @param data The data
     */
    dataToBlock<T>(id: string, data: any): T {
        const factory = this.idToFactory[id]
        if (factory != undefined)
            return factory(data) as T
        throw new Error(`Cannot find any ${this.dataType} with id '${id}'`)
    }

    /**
     * Converts the given block to JSON. It must have the
     * @param item
     */
    blockToJson(item: AnyBlock): string {
        return JSON.stringify(item.data)
    }

    getRegisteredBlockMetas(): BlockMetadata[] {
        return Object.values(this.idToMetadata)
    }

    getMetadata(id: string): BlockMetadata {
        return this.idToMetadata[id]
    }
}
