import Condition from "~/api/condition/Condition";
import BlockMetadata from "~/api/block/BlockMetadata";
import BlockFactory from "~/api/block/BlockFactory";
import {AiFillAppstore} from "solid-icons/ai";
import ProcessRunningForm from "~/api/condition/process/ProcessRunningForm";
import {getBaseFileName} from "~/api/utils/utils";
import {isProcessRunning} from "~/api/utils/fns";

const ID = "is-process-running"

export interface ProcessRunningData {
    path: string
}

const METADATA: BlockMetadata = {
    id: ID,
    displayName: "App start",
    description: "Triggered when a specific application is open",
    backgroundClass: "bg-green-500 dark:bg-green-300",
    icon: (props) => AiFillAppstore(props),
    form: (props) => ProcessRunningForm(props)
}

export class ProcessRunningCondition implements Condition<ProcessRunningData> {

    metadata = METADATA;
    triggersOnce = true;
    data: ProcessRunningData;

    description = () => `When ${getBaseFileName(this.data.path)} is opened`;

    constructor(data: ProcessRunningData) {
        this.data = data
    }

    async eval(): Promise<boolean> {
        return isProcessRunning(this.data.path)
    }

    static register(factory: BlockFactory) {
        factory.register(ID, METADATA, (data) => new ProcessRunningCondition(data))
    }
}