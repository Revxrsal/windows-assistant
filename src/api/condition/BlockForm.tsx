import {JSX} from "solid-js";

export interface FormProps {
    title: string
    submit: () => void
    enabled?: boolean
    children?: JSX.Element
}

export default function BlockForm(props: FormProps) {
    return <div class={"m-12 flex flex-col"}>
        <h2 class="text text-4xl font-bold mx-12">{props.title}</h2>
        {props.children}
        <button
            class={"bg-blue-600 w-32 h-10 mx-12 rounded text-stone-200 hover:scale-105 transition"}
            disabled={!(props.enabled || true)}
            onClick={props.submit}
        >Create</button>
    </div>
}