use crate::util;

#[tauri::command]
pub async fn get_battery() -> f32 {
    util::battery::get_battery().unwrap_or(1.0)
}

#[tauri::command]
pub async fn is_charging() -> bool {
    util::battery::is_charging()
}
