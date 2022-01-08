<template>
  <dx-data-grid width="100%" :height="300" :data-source="gridData">
    <dx-column caption="순번" :width="100" data-field="boardIdx" alignment="center" />
    <dx-column caption="카테고리구분" :width="150" data-field="categoryCd" />
    <dx-column caption="제목" :width="150" data-field="title" />
  </dx-data-grid>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Ref, Watch, Inject, InjectReactive, Provide, ProvideReactive, PropSync, Emit } from 'vue-property-decorator'
import { SampleBoComponent } from '~/components/sample-bo-component'
import { sampleBoardService, Board } from '~/services/sample-board-service'

@Component
export default class extends SampleBoComponent {
  // #region variables
  gridData: Board[] = []
  // #endregion
  // #region hooks
  // #endregion
  // #region methods
  async search(title: string) {
    this.gridData = await sampleBoardService.getList(title)
  }
  // #endregion
  // #region watches
  // #endregion
}
</script>
<style lang="scss"></style>
