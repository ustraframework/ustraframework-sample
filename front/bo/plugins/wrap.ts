import fileDownload from 'js-file-download'

export default defineNuxtPlugin(nuxtApp => {
  const $ustra = useUstra()

  // wrap download function
  $ustra.api.downloadFile = useFunctionWrap($ustra.api.downloadFile, (next, args) => {
    let option = args[0]
    option = $ustra.utils.core.deepMerge(
      {
        excludeAuthValidation: true,
      },
      option,
    )
    option['responseType'] = 'blob'

    return $ustra.api.call(option).then(async res => {
      // check error type
      if (res.data && res.data.type === 'application/json') {
        try {
          const jsonResult = JSON.parse(await res.data.text())

          if (jsonResult.resultCode !== '0000') {
            alert('커스톰 오류 메시지')
            return
          }
        } catch (err) {}
      }

      fileDownload(res.data, option.fileName)
    })
  })
})
