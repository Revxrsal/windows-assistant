import Action from "~/api/action/Action";
import BlockMetadata from "~/api/block/BlockMetadata";
import BlockFactory from "~/api/block/BlockFactory";
import {VsRunAll} from "solid-icons/vs";
import RunProgramForm from "~/api/action/run-program/RunProgramForm";
import {getBaseFileName} from "~/api/utils/utils";
import {runFile} from "~/api/utils/fns";

const ID = "runProgram"

const METADATA: BlockMetadata = {
    id: ID,
    displayName: "Run program",
    description: "Runs the given program",
    backgroundClass: "bg-emerald-500 dark:bg-emerald-300",
    icon: (props) => VsRunAll(props),
    form: (props) => RunProgramForm(props)
}

export interface RunProgramData {
    path: string
    args: string
}

export default class RunProgramAction implements Action<RunProgramData> {

    metadata = METADATA;
    data: RunProgramData
    description = () => `Opens ${getBaseFileName(this.data.path)}`;

    constructor(data: RunProgramData) {
        this.data = data;
    }

    async execute(): Promise<void> {
        return runFile(this.data.path, this.data.args)
    }

    static register(factory: BlockFactory) {
        factory.register(ID, METADATA, (data) => new RunProgramAction(data));
    }
}