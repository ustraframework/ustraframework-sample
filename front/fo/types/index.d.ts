import { CorePlugin } from '../client/plugins/core'
import { SampleModule } from '../client/store/modules/sample'
import { FreditModule } from '../client/store/modules/fredit'

declare module '@ustra/nuxt/src/vue/store/index' {
  interface StoreModules {
    sample?: () => SampleModule
    fredit?: () => FreditModule
  }
}

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
