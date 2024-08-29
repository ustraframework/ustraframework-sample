<template>
  <section class="documentation">
    <!-- <div class="sidebar-bg"></div> -->
    <div class="is-fullhd docs-template-horizontal">
      <b-sidebar :open.sync="visibleSideBar" :can-cancel="true" :overlay="true" :fullheight="true" class="sidebar">
        <div class="is-custom-mobile sidebar-menu">
          <b-menu-list>
            <b-menu-item @click="$router.push('/sample/mobile')">
              <template #label>모바일 브릿지 호출</template>
            </b-menu-item>
            <b-menu-item @click="$router.push('/sample/upload')">
              <template #label>파일 업로드</template>
            </b-menu-item>
          </b-menu-list>
        </div>
      </b-sidebar>
      <b-button icon-left="grid-large" :rounded="true" class="guide-index-button" type="is-danger" @click="showSideBar"></b-button>
      <nuxt-child :key="$route.fullPath" ref="child" />
    </div>
    <!-- </div> -->
  </section>
</template>
<script lang="ts">
import { Component, PropSync } from 'vue-property-decorator'
import { CustomFoComponent } from '@/components/custom-fo-component'

@Component({
  config: {
    auth: {
      required: true,
    },
  },
})
/**
 * @vuese
 * @group component group
 * component description
 */
export default class extends CustomFoComponent {
  // #region variables
  visibleSideBar: boolean = false
  // #endregion
  // #region hooks
  // #endregion

  // #region methods
  showSideBar() {
    this.visibleSideBar = true
  }
  // #endregion
  // #region watches
  // #endregion
}
</script>
<style lang="scss"></style>
