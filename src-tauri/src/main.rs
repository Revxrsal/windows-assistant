// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::error::Error;

mod file;
mod audio;

fn main() {

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![audio::beep, file::open_file_dialog])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
