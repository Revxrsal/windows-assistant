use crate::util;

#[tauri::command]
pub async fn get_battery() -> f32 {
    return util::battery::get_battery().unwrap_or(1.0)
}