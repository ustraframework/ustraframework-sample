<template>
  <div>
    <index-hero />
  </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import { CustomFoComponent } from '@/components/custom-fo-component'
import IndexHero from '@/components/index/index-hero.vue'

@Component({
  components: { IndexHero },
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
