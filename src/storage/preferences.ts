import {createStore} from "solid-js/store";
import {createEffect} from "solid-js";
import {isSystemDarkMode} from "~/util/darkMode";
import {disable, enable, isEnabled} from "tauri-plugin-autostart-api";

export interface Preferences {
    darkTheme: boolean
    autoStart: boolean
}

export const [preferences, setPreferences] = createStore<Preferences>(
    parsePreferences()
)

function createDefaultPreferences(): Preferences {
    // Default enable
    isEnabled().then(cb => {
        if(cb) return;
        enable().then();
    })
    return {
        darkTheme: isSystemDarkMode(),
        autoStart: true
    }
}

function parsePreferences(): Preferences {
    const json = localStorage?.getItem("assistant.preferences")
    if (json == null)
        return createDefaultPreferences()
    return JSON.parse(json)
}

createEffect(() => {
    localStorage.setItem("assistant.preferences", JSON.stringify(preferences))
    isEnabled().then(async cb => {
        if(preferences.autoStart) {
            if(cb) {
                console.warn("Internal error: Cannot enable autoStart as it is already enabled.");
                return;
            }
            await enable();
        }
        if(!preferences.autoStart) {
            if(!cb) {
                console.warn("Internal error: Cannot disable autoStart as it is already disabled.");
                return;
            }
            await disable();
        }
    })
})

