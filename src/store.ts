import { defineStore } from 'pinia'
import { RemovableRef, useStorage } from '@vueuse/core'
import { getUserInfo } from './lib/selligent'

interface State {
  userInfo: RemovableRef<{
    email: string
    firstName: string
    lastName: string
    level: string
    sex: string
  }>
}

export const useStore = defineStore('main', {
  state: (): State => ({
    userInfo: useStorage('userInfo', {
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

      this.userInfo = {
        email: result.MAIL,
        firstName: result.VOORNAAM,
        lastName: result.NAAM,
        level: result.NIVEAU,
        sex: result.GESLACHT,
      }
    },
  },
})
