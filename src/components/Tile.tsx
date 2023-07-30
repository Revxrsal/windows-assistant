import {JSX} from "solid-js";

export interface TileProps {
    children?: JSX.Element
}

export default function Tile(props: TileProps) {
    return <div class="min-w-sm max-w-sm rounded shadow-lg text-center">
        <div class={"px-4 py-4"}>
            {props.children}
        </div>
    </div>

}