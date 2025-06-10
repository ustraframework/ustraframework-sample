<template>
  <div>
    <UButton text="Error 발생" @click="createErrors" />
  </div>
</template>
<script lang="ts" setup>
function createErrors() {
  // throw new Error('커스톰 에러')
  throw createError({
    message: '커스톰에러',
    fatal: true,
  })
}

onMounted(() => {
  // throw new Error('커스톰 에러')
})

// onErrorCaptured((error, instance, info) => {
//   console.log('error', error)
//   return false
// })

definePageMeta({
  auth: {
    required: false,
  },
})
</script>
