/* eslint-disable @typescript-eslint/no-explicit-any */
import {JSX} from "solid-js";
import {BlockFormProps} from "~/api/block/BlockMetadata";

export interface FormProps {
    title: string
    submit: () => void
    enabled?: boolean
    children?: JSX.Element,
    configProps: BlockFormProps<any>
}

export default function BlockForm(props: FormProps) {
    return <>
        <div class={"flex flex-col items-center content-center justify-center"}>
            <p class="text font-bold text-5xl pb-12">
                {props.title}
            </p>
            <div>
                {props.children}
            </div>
            <button
                class={"bg-blue-600 w-32 h-10 mx-12 my-12 rounded text-stone-200 hover:scale-105 transition"}
                disabled={!(props.enabled || true)}
                onClick={props.submit}
            >{props.configProps.replace ? "Update" : "Create"}</button>
        </div>
    </>
}