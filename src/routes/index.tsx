import Button from "~/components/Button";
import Main from "~/layout/Main";
import {useNavigate} from "@solidjs/router";

export default function Home() {
    const navigate = useNavigate();
    return (
        <Main>
            <Button onClick={() => navigate("/create")}>
                New routine
            </Button>
        </Main>
    );
}
