<template>
  <section class="mb-5 section-top" style="width: 100%">
    <b-message title="Sample" type="is-success" has-icon :closable="false"> 코드 샘플 화면입니다. <br />우측 하단의 메뉴 아이콘을 선택하여 조회할 샘플 메뉴를 선택하십시오.</b-message>
  </section>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import { CustomFoComponent } from '@/components/custom-fo-component'

@Component({})
/**
 * @vuese
 * @group component group
 * component description
 */
export default class extends CustomFoComponent {
  // #region variables
  // #endregion
  // #region hooks
  // #endregion
  // #region methods
  // #endregion
  // #region watches
  // #endregion
}
</script>
<style lang="scss"></style>
