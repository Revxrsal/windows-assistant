import {createSignal, For, Show} from "solid-js";
import BlockCard from "~/components/blocks/BlockCard";
import NewItemButton from "~/components/NewItemButton";
import Routine from "~/api/routine/Routine";
import {SetStoreFunction} from "solid-js/store";
import {actions} from "~/api/action/ActionRegistry";
import {conditions} from "~/api/condition/ConditionRegistry";
import ConditionsModal from "~/components/routine/BlockModal";
import {AnyAction} from "~/api/action/Action";
import {AnyCondition} from "~/api/condition/Condition";
import Modal from "~/components/modal/Modal";
import {AnyBlock} from "~/api/block/Block";
import {useNavigate} from "@solidjs/router";
import {BsTrash} from "solid-icons/bs";
import {FaSolidPause, FaSolidPlay} from "solid-icons/fa";

interface ConfigureBlock {
    type: "actions" | "conditions"
    block: AnyBlock
    index: number
}

function DeleteButton(props: { onClick: () => void }) {
    return <button
        class="p-3 z-10 text-red-500 m-3 rounded hover:bg-red-500 hover:text-stone-200 transition"
        onClick={e => {
            e.stopPropagation()
            props.onClick()
        }}
    >
        <BsTrash size={24}/>
    </button>

}

// Note: Would it be better if we pass the store around instead?
export default function RoutineForm(props: {
    replace: boolean,
    routine: Routine,
    setRoutine: SetStoreFunction<Routine>
    onFinish: (routine: Routine) => void,
    onDelete?: () => void
}) {
    const navigate = useNavigate();
    const [showActions, setShowActions] = createSignal(false);
    const [showConditions, setShowConditions] = createSignal(false);
    const [config, setConfig] = createSignal<ConfigureBlock>()
    const [showConfig, setShowConfig] = createSignal(false)
    return (
        <main>
            <div class={"flex items-center"}>
                <p class="ml-12 my-7 text font-bold text-2xl">
                    {props.replace ? "Update routine" : "New routine"}
                </p>
                <Show when={props.replace}>
                    <button
                        class="p-3 z-10 ml-5 fill-green-700 dark:fill-green-500 rounded
                        hover:bg-green-700 hover:fill-stone-200 dark:hover:fill-stone-200 transition"
                        onClick={e => {
                            e.stopPropagation()
                            props.setRoutine("enabled", v => !v)
                        }}
                    >
                        {props.routine.enabled ? <FaSolidPause size={24}/> : <FaSolidPlay size={24}/>}
                    </button>
                    <button
                        class="p-3 z-10 ml-5 text-red-500 rounded hover:bg-red-500 hover:text-stone-200 transition"
                        onClick={e => {
                            e.stopPropagation()
                            props.onDelete?.()
                        }}
                    >
                        <BsTrash size={24}/>
                    </button>
                </Show>
            </div>
            <div class={"justify-center flex flex-col title m-12 mt-0"}>
                <input type="text" placeholder="Routine name..."
                       class="border-none outline-none
                       text-blue-800 dark:text-blue-400
                       bg-stone-100 dark:bg-stone-800"
                       value={props.routine.name}
                       onInput={e => props.setRoutine(() => ({name: e.target.value}))}/>
            </div>
            <p class="mx-12 text font-bold text-xl">
                When all the below conditions are met
            </p>
            <div class={"flex flex-col m-4"}>
                <For each={props.routine.conditions}>{(condition, index) =>
                    <BlockCard
                        description={condition.description?.()}
                        class={`hover:scale-[1.02] transition ${condition.metadata.form ? "cursor-pointer" : ""}`}
                        metadata={condition.metadata}
                        onClick={() => {
                            if (condition.metadata.form) {
                                setConfig({
                                    type: "conditions",
                                    block: condition,
                                    index: index()
                                })
                                setShowConfig(true)
                            }
                        }}
                        icon={<DeleteButton onClick={() => props.setRoutine(
                            "conditions",
                            v => v.filter(x => x !== condition)
                        )}/>}
                    />
                }</For>
                <NewItemButton
                    class="bg-green-600 dark:bg-green-300"
                    text="Add condition"
                    onClick={() => setShowConditions(true)}
                />
            </div>
            <p class="mx-12 text font-bold text-xl">
                then...
            </p>
            <div class={"flex flex-col m-4"}>
                <For each={props.routine.actions}>{(action, index) =>
                    <BlockCard
                        description={action.description()}
                        class={`hover:scale-[1.02] transition ${action.metadata.form ? "cursor-pointer" : ""}`}
                        metadata={action.metadata}
                        onClick={() => {
                            if (action.metadata.form) {
                                setConfig({
                                    type: "actions",
                                    block: action,
                                    index: index()
                                })
                                setShowConfig(true)
                            }
                        }}
                        icon={<DeleteButton onClick={() => props.setRoutine(
                            "actions",
                            v => v.filter(x => x !== action)
                        )}/>}
                    />
                }</For>
                <NewItemButton
                    class="bg-blue-600 dark:bg-blue-300"
                    text="Add action"
                    onClick={() => setShowActions(true)}
                />
            </div>
            <Show when={!props.replace}>
                <button
                    class={"bg-blue-600 w-32 h-10 rounded m-12 text-stone-200 enabled:hover:scale-105 disabled:opacity-40 transition"}
                    disabled={props.routine.conditions.length == 0 || props.routine.actions.length == 0 || props.routine.name.length == 0}
                    onClick={() => {
                        props.onFinish({...props.routine})
                        navigate("/routines")
                    }}
                >
                    {props.replace ? "Update" : "Create"}
                </button>
            </Show>
            <ConditionsModal
                title={"Pick a condition"}
                factory={conditions}
                show={showConditions}
                setShow={setShowConditions}
                add={condition => props.setRoutine("conditions", v => [...v, condition as AnyCondition])}
            />
            <ConditionsModal
                title={"Pick an action"}
                factory={actions}
                show={showActions}
                setShow={setShowActions}
                add={action => props.setRoutine("actions", v => [...v, action as AnyAction])}
            />
            <Modal show={showConfig} setShow={setShowConfig}>
                {config()!.block.metadata.form!({
                    replace: true,
                    data: config()!.block.data,
                    submit: block => {
                        const i = config()!
                        props.setRoutine(
                            i.type,
                            (_block, index) => index === i.index,
                            block
                        )
                        setShowConfig(false)
                    }
                })}
            </Modal>
        </main>
    )
}
