<template>
  <div>
    <UButton @click="showDialog" text="ShowDialog" />
  </div>
</template>
<script lang="ts" setup>
async function showDialog() {
  await alert('1')
  await alert('2')
  await alert('3')
}
</script>
