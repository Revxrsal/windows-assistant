import Action from "~/api/action/Action";
import {IconProps} from "solid-icons";
import {BEEP} from "~/api/action/ActionIDs";
import {invoke} from "@tauri-apps/api";
import {FaSolidVolumeHigh} from "solid-icons/fa";

const NAME = "Beep"
const CLASS = "bg-sky-500 dark:bg-sky-300"
const DESC = "Plays a beep sound"
const ICON = (props: IconProps) => FaSolidVolumeHigh(props)

export default class BeepAction implements Action {

    id = BEEP;
    displayName = NAME;
    backgroundClass = CLASS;
    description = DESC;
    icon = ICON

    async execute(): Promise<void> {
        return invoke("beep")
    }
}

export const BEEP_ACTION = new BeepAction();
