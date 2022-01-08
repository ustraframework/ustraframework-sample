import { UtraService } from '@ustra/nuxt/src/services/ustra-service'
import { BaseModel } from '@ustra/data/src/models/base-models'
import { ApiResponse } from '@ustra/data/src/models/api-model'
import { PaginationRequest } from '@ustra/data/src/models/pagination-model'
import { HttpMethod } from '@ustra/core/src/server/http/const'

export interface Board extends BaseModel {
  boardIdx: number
  categoryCd: string
  title: string
  content: string
}

export class SampleBoardService extends UtraService {
  /**
   * 게시판 목록 조회
   */
  async getList(title) {
    const url = this.$ustra.api.urlBuilder('/api/sample/board').add('title', title).build()

    return (
      await this.$ustra.api.call<ApiResponse<Board[]>>({
        url,
        method: HttpMethod.GET,
      })
    ).data.body
  }

  async get(boardIdx: number) {
    return (
      await this.$ustra.api.call<ApiResponse<Board[]>>({
        url: '/api/sample/board/' + boardIdx,
        method: HttpMethod.GET,
      })
    ).data.body
  }

  async add(board: Board) {
    return (
      await this.$ustra.api.call<ApiResponse<Board[]>>({
        url: '/api/sample/board',
        method: HttpMethod.POST,
        data: board,
      })
    ).data.body
  }
}

export const sampleBoardService = new SampleBoardService()
export default sampleBoardService
