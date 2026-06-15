import { Button } from "./Button";
import { eachDayOfInterval, endOfWeek, startOfWeek, format, isFuture } from "date-fns"


export type Habit = {id: string, name: string}

type HabitProps = {
  habits: Habit[];
}

export function HabitList({habits}: HabitProps) {
  console.log(habits);

  if (habits.length === 0) {
    return (
      <p className="text-zinc-500 text-center py-12">
        No Habits yet. Add one above to get started.
      </p>
    );
  }

  return (
    <>
      {habits.map(habit => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </>
  );
}

type HabitItemProps = {
  habit: Habit;
};

function HabitItem({ habit }: HabitItemProps) {
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(new Date(), {weekStartsOn: 1}),
    end: endOfWeek(new Date(), {weekStartsOn: 1})
  })


  return (
    <>
      <div className="bg-zinc-800 p-4 rounded-xl flex flex-col gap-3">
        {/* Item List Header with Delete Btn */}
        <div className="flex items-center justify-between ">
          <div className="flex gap-3">
            <span className="text-xl font-bold">{habit.name}</span>
            <span>🔥3</span>
          </div>
          <Button variant={"ghost-destructive"}>Delete</Button>
        </div>

        {/* Item list bottom with week days */}
        <div className="flex gap-1.5">
          {visibleDates.map((date) => (
            <Button key={date.toISOString()} disabled={isFuture(date)} className="flex flex-1 flex-col gap-0.5 text-sm">
              <span className="font-medium">{format(date, "EEE")}</span>
              <span>{format(date, "d")}</span>
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
