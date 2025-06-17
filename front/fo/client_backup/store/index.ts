import { createStore } from '@ustra/nuxt/src/vue/store'
import { SampleModule } from './modules/sample'
import { FreditModule } from './modules/fredit'

export default () =>
  createStore({
    sample: SampleModule,
    fredit: FreditModule,
  })
