<template>
  <div>
    <div>{{ innerText }}</div>
    <button @click="innerText = '내부 값 변경'">text 값 변경</button>

    <div>{{ textSub }}</div>
    <button @click="changeText2">text2 값 변경</button>

    <div style="background-color: lime">
      {{ this.$ustra.store.sample().list }}
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, PropSync, Emit, Watch } from 'vue-property-decorator'
import { CustomFoComponent } from '@/components/custom-fo-component'

@Component
/**
 * @vuese
 * @group component group
 * component description
 */
export default class extends CustomFoComponent {
  // #region variables
  @PropSync('text', { default: '기본 값' }) innerText: string
  @Prop() readonly textSub: string

  get list() {
    return this.$ustra.store.sample().list
  }
  // #endregion
  // #region hooks
  // #endregion
  // #region methods
  changeText2() {
    this.$emit('text2_required_change', 'text2 변경 값')
  }

  notify() {
    alert('경고')
  }
  // #endregion
  // #region watches
  @Watch('list')
  listChanged(v) {
    console.log('listChanged', v)
  }
  // #endregion
}
</script>
<style lang="scss"></style>
