import {createStore} from "solid-js/store";
import {createEffect} from "solid-js";
import {isSystemDarkMode} from "~/util/darkMode";

export interface Preferences {
    darkTheme: boolean
    autoStart: boolean
}

export const [preferences, setPreferences] = createStore<Preferences>(
    parsePreferences()
)

function createDefaultPreferences(): Preferences {
    return {
        darkTheme: isSystemDarkMode(),
        autoStart: false
    }
}

function parsePreferences(): Preferences {
    const json = localStorage?.getItem("assistant.preferences")
    if (json == null)
        return createDefaultPreferences()
    return JSON.parse(json)
}

createEffect(() => localStorage.setItem("assistant.preferences", JSON.stringify(preferences)))

