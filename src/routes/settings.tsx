import {preferences, setPreferences} from "~/prefs/preferences";

export default function Settings() {
    return (
        <main>
            <h1 class="text-6xl m-12 font-bold text">Settings</h1>
            <h2 class="text-4xl m-12 font-bold text">Appearance</h2>
            <label class="m-12 relative inline-flex items-center cursor-pointer mt-8">
                <input
                    type="checkbox"
                    onClick={() => {
                        setPreferences("darkTheme", !preferences.darkTheme)
                    }}
                    class="sr-only peer"
                    checked={preferences.darkTheme}/>
                <div class="w-11 h-6 bg-gray-300
                 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
                 dark:peer-focus:ring-blue-800
                 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full
                 peer-checked:after:border-white after:content-['']
                 after:absolute after:top-[2px]
                 after:left-[2px]
                 after:bg-gray-200
                 after:border-stone-400
                 after:border after:rounded-full
                 after:h-5 after:w-5 after:transition-all
                 dark:border-gray-600
                 peer-checked:bg-blue-600">
                </div>
                <span class="ml-3 text-sm font-medium text">
                    Dark Mode
                </span>
            </label>
        </main>
    )
}