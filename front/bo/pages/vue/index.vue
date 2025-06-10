<template>
  <ul>
    <template v-for="item in list" :key="item.key">
      <li v-if="item.key > 1">
        {{ item.text }}
      </li>
    </template>
  </ul>
</template>
<script lang="ts" setup>
const list = reactive([
  { key: 1, text: 'text1' },
  { key: 2, text: 'text2' },
])
</script>
