import {Accessor, createMemo, onCleanup, Setter} from "solid-js";
import {getBaseFileName} from "~/api/utils/utils";
import {listen, TauriEvent, UnlistenFn} from "@tauri-apps/api/event";
import {pickFile} from "~/api/utils/fns";

export interface FileInputProps {
    path: Accessor<string>,
    setPath: Setter<string>,
    label?: string,
    filters?: [string, string[]][]
}

export default function FileInput(props: FileInputProps) {
    const fileName = createMemo(() => getBaseFileName(props.path()))

    let removeListener: UnlistenFn;

    listen(TauriEvent.WINDOW_FILE_DROP, event => {
        const path = (event.payload as string[])[0]
        props.setPath(path)
    }).then(v => removeListener = v)

    onCleanup(() => removeListener())

    return <div class={`
            bg-stone-200 dark:bg-stone-900 hover:scale-[1.02] transition
            content-center items-center text-center justify-center cursor-pointer select-none
            opacity-60
            outline-dotted outline-stone-400
            text font-semibold
            h-20 min-w-[300px]
            rounded-xl
            flex drop-shadow-md`}
                onClick={async () => {
                    const file = await pickFile(props.filters || [])
                    props.setPath(file)
                }}
    >
            <span
                class={"text-xl text-center px-4"}>{fileName() || props.label || `Drop your program here, or click to choose one`}</span>
    </div>;
}