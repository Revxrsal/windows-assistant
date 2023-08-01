import NewItemButton from "~/components/NewItemButton";
import {BsBatteryHalf, BsRecordCircleFill} from "solid-icons/bs";
import BlockCard from "~/components/BlockCard";

function Subtitle(props: { text: string }) {
    return <p class="mx-12 my-7 text font-bold text-2xl">{props.text}</p>
}

export default function Home() {
    return (
        <main class="flex h-full flex-col">
            <Subtitle text="New shortcut"/>
            <div class={"justify-center flex flex-col title m-12 mt-0"}>
                <input type="text" placeholder={"Shortcut name..."}
                       class="border-none outline-none
                       text-blue-800 dark:text-blue-400
                       bg-gray-100 dark:bg-stone-800"/>
            </div>
            <p class="mx-12 text font-bold text-xl">When...</p>
            <div class={"flex flex-col m-4"}>
                <NewItemButton
                    class="bg-green-600 dark:bg-green-300"
                    text="Add condition"
                />
                <BlockCard
                    icon={<BsBatteryHalf size={28}/>}
                    title={"Battery low"}
                    class={"bg-yellow-500 dark:bg-yellow-300"}
                    description={"Run when battery goes below 30%"}/>
                <BlockCard
                    icon={<BsRecordCircleFill size={28}/>}
                    title={"Activated manually"}
                    class={"bg-green-500 dark:bg-green-300"}
                    description={"Run this shortcut manually"}/>
            </div>
        </main>
    )
}