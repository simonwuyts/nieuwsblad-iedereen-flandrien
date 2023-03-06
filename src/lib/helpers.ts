import { TrainingId } from '@/types'
import { differenceInCalendarWeeks, differenceInSeconds } from 'date-fns'

export function formatMinutes(minutes: number) {
  let value = minutes
  let unit = 'min'
  if (minutes < 1) {
    value = Math.floor(minutes * 60)
    unit = 'sec'
  }
  return `${value} ${unit}`
}

export function convertEmailToKey(value: string) {
  return value.replaceAll('.', '{{dot}}')
}

export function convertTrainingIdToKey(value: TrainingId, weekNumber: number) {
  return `w${weekNumber}-${value.replaceAll('.', '-')}`
}

export function getWeekNumber(start: Date) {
  return (
    Math.max(
      differenceInCalendarWeeks(new Date(), start, { weekStartsOn: 0 }),
      0
    ) + 1
  )
}

export function segmentToMinutes(start: Date, stop: Date) {
  const seconds = differenceInSeconds(start, stop)
  return Math.round((seconds / 60) * 100) / 100
}
