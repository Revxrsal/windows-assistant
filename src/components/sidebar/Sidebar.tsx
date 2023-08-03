import SidebarItem from "~/components/sidebar/SidebarItem";
import {BsDatabase, BsFolder, BsPinMapFill, BsPlus} from "solid-icons/bs";
import SidebarTitle from "~/components/sidebar/SidebarTitle";
import HorizontalDivider from "~/components/HorizontalDivider";
import {useLocation, useNavigate} from "@solidjs/router";
import SidebarSubtitle from "~/components/sidebar/SidebarSubtitle";
import {FaSolidForwardFast, FaSolidGear} from "solid-icons/fa";
import {ComponentProps, For} from "solid-js";
import Folders from "~/sample/Folders";
import {AiFillHome} from "solid-icons/ai";
import ExpandableSidebarItem from "~/components/sidebar/ExpandableSidebarItem";
import {Routines} from "~/sample/Routines";

interface NewButtonProps extends ComponentProps<"div"> {
    isActive: boolean,
    label: string
}

function NewButton(props: NewButtonProps) {
    return <div class={`h-8 mini-sidebar-item group ${props.isActive ? "bg-blue-600" : ""}`} {...props}>
        <BsPlus
            size={24}
            class={"group-hover:rotate-90 transition-all duration-300 z-10"}
        />
        <span class={"pl-4"}>{props.label}</span>
    </div>
}

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
                    label="Home"
                    icon={<AiFillHome size={24}/>}
                    isActive={isPathExactly("/")}
                    onClick={() => navigate("/")}
                />

                <SidebarItem
                    label="Routines"
                    icon={<BsDatabase size={24}/>}
                    isActive={isPathExactly("/routines")}
                    onClick={() => navigate("/routines")}
                >
                    <NewButton
                        isActive={isPathExactly("/routines/new")}
                        onClick={() => navigate("/routines/new")}
                        label="New routine"
                    />
                    <For each={Routines}>{routine =>
                        <div class={"mini-sidebar-item"} onClick={() => navigate(`/routines/${routine.name}`)}>
                            {routine.name}
                        </div>
                    }</For>
                </SidebarItem>
                <SidebarItem
                    label="Shortcuts"
                    icon={<BsPinMapFill size={24}/>}
                    isActive={isPathOpen("/shortcuts")}
                    onClick={() => navigate("/shortcuts")}
                />
                <SidebarItem
                    label="Quick Actions"
                    icon={<FaSolidForwardFast size={24}/>}
                    isActive={isPathOpen("/actions")}
                    onClick={() => navigate("/actions")}
                />
                <SidebarItem
                    label="Settings"
                    icon={<FaSolidGear size={24}/>}
                    isActive={isPathOpen("/settings")}
                    onClick={() => navigate("/settings")}
                />

                <SidebarSubtitle title="Folders"/>
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