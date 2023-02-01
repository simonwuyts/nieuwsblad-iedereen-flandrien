import { defineStore } from 'pinia'
import { RemovableRef, useStorage } from '@vueuse/core'
import { getUserInfo } from '@/lib/selligent'
import { FirestoreUserData } from '@/types'

interface State {
  localUserData: RemovableRef<{
    email: string
    firstName: string
    lastName: string
    level: string
    sex: string
  }>
  firestoreUserData?: FirestoreUserData
}

export const useStore = defineStore('main', {
  state: (): State => ({
    localUserData: useStorage('userInfo', {
      email: '',
      firstName: '',
      lastName: '',
      level: '',
      sex: '',
    }),
  }),

  actions: {
    async fetchUserInfo(email: string) {
      const result = await getUserInfo(email)

      this.localUserData = {
        email: result.MAIL,
        firstName: result.VOORNAAM,
        lastName: result.NAAM,
        level: result.NIVEAU,
        sex: result.GESLACHT,
      }
    },
  },
})
