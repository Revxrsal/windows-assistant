/* eslint-disable @typescript-eslint/no-explicit-any */
import {JSX} from "solid-js";
import {BlockFormProps} from "~/api/block/BlockMetadata";
import Button from "~/components/button/Button";
import Column from "~/components/layout/Column";
import Title from "~/components/text/Title";

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
        <Column class={`center ${props.class || ""}`}>
            <Title size={5} class={"mt-0"}>
                {props.title}
            </Title>
            <div>
                {props.children}
            </div>
            <Button
                class="m-12 w-32"
                disabled={props.disabled == undefined ? false : props.disabled}
                onClick={props.submit}
            >
                {props.configProps.replace ? "Update" : "Create"}
            </Button>
        </Column>
    </>
}