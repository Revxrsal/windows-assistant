use std::ffi::CString;
use winapi::um::winuser::{SPI_SETDESKWALLPAPER, SPIF_SENDCHANGE, SPIF_UPDATEINIFILE, SystemParametersInfoW};

#[tauri::command]
pub async fn set_background(path: &str) -> Result<bool, String> {
    let wide = match CString::new(path) {
        Ok(val) => val,
        Err(e) => {
            eprintln!("Failed to create a new CString: {}", e);
            return Err(e.to_string().into());
        }
    };

    unsafe {
        let success = SystemParametersInfoW(
            SPI_SETDESKWALLPAPER,
            0,
            wide.as_ptr() as *mut _,
            SPIF_UPDATEINIFILE | SPIF_SENDCHANGE,
        );

        return Ok(success != 0); // success is not false
    }
}