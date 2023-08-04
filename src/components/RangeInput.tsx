import {Accessor, Setter} from "solid-js";

export interface NumberInputProps {
    label: string
    class?: string
    min?: number
    max?: number
    value: Accessor<number>
    setValue: Setter<number>
}

export function RangeInput(props: NumberInputProps) {
    const addClass = props.class ? props.class : ""

    return <div class={`h-10 w-32 ${addClass}`}>
        <label for="custom-input-number" class="w-full text text-sm font-semibold">
            {props.label}
        </label>
        <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
            <input type="range"
                   class="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700"
                   name="custom-input-number"
                   min={props.min}
                   max={props.max}
                   value={props.value()}
                   onInput={v => props.setValue(v.target.valueAsNumber)}
            />
        </div>
    </div>
}