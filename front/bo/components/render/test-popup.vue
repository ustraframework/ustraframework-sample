<template>
  <UPopup v-model="modelValue" title="테스트 팝업"></UPopup>
</template>
<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean
}>()
const modelValue = useVModel(props, 'modelValue')
</script>
