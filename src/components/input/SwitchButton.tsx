import {JSX} from "solid-js";

export interface SwitchButtonProps {
    checked: boolean,
    onClick: () => void,
    label: JSX.Element,
    class?: string
}

export default function SwitchButton(props: SwitchButtonProps) {
    return <label class={`relative inline-flex items-center cursor-pointer m-8 ${props.class || ""}`}>
        <input
            type="checkbox"
            onClick={() => props.onClick()}
            class="sr-only peer"
            checked={props.checked}/>
        <div class="w-11 h-6 bg-gray-300
                 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
                 dark:peer-focus:ring-blue-800
                 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full
                 peer-checked:after:border-white after:content-['']
                 after:absolute after:top-[2px]
                 after:left-[2px]
                 after:bg-gray-200
                 after:border-stone-400
                 after:border after:rounded-full
                 after:h-5 after:w-5 after:transition-all
                 dark:border-gray-600
                 peer-checked:bg-blue-600">
        </div>
        <span class="ml-4 text-[15px] font-medium text">
            {props.label}
        </span>
    </label>
}