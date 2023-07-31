import {BsMagic} from "solid-icons/bs";

export default function SidebarTitle(props: { title: string }) {
    return <div class="p-2.5 mt-1 flex items-center">
        <div class="px-2 py-2 rounded-md bg-blue-600 aspect-square">
            <BsMagic size={28} class={"text-gray-100"}/>
        </div>
        <h1 class="font-bold text-gray-200 text-[17px] ml-3">{props.title}</h1>
    </div>
}