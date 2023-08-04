import {IoArrowBack} from "solid-icons/io";

export default function BackButton() {
    return <button
        class={`hover:bg-blue-500 group transition mx-12 mt-7 h-12 w-12 p-4 justify-center items-center flex rounded`}
        onClick={() => history.back()}
    >
        <IoArrowBack size={28} class={"text group-hover:text-stone-50"}/>
    </button>;
}
