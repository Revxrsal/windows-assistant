/* eslint-disable @typescript-eslint/no-explicit-any,no-unused-vars */

import Action from "~/api/action/Action";
import ItemFactory from "~/api/common/ItemFactory";
import {BEEP_ACTION} from "~/api/action/BeepAction";

export const BEEP = "beep"

const factory = new ItemFactory<Action>()

factory.register(BEEP, () => BEEP_ACTION)