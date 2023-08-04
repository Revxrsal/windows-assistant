import {createEffect, createSignal, JSX, onMount} from "solid-js";

const [mode, setMode] = createSignal(localStorage.theme);

const setTheme = (value: boolean) => {
    if(value) {
        setMode('dark')
    } else {
        setMode('light')
    }
}

const handleDarkToggle: JSX.EventHandler<HTMLInputElement, Event> = event => {
    setTheme(event.currentTarget.checked);
};

const retrieveDarkState = () => {
    return mode() === 'dark'
}

onMount(() => {
    if(localStorage.theme === 'dark') {
        document.getElementsByTagName("html").item(0)!.classList.add("dark")
    }
})

export default function Home() {

    createEffect(() => {
        if(mode() === 'dark') {
            document.getElementsByTagName("html").item(0)!.classList.add("dark")
        } else {
            document.getElementsByTagName("html").item(0)!.classList.remove("dark")
        }
    })

    return (
        <main>
            <label class="relative inline-flex items-center cursor-pointer mt-8">
                <input type="checkbox" onClick={handleDarkToggle} class="sr-only peer" checked={retrieveDarkState()} />
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span class="ml-3 text-sm font-medium text">Dark Mode</span>
            </label>
        </main>
    )
}