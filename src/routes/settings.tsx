import {createSignal, onMount} from "solid-js";

const [mode, setMode] = createSignal(localStorage.theme);

const darkModeToggle = () => {
    if(localStorage.theme === 'dark') {
        document.getElementsByTagName("html").item(0)!.classList.remove("dark")
        localStorage.theme = 'light'
    } else {
        document.getElementsByTagName("html").item(0)!.classList.add("dark")
        localStorage.theme = 'dark'
    }
    console.log("current mode=" + localStorage.theme)
}

onMount(() => {
    if(localStorage.theme === 'dark') {
        document.getElementsByTagName("html").item(0)!.classList.add("dark")
    }
})

export default function Home() {

    return (
        <main>
            <button class="btn btn-blue inline-flex mt-8 text" onClick={darkModeToggle}>Toggle dark mode</button>
        </main>
    )
}