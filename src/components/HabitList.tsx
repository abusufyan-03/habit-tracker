import { Button } from "./Button";
import {
  eachDayOfInterval,
  endOfWeek,
  startOfWeek,
  format,
  isFuture,
  isSameDay,
  subDays,
} from "date-fns";

export type Habit = { id: string; name: string, completion: Date[] };

type HabitProps = {
  habits: Habit[];
  deleteHabit(id: string): void;
  toggleHabit(id: string, date: Date): void;
};

export function HabitList({ habits, deleteHabit, toggleHabit }: HabitProps) {
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
      {habits.map((habit) => (
        <HabitItem deleteHabit={deleteHabit} toggleHabit={toggleHabit} key={habit.id} habit={habit} />
      ))}
    </>
  );
}

type HabitItemProps = {
  habit: Habit;
  deleteHabit(id: string): void;
  toggleHabit(id: string, date: Date): void;
};

function HabitItem({ habit, deleteHabit, toggleHabit }: HabitItemProps) {
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

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
