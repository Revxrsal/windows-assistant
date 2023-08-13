/* eslint-disable @typescript-eslint/no-explicit-any */
import {JSX} from "solid-js";
import {BlockFormProps} from "~/api/block/BlockMetadata";
import Button from "~/components/button/Button";

export interface FormProps {
    title: string
    submit: () => void
    disabled?: boolean
    children?: JSX.Element,
    configProps: BlockFormProps<any>
    class?: string
}

export default function BlockForm(props: FormProps) {
    return <>
        <div class={`flex flex-col items-center content-center justify-center ${props.class || ""}`}>
            <p class="text font-bold text-5xl pb-12">
                {props.title}
            </p>
            <div>
                {props.children}
            </div>
            <Button
                class="m-12 w-32 p-4"
                disabled={props.disabled == undefined ? false : props.disabled}
                onClick={props.submit}
            >
                {props.configProps.replace ? "Update" : "Create"}
            </Button>
        </div>
    </>
}