import {createSignal, Show, splitProps} from "solid-js";
import SidebarItem, {SidebarItemProps} from "~/components/sidebar/SidebarItem";
import {BsFolder} from "solid-icons/bs";
import {FaSolidAngleRight} from "solid-icons/fa";

export default function ExpandableSidebarItem(props: SidebarItemProps) {
    const [sideBarProps, ...[divProps]] =
        splitProps(props, ["label", "isActive", "children"])
    const [isExpanded, setExpanded] = createSignal(false);
    const expandedClass = () => isExpanded() ? "rotate-90" : ""
    return (
        <div {...divProps}>
            <SidebarItem
                label={sideBarProps.label}
                icon={<BsFolder size={24}/>}
                trailingIcon={
                    <FaSolidAngleRight class={`transition-all duration-150 ${expandedClass()}`}/>
                }
                onClick={() => setExpanded(v => !v)}
                isActive={sideBarProps.isActive}
            >
                <Show when={isExpanded()}>
                    {sideBarProps.children}
                </Show>
            </SidebarItem>
        </div>
    )
}