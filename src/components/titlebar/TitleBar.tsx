// noinspection HtmlUnknownBooleanAttribute

import {TbRectangle} from "solid-icons/tb";
import {FaSolidMinus, FaSolidXmark} from "solid-icons/fa";
import {onMount} from "solid-js";
import {appWindow} from "@tauri-apps/api/window";

export default function TitleBar() {
    let minimizeButton: HTMLDivElement | undefined;
    let maximizeButton: HTMLDivElement | undefined;
    let closeButton: HTMLDivElement | undefined;

    onMount(() => {
        minimizeButton!.onclick = () => appWindow.minimize()
        maximizeButton!.onclick = () => appWindow.toggleMaximize()
        closeButton!.onclick = () => appWindow.close()
    })

    return <div class="titlebar" data-tauri-drag-region>
        <div class="titlebar-button" ref={minimizeButton}>
            <FaSolidMinus/>
        </div>
        <div class="titlebar-button" ref={maximizeButton}>
            <TbRectangle/>
        </div>
        <div class="titlebar-button hover:bg-red-500" ref={closeButton}>
            <FaSolidXmark/>
        </div>
    </div>
}