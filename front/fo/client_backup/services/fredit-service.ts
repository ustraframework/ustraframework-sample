import { UtraService } from '@ustra/nuxt/src/services/ustra-service'
import boardData from '@/data/board-data.json'
import { BoardModel } from './fredit-model'

export class FreditService extends UtraService {
  /**
   * 게시판 목록 조회
   * @returns
   */
  getBoardList() {
    return boardData as BoardModel[]
  }
}

export const freditService = new FreditService()
export default freditService
