import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { Storage } from '@ustra/nuxt/src/vue/store/decorators'
import { CombinedContext } from '@ustra/nuxt/src/vue/store'

@Module({
  name: 'sample',
  namespaced: true,
  stateFactory: true,
})
export class SampleModule extends VuexModule {
  list: Array<string> = null

  @Mutation
  @Storage({ propertyKey: 'sample.list', defaultValue: [], type: "local" })
  setList(list: Array<string>) {
    this.list = list
  }

  @Action
  nuxtServerInit(ctx: CombinedContext) {
    console.log('nuxtServerInit2')
  }

  @Action
  nuxtClientInit(ctx: CombinedContext) {
    console.log('nuxtClientInit')
  }

}