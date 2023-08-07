// @refresh reload
import {onMount, Suspense} from "solid-js";
import {Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts, Title,} from "solid-start";
import "./root.css";
import Sidebar from "~/components/sidebar/Sidebar";
import TitleBar from "~/components/titlebar/TitleBar";
import {preferences} from "~/storage/preferences";
import ApplicationScheduler from "~/ApplicationScheduler";
import {storage} from "~/sample/Routines";

onMount(async () => {
    const scheduler = new ApplicationScheduler()
    scheduler.poll(() => storage.routines)
})

export default function Root() {
    return (
        <Html lang="en" classList={{
            dark: preferences.darkTheme
        }}>
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