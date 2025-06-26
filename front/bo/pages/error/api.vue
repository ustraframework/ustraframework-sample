<template>
  <div>
    <UButton text="NotFound" @click="callNotFoundApi" />
    <UButton text="Go Permission" @click="$router.push('/error/permission')" />
  </div>
</template>
<script lang="ts" setup>
function callNotFoundApi() {
  const res = $ustra.api.call('/api/test/not-found')
  console.log('res', res)
}
</script>
