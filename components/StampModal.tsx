import type { StampModal as StampModalData } from "@/features/attendance/types";

function formatModalActionLabel(actionLabel: StampModalData["actionLabel"]) {
  if (actionLabel.length === 2) {
    return `${actionLabel[0]}　${actionLabel[1]}`;
  }
  return actionLabel;
}

function SquareColon() {
  return (
    <span className="mx-1 inline-flex translate-y-[-0.03em] flex-col items-center justify-center gap-[0.18em] sm:mx-2">
      <span className="block size-[0.12em] bg-current" />
      <span className="block size-[0.12em] bg-current" />
    </span>
  );
}

function PopupTime({ time }: { time: string }) {
  const [hour = "", minute = "", second = ""] = time.split(":");

  return (
    <span
      className="mt-3 flex items-center justify-center [font-family:var(--font-popup-time),'Arial_Narrow','Roboto_Condensed',Arial,sans-serif] text-7xl font-medium leading-none [font-variant-numeric:tabular-nums] sm:mt-4 sm:text-9xl"
      aria-label={time}
    >
      <span>{hour}</span>
      <SquareColon />
      <span>{minute}</span>
      <SquareColon />
      <span>{second}</span>
    </span>
  );
}

export function StampCompleteModal({
  modal,
  onClose,
}: {
  modal: StampModalData;
  onClose: () => void;
}) {
  const colorClass = {
    clockIn: {
      text: "text-orange-500",
      bar: "bg-orange-500",
      buttonText: "text-orange-600",
    },
    outing: {
      text: "text-green-600",
      bar: "bg-green-600",
      buttonText: "text-green-700",
    },
    clockOut: {
      text: "text-blue-600",
      bar: "bg-blue-600",
      buttonText: "text-blue-700",
    },
  }[modal.variant];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-700/60 p-3 [font-family:'MS_Gothic','ＭＳ_ゴシック',monospace] sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="打刻完了"
    >
      <div className="w-full max-w-[760px] overflow-hidden rounded-[2px] border border-zinc-400 bg-white text-center shadow-2xl">
        <div className="flex min-h-11 items-center justify-end bg-white px-4">
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 text-2xl leading-none text-zinc-700 shadow-sm transition hover:bg-zinc-200 active:translate-y-px"
            aria-label="閉じる"
          >
            ×
          </button>
        </div>

        <div className={`h-12 w-full ${colorClass.bar}`} />

        <div className="px-5 pb-2 pt-3 sm:px-12 sm:pb-3 sm:pt-4">
          <p className={`${colorClass.text} text-xl font-bold sm:text-3xl`}>
            {modal.employeeName}さんの打刻を行いました。
          </p>
          <p
            className={`${colorClass.text} mt-5 text-4xl font-bold tracking-normal sm:mt-6 sm:text-6xl`}
          >
            {formatModalActionLabel(modal.actionLabel)}
          </p>
          <div className={colorClass.text}>
            <PopupTime time={modal.time} />
          </div>
        </div>

        <div className={`px-5 py-4 sm:px-12 sm:py-6 ${colorClass.bar}`}>
          <button
            type="button"
            onClick={onClose}
            className={`min-h-24 w-full max-w-[672px] rounded-full border border-white bg-white px-12 py-2 text-6xl font-bold leading-none shadow-[0_2px_6px_rgba(0,0,0,0.25)] transition active:translate-y-px sm:min-h-32 sm:text-7xl ${colorClass.buttonText}`}
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
