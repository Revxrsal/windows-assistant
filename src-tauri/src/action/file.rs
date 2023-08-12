use std::path::PathBuf;
use serde::{Deserialize, Serialize};

use tauri::api::dialog::blocking::FileDialogBuilder;

use crate::util::open_file;

#[derive(Serialize, Deserialize)]
pub struct PickFileFilter(String, Vec<String>);

#[tauri::command]
pub async fn pick_file(filters: Vec<PickFileFilter>) -> String {
    let mut dialog_result = FileDialogBuilder::new();
    for filter in filters {
        let extensions: Vec<&str> = filter.1.iter().map(|s| &**s).collect();
        dialog_result = dialog_result.add_filter(&filter.0, extensions.as_slice());
    }
    let dialog_result = dialog_result
        .pick_file()
        .unwrap_or(PathBuf::new());
    return dialog_result.to_str().unwrap_or("").to_owned();
}

#[tauri::command]
pub async fn run_file(path: String, args: Option<String>) {
    open_file::open(path, args.as_ref()).unwrap();
}