import {JSX} from "solid-js";

export interface DivProps extends JSX.HTMLAttributes<HTMLElement> {
}

export default function Main(props: DivProps) {
    return <main class="text-center mx-auto text-gray-700 dark:text-gray-300 p-4" {...props}/>
}