use std::path::PathBuf;

use tauri::api::dialog::blocking::FileDialogBuilder;

#[tauri::command]
pub async fn open_file_dialog() -> String {
    let dialog_result = FileDialogBuilder::new()
        .pick_file()
        .unwrap_or(PathBuf::new());
    return dialog_result.to_str().unwrap_or("").to_owned();
}

#[tauri::command]
pub fn run_file(path: &str) {
    opener::open(path).unwrap()
}