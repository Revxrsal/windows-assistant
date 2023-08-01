import {Condition, ConditionData} from "~/conditions/Condition";

export interface FunConditionData extends ConditionData {
    battery: number
}

export class FunCondition implements Condition {

    private data: FunConditionData;

    constructor(data: FunConditionData) {
        this.data = data
    }

    eval(): Promise<boolean> {
        return Promise.resolve(false);
    }
}