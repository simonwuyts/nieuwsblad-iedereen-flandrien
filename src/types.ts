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
  interval2?: number
  rest?: number
  minIntensity?: number
  minIntensity2?: number
  maxIntensity?: number
  maxIntensity2?: number
  carbsPerHour?: number
  totalCarbs?: number
  solidUnits?: number
  liquidUnits?: number
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

type TrainingLineType = {
  [key in TrainingKey]?: TrainingId
}

export interface TrainingLine extends TrainingLineType {
  optionals?: TrainingKey[]
}

export interface TrainingLines {
  previousWave: {
    male: {
      beginner: TrainingLine[]
      advanced: TrainingLine[]
    }
    female: {
      beginner: TrainingLine[]
      advanced: TrainingLine[]
    }
  }
  newUser: {
    male: {
      beginner: TrainingLine[]
      advanced: TrainingLine[]
    }
    female: {
      beginner: TrainingLine[]
      advanced: TrainingLine[]
    }
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

export type TrainingStatus =
  | 'paused'
  | 'started'
  | 'idle'
  | 'completed'
  | 'skipped'

export interface LocalUserData {
  email: string
  firstName: string
  lastName: string
  level: 'BEGINNER' | 'GEVORDERD'
  sex: 'MALE' | 'FEMALE'
  age: number
  zoneType: 'heart' | 'ftp'
  maxHeartRate: number
  maxFTP: number
  didPreviousWave: boolean
}

export interface FirestoreUserData {
  extraTime: boolean
  startDate?: Timestamp
  trainings: Record<
    string,
    {
      lastStartedAt: Timestamp
      segments?: Segment[]
      status: TrainingStatus
    }
  >
}
