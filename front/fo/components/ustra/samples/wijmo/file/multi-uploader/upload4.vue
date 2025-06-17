<template>
  <VCard>
    <template #text>
      <h3>selectedFiles</h3>
      <br />
      selectedFiles 속성을 통해 업로드 직전 파일 명, 파일 사이즈, 파일 형식, 마지막 수정 일시를 확인 할 수 있다 <br /><br />
      <UMultiFileUploader ref="uploader" fileGroupId="ustra-sample" v-model:fileId="fileId" />
      <UButton class="mt-2" text="selectFiles" @click="() => selectFiles()" />
      <div>
        <v-chip class="ma-2" color="pink" label text-color="white" v-for="(item, index) in selectedFiles" :key="index">
          <v-icon start icon="mdi-label"></v-icon>
          name : {{ item.name }}, size : {{ item.size }}, type : {{ item.type }}, lastModifiedDate : {{ item.lastModifiedDate }}
        </v-chip>
      </div>
      <UMarkdownViewer :content="upload4" />
    </template>
  </VCard>
</template>
<script lang="ts" setup>
import { ref } from '#ustra/nuxt'
import { UMultiFileUploader } from '#ustra/nuxt-wijmo/management/components'
import { UButton, UMarkdownViewer } from '#ustra/nuxt-wijmo/components'

// @ts-ignore
import upload4 from './md/upload4.md'

const fileId = ref(null)

const uploader = ref<InstanceType<typeof UMultiFileUploader>>(null)
const selectedFiles = ref<File[]>(null)
async function selectFiles() {
  selectedFiles.value = await uploader.value.selectedFiles
  $ustra.logger.info('file info', selectedFiles.value)
}

</script>
