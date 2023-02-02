import { getFireStoreDocument } from '@/lib/firestore'
import { convertEmailToKey, getWeekNumber } from '@/lib/helpers'
import { getUserInfo } from '@/lib/selligent'
import {
  getCurrentTrainingLine,
  getTrainingLineWeeks,
} from '@/lib/training-helpers'
import { FirestoreUserData, TrainingLine } from '@/types'
import { RemovableRef, useStorage } from '@vueuse/core'
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
  firestoreUserData?: FirestoreUserData
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

export const useStore = defineStore('main', {
  state: (): State => ({
    localUserData: useStorage('userInfo', initialLocalUserData),
    firestoreUserData: undefined,
    currentWeekNumber: 1,
  }),

  getters: {
    baseValue(state) {
      if (state.firestoreUserData?.zoneType === 'ftp') {
        return state.firestoreUserData?.maxFTP || 220 - state.localUserData.age
      } else {
        return (
          state.firestoreUserData?.maxHeartRate || 220 - state.localUserData.age
        )
      }
    },

    currentWeekTrainings(state): TrainingLine {
      console.log('update')
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
  },

  actions: {
    getWeekNumber() {
      if (this.firestoreUserData?.startDate) {
        this.currentWeekNumber = getWeekNumber(
          this.firestoreUserData.startDate.toDate()
        )
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
        age: parseInt(result.LEEFTIJD) || 30,
      }

      await this.fetchFirestoreUserData()
      this.getWeekNumber()
    },

    async fetchFirestoreUserData() {
      if (this.localUserData.email !== '') {
        this.firestoreUserData = await getFireStoreDocument(
          'users',
          convertEmailToKey(this.localUserData.email)
        )
      }
    },

    reset() {
      this.localUserData = initialLocalUserData
      this.firestoreUserData = undefined
    },
  },
})
