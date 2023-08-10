#[tauri::command]
pub async fn open_browser(url: String) {
    opener::open_browser(url).unwrap();
}