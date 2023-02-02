import { lines } from '@/assets/data/lines'
import { trainings } from '@/assets/data/trainings'
import { zones } from '@/assets/data/zones'
import { TrainingBlock, TrainingId, Zone } from '@/types'

export function getTrainingZone(
  min: number,
  max: number,
  type: 'heart' | 'ftp' = 'heart'
): Zone {
  const average = (min + max) / 2
  return (
    zones.find((zone) => {
      const zoneMin = type === 'ftp' ? zone.minFTP : zone.minHeart
      const zoneMax = type === 'ftp' ? zone.maxFTP : zone.maxHeart

      return zoneMin <= average && average <= zoneMax
    }) || zones[0]
  )
}

export function getCurrentTrainingLine(
  sex: 'MALE' | 'FEMALE',
  level: 'BEGINNER' | 'GEVORDERD',
  weekNumber: number
) {
  const sexKey = sex === 'MALE' ? 'male' : 'female'
  const levelKey = level === 'BEGINNER' ? 'beginner' : 'advanced'

  return lines[sexKey][levelKey][weekNumber - 1]
}

export function getTrainingLineWeeks(
  sex: 'MALE' | 'FEMALE',
  level: 'BEGINNER' | 'GEVORDERD'
) {
  const sexKey = sex === 'MALE' ? 'male' : 'female'
  const levelKey = level === 'BEGINNER' ? 'beginner' : 'advanced'
  return lines[sexKey][levelKey].length
}

export function getTraining(trainingId: TrainingId) {
  return trainings[trainingId]
}

export function generateTrainingBlocks(
  trainingId: TrainingId,
  baseValue: number = 190,
  type: 'heart' | 'ftp' = 'heart'
) {
  const blocks: TrainingBlock[] = []

  const training = trainings[trainingId]
  const zone = getTrainingZone(
    training.minIntensity,
    training.maxIntensity,
    type
  )
  const minPercentage = type === 'ftp' ? zone.minFTP : zone.minHeart
  const maxPercentage = type === 'ftp' ? zone.maxFTP : zone.maxHeart
  const minValue = Math.floor(baseValue * (minPercentage / 100))
  const maxValue = Math.floor(baseValue * (maxPercentage / 100))

  const series = training.series || 1
  const seriesRest = training.seriesRest || 0
  const repeats = training.repeats || 1
  const interval = training.interval || training.time
  const rest = training.rest || 0

  let totalBlockTime = 0
  let remainingTime = training.time

  for (let i = 0; i < series; i++) {
    for (let j = 0; j < repeats; j++) {
      blocks.push({
        zoneNumber: zone.number,
        label: `Zone ${zone.number}`,
        range: `(${minValue} - ${maxValue})`,
        minutes: interval,
      })
      totalBlockTime = totalBlockTime + interval
      if (j !== repeats - 1 && rest > 0) {
        blocks.push({
          label: `Rust`,
          minutes: rest,
        })
        totalBlockTime = totalBlockTime + rest
      }
    }
    if (i !== series - 1 && seriesRest > 0) {
      blocks.push({
        label: `Rust`,
        minutes: seriesRest,
      })
      totalBlockTime = totalBlockTime + seriesRest
    }
  }

  remainingTime = remainingTime - totalBlockTime

  const startBlock = {
    label: 'Opwarming',
    minutes: Math.floor(remainingTime / 2),
  }

  const endBlock = {
    label: 'Herstel',
    minutes: Math.floor(remainingTime / 2),
  }

  if (remainingTime > 0) {
    blocks.splice(0, 0, startBlock)
    blocks.push(endBlock)
  }

  return blocks
}
