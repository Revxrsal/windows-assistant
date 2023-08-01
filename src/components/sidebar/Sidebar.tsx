import SidebarItem from "~/components/sidebar/SidebarItem";
import {BsDatabase, BsDatabaseAdd, BsFolder, BsGear, BsPinMapFill} from "solid-icons/bs";
import SidebarTitle from "~/components/sidebar/SidebarTitle";
import HorizontalDivider from "~/components/HorizontalDivider";
import {useLocation} from "@solidjs/router";
import SidebarSubtitle from "~/components/sidebar/SidebarSubtitle";
import {FaSolidForwardFast} from "solid-icons/fa";
import {For} from "solid-js";
import Folders from "~/sample/Folders";

export default function Sidebar() {
    const location = useLocation();
    const isPathOpen = (path: string) => location.pathname.startsWith(path)
    return (
        <>
            <div class="sidebar">
                <SidebarTitle title={"Windows Assistant"}/>
                <HorizontalDivider/>
                <SidebarItem
                    label={"Routines"}
                    icon={<BsDatabase size={24}/>}
                    isActive={isPathOpen("/")}
                />
                <SidebarItem
                    label="Shortcuts"
                    icon={<BsPinMapFill size={24}/>}
                    isActive={isPathOpen("/my-shortcuts")}
                />
                <SidebarItem
                    label={"Quick Actions"}
                    icon={<FaSolidForwardFast size={24}/>}
                    isActive={isPathOpen("/my-actions")}
                />

                <SidebarSubtitle title={"Folders"}/>
                <For each={Folders}>{folder =>
                    <SidebarItem label={folder.name} icon={<BsFolder size={24}/>}/>}
                </For>
            </div>
        </>
    )
}