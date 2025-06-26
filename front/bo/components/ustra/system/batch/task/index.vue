<template>
  <UBox direction="col">
    <UItem>
      <UFieldSet>
        <UFieldRow :ratio="[1, 1, 2]">
          <UField label="배치 아이디">
            <UTextBox type="text" v-model="searchAction.searchParam.batId" />
          </UField>
          <UField label="배치 명">
            <UTextBox type="text" v-model="searchAction.searchParam.batNm" />
          </UField>
          <UField blank>
            <UButtonBox>
              <UButton class="gray ico_reset" @click="searchAction.clearSearchParam"><span class="blind">초기화</span></UButton>
              <UButton text="조회" class="primary ico_search" @click="searchAction.loadSearchedData" />
              <GpcFunctionAuth functionId="basicNew" notPermitType="disable">
                <UButton text="신규" @click="formAction.newForm" />
              </GpcFunctionAuth>
            </UButtonBox>
          </UField>
        </UFieldRow>
      </UFieldSet>
    </UItem>
    <UItem>
      <UBox direction="row" style="gap: 5px">
        <UItem :ratio="5">
          <WjFlexGrid style="height: 560px" :initialized="gridAction.grid.initialize">
            <WjFlexGridColumn binding="batId" header="배치 아이디" width="*" />
            <WjFlexGridColumn binding="batNm" header="배치 명" width="*" />
            <WjFlexGridColumn binding="schdlDvCd" header="스케줄 구분" width="*" :cellTemplate="(ctx) => useUstraCodeValue('TASK_SCHDL_TYPE_CD', ctx.value)" />
            <WjFlexGridColumn binding="schdlVal" header="스케줄" width="*" />
            <WjFlexGridColumn binding="useYn" header="사용 여부" width="*" />
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
                <UField label="배치 아이디" required>
                  <WjInputMask
                    v-model="formAction.inputData.batId"
                    :isDisabled="formAction.mode.value === 'update'"
                    :validation="{ rules: [formAction.validateId] }"
                  />
                </UField>
              </UFieldRow>
              <UFieldRow>
                <UField label="배치 명"><WjInputMask :isRequired="false" v-model="formAction.inputData.batNm" /> </UField>
              </UFieldRow>
              <UFieldRow>
                <UField label="배치 설명"><UTextBox :isRequired="false" type="textarea" noResize v-model="formAction.inputData.batDesc" /> </UField>
              </UFieldRow>
              <UFieldRow>
                <UField label="사용 여부" required
                  ><URadioGroupBox v-model="formAction.inputData.useYn" :itemsSource="searchAction.useYnItems" />
                </UField>
              </UFieldRow>
              <UFieldRow>

                <UField label="스케줄 구분" :required="formAction.inputData.useYn ==='Y' ? true : false">
                  <UCodeComboBox grpCd="TASK_SCHDL_TYPE_CD" :isRequired="formAction.inputData.useYn==='Y'?true:false" v-model="formAction.inputData.schdlDvCd" displayNullText="선택" />
                </UField>
              </UFieldRow>
              <UFieldRow>
                <UField label="스케줄 값" :required="formAction.inputData.useYn==='Y'?true:false">
                  <WjInputMask v-model="formAction.inputData.schdlVal" :isRequired="formAction.inputData.useYn==='Y'?true:false"/>
                </UField>
              </UFieldRow>
              <UFieldRow>
                <UField label="파라미터 설정">
                  <UButtonBar class="mt-2">
                    <UButtonBox right>
                      <UButton icon="mdi-folder-plus" @click="() => formAction.createParameter()"></UButton>
                      <UButton icon="mdi-refresh-circle"></UButton>
                    </UButtonBox>
                  </UButtonBar>
                  <UFieldRow v-for="each in formAction.inputData.parameterList" :ratio="[1, 1]">
                    <UField label="파라미터">
                      <WjInputMask v-model="each.batchParamId" :isRequired="true" />
                    </UField>
                    <UField label="파라미터명">
                      <WjInputMask v-model="each.batchParamNm" :isRequired="true" />
                    </UField>
                    <UField label="파라미터 설명">
                      <WjInputMask v-model="each.batchParamDesc" :isRequired="true" />
                    </UField>
                    <UField label="사용 여부">
                      <URadioGroupBox v-model="each.useYn" :itemsSource="searchAction.useYnItems" />
                    </UField>
                    <UField label="필수 여부">
                      <URadioGroupBox v-model="each.requireYn" :itemsSource="searchAction.useYnItems" />
                    </UField>
                    <UButtonBox right>
                      <UButton icon="mdi-delete" @click="() => formAction.deleteParameter(each)"></UButton>
                    </UButtonBox>
                  </UFieldRow>
                </UField>
              </UFieldRow>
              <UFieldRow>
                <UField label="입력 정보" v-if="formAction.mode.value === 'update'">
                  <b
                    >{{ $ustra.utils.formatting.datetime(formAction.inputData.regDttm, 'yyyy-MM-dd hh:mm:ss') }} /
                    {{ formAction.inputData.regUsrId }} / {{ formAction.inputData.regUsrIp }}
                  </b>
                </UField>
              </UFieldRow>
              <UFieldRow>
                <UField label="수정 정보" v-if="formAction.mode.value === 'update'">
                  <b
                    >{{ $ustra.utils.formatting.datetime(formAction.inputData.updDttm, 'yyyy-MM-dd hh:mm:ss') }} /
                    {{ formAction.inputData.updUsrId }} / {{ formAction.inputData.updUsrIp }}
                  </b>
                </UField>
              </UFieldRow>
              <UFieldRow :ratio="[1, 1]">
                <UField direction="col">
                  <UButtonBox :left="true">
                    <UButton
                      text="시작"
                      icon="mdi-play-circle"
                      mdiIconColor="gray"
                      :width="80"
                      :disabled="formAction.mode.value === 'new'"
                      @click="formAction.batchStart"
                    />
                  </UButtonBox>
                </UField>
                <UField direction="col">
                  <UButtonBox :right="true">
                    <GpcFunctionAuth functionId="basicSave" notPermitType="disable">
                      <UButton text="저장" @click="formAction.saveForm" />
                    </GpcFunctionAuth>
                    <GpcFunctionAuth functionId="basicRemove" notPermitType="disable">
                      <UButton text="삭제" :disabled="formAction.mode.value === 'new'" @click="formAction.deleteForm" />
                    </GpcFunctionAuth>
                  </UButtonBox>
                </UField>
              </UFieldRow>
            </UFieldSet>
          </UValidationGroup>
        </UItem>
      </UBox>
    </UItem>
    <ParameterPopup ref="parameterPopup" />
    <UItem :ratio="0" height="100%">
      <template #default>
        <UPopup v-model="formAction.histShow.value" title="배치 이력 조회">
          <UBox direction="col" height="100%">
            <UItem :ratio="1">
              <template #default>
                <BatchHist ref="batchHistComp" />
              </template>
            </UItem>
          </UBox>
        </UPopup>
      </template>
    </UItem>
    <ParameterPopup />
  </UBox>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, onMounted, useOnError, provide, inject, shallowRef, computed, nextTick } from '#ustra/nuxt'
