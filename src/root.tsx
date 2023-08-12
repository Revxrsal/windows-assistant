// @refresh reload
import {onMount, Suspense} from "solid-js";
import {Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts, Title,} from "solid-start";
import "./root.css";
import Sidebar from "~/components/sidebar/Sidebar";
import TitleBar from "~/components/titlebar/TitleBar";
import {preferences} from "~/storage/preferences";
import {addPollFunction, saveTriggeredConditions} from "~/scheduler/ApplicationScheduler";
import {storage} from "~/sample/Routines";
import {setupScheduler} from "~/api/utils/fns";

function disableContextMenu() {
    document.addEventListener("contextmenu", event   => event.preventDefault());
}

export default function Root() {
    onMount(async () => {
        addPollFunction(() => storage.routines)
        disableContextMenu()
        await setupScheduler()
        window.addEventListener("beforeunload", () => saveTriggeredConditions(), false);
    })
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