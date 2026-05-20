import type { AttendanceRecord } from "@/features/attendance/types";

const STORAGE_KEY = "attendance-clock-v1-records";

export function readAttendanceRecords(): AttendanceRecord[] {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (!value) return [];

    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeAttendanceRecords(records: AttendanceRecord[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}
