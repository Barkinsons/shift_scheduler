"use client";

import { Shifts } from "@/models/Shift";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function ScheduleTable({
  weekStart,
  shifts,
}: {
  weekStart: string;
  shifts: Shifts[];
}) {
  if (shifts.length === 0) {
    return null;
  }
  const startDate = new Date(weekStart);
  const dates = Array.from({ length: 7 }).map((_, i) => {
    return new Date(new Date(startDate).setDate(startDate.getDate() + i));
  });

  const tableData = Array.from({ length: 7 }).map((_, i) => {
    return {
      day: days[i],
      date: dates[i],
      startTime: shifts.find(
        (shift) => dates[i].toISOString() === (shift.date as unknown as string),
      )?.startTime,
      endTime: shifts.find(
        (shift) => dates[i].toISOString() === (shift.date as unknown as string),
      )?.endTime,
    };
  });

  return (
    <table className="[&_tr_*]:px-3 [&_tr_*]:border">
      <thead>
        <tr>
          <th>Day</th>
          <th>Date</th>
          <th>Start Time</th>
          <th>End Time</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map(({ day, date, startTime, endTime }, i) => {
          return (
            <tr key={i}>
              <td>{day}</td>
              <td>{date.toLocaleDateString()}</td>
              <td>{startTime}</td>
              <td>{endTime}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
