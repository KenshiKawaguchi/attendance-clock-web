export type AttendanceStatus =
  | "before"
  | "workingBeforeOuting1"
  | "away1"
  | "workingBeforeOuting2"
  | "away2"
  | "workingBeforeOuting3"
  | "away3"
  | "workingAfterOuting3"
  | "finished";

export type Outing = {
  out?: string;
  back?: string;
};

export type AttendanceRecord = {
  id: string;
  employeeCode: string;
  employeeName: string;
  date: string;
  clockIn?: string;
  outings: Outing[];
  clockOut?: string;
};

export type StampModal = {
  time: string;
  actionLabel: "出勤" | "外出" | "外出戻り" | "退勤";
  variant: "clockIn" | "outing" | "clockOut";
  employeeName: string;
};

export type ViewMode = "clock" | "monthly";

export type State = {
  employeeCode: string;
  isCodeSubmitted: boolean;
  records: AttendanceRecord[];
  message: string;
  showTodayRecords: boolean;
  stampModal: StampModal | null;
  viewMode: ViewMode;
  selectedMonth: string;
};

export type Action =
  | { type: "hydrate"; records: AttendanceRecord[] }
  | { type: "appendDigit"; digit: string }
  | { type: "backspace" }
  | { type: "clearCode" }
  | { type: "clearInput" }
  | { type: "setEmployeeCode"; value: string }
  | { type: "submitCode" }
  | { type: "clockIn"; at: Date }
  | { type: "clockOut"; at: Date }
  | { type: "goOut"; at: Date }
  | { type: "returnBack"; at: Date }
  | { type: "openMonthly"; month: string }
  | { type: "closeMonthly" }
  | { type: "moveMonth"; direction: -1 | 1 }
  | { type: "showTodayRecords" }
  | { type: "closeStampModal" };
