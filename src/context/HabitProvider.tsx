import { isSameDay } from "date-fns";
import { createContext, useContext, useState, type ReactNode } from "react";

export type Habit = { id: string; name: string, completion: Date[] };

type Context = {
    habits: Habit[]
    addHabit(id: string): void;
    deleteHabit(id: string): void
    toggleHabit(id: string, date: Date): void
}

type HabitProviderProps = {
    children: ReactNode
}

export const HabitContext = createContext<null | Context>(null)

export function HabitProvider({children}: HabitProviderProps) {


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


    return <HabitContext value={{habits, addHabit, deleteHabit, toggleHabit}}>
        {children}
    </HabitContext>
}

export function useHabits() {
    const habitContext = useContext(HabitContext);
    if(habitContext == null) throw new Error ("Null context");

    return habitContext;
}