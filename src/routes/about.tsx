import Column from "~/components/layout/Column";
import Header from "~/components/text/Header";
import {getTauriVersion, getVersion} from "@tauri-apps/api/app";
import {createResource} from "solid-js";
import Text from "~/components/text/Text";

export default () => {
    const [version] = createResource(getVersion)
    const [tauriVersion] = createResource(getTauriVersion)
    return (
        <main>
            <Column>
                <Header size={3}>Windows Assistant</Header>
                <Text class={"mx-12"}>Version {version()}</Text>

                <Header size={3}>Tauri</Header>
                <Text class={"mx-12"}>Version {tauriVersion()}</Text>
            </Column>
        </main>
    );
}