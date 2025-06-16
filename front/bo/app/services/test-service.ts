/**
 * TODO: Module Description
 * @exports {@link modules}
 * @packageDocumentation
 */

import { baseModels, apiModels, interfaceModels, paginationModels } from '#ustra/core/data'

export const useSampleService = defineUstraService(({ $ustra, appProps, api, nuxtApp }) => {
  async function getList(data: any) {
    return (
      await api.call<apiModels.ApiResponse<any[]>>({
        url: '/api/system/code/group',
        method: 'POST',
        data: data,
      })
    )?.data?.body
  }

  return { getList }
})
