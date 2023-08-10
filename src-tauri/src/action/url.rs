use std::path::PathBuf;

#[tauri::command]
pub async fn open_browser(url: String) {
    opener::open_browser(PathBuf::from(url)).unwrap();
}