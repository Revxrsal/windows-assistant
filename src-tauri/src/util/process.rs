use std::{ffi::OsString, os::windows::prelude::OsStringExt};

use winapi::{
    shared::minwindef::{DWORD, HMODULE, MAX_PATH},
    um::{
        handleapi::CloseHandle,
        processthreadsapi::OpenProcess,
        psapi::{EnumProcessModules, EnumProcesses, GetModuleFileNameExW},
        winnt::{PROCESS_QUERY_INFORMATION, PROCESS_VM_READ},
    },
};

pub fn is_process_running(process_path: String) -> bool {
    let mut process_ids: [DWORD; 1024] = [0; 1024];
    let process_path = process_path.to_lowercase().replace("\\", "/");
    let mut cb_needed: DWORD = 0;
    unsafe {
        if EnumProcesses(
            process_ids.as_mut_ptr(),
            std::mem::size_of_val(&process_ids) as DWORD,
            &mut cb_needed,
        ) == 0
        {
            return false;
        }
        let num_processes = cb_needed / std::mem::size_of::<DWORD>() as DWORD;
        for i in 0..num_processes {
            let process_id = process_ids[i as usize];
            if process_id == 0 {
                continue;
            }
            let process_handle =
                OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, 0, process_id);
            if process_handle.is_null() {
                continue;
            }
            let mut module_handle: HMODULE = std::ptr::null_mut();
            let mut size: DWORD = 0;
            if EnumProcessModules(
                process_handle,
                &mut module_handle,
                std::mem::size_of::<DWORD>() as DWORD,
                &mut size,
            ) != 0
            {
                let mut module_path: Vec<u16> = vec![0; MAX_PATH];
                if GetModuleFileNameExW(
                    process_handle,
                    module_handle,
                    module_path.as_mut_ptr(),
                    MAX_PATH as DWORD,
                ) != 0
                {
                    let path = OsString::from_wide(&module_path);
                    let path = path.to_string_lossy();
                    if path
                        .to_lowercase()
                        .trim_end_matches(char::from(0))
                        .replace("\\", "/")
                        == process_path
                    {
                        CloseHandle(process_handle);
                        return true;
                    }
                }
            }
            CloseHandle(process_handle);
        }
    }
    return false;
}
