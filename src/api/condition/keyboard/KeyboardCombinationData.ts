export default interface KeyCombinationData {
    ctrl: boolean,
    tab: boolean,
    enter: boolean,
    shift: boolean,
    alt: boolean,
    windows: boolean
    key: string
    keyCode: number
}

export function createEmptyCombination(): KeyCombinationData {
    return {
        key: "",
        keyCode: 0,
        ctrl: false,
        enter: false,
        shift: false,
        alt: false,
        windows: false,
        tab: false
    }
}

export function combinationToString(combination: KeyCombinationData): string {
    const keys: string[] = []
    if (combination.ctrl)
        keys.push("Ctrl")
    if (combination.alt)
        keys.push("Alt")
    if (combination.shift)
        keys.push("Shift")
    if (combination.enter)
        keys.push("Enter")
    if (combination.tab)
        keys.push("Tab")
    if (combination.windows)
        keys.push("Windows")

    if (combination.key)
        keys.push(combination.key)
    return keys.join(" + ")
}