<template>
  <div>
    <!-- <UCodeComboBox grpCd="SYS_CD" v-model="comboValue" /> -->
    <div>{{ comboValue }}</div>
  </div>
</template>
<script lang="ts" setup>
// import UCodeComboBox from '#ustra/nuxt-wijmo/components/u-code-combo-box.vue'

const comboValue = ref(null)
</script>
