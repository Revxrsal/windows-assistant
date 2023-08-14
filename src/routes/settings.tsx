import {preferences, setPreferences} from "~/storage/preferences";
import SwitchButton from "~/components/input/SwitchButton";
import Header from "~/components/text/Header";
import {ComponentProps, splitProps} from "solid-js";

export default function Settings() {
    return (
        <main>
            <Header size={6}>Settings</Header>
            <Header size={4}>Appearance</Header>
            <SettingsArea>
                <SwitchButton
                    checked={preferences.darkTheme}
                    onClick={() => setPreferences("darkTheme", v => !v)}
                    label="Dark Mode"
                    class={"m-12 mt-8"}
                />
            </SettingsArea>
            <Header size={4}>Startup</Header>
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