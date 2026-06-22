import { useState } from "react";
import { HabitForm } from "./components/HabitForm";
import { HabitList, type Habit } from "./components/HabitList";
import { Header } from "./components/Header";
import { isSameDay } from "date-fns";

export default function App() {
  const [habits, setHabits] = useState<Habit[]>([]);

  function addHabit(name: string) {
    setHabits((curr) => [
      ...curr,
      { id: crypto.randomUUID(), name, completion: [] },
    ]);
  }
  function deleteHabit(id: string) {
    setHabits((curr) => curr.filter((h) => h.id !== id));
  }

  function toggleHabit(id: string, date: Date) {
    setHabits( curr => (
      curr.map(h => {
        if(h.id !== id) return h;

        const alreadyDone = h.completion.some(c => isSameDay(c, date));
        const completion = alreadyDone? 
        h.completion.filter(c => !isSameDay(c, date))
        : [...h.completion, date]

        return {...h, completion};

      })
    ))
  }
  return (
    <>
      <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
        <Header />
        <HabitForm addHabit={addHabit} />
        <HabitList
          deleteHabit={deleteHabit}
          toggleHabit={toggleHabit}
          habits={habits}
        />
      </div>
    </>
  );
}
