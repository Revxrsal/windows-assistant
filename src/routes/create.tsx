export default function Create() {
    return (
        <main>
            <h1>
                New routine
            </h1>
            <div class={"flex justify-center w-full"}>
                <form class="w-[32rem]">
                    <label for="routineName">Routine name</label>
                    <input type="text"
                           id="routineName"
                           placeholder="Run Edge"
                           required/>
                    <label for="">Conditions</label>
                    <input type="text"
                           id="routineName"
                           placeholder="Run Edge"
                           required/>
                </form>
            </div>
        </main>
    )

}