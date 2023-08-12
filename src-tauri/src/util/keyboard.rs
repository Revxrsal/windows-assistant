use std::ffi::c_int;
use winapi::um::winuser::GetAsyncKeyState;

pub fn is_pressed(key: c_int) -> bool {
    return unsafe { GetAsyncKeyState(key) as u16 & 0x8000 != 0 };
}