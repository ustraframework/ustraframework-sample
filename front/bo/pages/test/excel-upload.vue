<template>
  <ClientOnly>
    <CExcelUploader ref="excelUploader" fileGroupId="ustra-sample" v-model:fileId="fileId" @selected="uploadExcelFile" />
  </ClientOnly>
</template>
<script lang="ts" setup>
import CExcelUploader from '~/components/file/c-excel-uploader.vue'
import { useExposed } from '#imports'

const fileId = ref(null)
const excelUploader = ref<InstanceType<typeof CExcelUploader>>()
// const excelUploader2 = ref<InstanceType<typeof CExcelUploader2>>()

async function uploadExcelFile() {
  useOnError(async () => {
    // console.log(excelUploader.value, excelUploader2.value, useExposed(excelUploader.value), useExposed(excelUploader2.value))
    console.log(excelUploader.value)
    // const result: any[] = (await excelUploader.value.upload()).convertData

    // console.log(result.map(row => row.object))
  })()
}

// const useExposed = <T>(ref: T): T => {
//   if (ref?.['_']?.exposed) {
//     return ref?.['_']?.exposed as T
//   }

//   return ref as T
// }

definePageMeta({
  auth: {
    required: false,
  },
})
</script>
