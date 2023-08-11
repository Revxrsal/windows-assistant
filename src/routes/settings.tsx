import {preferences, setPreferences} from "~/storage/preferences";
 import SwitchButton from "~/components/input/SwitchButton";
import Title from "~/components/text/Title";
import Subtitle from "~/components/text/Subtitle";

export default function Settings() {
    return (
        <main>
            <Title>Settings</Title>
            <Subtitle>Appearance</Subtitle>
            <SwitchButton
                checked={preferences.darkTheme}
                onClick={() => setPreferences("darkTheme", v => !v)}
                label="Dark Mode"
                class={"m-12 mt-8"}
            />
        </main>
    )
}