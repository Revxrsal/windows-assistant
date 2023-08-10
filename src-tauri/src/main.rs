// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::error::Error;

<<<<<<< Updated upstream
use action::file::{open_file_dialog, open_browser, run_file};
use action::beep::beep;
=======
use action::{
    beep::beep,
    file::{open_file_dialog, run_file},
    url::open_url
};
>>>>>>> Stashed changes

mod action;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            beep,
            open_file_dialog,
            open_browser,
            run_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
