```html
<template>
    <UMultiFileUploader ref="uploader" fileGroupId="ustra-sample" v-model:fileId="fileId" />
    <UButton class="mt-2" text="selectFiles" @click="() => selectFiles()" />
    <div>
      <v-chip class="ma-2" color="pink" label text-color="white" v-for="(item, index) in selectedFiles" :key="index">
        <v-icon start icon="mdi-label"></v-icon>
        name : {{ item.name }}, size : {{ item.size }}, type : {{ item.type }}, lastModifiedDate : {{ item.lastModifiedDate }}
      </v-chip>
    </div>
</template>
<script lang="ts" setup>
const fileId = ref(null)

const uploader = ref<InstanceType<typeof UMultiFileUploader>>(null)
const selectedFiles = ref<File[]>(null)
async function selectFiles() {
  selectedFiles.value = await uploader.value.selectedFiles
  $ustra.logger.info('file info', selectedFiles.value)
}
</script>
```
