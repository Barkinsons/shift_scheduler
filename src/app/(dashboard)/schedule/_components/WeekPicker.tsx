"use client";

export default function WeekPicker({
  weeks,
  setWeek,
}: {
  weeks: string[];
  setWeek: Function;
}) {
  return (
    <select
      onChange={(e) => setWeek(e.target.value)}
      className="w-40 [&_option]:bg-[var(--background)]"
    >
      <option></option>
      {weeks &&
        weeks.map((w, i) => {
          return (
            <option key={i} value={w}>
              {new Date(w).toDateString().split(" ").splice(1).join(" ")}
            </option>
          );
        })}
    </select>
  );
}
