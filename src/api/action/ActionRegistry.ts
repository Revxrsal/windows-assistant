/* eslint-disable @typescript-eslint/no-explicit-any,no-unused-vars */

import BlockFactory from "~/api/block/BlockFactory";
import BeepAction from "~/api/action/beep/BeepAction";

export const actions = new BlockFactory("action")

export function registerActions() {
    BeepAction.register(actions)
}