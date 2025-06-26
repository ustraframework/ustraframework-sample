<template>
  <UBox>
    <UItem>
      <UFieldSet>
        <UFieldRow>
          <UField label="메시지 유형 ID" :totalWidth="500">
            <WjInputMask v-model="searchActions.criteria.msgTypeId" />
          </UField>

          <UField label="메시지 유형명" :totalWidth="500">
            <WjInputMask v-model="searchActions.criteria.msgTypeNm" />
          </UField>

          <UField label="메시지 프로바이더" :totalWidth="500">
            <WjComboBox :itemsSource="searchProviderItems" v-model="searchActions.criteria.providerNm" selectedValuePath="value" displayMemberPath="text" />
          </UField>

          <UButtonBox right >
            <UButton text="검색" type="primary" :width="80" @click="() => listActions.load()" />
            <UButton text="신규" :width="80" @click="() => formActions.init()" />
          </UButtonBox>
        </UFieldRow>
      </UFieldSet>
    </UItem>
    <UItem :ratio="1">
      <UBox direction="row">
        <UItem :ratio="5" scrollType="hidden">
          <WjFlexGrid :isReadOnly="true" style="height: 100%" :itemsSource="listActions.msgTypes.value" :initialized="listActions.grid.initialize">
            <WjFlexGridColumn header="메시지 유형 ID" binding="msgTypeId" width="*"/>
            <WjFlexGridColumn header="메시지 유형명" binding="msgTypeNm" width="*"/>
            <WjFlexGridColumn header="메시지 프로바이더" binding="providerNm" width="*" />
          </WjFlexGrid>
        </UItem>

        <UItem :ratio="5">
          <UBox direction="col">
            <UItem :ratio="1" scrollType="auto">
              <UValidationGroup
                :ref="ctl => {
                formActions.validationGroup.value = ctl as InstanceType<typeof UValidationGroup>
              }"
              >
                <UFieldSet>
                  <UFieldRow>
                    <UField label="메시지 유형 ID" required>
                      <WjInputMask
                        v-model="formActions.inputData.msgTypeId"
                        :isDisabled="!formActions.isNew.value"
                        :validation="{ rules: [formActions.validateId] }"  
                      /> 
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="메시지 유형명" required>
                      <WjInputMask :isRequired="true" v-model="formActions.inputData.msgTypeNm" />
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="메시지 유형 설명" >
                      <UTextBox type="textarea" placeholder="내용을 입력해주세요." :maxLength="2000" v-model="formActions.inputData.msgTypeDesc"></UTextBox>
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="메시지 프로바이더" required>
                      <WjComboBox 
                          :textChanged="providerComboChange" 
                          :itemsSource="providerItems" 
                          :initialized="providerComboInit"
                          v-model="formActions.inputData.providerNm" 
                          selectedValuePath="value" displayMemberPath="text" />
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <template  v-for="(item, index) in formActions.inputData.props">
                      <UField required v-if="currentProvider?.propertyNames.indexOf(item.propKey) > -1"> 
                        <WjInputMask :isRequired="true" v-model="item.propKey" :isDisabled="true" /> 
                        <WjInputMask :isRequired="true" v-model="item.propVal" />
                      </UField>
                    </template>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="최대 수신자 수" required>
                      <WjInputNumber v-model="formActions.inputData.maxReceiverNum"/>
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="참조 사용" required>
                      <URadioGroupBox v-model="formActions.inputData.ccUseYn" :itemsSource="radioItems" />
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="숨은 참조 사용" required>
                      <URadioGroupBox v-model="formActions.inputData.bccUseYn" :itemsSource="radioItems" />
                    </UField>
                  </UFieldRow>
                  <UFieldRow>
                    <UField label="최대 제목 길이" required>
                      <WjInputNumber v-model="formActions.inputData.maxTitleLen"/>
                    </UField>
                  </UFieldRow>
                  <UFieldRow>
                    <UField label="최대 본문 길이" required>
                      <WjInputNumber v-model="formActions.inputData.maxContentLen"/>
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="첨부파일 사용" required>
                      <URadioGroupBox v-model="formActions.inputData.attachmentUseYn" :itemsSource="radioItems" />
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="파일 그룹 아이디" required>
                      <WjComboBox 
                        :itemsSource="fileGrpComboItems" 
                        v-model="formActions.inputData.fileGrpId" 
                        selectedValuePath="value" displayMemberPath="text" />     
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="첨부파일 최대 용량" required>
                      <WjInputNumber v-model="formActions.inputData.attachmentMaxSz"/>
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="첨부파일 최대 개수" required>
                      <WjInputNumber v-model="formActions.inputData.attachmentMaxNum"/>
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="첨부파일 형식">
                      <WjInputMask :isRequired="false" v-model="formActions.inputData.attachmentFormat" />
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="재발송 최대 횟수" required>
                      <WjInputNumber v-model="formActions.inputData.resendMaxNum"/>
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="입력 정보" v-if="!formActions.isNew.value">
                      <b>
                        {{formActions.inputData.regUsrId}} 
                        / {{formActions.inputData.regUsrIp}} 
                        / {{ $ustra.utils.formatting.datetime(formActions.inputData.regDttm, 'yyyy-MM-dd hh:mm:ss') }}
                      </b>  
                    </UField>
                  </UFieldRow>
                  <UFieldRow>
                    <UField label="수정 정보" v-if="!formActions.isNew.value">
                      <b>
                        {{formActions.inputData.updUsrId}} 
                        / {{formActions.inputData.updUsrIp}} 
                        / {{ $ustra.utils.formatting.datetime(formActions.inputData.updDttm, 'yyyy-MM-dd hh:mm:ss') }}
                      </b>  
                    </UField>
                  </UFieldRow>
                </UFieldSet>
              </UValidationGroup>
            </UItem>
            <UItem>
              <UButtonBox right top>
                <UButton
                  text="저장"
                  type="primary"
                  :width="80"
                  @click="() => formActions.save()"
                  v-if="formActions.isNew.value || (!formActions.isNew.value)"
                />
                <UButton
                  text="삭제"
                  :width="80"
                  v-if="!formActions.isNew.value"
                  @click="() => formActions.remove()"
                />
              </UButtonBox>
            </UItem> 
          </UBox>
        </UItem>
      </UBox>
    </UItem>
  </UBox>
