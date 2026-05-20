import type { AttendanceRecord } from "./types";

export function dateKey(date: Date) {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function monthKey(date: Date) {
  return dateKey(date).slice(0, 7);
}

function monthDate(month: string) {
  return new Date(`${month}-01T00:00:00+09:00`);
}

export function addMonths(month: string, amount: number) {
  const date = monthDate(month);
  date.setMonth(date.getMonth() + amount);
  return monthKey(date);
}

function getTokyoParts(date: Date) {
  const parts = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const find = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return {
    year: find("year"),
    month: find("month").replace(/^0/, ""),
    day: find("day").replace(/^0/, ""),
    weekday: find("weekday"),
    hour: find("hour"),
    minute: find("minute"),
    second: find("second"),
  };
}

export function displayDate(date: Date) {
  const parts = getTokyoParts(date);
  return `${parts.year} 年 ${parts.month} 月 ${parts.day} 日 (${parts.weekday})`;
}

export function displayMonth(month: string) {
  const [year, rawMonth] = month.split("-");
  return `${year} 年 ${Number(rawMonth)} 月`;
}

export function displayLargeTime(date: Date) {
  const parts = getTokyoParts(date);
  return {
    hour: parts.hour || "--",
    minute: parts.minute || "--",
    second: parts.second || "--",
  };
}

export function displayTime(value?: string) {
  if (!value) return "";

  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

export function displayStampTime(date: Date) {
  const parts = getTokyoParts(date);
  return `${parts.hour}:${parts.minute}:${parts.second}`;
}

export function getWorkedMinutes(record?: AttendanceRecord) {
  if (!record?.clockIn || !record.clockOut) return "";

  const clockInMs = new Date(record.clockIn).getTime();
  const clockOutMs = new Date(record.clockOut).getTime();
  let diffMs = clockOutMs - clockInMs;
  if (diffMs <= 0) return "";

  const outingMs = record.outings.reduce((total, outing) => {
    if (!outing.out || !outing.back) return total;

    const outMs = new Date(outing.out).getTime();
    const backMs = new Date(outing.back).getTime();
    return backMs > outMs ? total + (backMs - outMs) : total;
  }, 0);
  diffMs = Math.max(0, diffMs - outingMs);

  return Math.floor(diffMs / 60000);
}

export function formatMinutes(totalMinutes: number | "") {
  if (totalMinutes === "") return "";

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

export function displayDuration(record?: AttendanceRecord) {
  return formatMinutes(getWorkedMinutes(record));
}
