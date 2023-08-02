/**
 * Generates a random number used for IDs
 */
export function generateRandomId() {
    return window.crypto.getRandomValues(new Uint32Array(1))[0]
}