import { TrainingId } from "@/types";
import { differenceInCalendarWeeks, differenceInSeconds } from "date-fns";

export function formatMinutes(minutes: number) {
  let value = minutes;
  let unit = "min";
  if (minutes < 1) {
    value = Math.floor(minutes * 60);
    unit = "sec";
  }
  return `${value} ${unit}`;
}

export function convertEmailToKey(value: string) {
  return value.replaceAll(".", "{{dot}}");
}

export function convertTrainingIdToKey(value: TrainingId) {
  return value.replaceAll(".", "-");
}

export function getWeekNumber(start: Date) {
  return differenceInCalendarWeeks(new Date(), start, { weekStartsOn: 1 }) + 1;
}

export function segmentToMinutes(start: Date, stop: Date) {
  const seconds = differenceInSeconds(start, stop);
  return Math.round((seconds / 60) * 100) / 100
}
