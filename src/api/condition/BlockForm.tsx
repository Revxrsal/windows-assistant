/* eslint-disable @typescript-eslint/no-explicit-any */
import {JSX} from "solid-js";
import BackButton from "~/components/BackButton";
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
        <BackButton/>
        <div class={"m-12 flex flex-col"}>
            <p class="text font-bold text-4xl">
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