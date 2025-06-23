<template>
  <div>
    <v-card
      subtitle="예제의 결과 값은 Console 창에서 확인할 수 있다."
      width="100%"
      style="margin-top: 10px;"
    >
      <template v-slot:title>
        <span class="font-weight-black"> <v-icon icon="mdi-upload-box"/> 파일 업로드 </span>
      </template>
      <v-card-text class="pt-4">
        <UVSingleFileUploader ref="uploader" fileGroupId="ustra-sample" v-model:fileId="fileId" />
        <VBtn variant="outlined" style="background-color: #C3EDC0; margin-right: 10px;" @click="() => uploadFile()">Upload</VBtn>
        <VBtn variant="outlined" style="background-color: #C3EDC0;" @click="() => createFormData()">Form Data</VBtn>
        <UMarkdownViewer class="pt-4" :content="uploader1"></UMarkdownViewer>
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts" setup>

// @ts-ignore
import uploader1 from './md/uploader1.md'
import UVSingleFileUploader from '#ustra/nuxt-vuetify/management/components/file/u-v-single-file-uploader.vue'
definePageMeta({
  auth: {
    required: false,
  },
})

const fileId = ref(null)

const uploader = ref<InstanceType<typeof UVSingleFileUploader>>(null)
async function uploadFile() {
  const result = await uploader.value.upload()

  $ustra.logger.info('file upload result', result)
  alert('업로드가 완료되었습니다. file id : ' + result.fileId)
}

function createFormData() {
  $ustra.logger.info('file upload result', Array.from(uploader.value.createFormData().entries()))
}
</script>
<style scoped lang="scss">
</style>