import {
  UBox,
  UItem,
  UFieldSet,
  UFieldRow,
  UField,
  WjFlexGrid,
  WjFlexGridColumn,
  WjComboBox,
  WjInputMask,
  WjInputNumber,
  UCheckGroupBox,
  UValidationGroup,
  WjMultiSelect,
} from '#ustra/nuxt-wijmo/components'
import { useWijmoFlexGrid } from '#ustra/nuxt-wijmo/composables/grid'
import { baseModels } from '#ustra/core/data'
import { BatchCriteria, Batch, useUstraBatchService, useUstraBatchWorkerService } from '#ustra/nuxt/management'
import BatchHist from '../hist/index.vue'
import ParameterPopup from './parameter-popup.vue'
const service = useUstraBatchService()
const workerService = useUstraBatchWorkerService()
const validationGroup = shallowRef<InstanceType<typeof UValidationGroup>>()
const batchHistComp = ref<InstanceType<typeof BatchHist>>()
const parameterPopup = ref(null)

onMounted(async () => {
  formAction.saved()

  const result = (await workerService.getWorkerList({})).body
  searchAction.workerItems.value = result.map(item => {
    return item.workerId
  })
})

interface BatchParam {
  batchParamId: string,
  batchParamNm: string,
  batchParamDesc: string,
  useYn: string,
  requireYn: string,
}

const searchAction = (function () {
  const searchParam: BatchCriteria = reactive({
    batId: null,
    batNm: null,
  })

  function clearSearchParam() {
    searchParam.batId = null
    searchParam.batNm = null
  }

  async function loadSearchedData() {
    formAction.saved()
  }

  const useYnItems = reactive([
    { value: 'Y', text: '사용' },
    { value: 'N', text: '미사용' },
  ])

  const avlYnItems = reactive([
    { value: 'Y', text: '가능' },
    { value: 'N', text: '불가능' },
  ])

  const workerItems = ref<string[]>([])

  return {
    searchParam,
    clearSearchParam,
    loadSearchedData,
    useYnItems,
    avlYnItems,
    workerItems,
  }
})()

