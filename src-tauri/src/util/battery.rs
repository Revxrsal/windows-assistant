use winapi::shared::minwindef::BYTE;
use winapi::um::winbase::{GetSystemPowerStatus, SYSTEM_POWER_STATUS};

/// See docs:
/// - https://learn.microsoft.com/en-us/windows/win32/api/winbase/ns-winbase-system_power_status
/// - https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-getsystempowerstatus

const CHARGING: BYTE = 8;
const NO_SYSTEM_BATTERY: BYTE = 128;
const UNKNOWN_STATUS: BYTE = 255;

pub fn get_battery() -> Option<f32> {
    let mut power_status = SYSTEM_POWER_STATUS {
        ACLineStatus: 0,
        BatteryFlag: 0,
        BatteryLifePercent: 0,
        Reserved1: 0,
        BatteryLifeTime: 0,
        BatteryFullLifeTime: 0,
    };
    unsafe {
        if GetSystemPowerStatus(&mut power_status) != 0 {
            if power_status.BatteryFlag & NO_SYSTEM_BATTERY != 0 {
                // Battery is present
                if power_status.BatteryLifePercent != 255 {
                    let percentage = (power_status.BatteryLifePercent as f32) / 100.0;
                    return Some(percentage);
                }
            }
            // No system battery / Unknown status—unable to read the battery flag information
            return None;
        }
        return None;
    }
}

pub fn is_charging() -> bool {
    let mut power_status = SYSTEM_POWER_STATUS {
        ACLineStatus: 0,
        BatteryFlag: 0,
        BatteryLifePercent: 0,
        Reserved1: 0,
        BatteryLifeTime: 0,
        BatteryFullLifeTime: 0,
    };
    unsafe {
        if GetSystemPowerStatus(&mut power_status) != 0 {
            if power_status.BatteryFlag & NO_SYSTEM_BATTERY != 0 {
                return power_status.BatteryFlag & CHARGING == 0;
            }
        }
    }
    return false;
}