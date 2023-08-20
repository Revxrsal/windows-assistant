/* eslint-disable @typescript-eslint/no-explicit-any,no-unused-vars */

import BlockFactory from "~/api/block/BlockFactory";
import BeepAction from "~/api/action/beep/BeepAction";
import OpenBrowserAction from "~/api/action/open-browser/OpenBrowserAction";
import RunProgramAction from "~/api/action/run-program/RunProgramAction";
import SetBackgroundAction from "~/api/action/set-background/SetBackgroundAction";

export const actions = new BlockFactory("action")

export function registerActions() {
    BeepAction.register(actions)
    RunProgramAction.register(actions)
    OpenBrowserAction.register(actions)
    SetBackgroundAction.register(actions)
}