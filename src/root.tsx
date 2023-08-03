// @refresh reload
import {createEffect, createSignal, Suspense} from "solid-js";
import {Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts, Title,} from "solid-start";
import "./root.css";
import Sidebar from "~/components/sidebar/Sidebar";
import TitleBar from "~/components/titlebar/TitleBar";

const getTheme = () => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        localStorage.theme = 'dark';
        return 'dark'
    } else {
        localStorage.theme = 'light';
        return 'light'
    }
}

const [mode, setMode] = createSignal(getTheme())

export default function Root() {

    createEffect(() => {
        localStorage.theme = mode()
    })

    return (
        <Html lang="en" class={mode()}>
            <Head>
                <Title>Windows Assistant</Title>
                <Meta charset="utf-8"/>
                <Meta name="viewport" content="width=device-width, initial-scale=1"/>
                <TitleBar/>
            </Head>

            <Body>
                <Suspense>
                    <ErrorBoundary>
                        <div class={"content-container"}>
                            <Sidebar/>
                            <Routes>
                                <FileRoutes/>
                            </Routes>
                        </div>
                    </ErrorBoundary>
                </Suspense>
                <Scripts/>
            </Body>
        </Html>
    );
}
