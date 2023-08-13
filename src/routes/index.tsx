import Title from "~/components/text/Title";
import Button from "~/components/button/Button";

export default function Home() {
    return (
        <main>
            <Title size={6}>Windows Assistant</Title>
            <Title size={4}>Getting started</Title>
            <Button class="mx-12 w-fit p-3">
                Open modal
            </Button>
        </main>
    )
}