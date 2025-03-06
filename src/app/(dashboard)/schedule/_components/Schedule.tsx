"use client";

import { Shifts } from "@/models/Shift";
import { useEffect, useState } from "react";
import WeekPicker from "./WeekPicker";
import ScheduleTable from "./ScheduleTable";

export default function Schedule({ shifts }: { shifts: Shifts[] }) {
  const [weeksMap, setWeeksMap] = useState<
    { startDate: string; shifts: Shifts[] }[]
  >([]);
  const [week, setWeek] = useState<string>("");

  useEffect(() => {
    const map = new Map<string, Shifts[]>();

    shifts.forEach((shift) => {
      const shiftDate = new Date(shift.date);
      const dayOfTheWeek = shiftDate.getDay();

      const monday = new Date(shiftDate);
      monday.setDate(
        shiftDate.getDate() - (dayOfTheWeek == 0 ? 6 : dayOfTheWeek - 1),
      );

      let curDaysInWeek = map.get(monday.toISOString().split("T")[0]);
      if (!curDaysInWeek) {
        curDaysInWeek = [shift];
      } else {
        curDaysInWeek.push(shift);
      }

      map.set(monday.toISOString().split("T")[0], curDaysInWeek);
    });

    setWeeksMap(
      Array.from(map.entries()).map(([startDate, shifts]) => ({
        startDate,
        shifts,
      })),
    );
  }, [shifts]);

  return (
    <div className="flex flex-col gap-20 mt-12 items-center">
      <WeekPicker weeks={weeksMap.map((v) => v.startDate)} setWeek={setWeek} />
      <ScheduleTable
        weekStart={week}
        shifts={weeksMap.find((w) => w.startDate === week)?.shifts ?? []}
      />
    </div>
  );
}
