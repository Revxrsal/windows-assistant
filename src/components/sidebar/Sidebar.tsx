import SidebarItem from "~/components/sidebar/SidebarItem";
import {BsDatabase, BsFolder, BsPinMapFill} from "solid-icons/bs";
import SidebarTitle from "~/components/sidebar/SidebarTitle";
import HorizontalDivider from "~/components/HorizontalDivider";
import {useLocation, useNavigate} from "@solidjs/router";
import SidebarSubtitle from "~/components/sidebar/SidebarSubtitle";
import {FaSolidForwardFast} from "solid-icons/fa";
import {For} from "solid-js";
import Folders from "~/sample/Folders";
import {AiFillHome} from "solid-icons/ai";
import ExpandableSidebarItem from "~/components/sidebar/ExpandableSidebarItem";

export default function Sidebar() {
    const location = useLocation();
    const isPathOpen = (path: string) => location.pathname.startsWith(path);
    const isPathExactly = (path: string) => location.pathname === path;
    const navigate = useNavigate();
    return (
        <>
            <div class="sidebar">
                <SidebarTitle title={"Windows Assistant"}/>
                <HorizontalDivider/>
                <SidebarItem
                    label={"Home"}
                    icon={<AiFillHome size={24}/>}
                    isActive={isPathExactly("/")}
                    onClick={() => navigate("/")}
                />

                <SidebarItem
                    label={"Routines"}
                    icon={<BsDatabase size={24}/>}
                    isActive={isPathOpen("/routines")}
                    onClick={() => navigate("/routines")}
                />
                <SidebarItem
                    label="Shortcuts"
                    icon={<BsPinMapFill size={24}/>}
                    isActive={isPathOpen("/shortcuts")}
                    onClick={() => navigate("/shortcuts")}
                />
                <SidebarItem
                    label={"Quick Actions"}
                    icon={<FaSolidForwardFast size={24}/>}
                    isActive={isPathOpen("/actions")}
                    onClick={() => navigate("/actions")}
                />

                <SidebarSubtitle title={"Folders"}/>
                <For each={Folders}>{folder =>
                    <ExpandableSidebarItem
                        label={folder.name}
                        icon={<BsFolder size={24}/>}
                    />
                }</For>
            </div>
        </>
    )
}