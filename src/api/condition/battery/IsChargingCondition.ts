import {BasicCondition} from "~/api/condition/Condition";
import {BsBatteryCharging} from "solid-icons/bs";
import BlockMetadata from "~/api/block/BlockMetadata";
import BlockFactory from "~/api/block/BlockFactory";
import {isDeviceCharging} from "~/api/utils/fns";

const ID = "battery-is-charging"

const METADATA: BlockMetadata = {
    id: ID,
    displayName: "Battery is charging",
    description: "Triggered when a charger is plugged in",
    backgroundClass: "bg-lime-500 dark:bg-lime-300",
    createWithNoParams: () => new IsChargingCondition(),
    icon: (props) => BsBatteryCharging(props),
}

export class IsChargingCondition implements BasicCondition {

    metadata = METADATA;
    triggersOnce = true;

    description = () => `Triggered when the charger is plugged in`

    async eval(): Promise<boolean> {
        return isDeviceCharging()
    }

    static register(factory: BlockFactory) {
        factory.register(ID, METADATA, () => new IsChargingCondition())
    }
}