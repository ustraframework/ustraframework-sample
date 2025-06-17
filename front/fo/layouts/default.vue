<template>
  <div class="container">
    <LayoutNavbar />
    <slot />
    <LayoutFooter />
  </div>
</template>
<script lang="ts">
import LayoutNavbar from '@/components/layout/layout-navbar.vue'
import LayoutFooter from '@/components/layout/layout-footer.vue'
</script>
<style lang="scss"></style>