import {ComponentProps, JSX, splitProps} from "solid-js";

export interface SidebarItemProps extends ComponentProps<"div"> {
    label?: JSX.Element
    icon?: JSX.Element
    trailingIcon?: JSX.Element
    isActive?: boolean
    children?: JSX.Element
}

export default function SidebarItem(props: SidebarItemProps) {
    const [local, divProps] = splitProps(props, ["label", "icon"])
    const activeClass = () => props.isActive ? "bg-blue-600" : ""
    return (
        <>
            <div class={`sidebar-item ${activeClass()}`} {...divProps}>
                {/* Some icons are colored using 'text', others are with 'fill' */}
                <div class={"text-gray-100 fill-gray-100"}>
                    {local.icon}
                </div>
                <div class={"flex justify-between w-full items-center fill-stone-100"}>
                    <span class={`sidebar-item-text`}>{local.label}</span>
                    {props.trailingIcon}
                </div>
            </div>
            <div class="text-left text-sm mt-2 w-4/5 mx-auto text-stone-100 font-semibold">
                {props.children}
            </div>
        </>

    )
}