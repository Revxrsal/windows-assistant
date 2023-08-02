import DisplayedBlock from "~/api/DisplayedBlock";

/**
 * Represents an action that runs
 */
export default interface Action extends DisplayedBlock {

    /**
     * Executes the given action
     */
    execute(): Promise<void>

}