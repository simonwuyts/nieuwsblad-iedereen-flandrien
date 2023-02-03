import { Timestamp } from 'firebase/firestore'

export type TrainingId = `${number}.${number}`

export interface Training {
  name: string
  time: number
  description?: string
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

export type TrainingKey =
  | 'training1'
  | 'training2'
  | 'training3'
  | 'training4'
  | 'training5'
  | 'bonus1'
  | 'bonus2'
  | 'bonus3'

export type TrainingLine = Partial<Record<TrainingKey, TrainingId>>

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

export interface Segment {
  start: Timestamp
  stop: Timestamp
}

export type TrainingStatus = 'paused' | 'started' | 'idle' | 'completed'

export interface FirestoreUserData {
  zoneType: 'heart' | 'ftp'
  maxHeartRate: number
  maxFTP: number
  extraTime: boolean
  startDate: Timestamp
  trainings: Record<
    string,
    {
      lastStartedAt: Timestamp
      segments?: Segment[]
      status: TrainingStatus
    }
  >
}
