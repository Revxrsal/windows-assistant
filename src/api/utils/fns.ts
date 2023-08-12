import {invoke} from "@tauri-apps/api";
import KeyCombinationData from "~/api/condition/keyboard/KeyboardCombinationData";

export async function setupScheduler(): Promise<void> {
    return invoke("setup_scheduler")
}

export async function isProcessRunning(processPath: string): Promise<boolean> {
    return invoke("is_process_running", {
        processPath: processPath
    })
}

 export async function pickFile(filters: [string, string[]][]): Promise<string> {
    return invoke("pick_file", {
        filters: filters
    })
}

export async function getBattery(): Promise<number> {
    return invoke("get_battery")
}

export async function isCombinationPressed(combination: KeyCombinationData): Promise<boolean> {
    return invoke("is_combination_pressed", {
        combination: combination
    })
}

export async function isDeviceCharging(): Promise<boolean> {
    return invoke("is_charging")
}

export async function runFile(path: string, args?: string): Promise<void> {
    return invoke("run_file", {
        path: path,
        args: args || null
    })
}

export async function beep(): Promise<void> {
    return invoke("beep")
}

export async function openBrowser(url: string): Promise<void> {
    return invoke("open_browser", {
        url: url,
    })
}
