/**
 * Generates a random number used for IDs
 */
export function generateRandomId() {
    return window.crypto.getRandomValues(new Uint32Array(1))[0]
}

/**
 * Returns the base name of the given path
 *
 * @param path The path
 */
export function getBaseFileName(path: string): string {
    return path.replace(/^.*[\\/]/, '')
}