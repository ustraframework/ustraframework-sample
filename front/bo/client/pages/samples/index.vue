<template>
  <div>
    <div>{{ displayTitle }}</div>
    <dx-button text="타이틀 변경" @click="changeTitle"></dx-button>
    <sub-component :title.sync="subComponentTitle" @title-changed="e => $logger().info(e)" />
    <div>{{ subComponentTitle }}</div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Ref, Watch, Inject, InjectReactive, Provide, ProvideReactive, PropSync, Emit } from 'vue-property-decorator'
import { SampleBoComponent } from '~/components/sample-bo-component'
import SubComponent from '~/components/samples/sub-component.vue'
import { sampleEventBus } from '~/event-bus/sample-event-bus'

@Component({
  name: 'samples',
  layout: 'sample',
  config: {
    auth: {
      required: false,
    },
  },
  components: {
    SubComponent,
  },
  validate(ctx) {
    return !!ctx.route.query.v
  },
  async middleware(ctx, cb) {
    if (ctx.route.query.v === '1') {
      ctx.app.router.push('/')
    }
    cb()
  },
})
export default class extends SampleBoComponent {
  // #region variables
  title: string = null
  subTitle: string = '서브 타이틀'
  subComponentTitle: string = null

  get displayTitle() {
    return this.title + ' - ' + this.subTitle
  }

  // #endregion
  // #region hooks
  created() {
    this.title = '샘플 페이지 화면1'
  }
  // #endregion
  // #region methods
  changeTitle() {
    this.title = '변경 타이틀'

    this.subComponentTitle = '하위 컴포넌트 제목 변경'

    sampleEventBus.emit({
      type: 'title',
      value: this.title,
    })
  }
  // #endregion
  // #region watches
  // #endregion
}
</script>
<style lang="scss"></style>
