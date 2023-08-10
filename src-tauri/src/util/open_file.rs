use std::{io, ptr};
use std::ffi::OsStr;
use std::os::windows::ffi::OsStrExt;
use std::path::PathBuf;

use normpath::PathExt;
use opener::OpenError;
use winapi::ctypes::c_int;
use winapi::um::shellapi::ShellExecuteW;

pub fn open<P>(path: P, args: Option<&String>) -> Result<(), OpenError>
    where
        P: AsRef<OsStr>,
{
    open_file(path.as_ref(), args.map(|v| OsStr::new(v)))
}

pub(crate) fn open_file(path: &OsStr, args: Option<&OsStr>) -> Result<(), OpenError> {
    let Err(first_error) = open_helper(path, args) else {
        return Ok(());
    };

    match PathBuf::from(path).normalize() {
        Ok(normalized) => match open_helper(normalized.as_os_str(), args) {
            Ok(()) => Ok(()),
            Err(_second_error) => Err(first_error),
        },
        Err(_) => Err(first_error),
    }
}

pub(crate) fn open_helper(path: &OsStr, args: Option<&OsStr>) -> Result<(), OpenError> {
    const SW_SHOW: c_int = 5;

    let path = convert_path(path).map_err(OpenError::Io)?;
    let args = args.map(|v| {
        let mut v: Vec<u16> = v.encode_wide().collect();
        v.push(0); // terminate the string
        v.as_ptr()
    }).unwrap_or(ptr::null());
    let operation: Vec<u16> = OsStr::new("open\0").encode_wide().collect();
    let result = unsafe {
        ShellExecuteW(
            ptr::null_mut(),
            operation.as_ptr(),
            path.as_ptr(),
            args,
            ptr::null(),
            SW_SHOW,
        )
    };
    if result as c_int > 32 {
        Ok(())
    } else {
        Err(OpenError::Io(io::Error::last_os_error()))
    }
}

fn convert_path(path: &OsStr) -> io::Result<Vec<u16>> {
    let mut maybe_result: Vec<u16> = path.encode_wide().collect();
    if maybe_result.iter().any(|&u| u == 0) {
        return Err(io::Error::new(
            io::ErrorKind::InvalidInput,
            "path contains NUL byte(s)",
        ));
    }

    maybe_result.push(0);
    Ok(maybe_result)
}
