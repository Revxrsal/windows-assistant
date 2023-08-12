import Title from "~/components/text/Title";

export default function Home() {
    return (
        <main>
            <Title size={6}>Windows Assistant</Title>
            <Title size={4}>Getting started</Title>
            <button class="mx-12 bg-blue-600 w-32 text-stone-200 h-10 rounded hover:scale-105 transition">
                Open modal
            </button>
        </main>
    )
}