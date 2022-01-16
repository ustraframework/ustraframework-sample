import { contextHolder } from '@ustra/nuxt/src/utils/nuxt-utils'

/**
 * core plugin을 조회
 */
export const $core = () => {
  return contextHolder.get().$core
}
