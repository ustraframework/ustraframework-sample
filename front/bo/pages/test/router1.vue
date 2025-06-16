<template>
  <div>
    <UButton
      text="자기 페이지로 이동"
      @click="
        () => {
          $router.push('/')
          pageKey++
        }
      "
    />
  </div>
</template>
<script lang="ts" setup>
onMounted(() => {
  console.log('mounted....')
})
const pageKey = useState('pageKey', () => 0)
</script>
