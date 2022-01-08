import EventBus from '@ustra/nuxt/src/vue/event-bus'

export interface SampleEventBusState {
  /**
   * 유형
   */
  type: string

  /**
   * 값
   */
  value: string
}

export class SampleEventBus extends EventBus<SampleEventBusState> {
  name(): string {
    return 'sampleEventBus'
  }
}

const sampleEventBus = new SampleEventBus()
export default sampleEventBus
export { sampleEventBus }
