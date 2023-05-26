import { getFireStoreDocument, setFireStoreDocument } from '@/lib/firestore'
import { convertEmailToKey, getWeekNumber } from '@/lib/helpers'
import { getUserInfo } from '@/lib/selligent'
import {
  getCurrentTrainingLine,
  getTrainingLineWeeks,
} from '@/lib/training-helpers'
import { FirestoreUserData, TrainingId, TrainingLine } from '@/types'
import { RemovableRef, useStorage } from '@vueuse/core'
import { Timestamp } from 'firebase/firestore'
import { defineStore } from 'pinia'
interface LocalUserData {
  email: string
  firstName: string
  lastName: string
  level: 'BEGINNER' | 'GEVORDERD'
  sex: 'MALE' | 'FEMALE'
  age: number
  zoneType: 'heart' | 'ftp'
  maxHeartRate: number
  maxFTP: number
}

interface State {
  localUserData: RemovableRef<LocalUserData>
  firestoreUserData: FirestoreUserData
  emailWasNotRecognized?: boolean
  startDate: Date
  currentWeekNumber: number
  debug?: boolean
}

const initialLocalUserData: LocalUserData = {
  email: '',
  firstName: '',
  lastName: '',
  level: 'BEGINNER',
  sex: 'MALE',
  age: 30,
  zoneType: 'heart',
  maxHeartRate: 0,
  maxFTP: 0,
}

const initialFirestoreUserData: FirestoreUserData = {
  extraTime: false,
  trainings: {},
}

export const useStore = defineStore('main', {
  state: (): State => ({
    localUserData: useStorage('userInfoWave2', initialLocalUserData),
    firestoreUserData: initialFirestoreUserData,
    emailWasNotRecognized: false,
    startDate: new Date('2023-02-26'),
    currentWeekNumber: 1,
    debug: new URLSearchParams(window.location.search).has('debug'),
  }),

  getters: {
    baseValue(state) {
      if (state.localUserData.zoneType === 'ftp') {
        return state.localUserData.maxFTP > 0
          ? state.localUserData.maxFTP
          : 220 - state.localUserData.age
      } else {
        return state.localUserData.maxHeartRate > 0
          ? state.localUserData.maxHeartRate
          : 220 - state.localUserData.age
      }
    },

    currentWeekTrainings(state): TrainingLine {
      return getCurrentTrainingLine(
        state.localUserData.sex,
        state.localUserData.level,
        state.currentWeekNumber
      )
    },

    currentWeekTrainingKeyIndexes(state) {
      let uniqueTrainingIds: Record<string, number> = {}
      let result: Record<string, number> = {}
      Object.entries(this.currentWeekTrainings).forEach(([key, value]) => {
        if (uniqueTrainingIds.hasOwnProperty(value)) {
          uniqueTrainingIds[value] = uniqueTrainingIds[value] + 1
        } else {
          uniqueTrainingIds[value] = 0
        }
        result[key] = uniqueTrainingIds[value]
      })

      return result
    },

    totalWeeks(state) {
      return getTrainingLineWeeks(
        state.localUserData.sex,
        state.localUserData.level
      )
    },
  },

  actions: {
    getWeekNumber() {
      if (this.firestoreUserData.startDate) {
        this.currentWeekNumber = getWeekNumber(
          this.firestoreUserData.startDate.toDate()
        )
      } else {
        return 1
      }
    },

    async fetchUserInfo(email: string) {
      const result = await getUserInfo(email)

      this.localUserData = {
        ...this.localUserData,
        email: result.MAIL,
        firstName: result.VOORNAAM,
        lastName: result.NAAM,
        level: result.NIVEAU,
        sex: result.GESLACHT,
        age: parseInt(result.LEEFTIJD),
      }

      if (this.localUserData.email === '') {
        this.emailWasNotRecognized = true
      }

      await this.fetchFirestoreUserData()
    },

    async fetchFirestoreUserData() {
      if (this.localUserData.email !== '') {
        this.firestoreUserData =
          (await getFireStoreDocument(
            'users-wave-2',
            convertEmailToKey(this.localUserData.email)
          )) || this.firestoreUserData
      }
    },

    async saveFirestoreStartDate() {
      if (this.localUserData.email !== '') {
        if (!this.firestoreUserData.startDate) {
          await setFireStoreDocument(
            'users-wave-2',
            convertEmailToKey(this.localUserData.email),
            {
              startDate: new Date(),
            }
          )
        }
      }
    },

    async saveFirestoreUserData(extraTime: boolean) {
      if (this.localUserData.email !== '') {
        await setFireStoreDocument(
          'users-wave-2',
          convertEmailToKey(this.localUserData.email),
          {
            extraTime,
            trainings: this.firestoreUserData.trainings || {},
          }
        )
      }
    },

    async startTraining(convertedTrainingId: string) {
      this.firestoreUserData.trainings[convertedTrainingId] = {
        ...this.firestoreUserData.trainings[convertedTrainingId],
        status: 'started',
        lastStartedAt: Timestamp.fromDate(new Date()),
      }

      await setFireStoreDocument(
        'users-wave-2',
        convertEmailToKey(this.localUserData.email),
        {
          trainings: this.firestoreUserData.trainings,
        }
      )

      //@ts-ignore
      gtag('event', 'training_started', { debug_mode: true })
    },

    async pauseTraining(convertedTrainingId: TrainingId) {
      this.firestoreUserData.trainings[convertedTrainingId] = {
        ...this.firestoreUserData.trainings[convertedTrainingId],
        status: 'paused',
      }

      if (this.firestoreUserData.trainings[convertedTrainingId].segments) {
        this.firestoreUserData.trainings[convertedTrainingId].segments?.push({
          start:
            this.firestoreUserData.trainings[convertedTrainingId].lastStartedAt,
          stop: Timestamp.fromDate(new Date()),
        })
      } else {
        this.firestoreUserData.trainings[convertedTrainingId].segments = [
          {
            start:
              this.firestoreUserData.trainings[convertedTrainingId]
                .lastStartedAt,
            stop: Timestamp.fromDate(new Date()),
          },
        ]
      }

      await setFireStoreDocument(
        'users-wave-2',
        convertEmailToKey(this.localUserData.email),
        {
          trainings: this.firestoreUserData.trainings,
        }
      )
    },

    async completeTraining(convertedTrainingId: TrainingId) {
      this.firestoreUserData.trainings[convertedTrainingId] = {
        lastStartedAt: Timestamp.fromDate(new Date()),
        segments: [],
        status: 'completed',
      }

      await setFireStoreDocument(
        'users-wave-2',
        convertEmailToKey(this.localUserData.email),
        {
          trainings: this.firestoreUserData.trainings,
        }
      )

      //@ts-ignore
      gtag('event', 'training_completed', { debug_mode: true })
    },

    async resetTraining(convertedTrainingId: TrainingId) {
      this.firestoreUserData.trainings[convertedTrainingId] = {
        lastStartedAt: Timestamp.fromDate(new Date()),
        segments: [],
        status: 'idle',
      }

      await setFireStoreDocument(
        'users-wave-2',
        convertEmailToKey(this.localUserData.email),
        {
          trainings: this.firestoreUserData.trainings,
        }
      )
    },

    reset() {
      this.localUserData = initialLocalUserData
      this.firestoreUserData = initialFirestoreUserData
      this.emailWasNotRecognized = false
    },
  },
})
