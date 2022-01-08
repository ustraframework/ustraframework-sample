<template>
  <u-button-bar>
    <u-field-row :wrap="false">
      <u-field-set :show-borders="true">
        <u-field-row :wrap="false">
          <u-field label="제목" :width="200">
            <dx-text-box v-model="title" />
          </u-field>
          <dx-button class="right" text="검색" icon="search" @click="$emit('search', title)"></dx-button>
        </u-field-row>
      </u-field-set>
    </u-field-row>
  </u-button-bar>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Ref, Watch, Inject, InjectReactive, Provide, ProvideReactive, PropSync, Emit } from 'vue-property-decorator'
import { SampleBoComponent } from '~/components/sample-bo-component'

@Component
export default class extends SampleBoComponent {
  // #region variables
  title: string = null
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
