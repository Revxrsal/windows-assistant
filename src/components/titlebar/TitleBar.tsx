// noinspection HtmlUnknownBooleanAttribute

import {TbRectangle} from "solid-icons/tb";
import {FaSolidMinus, FaSolidXmark} from "solid-icons/fa";
import {appWindow} from "@tauri-apps/api/window";

export default function TitleBar() {
    return <div class="titlebar" data-tauri-drag-region>
        <div class="titlebar-button" onClick={() => appWindow.minimize()}>
            <FaSolidMinus/>
        </div>
        <div class="titlebar-button" onClick={() => appWindow.toggleMaximize()}>
            <TbRectangle/>
        </div>
        <div class="titlebar-button hover:bg-red-500 dark:hover:bg-red-500" onClick={() => appWindow.close()}>
            <FaSolidXmark/>
        </div>
    </div>
}