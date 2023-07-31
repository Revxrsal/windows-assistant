import {ComponentProps, JSX, splitProps} from "solid-js";

export interface SidebarItemProps extends ComponentProps<"div"> {
    label?: JSX.Element
    icon?: JSX.Element
    isActive?: boolean
}

export default function SidebarItem(props: SidebarItemProps) {
    const [local, ...[divProps]] = splitProps(props, ["label", "icon"])
    const activeClass = () => props.isActive ? "bg-blue-600" : ""
    return (
        <div class={`sidebar-item ${activeClass()}`} {...divProps}>
            {/* Some icons are colored using 'text', others are with 'fill' */}
            <div class={"text-gray-100 fill-gray-100"}>
                {local.icon}
            </div>
            <span class={"sidebar-item-text"}>{local.label}</span>
        </div>
    )
}