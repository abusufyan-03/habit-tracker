import { useState } from "react";
import { HabitForm } from "./components/HabitForm";
import { HabitList } from "./components/HabitList";
import { Header } from "./components/Header";
import { HabitProvider } from "./context/HabitProvider";
import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";

export default function App() {
  const [weekOfset, setWeekOfset] = useState(0);
  const week = addWeeks(new Date, weekOfset);

  const visibleDates = eachDayOfInterval({
    start: startOfWeek(week, {weekStartsOn: 1}),
    end: endOfWeek(week, {weekStartsOn: 1})
  })
  return (
    <>
      <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
        <HabitProvider>
          <Header visibleDates={visibleDates}
          onPrev={() => setWeekOfset(o => o -1 )}
          onNext={() => setWeekOfset(o => o + 1)}
           />
          <HabitForm />
          <HabitList  visibleDates={visibleDates} />
        </HabitProvider>
      </div>
    </>
  );
}
