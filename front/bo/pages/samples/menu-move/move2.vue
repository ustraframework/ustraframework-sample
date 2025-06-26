<template>
  <div>
    <UButton text="Menu 이동" @click="() => openMenuByPath('/samples/menu-move/move1', { test: 1 })" />
  </div>
</template>
<script lang="ts" setup>
import { useUstraManagementLayoutUtils } from '#imports'

const { openMenuByPath } = useUstraManagementLayoutUtils()
</script>