</template>

<script lang="ts" setup>
import { reactive, ref, shallowRef, onBeforeMount, useDeepMerge, useOnError, computed, watch } from '#ustra/nuxt'
import {
  UBox,
  UItem,
  WjInputMask,
  UIpAddressListBox,
  WjMultiSelect,
  UFieldSet,
  UFieldRow,
  UField,
  WjFlexGrid,
  WjFlexGridColumn,
  UDatePeriodBox,
  UCheckGroupBox,
  UTextBox,
  UPhoneNoBox,
  UValidationGroup,
  WjInputNumber,
  URadioGroupBox
} from '#ustra/nuxt-wijmo/components'
import { useWijmoFlexGrid } from '#ustra/nuxt-wijmo/composables'
import { useUstraFileGroupService, useUstraMessageTypeService } from '#ustra/nuxt/management'
import { MessageTypeCriteria, MessageType } from '#ustra/nuxt/management/models/msg-type'

const ustraMessageTypeService = useUstraMessageTypeService()

// 검색 관련 기능
const searchActions = (() => {
  const criteria: MessageTypeCriteria = reactive({
    msgTypeId: null,
    msgTypeNm: null,
    providerNm: null
  })

  return { criteria }
})()

// 메시지 유형 목록 기능
const listActions = (() => {
  /**
   * 조회 메시지 유형 목록
   */
  const msgTypes = ref<MessageType[]>([])

  /**
   * 메시지 유형 검색
   */
  async function load() {
    msgTypes.value = await ustraMessageTypeService.getMsgTypes(searchActions.criteria)
  }

  /**
   * grid control
   */
  const grid = useWijmoFlexGrid<MessageType>({
    isReadOnly: false,
  })

  watch(grid.selectionData, v => {
    v ? formActions.load((v as MessageType).msgTypeId) : formActions.init()
  })

  /**
   * 추가 시 처리
   * @param msgTypeId 메시지 유형 아이디
   */
  async function whenAdded(msgTypeId: string) {
    const msgType = await ustraMessageTypeService.getMsgType(msgTypeId)
    if (msgType) {
      msgTypes.value.unshift(msgType)
      grid.control.value.collectionView.refresh()
      grid.control.value.select(0, 0)
    }
  }

  /**
   * 업데이트 시 처리
   * @param msgTypeId
   */
  async function whenUpdated(msgTypeId: string) {
    const msgType = await ustraMessageTypeService.getMsgType(msgTypeId)
    const selectedRow = grid.control.value.selectedRows[0]
    if (msgType && selectedRow) {
      selectedRow.dataItem = $ustra.utils.core.deepMerge(selectedRow.dataItem, msgType)
      grid.control.value.collectionView.refresh()
      grid.control.value.select(selectedRow.index, 0)
    }
  }

  /**
   * 삭제 시 처리
   */
  async function whenRemoved() {
    const selectedRow = grid.control.value.selectedRows[0]

    if (selectedRow) {
      grid.control.value.collectionView.items.splice(selectedRow.index, 1)
      grid.control.value.collectionView.refresh()
    }
  }

  return { msgTypes, load, selectionData: grid.selectionData, grid, whenAdded, whenUpdated, whenRemoved}
})()

