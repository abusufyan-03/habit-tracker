import { Button } from "./Button";

export function HabitForm() {
  return (
    <>
    <form className="flex gap-2">
         <input className="flex-1 border py-2 px-4 rounded-lg mr-2 bg-zinc-800 outline-none focus-visible:ring-2" placeholder="New habit.."/>
        <Button>Add Habit</Button>
    </form>
    </>
  )
}