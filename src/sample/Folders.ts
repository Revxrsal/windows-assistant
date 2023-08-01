import Folder, {createFolder} from "~/api/folders/Folder";

const Folders: Folder[] = [
    createFolder("Photos"),
    createFolder("Travel"),
    createFolder("Fitness"),
]

export default Folders;