import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { Storage } from '@ustra/nuxt/src/vue/store/decorators'
import { CombinedContext } from '@ustra/nuxt/src/vue/store'
import { BoardModel } from '@/services/fredit-model'
import { freditService } from '@/services/fredit-service'

@Module({
  name: 'fredit',
  namespaced: true,
  stateFactory: true,
})
export class FreditModule extends VuexModule {
  boardList: BoardModel[] = []

  @Mutation
  setBoardList(boardList: BoardModel[]) {
    this.boardList = boardList
  }

  @Action
  nuxtServerInit(ctx: CombinedContext) {
    this.setBoardList(freditService.getBoardList())
  }

  // @Action
  // nuxtClientInit(ctx: CombinedContext) {
  //   console.log('nuxtClientInit')
  // }
}
