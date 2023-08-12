use crate::util;

#[tauri::command]
pub async fn is_process_running(process_path: String) -> bool {
    return util::process::is_process_running(process_path);
}
