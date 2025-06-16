<template>
  <div>
    <UBox direction="col">
      <!-- search bar -->
      <UItem>
        <UFieldSet>
          <UFieldRow :ratio="[2, 2, 2]">
            <UField label="텍스트 템플릿 ID" totalWidth="400">
              <WjInputMask v-model="searchParam.txtTmplId" />
            </UField>
            <UField label="텍스트 템플릿 명" totalWidth="400">
              <WjInputMask v-model="searchParam.txtTmplNm" />
            </UField>
            <UField blank>
              <UButtonBox>
                <UButton text="조회" class="primary ico_search" @click="gridAction.load" />
                <UButton text="신규등록" @click="formAction.newForm"></UButton>
              </UButtonBox>
            </UField>
          </UFieldRow>
        </UFieldSet>
      </UItem>
      <!-- search bar -->
      <UItem>
        <UBox direction="row">
          <UItem :ratio="5">
            <WjFlexGrid style="height: 560px" :itemsSource="gridAction.templates.value" :initialized="gridAction.grid.initialize" :isReadOnly="true">
              <WjFlexGridColumn binding="txtTmplId" header="텍스트 템플릿 ID" width="*" />
              <WjFlexGridColumn binding="txtTmplNm" header="텍스트 템플릿 명" width="*" />
            </WjFlexGrid>
          </UItem>
          <UItem :ratio="5" :disabled="formAction.formDisabled.value">
            <UValidationGroup
              :ref="ctl => {
            validationGroup = ctl as InstanceType<typeof UValidationGroup>
          }"
            >
              <UFieldSet>
                <UFieldRow>
                  <UField label="텍스트 템플릿 ID" required>
                    <WjInputMask
                      v-model="formAction.inputData.txtTmplId"
                      :isDisabled="formAction.mode.value === 'update'"
                      :validation="{ rules: [formAction.validateId] }"
                    />
                  </UField>
                </UFieldRow>
                <UFieldRow>
                  <UField label="텍스트 템플릿 명" required>
                    <WjInputMask v-model="formAction.inputData.txtTmplNm" />
                  </UField>
                </UFieldRow>
                <UFieldRow>
                  <UField label="텍스트 템플릿 엔진" required>
                    <WjComboBox
                      :itemsSource="engnList"
                      v-model="formAction.inputData.txtTmplEngn"
                      displayNullText="선택"
                      selectedValuePath="engineId"
                      displayMemberPath="engineId"
                    />
                  </UField>
                </UFieldRow>
                <UFieldRow>
                  <UField label="텍스트 템플릿 설명">
                    <UTextBox type="textarea" noResize v-model="formAction.inputData.txtTmplDesc" rows="2" />
                  </UField>
                </UFieldRow>
                <UFieldRow>
                  <UField label="텍스트 템플릿 내용" required>
                    <UTextBox type="textarea" noResize v-model="formAction.inputData.txtTmplCont" rows="13" />
                  </UField>
                </UFieldRow>
                <UFieldRow>
                  <UField label="입력 정보" v-if="formAction.mode.value === 'update'">
                    <b
                      >{{ $ustra.utils.formatting.datetime(formAction.inputData.regDttm, 'yyyy-MM-dd hh:mm:ss') }} /
                      {{ formAction.inputData.regUsrId }} /
                      {{ formAction.inputData.regUsrIp }}
                    </b>
                  </UField>
                </UFieldRow>
                <UFieldRow>
                  <UField label="수정 정보" v-if="formAction.mode.value === 'update'">
                    <b
                      >{{ $ustra.utils.formatting.datetime(formAction.inputData.updDttm, 'yyyy-MM-dd hh:mm:ss') }} /
                      {{ formAction.inputData.updUsrId }} /
                      {{ formAction.inputData.updUsrIp }}
                    </b>
                  </UField>
                </UFieldRow>
                <UFieldRow>
                  <UField direction="col">
                    <UButtonBox right>
                      <UButton text="테스트" @click="() => (showPopup = true)" />
                      <UButton text="저장" @click="formAction.saveForm" />
                      <UButton text="삭제" :disabled="formAction.mode.value === 'new'" @click="formAction.deleteForm" />
                    </UButtonBox>
                  </UField>
                </UFieldRow>
              </UFieldSet>
            </UValidationGroup>
          </UItem>
        </UBox>
      </UItem>
    </UBox>
    <txtTmplTestPopup v-model="showPopup" :txtTmpl="formAction.inputData" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, useOnError, useGlobal, shallowRef } from '#ustra/nuxt'
