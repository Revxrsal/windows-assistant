// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod file;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![beep, file::open_file_dialog])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn beep() {
    // still need to figure out how to beep.
}