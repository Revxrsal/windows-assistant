/* eslint-disable @typescript-eslint/no-explicit-any,no-unused-vars */

import BlockFactory from "~/api/block/BlockFactory";
import BeepAction from "~/api/action/beep/BeepAction";
import RunProgramAction from "~/api/action/run-program/RunProgramAction";

export const actions = new BlockFactory("action")

export function registerActions() {
    BeepAction.register(actions)
    RunProgramAction.register(actions)
}