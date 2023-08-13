import {preferences, setPreferences} from "~/storage/preferences";
import SwitchButton from "~/components/input/SwitchButton";
import Title from "~/components/text/Title";
import {ComponentProps, splitProps} from "solid-js";

export default function Settings() {
    return (
        <main>
            <Title size={6}>Settings</Title>
            <Title size={4}>Appearance</Title>
            <SettingsArea>
                <SwitchButton
                    checked={preferences.darkTheme}
                    onClick={() => setPreferences("darkTheme", v => !v)}
                    label="Dark Mode"
                    class={"m-12 mt-8"}
                />
            </SettingsArea>
            <Title size={4}>Startup</Title>
            <SettingsArea>
                <SwitchButton
                    checked={preferences.autoStart}
                    onClick={() => setPreferences("autoStart", v => !v)}
                    label={"Run on start"}
                    class={"m-12 mt-8"}/>
            </SettingsArea>
        </main>
    )
}

interface SettingsAreaProps extends ComponentProps<"div"> {
    class?: string
}


function SettingsArea(props: SettingsAreaProps) {
    const [local, divProps] = splitProps(props, ["class"]);
    return <div class={`px-6 ${local.class}`} {...divProps}/>
}