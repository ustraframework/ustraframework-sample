import { Context, Plugin } from '@nuxt/types'
import Vuex from 'vuex'

export class SampleBoPlugin {
  private context: Context = null

  constructor(context: Context) {
    this.context = context
  }

  /**
   * alert 메시지를 호출한다.
   * @param message 메시지
   */
  alert(message: string) {
    window.alert(message)
  }
}

export default (context: Context, inject) => {
  const plugin = new SampleBoPlugin(context)

  // context 객체에 플러그인 주입
  // @ts-ignore
  contenxt.$bo = plugin

  // Vue 객체에 플러그인 주입
  inject('bo', plugin)

  // Store 객체에 플러그인 주입
  // @ts-ignore
  Vuex.Store.prototype.$bo = plugin
}
