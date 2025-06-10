<template>
  <VFileInput v-model="inputFiles" />
</template>
<script lang="ts" setup>
import { file } from '#ustra/core/utils'
import toString from 'lodash/toString'

const props = defineProps<{
  /**
   * 파일 그룹 아이디 (필수 값)
   */
  fileGroupId: string

  /**
   * 편집 불가능 여부
   */
  readonly?: boolean

  /**
   * 파일 아이디
   */
  fileId: string | null

  /**
   * resource 저장 필요 여부
   * @default false
   */
  storeResource?: boolean

  /**
   * 오류 발생 시 중지 여부
   * @default false
   */
  stopOnError?: boolean

  /**
   * 모델로 변환 시 Java 클래스 명
   */
  modelClassName?: string

  /**
   * header row의 index
   * @default 0
   */
  headerRowIndex?: number

  /**
   * 엑셀 업로드 후처리 Bean 명
   */
  excelDataPostProcessorBeanName?: string

  /**
   * 엑셀 데이터 후처리기 전송 파라메터
   */
  excelDataPostProcessorParameter?: string

  /**
   * 다중 sheet 리딩 시 index 또는 sheet 명
   */
  sheetNamesOrIndexes?: (string | number)[]

  /**
   * 엑셀 조회 시, 비밀번호
   */
  password?: string
}>()

const emits = defineEmits<{
  /**
   * 파일 선택 시
   */
  (e: 'selected', file: File): void

  /**
   * 파일 삭제 시
   */
  (e: 'removed'): void
}>()

// const store = await useSystemStore()
const {
  addFile,
  selectedFiles,
  uploadedFiles,
  convert,
  createFormData,
  convertFormMetaData,
  upload: originUpload,
} = useUstraFileUploaderComponent(props, {
  findFileGroup: fileGrpId => $ustra.management.store.initData.fileGroups.find(fg => fg.fileGrpId === fileGrpId),
})

const inputFiles = ref()
watch(
  inputFiles,
  v => {
    if (v.length > 0) {
      if (!file.validateFiiesAccepts('.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel', v)) {
        alert('허용된 파일 형식이 아닙니다.')
        inputFiles.value = []
        return
      }

      addFile([v[0]], true)
      uploadedFiles.value = []

      emits('selected', v[0])
    }
  },
  {
    flush: 'pre',
    deep: true,
  },
)

/**
 * 파일 업로드 및 변환 처리
 * @passOnResponseError 오류 발생 시, pass 여부
 */
async function upload(passOnResponseError: boolean = false) {
  if (!props.storeResource) {
    return convert(
      'excel',
      formData => {
        formData.append('stopOnError', props.stopOnError.toString())

        if (props.modelClassName) {
          formData.append('modelClassName', props.modelClassName)
        }

        if (props.excelDataPostProcessorBeanName) {
          formData.append('excelDataPostProcessorBeanName', props.excelDataPostProcessorBeanName)
        }

        if (props.excelDataPostProcessorParameter) {
          formData.append('excelDataPostProcessorParameter', props.excelDataPostProcessorParameter)
        }

        if (props.sheetNamesOrIndexes) {
          formData.append('sheetNamesOrIndexes', JSON.stringify(props.sheetNamesOrIndexes))
        } else {
          formData.append('sheetNamesOrIndexes', '[]')
        }

        if (!$ustra.utils.core.isEmpty(props.headerRowIndex)) {
          formData.append('headerRowIndex', toString(props.headerRowIndex))
        }

        if (!$ustra.utils.core.isEmpty(props.password)) {
          formData.append('password', props.password)
        }
      },
      passOnResponseError,
    )
  } else {
    if (selectedFiles.value.length > 0) {
      await originUpload()
    }

    if (uploadedFiles.value.length > 0) {
      const excelDataPostProcessorParameter = this.excelDataPostProcessorParameter || {}

      if (typeof excelDataPostProcessorParameter === 'object') {
        excelDataPostProcessorParameter.fileId = props.fileId
        excelDataPostProcessorParameter.fileMetaDatas = uploadedFiles.value
      }

      return convertFormMetaData(
        'excel',
        {
          stopOnError: props.stopOnError,
          modelClassName: props.modelClassName,
          sheetNamesOrIndexes: props.sheetNamesOrIndexes,
          headerRowIndex: props.headerRowIndex,
          password: props.password,
          excelDataPostProcessorBeanName: props.excelDataPostProcessorBeanName,
          excelDataPostProcessorParameter: JSON.stringify(excelDataPostProcessorParameter),
        },
        passOnResponseError,
      )
    }
  }

  return originUpload()
}

console.log('process.server', process.server)

defineExpose({ createFormData, upload })
</script>
