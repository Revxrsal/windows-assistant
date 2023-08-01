// @refresh reload
import {Suspense} from "solid-js";
import {Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts, Title,} from "solid-start";
import "./root.css";
import Sidebar from "~/components/sidebar/Sidebar";
import TitleBar from "~/components/titlebar/TitleBar";

export default function Root() {
    return (
        <Html lang="en">
            <Head>
                <Title>SolidStart - With TailwindCSS</Title>
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
