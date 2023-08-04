/* eslint-disable @typescript-eslint/no-explicit-any */
import {Component} from "solid-js";
import {IconProps} from "solid-icons";
import {AnyBlock} from "~/api/block/Block";

export interface BlockFormProps<T> {
    submit: (block: AnyBlock) => void
    replace: boolean
    data?: T
}

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

    /**
     * The form for configuring this metadata
     */
    form?: Component<BlockFormProps<any>>

    /**
     * A function. This must be specified if 'form'
     * is not present
     */
    createWithNoParams?: () => AnyBlock

}