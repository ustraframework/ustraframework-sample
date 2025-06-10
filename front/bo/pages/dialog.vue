<template>
  <div>
    <v-btn @click="showAlert">alert</v-btn>
    <v-btn @click="showConfirm">confirm</v-btn>
  </div>
</template>
<script lang="ts" setup>
async function showAlert() {
  await alert('first alert')
  await alert('second alert')
}

async function showConfirm() {
  let result = await confirm('first question?')
  await alert(`answer is ${result}`)
  result = await confirm('second question?')
  await alert(`answer is ${result}`)
}

definePageMeta({
  layout: false,
  auth: {
    required: false,
  },
})
</script>
