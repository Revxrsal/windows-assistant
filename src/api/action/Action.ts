import DisplayedBlock from "~/api/common/DisplayedBlock";

/**
 * Represents an action that runs
 */
export default interface Action extends DisplayedBlock {

    /**
     * Executes the given action
     */
    execute(): Promise<void>

}