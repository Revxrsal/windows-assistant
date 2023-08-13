import {preferences, setPreferences} from "~/storage/preferences";
import SwitchButton from "~/components/input/SwitchButton";
import Title from "~/components/text/Title";
import {INVERT} from "~/util/Setter";


export default async function Settings() {

    return (
        <main>
            <Title size={6}>Settings</Title>
            <Title size={4}>Startup</Title>
            <SwitchButton
                checked={preferences.autoStart}
                onClick={() => setPreferences("autoStart", INVERT)}
                label={"Autostart"}
                class={"m-12 mt-8"}/>

            <Title size={4}>Appearance</Title>
            <SwitchButton
                checked={preferences.darkTheme}
                onClick={() => setPreferences("darkTheme", INVERT)}
                label="Dark Mode"
                class={"m-12 mt-8"}
            />
        </main>
    )
}