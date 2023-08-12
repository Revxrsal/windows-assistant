use serde::{Deserialize, Serialize};
use winapi::um::winuser::{VK_CONTROL, VK_LWIN, VK_MENU, VK_RETURN, VK_RWIN, VK_SHIFT, VK_TAB};

use crate::util::keyboard::is_pressed;

/// Represents a key combination. This should be kept in parity
/// with TypeScript's [KeyCombinationData] interface.
#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct KeyboardCombination {
    ctrl: bool,
    tab: bool,
    enter: bool,
    shift: bool,
    alt: bool,
    windows: bool,
    key: String,
    key_code: i32,
}

#[tauri::command]
pub async fn is_combination_pressed(combination: KeyboardCombination) -> bool {
    if !is_pressed(combination.key_code) {
        return false;
    }
    if combination.ctrl && !is_pressed(VK_CONTROL) {
        return false;
    }
    if combination.shift && !is_pressed(VK_SHIFT) {
        return false;
    }
    if combination.alt && !is_pressed(VK_MENU) {
        return false;
    }
    if combination.tab && !is_pressed(VK_TAB) {
        return false;
    }
    if combination.windows && !(is_pressed(VK_LWIN) || is_pressed(VK_RWIN)) {
        return false;
    }
    if combination.enter && !is_pressed(VK_RETURN) {
        return false;
    }
    return true;
}