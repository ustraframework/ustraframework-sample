export default defineNuxtPlugin(nuxtApp => {
  console.log('test plugin2')
  $ustra.components.setComponentsOptions('UDaumPostPopup', { apiKey: '41f772e7439076965bd5bb6e6639e245' })
  $ustra.components.setComponentsOptions('responsive', { enabled: true })

  // throw new Error('플러그인 로드 중 에러 발생')
  // $ustra.hooks.hook('ui:alert:error', async message => {
  //   await $ustra.ui.dialog.confirm(message)
  //   return false
  // })
})
