<template>
  <indexHero class="container"/>
</template>
<script lang="ts" setup>
import indexHero from '../components/index-hero.vue'
definePageMeta({
  auth: {
    required: false,
  },
})
</script>
<style scoped lang="scss">
.container {
  height: 100%;
}
</style>
