// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


use action::{
    beep::beep,
    file::{open_file_dialog, run_file},
    url::open_browser,
};
use condition::battery::{get_battery, is_charging};
use scheduler::setup_scheduler;

pub mod action;
pub mod util;
pub mod condition;
pub mod scheduler;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            setup_scheduler,
            beep,
            open_file_dialog,
            open_browser,
            run_file,
            get_battery,
            is_charging,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
