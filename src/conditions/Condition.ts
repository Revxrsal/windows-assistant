export interface ConditionData {
    id: number
    name: string
    description: string
    class: string
}

export interface Condition {
    eval: () => Promise<boolean>
}