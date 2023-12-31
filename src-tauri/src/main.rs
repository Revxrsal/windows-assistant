// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_autostart::MacosLauncher;

use action::{
    beep::beep,
    file::{pick_file, run_file},
    url::open_browser,
    background::set_background,
};
use condition::{
    battery::{get_battery, is_charging},
    keyboard::is_combination_pressed,
    process::is_process_running,
};
use scheduler::setup_scheduler;

pub mod action;
pub mod util;
pub mod condition;
pub mod scheduler;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_autostart::init(
            MacosLauncher::LaunchAgent,
            None,
        ))
        .invoke_handler(tauri::generate_handler![
            setup_scheduler,
            beep,
            pick_file,
            open_browser,
            run_file,
            get_battery,
            is_charging,
            is_combination_pressed,
            is_process_running,
            set_background
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
