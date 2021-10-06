import { createStore } from '@ustra/nuxt/src/vue/store'
import { SampleModule } from './modules/sample'

export default () => createStore({
  sample: SampleModule
})
