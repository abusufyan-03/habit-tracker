import { Button } from "./Button";

export function Header() {
  return (
    <>
  <header className="flex justify-between">
    <div className="flex flex-col gap-1">
      <h1 className="text-3xl font-bold text-zinc-200">Habit Tracker</h1>
      <span className="text-sm text-zinc-400">1/1 done today</span>
    </div>

    <div className="flex flex-col gap-1 items-center">
      <span className="text-sm text-zinc-400">06 apr - 12apr</span>
      <div className="flex justify-center gap-3">
        <Button>Prev</Button>
        <Button>Next</Button>
      </div>
    </div>
  </header>
  </>
  )
}
