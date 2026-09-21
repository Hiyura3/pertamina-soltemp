import { formatWib } from "./DateTimePicker";

export function DueDate({ value }: { value?: string | null }) {
  return <span>{formatWib(value)}</span>;
}

export function getNearestDueDate(stages: Array<{ dueDate?: string | null }>) {
  const validDates = stages
    .map((stage) => stage.dueDate)
    .filter((value): value is string => typeof value === "string" && !Number.isNaN(new Date(value).getTime()))
    .sort((left, right) => new Date(left).getTime() - new Date(right).getTime());

  const now = Date.now();
  return validDates.find((value) => new Date(value).getTime() >= now) ?? validDates.at(-1) ?? null;
}
