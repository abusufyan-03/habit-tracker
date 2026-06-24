import { useState } from "react";
import { Button } from "./Button";
import { useHabits } from "../context/HabitProvider";


export function HabitForm() {
  const [name, setName] = useState("");

  const {addHabit} = useHabits();


  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if(name.trim() === "") return;
    setName("");
    console.log(name);

    addHabit(name)
  }
  return (
    <>
    <form className="flex gap-2" onSubmit={handleSubmit}>
         <input value={name} onChange={e => setName(e.target.value)} className="flex-1 border py-2 px-4 rounded-lg mr-2 bg-zinc-800 outline-none focus-visible:ring-2" placeholder="New habit.."/>
        <Button disabled={name.trim() === ""} className="rounded-xl py-2 px-4 font-medium">Add Habit</Button>
    </form>
    </>
  )
}