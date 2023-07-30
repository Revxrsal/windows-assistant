import {JSX} from "solid-js";

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
}

export default function Button(props: ButtonProps) {
    return (
        <button class="" {...props}/>
    )
}
