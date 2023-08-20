import Action from "~/api/action/Action";
import BlockMetadata from "~/api/block/BlockMetadata";
import BlockFactory from "~/api/block/BlockFactory";
import { RiMediaGalleryFill } from 'solid-icons/ri'
import SetBackgroundForm from "~/api/action/set-background/SetBackgroundForm";
import {setBackground} from "~/api/utils/fns";

const ID = "setBackground"

const METADATA: BlockMetadata = {
    id: ID,
    displayName: "Set Background",
    description: "Sets the desktop background",
    backgroundClass: "bg-fuchsia-500 dark:bg-fuchsia-300",
    icon: (props) => RiMediaGalleryFill(props),
    form: (props) => SetBackgroundForm(props)
}

export interface SetBackground {
    url: string
}

export default class SetBackgroundAction implements Action<SetBackground> {

    metadata = METADATA;
    data: SetBackground
    description = () => `Changes the background to (" + ` + this.data.url + `);`

    constructor(data: SetBackground) {
        this.data = data;
    }

    async execute(): Promise<void> {
        return setBackground(this.data.url)
    }

    static register(factory: BlockFactory) {
        factory.register(ID, METADATA, (data) => new SetBackgroundAction(data));
    }
}