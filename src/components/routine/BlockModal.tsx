/* eslint-disable @typescript-eslint/no-explicit-any */
import {Accessor, createEffect, createSignal, JSX, Setter, Show} from "solid-js";
import Modal from "~/components/modal/Modal";
import {BlockGallery} from "~/components/blocks/BlockGallery";
import {AnyBlock} from "~/api/block/Block";
import BlockFactory from "~/api/block/BlockFactory";

export interface BlockModalProps {
    title: string
    factory: BlockFactory
    show: Accessor<boolean>
    setShow: Setter<boolean>
    add: (block: AnyBlock) => void
}

interface GalleryProps {
    factory: BlockFactory
    title: string
    setForm: Setter<JSX.Element>
    add: (block: AnyBlock) => void
}

function Gallery(props: GalleryProps) {
    return <BlockGallery
        factory={props.factory}
        title={props.title}
        onBlockClick={condition => {
            if (condition.form) {
                props.setForm(condition.form({
                    replace: false,
                    submit: props.add
                }))
            } else
                props.add(condition.createWithNoParams!())
        }}/>
}

export default function ConditionsModal(props: BlockModalProps) {
    const [formMenu, setFormMenu] = createSignal<JSX.Element | null>();
    createEffect(() => {
        if (!props.show())
            setFormMenu(null)
    })
    return <Modal
        show={props.show}
        setShow={props.setShow}
        heading={
            <Show when={!formMenu()}>
                <h1 class="text-3xl font-bold">{props.title}</h1>
            </Show>
        }
    >
        <Show
            when={formMenu() != null}
            fallback={
                <Gallery
                    title={props.title}
                    add={block => {
                        props.add(block)
                        props.setShow(false)
                        setFormMenu(null)
                    }}
                    factory={props.factory}
                    setForm={setFormMenu}
                />}>
            {formMenu()}
        </Show>
    </Modal>
}