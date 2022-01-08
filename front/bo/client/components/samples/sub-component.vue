<template>
  <div>
    <div>하위 컴포넌트</div>
    <div>타이틀 : {{ title }}</div>

    <dx-button
      text="하위 컴포넌트 타이틀 변경"
      @click="
        () => {
          syncTitle = '타이틀 변경됨.'
          $emit('title-changed', syncTitle)
        }
      "
    ></dx-button>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Ref, Watch, Inject, InjectReactive, Provide, ProvideReactive, PropSync, Emit } from 'vue-property-decorator'
import { SampleBoComponent } from '~/components/sample-bo-component'
import { sampleEventBus } from '~/event-bus/sample-event-bus'

@Component({
  middleware: async ctx => {
    // todo: middleware
  },
  validate: async ctx => {
    // todo: validate
    return true
  },
  asyncData: async ctx => {
    // todo: asyncData
  },
})
export default class extends SampleBoComponent {
  // #region variables
  @PropSync('title') syncTitle: string
  // #endregion
  // #region hooks
  created() {
    console.log('eventbus')
    this.$ustra.utils.eventBus(this, sampleEventBus, state => {
      console.log('state', state)
    })
  }
  // #endregion
  // #region methods
  // #endregion
  // #region watches
  // #endregion
}
</script>
<style lang="scss"></style>
