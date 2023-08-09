use std::path::PathBuf;
use opener::OpenError;
use tauri::api::dialog::blocking::FileDialogBuilder;

#[tauri::command]
pub async fn open_file_dialog() -> String {
    let dialog_result = FileDialogBuilder::new()
        .pick_file()
        .unwrap_or(PathBuf::new());
    return dialog_result.to_str().unwrap_or("").to_owned()
}

#[tauri::command]
pub async fn open_browser(path: &str) -> Result<(), OpenError> {
    return opener::open_browser(path);
}

#[tauri::command]
pub fn run_file(path: &str) -> Result<(), OpenError> {
    opener::open(path)
}