// form 기능
const formActions = (() => {
  /**
   * 입력 데이터
   */
  let inputData: MessageType = reactive({})

  /**
   * 신규 여부
   */
  const isNew = ref(false)

  // validation group control
  const validationGroup = shallowRef<InstanceType<typeof UValidationGroup>>()

  /**
   * 아이디 검증
   * @param value
   */
  async function validateId(msgTypeId) {
    if (!msgTypeId || !isNew.value) {
      return true
    }
    const id = await ustraMessageTypeService.getMsgType(msgTypeId);
    if (id) {
      return '이미 사용 중인 아이디입니다.'
    }
    return true
  }

  /**
   * 폼 초기화
   */
  async function init() {
    isNew.value = true
    useDeepMerge(inputData, {
      msgTypeId: null,
      msgTypeNm: null,
      msgTypeDesc: null,
      providerNm: providerItems[0]?.value,
      maxReceiverNum : 0,
      ccUseYn : 'Y',
      bccUseYn : 'Y',
      maxTitleLen : 0,
      maxContentLen : 0,
      fileGrpId : null,
      attachmentUseYn : 'Y',
      attachmentMaxSz : 0,
      attachmentMaxNum : 0,
      attachmentFormat : null,
      resendMaxNum : 0,
      regUsrId : null,
      regUsrIp : null,
      regDttm : null,
      updUsrId : null,
      updUsrIp : null,
      updDttm : null,
      props : []
    })

    inputData.props =  getProperties(formActions.inputData.providerNm ? formActions.inputData.providerNm : providerItems[0]?.value)
  }

  /**
   * 메시지 유형 정보 조회
   * @param msgTypeId
   */
  async function load(msgTypeId: string) {
    // await init()

    const msgType = await ustraMessageTypeService.getMsgType(msgTypeId)
    isNew.value = false
    useDeepMerge(inputData, msgType)
  }

  /**
   * 저장
   */
  function save() {
    return useOnError(
      async () => {
        const validationResult = await validationGroup.value.validate()
        if (!validationResult.isValid) {
          return
        }

        const saveData = useDeepMerge({}, inputData)
        saveData.props.forEach(obj => {
          obj.msgTypeId = saveData.msgTypeId;
        });
        if (isNew.value) {
          await ustraMessageTypeService.addMsgType(saveData)
          listActions.whenAdded(inputData.msgTypeId)
          init()
        } else {
          await ustraMessageTypeService.updateMsgType(saveData)
          listActions.whenUpdated(inputData.msgTypeId)
        }
      },
      {
        message: '저장 중 오류가 발생하였습니다.',
      },
    )()
  }

  async function remove() {
    if (await confirm('삭제하시겠습니까?')) {
      await ustraMessageTypeService.removeMsgType(inputData.msgTypeId)
      listActions.whenRemoved()
      await init()
    }
  }

  onBeforeMount(() => init())

  return { inputData, init, validationGroup, save, isNew, load, remove, validateId }
})()

// 라디오 버튼
const radioItems = reactive([
  { value: 'Y', text: '사용' },
  { value: 'N', text: '미사용' },
])

// 폼 프로바이더 아이템
const providers = await ustraMessageTypeService.getProviderList();
let providerItems = []
providers.forEach((item)=>{
  providerItems.push({value : item.messageProviderId, text : item.messageProviderId});
})

const currentProvider = computed(() => {
    return providers.find(each => each.messageProviderId === formActions.inputData.providerNm)
})

// 폼 프로바이더 이벤트
function providerComboChange (e) {  
  formActions.inputData.props = getProperties(e.text)
}

// 폼 프로바이더 초기화
function providerComboInit (e) {
  formActions.inputData.providerNm = e.text
}

// 폼 속성 초기화
function getProperties (providerId){
  const props = formActions.inputData.props
  providers.filter(each => each.messageProviderId === providerId)
    .forEach((item)=>{
      for(let i = 0; i<item.propertyNames.length; i++){
        if(props.filter(eachProp => eachProp.propKey === item.propertyNames[i]).length > 0) {
          continue
        }
        props.push({propKey : item.propertyNames[i], propVal : null})
      }
  })
  return props;
}

// 검색 프로바이더 아이템
const searchProviderItems = [{value : null, text : '전체'}, ...providerItems]

// 파일 그룹 아이템
const fileGroupService = useUstraFileGroupService()
const fileGrps = await fileGroupService.getFileGroups();
const fileGrpComboItems = fileGrps.map(i=> {return {value : i.fileGrpId, text: i.fileGrpId}});
fileGrpComboItems.unshift({value : null, text: '선택'})

</script>
<script lang="ts">
export default {
  name: 'UstraManagementSystemMsgType',
}
</script>
<style>
.company-col:not(.wj-state-selected):not(.wj-state-multi-selected) {
  background-color: #fafafa !important;
  font-weight: bold;
}
</style>