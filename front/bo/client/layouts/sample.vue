<template>
  <div>
    <div>샘플 레이아웃</div>
    <nuxt />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Ref, Watch, Inject, InjectReactive, Provide, ProvideReactive, PropSync, Emit } from 'vue-property-decorator'
import { SampleBoComponent } from '~/components/sample-bo-component'

@Component({
  name: 'sampleLayout',
})
export default class extends SampleBoComponent {
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
