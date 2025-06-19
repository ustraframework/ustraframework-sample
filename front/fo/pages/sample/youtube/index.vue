<template>
  <div class="container">
    <v-card
      subtitle="재생 테스트"
      width="100%"
      style="margin-top: 10px;"
    >
      <template v-slot:title>
        <span class="font-weight-black"> <v-icon icon="mdi-youtube"/> YouTube 재생 </span>
      </template>
      <v-card-text class="pt-4">
        <iframe src="https://www.youtube.com/embed/hj3NNlTqIJg?playsinline=0&si=NneaeHLr9TdwKwIO"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

        <UMarkdownViewer class="pt-4" :content="youtube01"></UMarkdownViewer>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { UMarkdownViewer } from '#ustra/nuxt/components'
// @ts-ignore
import youtube01 from './md/youtube01.md'

definePageMeta({
  auth: {
    required: false,
  },
})
</script>
<style scoped lang="scss">
.container {
  height: 100%;
}
</style>
