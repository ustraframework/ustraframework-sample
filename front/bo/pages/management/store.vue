<template>
  <div>{{ initStore.serverAppProps }}</div>
  <div>{{ navigationStore.navigation }}</div>
</template>
<script lang="ts" setup>
const initStore = $ustra.management.store.initData
const navigationStore = $ustra.management.store.navigation
</script>
