import {preferences, setPreferences} from "~/storage/preferences";
import SwitchButton from "~/components/input/SwitchButton";
import Title from "~/components/text/Title";

export default function Settings() {
    return (
        <main>
            <Title size={6}>Settings</Title>
            <Title size={4}>Appearance</Title>
            <SwitchButton
                checked={preferences.darkTheme}
                onClick={() => setPreferences("darkTheme", v => !v)}
                label="Dark Mode"
                class={"m-12 mt-8"}
            />
        </main>
    )
}