import {
  WjComboBox,
  UBox,
  UItem,
  WjInputMask,
  UFieldSet,
  UFieldRow,
  UField,
  WjFlexGrid,
  WjFlexGridColumn,
  UValidationGroup,
} from '#ustra/nuxt-wijmo/components'
import { useWijmoFlexGrid } from '#ustra/nuxt-wijmo/composables/grid'
import { baseModels } from '#ustra/core/data'
import { TextTemplateCriteria, TextTemplate, useUstraTextTemplateService } from '#ustra/nuxt/management'
import { onMounted } from '#ustra/nuxt'
import txtTmplTestPopup from './template-test-popup.vue'

const validationGroup = shallowRef<InstanceType<typeof UValidationGroup>>()

const txtTmplService = useUstraTextTemplateService()

const showPopup = ref(false)
const engnList = ref([])
onMounted(async () => {
  engnList.value = await txtTmplService.getTextTemplateEngineList()
})

const searchParam: TextTemplateCriteria = reactive({
  txtTmplId: null,
  txtTmplNm: null,
})

const gridAction = (function () {
  const templates = ref<TextTemplate[]>([])
  async function load() {
    templates.value = await txtTmplService.getTxtTmpls(searchParam)
  }
  const grid = useWijmoFlexGrid<TextTemplate>({
    async onCellClick(col, row, data) {
      formAction.updateForm(data)
    },
    pagination: {
      mode: 'infinite',
      handler(currentPage, pageSize, orders) {
        return useOnError(
          async () => {
            const result = await txtTmplService.getTxtTmpls({
              ...searchParam,
            })
            return {
              data: result.body,
              totalRecords: 0,
            }
          },
          { message: '데이터 조회 중 오류가 발생하였습니다.' },
        )()
      },
      pageSize: 20,
    },
  })
  return {
    templates,
    grid,
    load,
  }
})()

const formAction = (function () {
  const mode = ref<baseModels.FormMode>('new')
  const formDisabled = ref(true)
  const parametersShow = ref(false)

  const inputData = reactive({
    txtTmplId: null,
    txtTmplNm: null,
    txtTmplDesc: null,
    txtTmplEngn: null,
    txtTmplCont: null,
  })

  async function init() {
    mode.value = 'new'

    Object.assign(inputData, {
      txtTmplId: null,
      txtTmplNm: null,
      txtTmplDesc: null,
      txtTmplEngn: null,
      txtTmplCont: null,
    })

    validationGroup.value && (await validationGroup.value.init())
  }

  async function updateForm(txtTmpl: TextTemplate) {
    mode.value = 'update'

    const result = await txtTmplService.getTxtTmpl(txtTmpl.txtTmplId)
    Object.assign(inputData, result)
    formDisabled.value = false
  }

  function newForm() {
    formDisabled.value = false
    init()
    gridAction.grid.selection.clear()
  }

  const saveForm = useOnError(
    async () => {
      const validateResult = await validationGroup.value.validate()
      if (!validateResult || !validateResult.isValid) {
        toast('잘못 입력 된 값이 있습니다.')
        return
      }

      const realInputData = $ustra.utils.core.deepMerge({}, inputData)

      let resultData
      if (mode.value === 'new') {
        resultData = await txtTmplService.addTxtTmpl({ header: {}, txtTmpl: realInputData })
      } else {
        resultData = await txtTmplService.updateTxtTmpl({ header: {}, txtTmpl: realInputData })
      }
      if (resultData.resultCode === '0000') {
        await useGlobal().alert('저장되었습니다.')
        saved()
      } else {
        useGlobal().alert(resultData.resultMessage)
      }
    },
    {
      // message: Error.message,
    },
  )

  async function deleteForm() {
    const realInputData = $ustra.utils.core.deepMerge({}, inputData)

    if (await confirm('삭제하시겠습니까?')) {
      const result = await txtTmplService.deleteTxtTmpl(realInputData.txtTmplId)

      if (result.resultCode === '0000') {
        await useGlobal().alert('삭제되었습니다.')
        saved()
      } else {
        useGlobal().alert(result.resultMessage)
      }
    }
  }

  async function saved() {
    formDisabled.value = true
    init()
    gridAction.load()
  }

  const resolveFn = ref(null)
  const rejectFn = ref(null)

  async function validateId(txtTmplId) {
    if (!txtTmplId) return
    if (mode.value === 'update') return
    try {
      const checkId = await txtTmplService.getTxtTmpl(txtTmplId)
      if (checkId) {
        return '이미 사용 중인 아이디입니다.'
      }
    } catch (error) {}
    return true
  }
  return {
    mode,
    inputData,
    init,
    formDisabled,
    saveForm,
    validateId,
    validationGroup,
    newForm,
    updateForm,
    deleteForm,
    saved,
    parametersShow,
    resolveFn,
    rejectFn,
  }
})()
</script>
<script lang="ts">
export default {
  name: 'UstraManagementSystemTextTemplate',
}
</script>
<style scoped></style>
