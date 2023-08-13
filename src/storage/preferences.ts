import {createStore} from "solid-js/store";
import {createEffect} from "solid-js";
import {isSystemDarkMode} from "~/util/darkMode";
import { enable, isEnabled, disable } from "tauri-plugin-autostart-api";

export interface Preferences {
    darkTheme: boolean
    autoStart: boolean
}

export const [preferences, setPreferences] = createStore<Preferences>(
    parsePreferences()
)

function createPreferences(): Preferences {
    isEnabled().then(cb => {
        setPreferences("autoStart", cb)
    });

    return {
        darkTheme: isSystemDarkMode(),
        autoStart: preferences.autoStart
    }
}

function parsePreferences(): Preferences {
    const json = localStorage?.getItem("assistant.preferences")
    if (json == null)
        return createPreferences()
    return JSON.parse(json)
}

createEffect(() => {
    localStorage.setItem("assistant.preferences", JSON.stringify(preferences))
    if(preferences.autoStart) {
        enable();
    } else {
        disable();
    }
})

