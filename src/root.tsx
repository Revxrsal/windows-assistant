// @refresh reload
import {onMount, Suspense} from "solid-js";
import {Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts, Title,} from "solid-start";
import "./root.css";
import Sidebar from "~/components/sidebar/Sidebar";
import TitleBar from "~/components/titlebar/TitleBar";
import {registerConditions} from "~/api/condition/ConditionRegistry";
import {registerActions} from "~/api/action/ActionRegistry";
import {preferences} from "~/storage/preferences";

/**
 * Registers blocks and conditions
 */
function registerBlockTypes() {
    registerConditions();
    registerActions();
}

export default function Root() {
    onMount(() => registerBlockTypes())

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