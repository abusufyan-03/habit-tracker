import { useHabits, type Habit } from "../context/useHabits";
import { Button } from "./Button";
import {
  format,
  isFuture,
  isSameDay,
  subDays,
} from "date-fns";

type HabitListProps = {
  visibleDates: Date[];
}
export function HabitList({visibleDates}: HabitListProps) {
  // console.log(habits);
  const {habits} = useHabits();

  if (habits.length === 0) {
    return (
      <p className="text-zinc-500 text-center py-12">
        No Habits yet. Add one above to get started.
      </p>
    );
  }

  return (
    <>
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} visibleDates={visibleDates} />
      ))}
    </>
  );
}

type HabitItemProps = {
  habit: Habit;
  visibleDates: Date[]
}
function HabitItem({habit, visibleDates}: HabitItemProps) {
  const {deleteHabit, toggleHabit} = useHabits();

  const streak = getStreak(habit.completion);

  return (
    <>
      <div className="bg-zinc-800 p-4 rounded-xl flex flex-col gap-3">
        {/* Item List Header with Delete Btn */}
        <div className="flex items-center justify-between ">
          <div className="flex gap-3">
            <span className="text-xl font-bold">{habit.name}</span>
            {streak !== 0 && (
              <span>🔥{streak}</span>
            )}
          </div>
          <Button
            onClick={() => deleteHabit(habit.id)}
            variant={"ghost-destructive"}
          >
            Delete
          </Button>
        </div>

        {/* Item list bottom with week days */}
        <div className="flex gap-1.5">
          {visibleDates.map((date) => (
            <Button
              key={date.toISOString()}
              disabled={isFuture(date)}
              className="flex flex-1 flex-col gap-0.5 text-sm"
              onClick={() => toggleHabit(habit.id, date)}
              variant={habit.completion.some(c => isSameDay(c, date))? "primary": "secondary"}
            >
              <span className="font-medium">{format(date, "EEE")}</span>
              <span>{format(date, "d")}</span>
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}

function getStreak(completion: Date[]) {
  let streak = 0;
  let date = new Date();
  while(completion.some(c => isSameDay(c, date))) {
    streak++;

    date = subDays(date, 1);
  }
  return streak;
}
