import { isSameDay } from "date-fns";
import {type ReactNode } from "react";
import { HabitContext, type Habit } from "./useHabits";
import { useLocalStorage } from "../hooks/useLocalStorage";

type HabitProviderProps = {
    children: ReactNode
}


export function HabitProvider({children}: HabitProviderProps) {


    const [habits, setHabits] = useLocalStorage<Habit[]>("Habits", []);

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


    return <HabitContext value={{habits, addHabit, deleteHabit, toggleHabit}}>
        {children}
    </HabitContext>
}
