import { SampleBoPlugin } from '../client/plugins/sample-bo-plugin'

declare module '@nuxt/types' {
  // context 객체
  interface Context {
    $bo: SampleBoPlugin
  }

  // app 객체
  interface NuxtAppOptions {
    $bo: SampleBoPlugin
  }
}

// store 객체
declare module 'vuex/types/index' {
  interface Store<S> {
    $bo: SampleBoPlugin
  }
}

// vue 객체
declare module 'vue/types/vue' {
  interface Vue {
    $bo: SampleBoPlugin
  }
}
