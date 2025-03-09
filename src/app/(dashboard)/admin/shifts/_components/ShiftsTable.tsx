"use client";

import { Shifts } from "@/models/Shift";
import { redirect } from "next/navigation";

export default function ShiftsTable({ shifts }: { shifts: Shifts[] }) {
  return (
    <table className="[&_tr>*]:border [&_tr>*]:px-2">
      <thead>
        <tr>
          <th colSpan={5}>Shifts</th>
        </tr>
        <tr>
          <th>Date</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {shifts &&
          shifts.map((shift, i) => {
            return (
              <tr
                key={i}
                onClick={() => {
                  if (!shift._id) return;
                  redirect(`/admin/shifts/${shift._id}`);
                }}
              >
                <td>{new Date(shift.date).toLocaleDateString()}</td>
                <td>{shift.startTime}</td>
                <td>{shift.endTime}</td>
                <td>{shift.location}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
