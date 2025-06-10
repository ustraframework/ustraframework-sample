<template>
  <div>
    <UButton text="Go Api" @click="$router.push('/error/api')" />
  </div>
</template>
<script lang="ts" setup>
const res = $ustra.api.call('/api/test/permission')
console.log('res', res)
</script>
