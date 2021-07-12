<template>
  <div class="container">
    <layout-navbar />
    <nuxt />
    <layout-footer />

    <u-b-dialog title="U.STRA Framework" />
    <u-b-loading />
  </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import UBDialog from '@ustra/nuxt-buefy/src/components/u-b-dialog.vue'
import UBLoading from '@ustra/nuxt-buefy/src/components/u-b-loading.vue'
import LayoutNavbar from '@/components/layout/layout-navbar.vue'
import LayoutFooter from '@/components/layout/layout-footer.vue'
import { CustomFoComponent } from '@/components/custom-fo-component'

@Component({
  components: { UBDialog, LayoutNavbar, LayoutFooter, UBLoading },
})
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