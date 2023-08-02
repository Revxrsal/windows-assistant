/* eslint-disable @typescript-eslint/no-explicit-any,no-unused-vars */

export default class ItemFactory<T> {

    /**
     * Maps the IDs of conditions to factory functions
     */
    idToItem: Record<string, (data: any) => T> = {}

    /**
     * Registers a condition with the given ID and factory function
     *
     * @param id ID of the condition
     * @param factory The factory function of the condition
     */
    public register(id: string, factory: (data: any) => T) {
        this.idToItem[id] = factory
    }

    /**
     * Constructs a condition from raw JSON data. This function must
     * be called carefully, as it does no property validation.
     *
     * @param data JSON data
     */
    public itemFromData(data: any): T {
        const factory = this.idToItem[data.id]
        if (factory != undefined)
            return factory(data) as T
        throw new Error(`Cannot find a condition with id '${data.id}'`)
    }
}