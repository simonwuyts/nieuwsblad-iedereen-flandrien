import { getFireStoreDocument, setFireStoreDocument } from '@/lib/firestore'
import {
  convertEmailToKey,
  convertTrainingIdToKey,
  getWeekNumber,
} from '@/lib/helpers'
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
}

interface State {
  localUserData: RemovableRef<LocalUserData>
  firestoreUserData: FirestoreUserData
  startDate: Date
  currentWeekNumber: number
}

const initialLocalUserData: LocalUserData = {
  email: '',
  firstName: '',
  lastName: '',
  level: 'BEGINNER',
  sex: 'MALE',
  age: 30,
}

const initialFirestoreUserData: FirestoreUserData = {
  zoneType: 'heart',
  maxHeartRate: 0,
  maxFTP: 0,
  extraTime: false,
  trainings: {},
}

export const useStore = defineStore('main', {
  state: (): State => ({
    localUserData: useStorage('userInfo', initialLocalUserData),
    firestoreUserData: initialFirestoreUserData,
    startDate: new Date('2023-02-25'),
    currentWeekNumber: 1,
  }),

  getters: {
    baseValue(state) {
      if (state.firestoreUserData.zoneType === 'ftp') {
        return state.firestoreUserData.maxFTP > 0
          ? state.firestoreUserData.maxFTP
          : 220 - state.localUserData.age
      } else {
        return state.firestoreUserData.maxHeartRate > 0
          ? state.firestoreUserData.maxHeartRate
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

    totalWeeks(state) {
      return getTrainingLineWeeks(
        state.localUserData.sex,
        state.localUserData.level
      )
    },

    visibleWeeksAmount(state) {
      return getWeekNumber(state.startDate)
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
        email: result.MAIL,
        firstName: result.VOORNAAM,
        lastName: result.NAAM,
        level: result.NIVEAU,
        sex: result.GESLACHT,
        age: parseInt(result.LEEFTIJD),
      }

      await this.fetchFirestoreUserData()
    },

    async fetchFirestoreUserData() {
      if (this.localUserData.email !== '') {
        this.firestoreUserData =
          (await getFireStoreDocument(
            'users',
            convertEmailToKey(this.localUserData.email)
          )) || this.firestoreUserData
      }
    },

    async saveFirestoreStartDate() {
      if (this.localUserData.email !== '') {
        if (!this.firestoreUserData.startDate) {
          await setFireStoreDocument(
            'users',
            convertEmailToKey(this.localUserData.email),
            {
              startDate: new Date(),
            }
          )
        }
      }
    },

    async saveFirestoreUserData(
      extraTime: boolean,
      zoneType: 'heart' | 'ftp',
      maxHeartRate: number,
      maxFTP: number
    ) {
      if (this.localUserData.email !== '') {
        await setFireStoreDocument(
          'users',
          convertEmailToKey(this.localUserData.email),
          {
            extraTime,
            zoneType,
            maxHeartRate,
            maxFTP,
            trainings: this.firestoreUserData.trainings || {},
          }
        )
      }
    },

    async startTraining(trainingId: TrainingId) {
      const convertedId = convertTrainingIdToKey(trainingId)

      this.firestoreUserData.trainings[convertedId] = {
        ...this.firestoreUserData.trainings[convertedId],
        status: 'started',
        lastStartedAt: Timestamp.fromDate(new Date()),
      }

      await setFireStoreDocument(
        'users',
        convertEmailToKey(this.localUserData.email),
        {
          trainings: this.firestoreUserData.trainings,
        }
      )
    },

    async pauseTraining(trainingId: TrainingId) {
      const convertedId = convertTrainingIdToKey(trainingId)

      this.firestoreUserData.trainings[convertedId] = {
        ...this.firestoreUserData.trainings[convertedId],
        status: 'paused',
      }

      if (this.firestoreUserData.trainings[convertedId].segments) {
        this.firestoreUserData.trainings[convertedId].segments?.push({
          start: this.firestoreUserData.trainings[convertedId].lastStartedAt,
          stop: Timestamp.fromDate(new Date()),
        })
      } else {
        this.firestoreUserData.trainings[convertedId].segments = [
          {
            start: this.firestoreUserData.trainings[convertedId].lastStartedAt,
            stop: Timestamp.fromDate(new Date()),
          },
        ]
      }

      await setFireStoreDocument(
        'users',
        convertEmailToKey(this.localUserData.email),
        {
          trainings: this.firestoreUserData.trainings,
        }
      )
    },

    async completeTraining(trainingId: TrainingId) {
      const convertedId = convertTrainingIdToKey(trainingId)

      this.firestoreUserData.trainings[convertedId] = {
        lastStartedAt: Timestamp.fromDate(new Date()),
        segments: [],
        status: 'completed',
      }

      await setFireStoreDocument(
        'users',
        convertEmailToKey(this.localUserData.email),
        {
          trainings: this.firestoreUserData.trainings,
        }
      )
    },

    async resetTraining(trainingId: TrainingId) {
      const convertedId = convertTrainingIdToKey(trainingId)

      this.firestoreUserData.trainings[convertedId] = {
        lastStartedAt: Timestamp.fromDate(new Date()),
        segments: [],
        status: 'idle',
      }

      await setFireStoreDocument(
        'users',
        convertEmailToKey(this.localUserData.email),
        {
          trainings: this.firestoreUserData.trainings,
        }
      )
    },

    reset() {
      this.localUserData = initialLocalUserData
      this.firestoreUserData = initialFirestoreUserData
    },
  },
})
