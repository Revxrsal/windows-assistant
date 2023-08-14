import Title from "~/components/text/Title";
import Button from "~/components/button/Button";
import {getBattery} from "~/api/utils/fns";

export default function Home() {
    return (
        <main>
            <Title size={6}>Windows Assistant</Title>
            <Title size={4}>Getting started</Title>
            <Button class="mx-12 w-fit mb-2">
                Open modal
            </Button>
            <button
                   onclick={() => getBattery().then(v => console.log("Battery: " + v * 100))}
                   class="mt-8 text"> Click for battery !!! </button>
        </main>
    )
}