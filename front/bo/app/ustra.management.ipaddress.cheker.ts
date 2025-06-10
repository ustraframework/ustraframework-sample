import { defineUstraManagementMenuIpAddressChecker, useUstra } from '#imports'

export default defineUstraManagementMenuIpAddressChecker(async (menu, ipAddress) => {
  const $ustra = useUstra()
  if (menu.ipLmtYn === 'Y' && menu.ipList) {
    if (!menu.ipList.split(',').includes(ipAddress)) {
      // tab menu is enabled
      if ($ustra.env.appProps.nuxt.management.ui.tabMenu.enabled) {
        // 접속한 IP 주소는 접근이 불가능합니다.
        await alert($ustra.message.getMessage('ustra.management.cannotAccessbleMenuIpAddress'))
      } else {
        // 탭 메뉴가 아닐 경우는 인증 해제 처리
        await $ustra.auth.inactivate('validate', null, 'user connected from not allowed ip address.')
      }

      return false
    }
  }

  return true
})
