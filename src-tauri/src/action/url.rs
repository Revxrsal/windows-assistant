use std::path::PathBuf;

#[tauri::command]
pub fn open_url(url: &str) {
    opener::open_browser(PathBuf::from(url)).unwrap();
}