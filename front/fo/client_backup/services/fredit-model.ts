import { BaseModel } from '@ustra/data/src/models/base-models'

/**
 * 게시판 모델
 */
export interface BoardModel extends BaseModel {
  /**
   * 인덱스 값
   */
  id: number
  /**
   * 제목
   */
  title: string
  /**
   * 내용
   */
  content: string
  /**
   * 작성자
   */
  author: string
  /**
   * 작성
   */
  date: Date
}
