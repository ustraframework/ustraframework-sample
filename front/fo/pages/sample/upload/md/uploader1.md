```html
<template>
  <UVSingleFileUploader ref="uploader" fileGroupId="ustra-sample" v-model:fileId="fileId" />
  <VBtn @click="() => uploadFile()">Upload</VBtn>
  <VBtn @click="() => createFormData()">Form Data</VBtn>
</template>
<script lang="ts" setup>
import UVSingleFileUploader from '#ustra/nuxt-vuetify/management/components/file/u-v-single-file-uploader.vue'

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
```
