<template>
  <div>미들웨어 테스트</div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: 'ustra',
  auth: {
    required: false,
  },
  middleware(to, from) {
    return navigateTo('/dialog')
  },
})
</script>
