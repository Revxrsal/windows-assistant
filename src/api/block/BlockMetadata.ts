import {Component} from "solid-js";
import {IconProps} from "solid-icons";

/**
 * Represents a block. This is either a condition or an action
 */
export default interface BlockMetadata {

    /**
     * A unique ID for this block. This is specified in 'ConditionIDs.ts'
     */
    id: string

    /**
     * The display name of the block
     */
    displayName: string

    /**
     * The description of the block
     */
    description: string

    /**
     * The class displayed for the background for the icon of the
     * block.
     */
    backgroundClass: string

    /**
     * The icon of the block
     */
    icon: Component<IconProps>

}