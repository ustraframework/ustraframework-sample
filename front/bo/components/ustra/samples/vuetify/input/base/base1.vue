<template>
  <v-card>
    <template #title> 메세지 </template>
    <!-- <template #subtitle> type, message 속성 </template> -->
    <template #subtitile>vuetify typography 항목을 확인하여 적용한다. https://vuetifyjs.com/en/styles/text-and-typography</template>
    <template #text>
      <UMessage type="info" message="최대 500MB까지 첨부하실 수 있습니다." />
      <UMessage type="warn" message="반드시 아래항목을 입력을 해주세요." />
      <UMessage type="check" message="확인했습니다." />
      <UMessage type="info">최대 <strong>500MB</strong>까지 첨부하실 수 있습니다.</UMessage>
      <UMessage type="warn"><strong>반드시</strong> 아래항목을 입력을 해주세요.</UMessage>
      <UMessage type="check">확인했습니다.<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;다음내용을 진행하세요.</UMessage>
      <!-- <UMarkdownViewer>{{ base1 }}</UMarkdownViewer> -->
    </template>
  </v-card>
</template>

<script setup lang="ts">
// @ts-ignore
import base1 from './md/base1.md'
</script>

<style scoped></style>
