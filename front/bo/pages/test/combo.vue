<template>
  <div>
    <ManagementCodeComboBox grpCd="SYS_CD" v-model="comboValue" />
    <div>{{ comboValue }}</div>
  </div>
</template>
<script lang="ts" setup>
import { ManagementCodeComboBox } from '#components'

const comboValue = ref(null)

definePageMeta({
  auth: {
    required: false,
  },
  layout: false,
})
</script>
