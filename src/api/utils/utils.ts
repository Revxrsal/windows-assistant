export function generateRandomId() {
    return window.crypto.getRandomValues(new Uint32Array(1))[0]
}