<template>
  <div>
    <div>{{ titleText }}</div>
    <button @click="$router.push('/fredit/index2')">index2로 이동</button>
    <button @click="() => clickOnTitleText()">title text 변경</button>

    <sub-component ref="subComponent" :text="subCompText" :value.sync="subCompValue" @text-changed="text => $logger().info('text', text)" />

    <div>subCompValue : {{ subCompValue }}</div>
    <fredit-sub-comp />
  </div>
</template>
<script lang="ts">
import { Component, Watch, Prop, PropSync, Ref } from 'vue-property-decorator'
import { CustomFoComponent } from '@/components/custom-fo-component'
import FreditSubComp from '@/components/fredit/fredit-sub-comp.vue'

@Component({
  template: `<div>
    <button text="value변경" @click="innerValue='value 변경됨.'">value값 변경</button>
    <div>{{ text }}</div>
  </div>`,
})
class SubComponent extends CustomFoComponent {
  @Prop({ default: '기본 텍스트 값' }) readonly text: string
  @PropSync('value', { default: null }) innerValue: string

  alert() {
    this.$logger().warn('alert')
  }

  @Watch('text')
  textChanged(v) {
    console.log('text prop이 변경')
    this.$emit('text-changed', v)
  }
}

@Component({
  layout: 'fredit',
  components: { SubComponent, FreditSubComp },
})
export default class extends CustomFoComponent {
  // #region variables
  titleText: string = 'main'
  subCompText: string = '상위 초기 값'

  subCompValue: string = '초기 value'

  @Ref() readonly subComponent: SubComponent

  // #endregion
  // #region hooks
  created() {
    console.log(this.$data)
  }
  // #endregion
  // #region methods
  clickOnTitleText() {
    this.titleText = 'main2'
    this.subCompText = '상위 컴포넌트에서 값 변경'

    this.subComponent.alert()
  }
  // #endregion
  // #region watches
  @Watch('titleText', { immediate: true })
  titleTextChanged(v) {
    console.log('titleText가 변경되었음.')
  }
  // #endregion
}
</script>
<style lang="scss"></style>
