use std::time::Duration;

use rodio::{OutputStream, Sink, Source};
use rodio::source::SineWave;

#[tauri::command]
pub async fn beep() {
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
    // sink.sleep_until_end();
}