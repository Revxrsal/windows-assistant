import Action from "~/api/action/Action";
import BlockMetadata from "~/api/block/BlockMetadata";
import BlockFactory from "~/api/block/BlockFactory";
import OpenBrowserForm from "~/api/action/open-browser/OpenBrowserForm";
import {AiOutlineLink} from "solid-icons/ai";
import {openBrowser} from "~/api/utils/fns";

const ID = "openBrowser"

const METADATA: BlockMetadata = {
    id: ID,
    displayName: "Open URL",
    description: "Opens the given URL in the browser",
    backgroundClass: "bg-fuchsia-500 dark:bg-fuchsia-300",
    icon: (props) => AiOutlineLink(props),
    form: (props) => OpenBrowserForm(props)
}

export interface OpenBrowserData {
    url: string
}

export default class OpenBrowserAction implements Action<OpenBrowserData> {

    metadata = METADATA;
    data: OpenBrowserData
    description = () => `Opens (${new URL(this.data.url).hostname}) in the browser`;

    constructor(data: OpenBrowserData) {
        this.data = data;
    }

    async execute(): Promise<void> {
        return openBrowser(this.data.url)
    }

    static register(factory: BlockFactory) {
        factory.register(ID, METADATA, (data) => new OpenBrowserAction(data));
    }
}