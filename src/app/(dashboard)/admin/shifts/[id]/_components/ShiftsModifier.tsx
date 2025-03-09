"use client";

import { Shifts } from "@/models/Shift";
import { useState } from "react";

export default function ShiftsModifier({ shift }: { shift: Shifts }) {
  const [date, setDate] = useState<number | null>(null);
  const [start, setStart] = useState<string | null>(null);
  const [end, setEnd] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);

  const formattedDate = shift.date.split("T")[0];

  const handleClick = async () => {
    let saveData: Partial<Shifts> = {};

    if (date) saveData.date = new Date(date);
    if (start) saveData.startTime = start;
    if (end) saveData.endTime = end;
    if (location) saveData.location = location;

    await fetch("http://localhost:3000/api/shifts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: shift._id, newShift: saveData }),
    });
  };

  return (
    <div className="flex flex-col">
      <input
        type="date"
        defaultValue={formattedDate}
        onInput={(e) => setDate(e.currentTarget.valueAsNumber)}
      ></input>
      <input
        type="time"
        defaultValue={shift.startTime}
        onInput={(e) => setStart(e.currentTarget.value)}
      />
      <input
        type="time"
        defaultValue={shift.endTime}
        onInput={(e) => setEnd(e.currentTarget.value)}
      />
      <input
        defaultValue={shift.location}
        onInput={(e) => setLocation(e.currentTarget.value)}
      />
      {date} {start} {end} {location}
      <button onClick={() => handleClick()}>Modify</button>
    </div>
  );
}
