import Main from "~/layout/Main";
import {A} from "solid-start";

export default function NotFound() {
    return (
        <Main>
            <h1 class="">
                Not Found
            </h1>
            <p class="mt-8">
                Visit{" "}
                <a
                    href="https://solidjs.com"
                    target="_blank"
                    class="text-sky-600 dark:text-sky-300 hover:underline"
                >
                    solidjs.com
                </a>{" "}
                to learn how to build Solid apps.
            </p>
            <p class="my-4">
                <A href="/">Home</A>
                {" - "}
                <A href="/create">Create</A>
            </p>
        </Main>
    );
}
