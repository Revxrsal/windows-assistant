import {createStore} from "solid-js/store";
import {createContext, createEffect} from "solid-js";
import {isSystemDarkMode} from "~/prefs/darkMode";

export interface Preferences {
    darkTheme: boolean
}

function createPreferences(): Preferences {
    return {
        darkTheme: isSystemDarkMode()
    }
}
createContext()
function parsePreferences(): Preferences {
    const json = localStorage.getItem("preferences")
    if (json == null)
        return createPreferences()
    return JSON.parse(json)
}

export const [preferences, setPreferences] = createStore<Preferences>(
    parsePreferences()
)

createEffect(() => localStorage.setItem("preferences", JSON.stringify(preferences)))
