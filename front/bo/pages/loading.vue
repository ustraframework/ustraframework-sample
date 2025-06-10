<template>
  <div>
    <v-btn @click="showLoadingBar">show loading</v-btn>
  </div>
</template>

<script lang="ts" setup>
async function showLoadingBar() {
  $ustra.ui.progress.showLoadingBar()
  await $ustra.utils.core.sleep(2000)
  $ustra.ui.progress.hideLoadingBar()
}

definePageMeta({
  layout: 'custom',
  auth: {
    required: false,
  },
})
</script>
