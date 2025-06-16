<template>
  <div></div>
</template>
<script lang="ts" setup>
import { onUstraNavigationChanged } from '#imports'

onUstraNavigationChanged((program, data) => {
  console.log('data', data)
})
</script>
