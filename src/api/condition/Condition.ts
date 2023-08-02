import DisplayedBlock from "~/api/common/DisplayedBlock";

/**
 * Represents a condition that evaluates to a boolean.
 */
export default interface Condition extends DisplayedBlock {

    /**
     * Evaluates this condition. This function should generally
     * be fast and non-blocking, as it may be invoked repeatedly.
     */
    eval: () => Promise<boolean>
}