// @refresh reload
import {onMount, Suspense} from "solid-js";
import {Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Routes, Scripts, Title,} from "solid-start";
import "./root.css";
import Sidebar from "~/components/sidebar/Sidebar";
import { appWindow } from '@tauri-apps/api/window'

import { BsChevronDoubleDown } from 'solid-icons/bs'
import { FaSolidXmark } from 'solid-icons/fa'
import { TbRectangle } from 'solid-icons/tb'

export default function Root() {
    onMount(() => {
        // assert null because "maybe null" is not good enough
        document
            .getElementById('titlebar-minimize')!
            .addEventListener('click', () => appWindow.minimize())
        document
            .getElementById('titlebar-maximize')!
            .addEventListener('click', () => appWindow.toggleMaximize())
        document
            .getElementById('titlebar-close')!
            .addEventListener('click', () => appWindow.close())
    })
    return (
        <Html lang="en">
            <Head>
                <Title>SolidStart - With TailwindCSS</Title>
                <Meta charset="utf-8"/>
                <Meta name="viewport" content="width=device-width, initial-scale=1"/>
                <div data-tauri-drag-region class="titlebar">
                    <div class="titlebar-button" id="titlebar-minimize">
                        <BsChevronDoubleDown />
                    </div>
                    <div class="titlebar-button" id="titlebar-maximize">
                        <TbRectangle />
                    </div>
                    <div class="titlebar-button" id="titlebar-close">
                        <FaSolidXmark />
                    </div>
                </div>
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
