import {generateRandomId} from "~/api/utils/utils";

export default interface Folder {
    id: number
    name: string
}

export function createFolder(name: string): Folder {
    // TODO: check for no conflicts
    return {
        name: name,
        id: generateRandomId()
    }
}
