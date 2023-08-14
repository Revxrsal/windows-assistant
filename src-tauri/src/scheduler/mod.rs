use std::time::Duration;

use tauri::Window;
use tokio::{task, time};

const POLL_FN: &'static str = "window.__ASSISTANT__poll()";

#[tauri::command]
pub async fn setup_scheduler(window: Window) -> Result<(), String> {
    task::spawn(async move {
        setup_poll(window).await
    });
    Ok(())
}

/// Polls the app scheduler to check for conditions
async fn setup_poll(window: Window) {
    let mut interval = time::interval(Duration::from_millis(200));
    loop {
        interval.tick().await;
        window.eval(POLL_FN).expect("failed to poll");
    }
}
