export default function Home() {
    return (
        <main class="flex h-full flex-col">
            <p class="mx-12 my-7 text font-bold text-xl">New shortcut</p>
            <div class={"justify-center flex flex-col title m-12 mt-0"}>
                <input type="text" placeholder={"Shortcut name..."}
                       class="
                       border-none outline-none
                       text
                       bg-gray-100 dark:bg-stone-800"/>
            </div>
        </main>
    )
}