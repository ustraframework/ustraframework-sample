<template>
  <div>
    <VBtn @click="moveAnotherPage">Go</VBtn>
  </div>
</template>
<script lang="ts" setup>
console.log('move.....')

const router = useRouter()
async function moveAnotherPage() {
  router.push({ path: '/loading', force: true })
  $ustra.utils.core.sleep(1000)
  router.push({ path: '/loading', force: true })
}

definePageMeta({
  layout: false,
  auth: {
    required: true,
  },
})
</script>
