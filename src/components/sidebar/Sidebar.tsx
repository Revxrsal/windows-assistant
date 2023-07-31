import SidebarItem from "~/components/sidebar/SidebarItem";
import {BsDatabaseAdd, BsFolder, BsGear, BsPinMapFill} from "solid-icons/bs";
import SidebarTitle from "~/components/sidebar/SidebarTitle";
import HorizontalDivider from "~/components/HorizontalDivider";
import {useLocation} from "@solidjs/router";
import SidebarSubtitle from "~/components/sidebar/SidebarSubtitle";

export default function Sidebar() {
    const location = useLocation();
    const isPathOpen = (path: string) => location.pathname.startsWith(path)
    return (
        <>
            <div class="sidebar">
                <SidebarTitle title={"Windows Assistant"}/>
                <HorizontalDivider/>
                <SidebarItem
                    label={"New"}
                    icon={<BsDatabaseAdd size={24}/>}
                    isActive={isPathOpen("/")}
                />
                <SidebarItem
                    label={"My Shortcuts"}
                    icon={<BsPinMapFill size={24}/>}
                    isActive={isPathOpen("/my-shortcuts")}
                />
                <SidebarItem
                    label={"Quick Actions"}
                    icon={<BsGear size={24}/>}
                    isActive={isPathOpen("/my-actions")}
                />

                <SidebarSubtitle title={"Folders"}/>
                <SidebarItem label={"Travel"} icon={<BsFolder size={24}/>}/>
                <SidebarItem label={"Photos"} icon={<BsFolder size={24}/>}/>
                <SidebarItem label={"Fitness"} icon={<BsFolder size={24}/>}/>
            </div>
        </>
    )
}