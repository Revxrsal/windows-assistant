import Modal from "~/components/modal/Modal";
import Button from "~/components/button/Button";
import {Accessor, Setter} from "solid-js";

export interface ConfirmationModalProps {
    confirmDialog: Accessor<boolean>,
    setConfirmDialog: Setter<boolean>,
    onConfirm: () => void
}

export default function DeleteConfirmationModal(props: ConfirmationModalProps) {
    return <Modal
        show={props.confirmDialog}
        setShow={props.setConfirmDialog}
        heading={
            <h1 class="text-3xl font-bold">Are you sure?</h1>
        }
    >
        <p>Are you sure you want to delete this routine? <strong>This action cannot be undone!</strong></p>
        <div class={"pb-10"}/>
        <div class={"flex flex-row justify-around"}>
            <Button
                variant={"outline"}
                onClick={() => props.setConfirmDialog(false)}
            >
                No, keep it
            </Button>
            <Button
                class={"bg-red-500"}
                onClick={() => {
                    props.setConfirmDialog(false)
                    props.onConfirm()
                }}
            >
                Yes, delete it
            </Button>
        </div>
    </Modal>;
}