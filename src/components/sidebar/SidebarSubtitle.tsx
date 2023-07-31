export default function SidebarSubtitle(props: { title: string }) {
    return (
        <div class="p-4 pl-0 mt-1 flex items-center">
            <h2 class="font-semibold text-gray-100 text-[16px] ml-3">{props.title}</h2>
        </div>
    )
}