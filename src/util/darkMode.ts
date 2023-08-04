/**
 * Finds whether the system is in dark mode or not
 */
export function isSystemDarkMode(): boolean {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
}
