use winapi::um::winbase::{GetSystemPowerStatus, SYSTEM_POWER_STATUS};

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
            if power_status.BatteryFlag & 128 != 0 {
                // Battery is present
                if power_status.BatteryLifePercent != 255 {
                    let percentage = (power_status.BatteryLifePercent as f32) / 100.0;
                    return Some(percentage);
                }
            }
            return None;
        }
        return None;
    }
}

fn is_charging() -> bool {
    true
}