import {Condition, ConditionData} from "~/conditions/Condition";

export interface TestConditionData extends ConditionData {
    battery: number
}

export class TestCondition implements Condition {

    private data: TestConditionData;

    constructor(data: TestConditionData) {
        this.data = data
    }

    async eval(): Promise<boolean> {
        return true
    }
}