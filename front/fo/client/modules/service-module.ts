import { $core } from './plugin-utils'

/**
 * 플러그인의 alert 메시지 호출
 * @param message 메시지
 */
export const executeAlert = (message: string) => {
  $core().alert(message)
}
