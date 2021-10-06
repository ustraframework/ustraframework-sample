import { Context, Plugin } from '@nuxt/types'
import { SampleModule } from '../store/modules/sample'

export const coreFunction = (msg: string) => {
  alert(msg)
}

export class CorePlugin {

  private context: Context
  store: Store

  constructor(context: Context) {
    this.context = context
    this.store = new Store(context)
  }

  /**
   * alert 메시지 호출
   * @param msg 메시지 내용
   */
  alert(msg: string) {
    window.alert(msg)
  }

}

class Store {
  private context: Context

  constructor(context: Context) {
    this.context = context
  }

  /**
   * 샘플 모듈 조회
   */
  get sample() {
    return this.context.$ustra.store.sample() as SampleModule
  }

}


export default (context: Context, inject) => {
  inject('core', new CorePlugin(context))
}