use std::path::PathBuf;

use tauri::api::dialog::blocking::FileDialogBuilder;

use crate::util::open_file;

#[tauri::command]
pub async fn open_file_dialog() -> String {
    let dialog_result = FileDialogBuilder::new()
        .pick_file()
        .unwrap_or(PathBuf::new());
    return dialog_result.to_str().unwrap_or("").to_owned();
}

#[tauri::command]
pub async fn run_file(path: String, args: Option<String>) {
    open_file::open(path, args.as_ref()).unwrap();
}