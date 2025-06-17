import { defineStore } from 'pinia'

export const useTempStore = defineStore('temp', () => {
  const states = {
    data: ref<string>('test'),
  }

  const testdata = ref<string>('test')

  return { ...states, testdata }
})