const gridAction = (function () {
  const grid = useWijmoFlexGrid({
    async onCellClick(col, row, data) {
      formAction.updateForm(data)
    },
    pagination: {
    mode: 'infinite',
    handler(currentPage, pageSize, orders) {
      return useOnError(
        async () => {
          const result = await service.getBatchList({
            ...searchAction.searchParam,
            pageSize,
            pageNo: currentPage,
          });
          return {
            data: result.body,
            totalRecords: result.header.totalRecords,
          };
        },
        { message: "데이터 조회 중 오류가 발생하였습니다." }
      )();
    },
    pageSize: 20,
  },
  })
  return {
    grid,
  }
})()

const formAction = (function () {
  const mode = ref<baseModels.FormMode>('new')
  const formDisabled = ref(true)
  const parametersShow = ref(false)

  const inputData = reactive({
    batId: null,
    batNm: null,
    batDesc: null,
    useYn: 'Y',
    schdlDvCd: null,
    schdlVal: null,
    dupExecAvlYn: 'N',
    dlyS: 0,
    batInstCd: [],
    immediateStartYn: 'N',
    parameterList: [],
  })

  async function init() {
    mode.value = 'new'

    Object.assign(inputData, {
      batId: null,
      batNm: null,
      batDesc: null,
      useYn: 'Y',
      schdlDvCd: null,
      schdlVal: null,
      dupExecAvlYn: 'N',
      dlyS: 0,
      batInstCd: [],
      immediateStartYn: 'N',
      parameterList: [],
    })

    validationGroup.value && (await validationGroup.value.init())
  }

  function createParameter() {
    inputData.parameterList.push({
      useYn: 'Y',
      requireYn: 'Y',
    })
  }

  function deleteParameter(parameter: BatchParam) {
    const index = inputData.parameterList.indexOf(parameter)
    inputData.parameterList.splice(index, 1)
  }

  async function updateForm(batch: Batch) {
    mode.value = 'update'

    const result = (
      await service.getBatch({
        header: {},
        batId: batch.batId,
      })
    ).body
    Object.assign(inputData, result)
    inputData.parameterList = inputData.parameterList || []
    formDisabled.value = false

    const valueMap = result.insts.map(function (item) {
      return item.batInstCd
    })
    inputData.batInstCd = valueMap
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

      let resultData;
      if (mode.value === 'new') {
        resultData = await service.addBatch({ header: {}, batch: realInputData })
      } else {
        resultData = await service.modBatch({ header: {}, batch: realInputData })
      }
      if(resultData.resultCode === "0000"){
        await useGlobal().alert('저장되었습니다.')
        saved()
      }else{
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
      const result = await service.delBatch({ header: {}, batId: realInputData.batId })

      if(result.resultCode === "0000"){
        await useGlobal().alert('삭제되었습니다.')
        saved()
      }else{
        useGlobal().alert(result.resultMessage)
      }
    }
  }

  async function saved() {
    formDisabled.value = true
    init()
    gridAction.grid.pagination.loadPageData(1)
  }

  const resolveFn = ref(null)
  const rejectFn = ref(null)

  function getParameters() {
    return new Promise((resolve, reject) => {
      resolveFn.value = resolve
      rejectFn.value = reject
      parametersShow.value = true
      alert('파라미터 입력!')
      setTimeout(resolve, 5000)
    })
  }

  const histShow = ref(false)
  async function batchStart() {
    const batchHistParameterList = []
    if (inputData.parameterList.length > 0) {
      const parameterList = await parameterPopup.value.open(inputData.parameterList)
      if (parameterList.filter(each => each.batchParamValue === '').filter(each => each.requireYn).length > 0) {
        alert('필수 파라미터를 입력해주세요')
        return
      }

      parameterList.forEach(each => {
        batchHistParameterList.push(each)
      })
    }

    histShow.value = true
    await nextTick()
    const realInputData = $ustra.utils.core.deepMerge({}, formAction.inputData)
    realInputData.parameterList = batchHistParameterList
    batchHistComp.value.searchAction.loadSearchedData(realInputData.batId)
    const message = await service.startBatch({ header: {}, batId: realInputData.batId, parameterList: realInputData.parameterList})
  }

  async function validateId(batId) {
    if (!batId) return
    if (mode.value === 'update') return
    try {
      const checkId = await service.getBatch({
        header: {},
        batId,
      }, null, false)
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
    batchStart,
    histShow,
    createParameter,
    deleteParameter,
    parametersShow,
    resolveFn,
    rejectFn,
  }
})()
</script>
<script lang="ts">
export default {
  name: 'UstraManagementSystemBatchTask',
}
</script>
<style scoped></style>
