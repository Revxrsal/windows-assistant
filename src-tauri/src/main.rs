// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::error::Error;
use std::time::Duration;
use rodio::{Decoder, OutputStream, Sink};
use rodio::source::{SineWave, Source};

mod file;

fn main() {

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![beep, file::open_file_dialog])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn beep() {
    let (stream, handle) = match OutputStream::try_default() {
        Ok(s) => (s.0, s.1),
        Err(err) => {
            eprintln!("Failed to fetch default output device: ");
            eprintln!("{}", err.to_string());
            return;
        }
    };

    let sink = match Sink::try_new(&handle) {
        Ok(sink) => sink,
        Err(err) => {
            eprintln!("Failed to create a new sink: ");
            eprintln!("{}", err.to_string());
            return;
        }
    };

    let src = SineWave::new(440.0)
        .take_duration(Duration::from_secs_f32(0.25))
        .amplify(0.2);

    sink.append(src);

    // Blocks the thread until all queued sounds have been cleared.
    sink.sleep_until_end();
}