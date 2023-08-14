import SidebarItem from "~/components/sidebar/SidebarItem";
import {BsDatabase, BsGithub, BsPinMapFill, BsPlus} from "solid-icons/bs";
import SidebarTitle from "~/components/sidebar/SidebarTitle";
import HorizontalDivider from "~/components/HorizontalDivider";
import {useLocation, useNavigate} from "@solidjs/router";
import {FaSolidForwardFast, FaSolidGear, FaSolidPause, FaSolidQuestion} from "solid-icons/fa";
import {ComponentProps, For, Show} from "solid-js";
import {AiFillHome} from "solid-icons/ai";
import {setStorage, storage} from "~/data/Routines";
import {openBrowser} from "~/api/utils/fns";
import Row from "~/components/layout/Row";
import IconButton from "~/components/button/IconButton";

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
                    <For each={storage.routines}>{routine =>
                        <Row
                            class={`mini-sidebar-item ${!routine.enabled ? "opacity-75" : ""} align-middle justify-between`}
                            onClick={() => navigate(`/routines/${routine.id}`)}>

                            {routine.name || <p class={"opacity-40"}>(Unnamed routine)</p>}
                            <Show when={!routine.enabled}>
                                <IconButton class={"p-0 hover:scale-[1.1] hover:opacity-100"}>
                                <FaSolidPause
                                    size={12}
                                    onClick={e => {
                                        e.stopPropagation()
                                        setStorage(
                                            "routines",
                                            r => r.id === routine.id,
                                            "enabled", v => !v
                                        )
                                    }}/>
                                </IconButton>
                            </Show>
                        </Row>
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
                <HorizontalDivider/>
                <SidebarItem
                    label="Settings"
                    icon={<FaSolidGear size={24}/>}
                    isActive={isPathOpen("/settings")}
                    onClick={() => navigate("/settings")}
                />
                <SidebarItem
                    label="About"
                    icon={<FaSolidQuestion size={24}/>}
                    isActive={isPathOpen("/about")}
                    onClick={() => navigate("/about")}
                />
                <SidebarItem
                    label="Contribute"
                    icon={<BsGithub size={24}/>}
                    isActive={false}
                    onClick={() => openBrowser("https://github.com/Revxrsal/windows-assistant")}
                />
            </div>
        </>
    )
}