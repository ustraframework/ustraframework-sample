import { CorePlugin } from '../client/plugins/core'

declare module '@nuxt/types' {
  // context 객체
  interface Context {
    $core: CorePlugin
  }

  // app 객체
  interface NuxtAppOptions {
    $core: CorePlugin
  }
}

// store 객체
declare module 'vuex/types/index' {
  interface Store<S> {
    $core: CorePlugin
  }
}

// vue 객체
declare module 'vue/types/vue' {
  interface Vue {
    $core: CorePlugin
  }
}