<template>
  <dx-box direction="col" height="100%">
    <dx-item base-size="auto">
      <template #default>
        <search-bar
          @search="
            e => {
              $logger().info(e)
              list.search(e)
            }
          "
        />
      </template>
    </dx-item>
    <dx-item :ratio="1">
      <template #default>
        <dx-box direction="row" height="100%">
          <dx-item :ratio="1">
            <template #default>
              <list ref="list" />
            </template>
          </dx-item>
          <dx-item #default="_" :ratio="1">
            <div class="box2">Right</div>
          </dx-item>
        </dx-box>
      </template>
    </dx-item>
  </dx-box>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Ref, Watch, Inject, InjectReactive, Provide, ProvideReactive, PropSync, Emit } from 'vue-property-decorator'
import { SampleBoComponent } from '~/components/sample-bo-component'
import SearchBar from '~/components/system/board/search-bar.vue'
import List from '~/components/system/board/list.vue'

@Component({
  components: { SearchBar, List },
})
export default class extends SampleBoComponent {
  // #region variables
  @Ref() readonly list: List
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
