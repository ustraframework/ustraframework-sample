<template>
  <LayoutNavbar />
  <slot />
  <LayoutFooter />
</template>
<script lang="ts">
import LayoutNavbar from '@/components/layout/layout-navbar.vue'
import LayoutFooter from '@/components/layout/layout-footer.vue'

export default {
  name: 'LayoutDefault',
}
</script>
<style lang="scss"></style>