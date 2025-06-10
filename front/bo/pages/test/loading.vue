<template>
  <div>
    <UButton text="ShowLoadingBar" @click="showLoadingBar" />
  </div>
</template>
<script lang="ts" setup>
function showLoadingBar() {
  $ustra.ui.progress.showLoadingBar()
}

definePageMeta({
  auth: {
    required: false,
  },
})
</script>
