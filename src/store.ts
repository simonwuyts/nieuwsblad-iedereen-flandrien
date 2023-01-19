import { defineStore } from 'pinia'
import { RemovableRef, useStorage } from '@vueuse/core'
import { v4 as uuid } from 'uuid'

interface State {
  userId: RemovableRef<string>
  // Email stored in CIAM
  userEmail: RemovableRef<string>
}

export const useStore = defineStore('main', {
  state: (): State => ({
    userId: useStorage('userId', uuid()),
    userEmail: useStorage('userEmail', ''),
  }),
})
