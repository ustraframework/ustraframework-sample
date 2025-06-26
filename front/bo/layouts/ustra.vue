<template>
  <UstraMain>
    <template #default>
      <slot />
    </template>
  </UstraMain>
</template>
<script lang="ts" setup>
import UstraMain from '#ustra/nuxt-wijmo/management/layouts/ustra-main.vue'

// onMounted(() => {
//   history.pushState(null, null, location.href)
//   window.onpopstate = function () {
//     history.go(1)
//   }
// })

onBeforeRouteLeave(() => {
  return false
})
</script>
