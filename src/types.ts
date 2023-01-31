export type TrainingId = `${number}.${number}`

export interface Training {
  name: string
  time: number
  series?: number
  seriesRest?: number
  repeats?: number
  interval?: number
  rest?: number
  minIntensity: number
  maxIntensity: number
  carbs?: number
  totalCarbs?: number
  solidUnits?: number
  fluidUnits?: number
  waterUnits?: number
}

export type Trainings = Record<TrainingId, Training>

export interface TrainingLine {
  training1?: TrainingId
  training2?: TrainingId
  training3?: TrainingId
  training4?: TrainingId
  training5?: TrainingId
  bonus1?: TrainingId
  bonus2?: TrainingId
  bonus3?: TrainingId
}

export interface TrainingLines {
  male: {
    beginner: TrainingLine[]
    advanced: TrainingLine[]
  }
  female: {
    beginner: TrainingLine[]
    advanced: TrainingLine[]
  }
}

export interface TrainingBlock {
  label: string
  minutes: number
  zoneNumber?: number
  range?: string
}

export interface Zone {
  number: number
  name: string
  minHeart: number
  maxHeart: number
  minFTP: number
  maxFTP: number
}
