<template>
  <UBox>
    <UItem>
      <UFieldSet>
        <UFieldRow>
          <UField label="메시지 ID" :totalWidth="500">
            <WjInputMask v-model="searchActions.criteria.msgId" />
          </UField>

          <UField label="메시지 유형 ID" :totalWidth="500">
            <WjComboBox 
                        :itemsSource="msgTypeComboItems" 
                        v-model="searchActions.criteria.msgTypeId" 
                        selectedValuePath="value" displayMemberPath="text" />     
          </UField>

          <UField label="상태" :totalWidth="500">
            <UCodeComboBox grpCd="MSG_STT_CD" v-model="searchActions.criteria.msgSttCd" displayNullText="전체" />
          </UField>

        </UFieldRow>
        <UFieldRow>
          <UField label="메시지 제목" :totalWidth="500">
            <WjInputMask v-model="searchActions.criteria.title" />
          </UField>

          <UField label="발신자" :totalWidth="500">
            <WjInputMask v-model="searchActions.criteria.source" />
          </UField>

          <UField label="수신자" :totalWidth="500">
            <WjInputMask v-model="searchActions.criteria.target" />
          </UField>
        </UFieldRow>
        <UFieldRow>
          <UField label="발송요청일시" :totalWidth="650">
            <UDatePeriodBox v-model:start="searchActions.criteria.startSendRqDt" mode="datetime" v-model:end="searchActions.criteria.endSendRqDt"/>
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
          <WjFlexGrid :isReadOnly="true" style="height: 100%" :itemsSource="listActions.msgs.value" :initialized="listActions.grid.initialize">
            <WjFlexGridColumn header="메시지 ID" binding="msgId" width="*"/>
            <WjFlexGridColumn header="메시지 유형 ID" binding="msgTypeId" width="*"/>
            <WjFlexGridColumn
              header="상태"
              binding="msgSttCd"
              :cellTemplate="ctx => useUstraCodeValue('MSG_STT_CD', ctx.value)"
              :width="80"
            />
            <WjFlexGridColumn header="메시지 제목" binding="title" width="*" />
            <WjFlexGridColumn header="발신자" binding="source" width="*" />
            <WjFlexGridColumn header="수신자" binding="target" width="*" />
            <WjFlexGridColumn header="발송요청일시" binding="sendRqDttm" width="*" :cellTemplate="ctx => $ustra.utils.formatting.datetime(ctx.value)"/>
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
                    <UField label="메시지 ID" v-if="!formActions.isNew.value">
                      {{formActions.inputData.msgId}}
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="상태" v-if="!formActions.isNew.value">
                      {{msgSttCdInfo?.cdNm}}
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="발송 요청" required v-if="formActions.isNew.value">
                      <URadioGroupBox v-model="sendRqFlag" :itemsSource="sendRqRadioItems" />
                      <UDateBox 
                        v-if="sendRqFlag == 2"
                        v-model="sendRqDt" 
                        mode="datetime" 
                        :isRequired="sendRqFlag == 2" 
                        :validation="{ rules: [formActions.validateSendRqDt] }" />
                      <UMessage v-if="sendRqFlag == 2" type="info" message="예약일시 기본값은 한시간 후입니다." />
                    </UField>
                    <UField label="발송 요청 일시" v-if="!formActions.isNew.value">
                       {{ $ustra.utils.formatting.datetime(formActions.inputData.sendRqDttm) }}
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="재발송 요청 횟수" v-if="!formActions.isNew.value">
                      {{formActions.inputData.resendRqNum}}
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="발송 완료 일시" v-if="!formActions.isNew.value">
                      {{ $ustra.utils.formatting.datetime(formActions.inputData.sendCpDttm) }}
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="취소 요청 일시" v-if="!formActions.isNew.value">
                      {{ $ustra.utils.formatting.datetime(formActions.inputData.cancelRqDttm) }}
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="취소 완료 일시" v-if="!formActions.isNew.value">
                      {{ $ustra.utils.formatting.datetime(formActions.inputData.cancelCpDttm) }}
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="메시지 유형 ID" required>
                      <WjComboBox 
                        :isReadOnly="!formActions.isNew.value"
                        :itemsSource="msgTypeComboItems" 
                        v-model="formActions.inputData.msgTypeId" 
                        selectedValuePath="value" displayMemberPath="text" />     
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="메시지 제목" >
                      <WjInputMask 
                        v-model="formActions.inputData.title" 
                        :isReadOnly="!formActions.isNew.value"
                        :isRequired="false"
                        :validation="{ rules: [formActions.validateMaxTitleLen] }"  />
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="메시지 내용" required>
                      <UTextBox 
                        type="textarea" 
                        :isRequired="true" 
                        v-model="formActions.inputData.content" 
                        :readonly="!formActions.isNew.value"
                        :validation="{ rules: [formActions.validateMaxContentLen] }"
                        />
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="발신자" required>
                      <WjInputMask 
                        v-model="formActions.inputData.source"
                        :isRequired="true"  
                        :isReadOnly="!formActions.isNew.value"/>
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="수신자" required>
                      <WjInputMask 
                        v-model="formActions.inputData.target" 
                        :isRequired="true" 
                        :isReadOnly="!formActions.isNew.value"
                        :validation="{ rules: [formActions.validateMaxReceiverNum] }"/>
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="참조인" v-if="ccUseYn">
                      <WjInputMask :isRequired="false" v-model="formActions.inputData.cc" :isReadOnly="!formActions.isNew.value"/>
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="숨은 참조인" v-if="bccUseYn">
                      <WjInputMask :isRequired="false" v-model="formActions.inputData.bcc" :isReadOnly="!formActions.isNew.value"/>
                    </UField>
                  </UFieldRow>

                  <UFieldRow v-show="attachmentUseYn">
                    <UField label="첨부 파일">
                     <UMultiFileUploader 
                        ref="uploader" 
                        :fileGroupId="fileGroupId"
                        v-model:fileId="formActions.inputData.fileId"
                        :readonly="!formActions.isNew.value" 
                        :validation="{ rules: [formActions.validateAttMaxNum, formActions.validateAttFormat, formActions.validateAttMaxSz] }"
                     />
                    </UField>
                  </UFieldRow>

                  <UFieldRow>
                    <UField label="입력 정보" v-if="!formActions.isNew.value">
                        {{formActions.inputData.regUsrId}} 
                        / {{formActions.inputData.regUsrIp}} 
                        / {{ $ustra.utils.formatting.datetime(formActions.inputData.regDttm) }}
                    </UField>
                  </UFieldRow>
                  <UFieldRow>
                    <UField label="수정 정보" v-if="!formActions.isNew.value">
                        {{formActions.inputData.updUsrId}} 
                        / {{formActions.inputData.updUsrIp}} 
                        / {{ $ustra.utils.formatting.datetime(formActions.inputData.updDttm, 'yyyy-MM-dd hh:mm:ss') }}
                    </UField>
                  </UFieldRow>
                </UFieldSet>
              </UValidationGroup>
            </UItem>
            <UItem>
              <UButtonBox right top>
                <UButton
                  text="취소 요청"
                  type="primary"
                  :width="80"
                  @click="() => formActions.cancel()"
                  v-if="formActions.inputData.msgSttCd == '10'"
                />
                <UButton
                  text="재발송 요청"
                  type="primary"
                  :width="100"
                  @click="() => formActions.resend()"
                  v-if="formActions.inputData.msgSttCd == '30' || formActions.inputData.msgSttCd == '40' || formActions.inputData.msgSttCd == '70'"
                />
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
import { reactive, ref, shallowRef, onBeforeMount, useDeepMerge, useOnError, computed, watch, onMounted } from '#ustra/nuxt'
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
import { useUstraCodeValue, useUstraMessageService } from '#ustra/nuxt/management'
import { UCodeComboBox } from '#ustra/nuxt-wijmo/management/components'
import { MessageCriteria, Message, MessageRqVo } from '#ustra/nuxt/management/models/msg'
import { useUstraMessageTypeService, useUstraCodeList } from '#ustra/nuxt/management'
import UMultiFileUploader from '#ustra/nuxt-wijmo/management/components/file/u-multi-file-uploader.vue'

const ustraMessageService = useUstraMessageService()
const ustraMessageTypeService = useUstraMessageTypeService()

// 검색 관련 기능
const searchActions = (() => {
  const criteria: MessageCriteria = reactive({
    msgId: null,
    msgTypeId: null,
    msgSttCd: null,
    title: null,
    source: null,
    target: null,
    startSendRqDt: null,
    endSendRqDt: null
  })

  return { criteria }
})()

// 메시지 목록 기능
const listActions = (() => {
  /**
   * 조회 메시지 목록
   */
  const msgs = ref<Message[]>([])

  /**
   * 메시지 검색
   */
  async function load() {
    msgs.value = await ustraMessageService.getMsgs(searchActions.criteria)
  }

  /**
   * grid control
   */
  const grid = useWijmoFlexGrid<Message>({
    isReadOnly: false,
  })

  watch(grid.selectionData, v => {
    v ? formActions.load((v as Message).msgId) : formActions.init()
  })

  /**
   * 추가 시 처리
   * @param msgId 메시지 아이디
   */
  async function whenAdded() {
    const newMsgs = await ustraMessageService.getMsgs({
      msgId: null,
      msgTypeId: null,
      msgSttCd: null,
      title: null,
      source: null,
      target: null,
      startSendRqDt: null,
      endSendRqDt: null
    })
    const newMsgIds = newMsgs.map(i=> i.msgId)
    
    if (newMsgIds.length > 0) {
      newMsgIds.sort(function(a, b)  {
        return b - a;
      });
      const newMsgId = newMsgIds[0];
      const newMsg = newMsgs.filter(i => i.msgId == newMsgId);
      msgs.value.unshift(newMsg[0])
      grid.control.value.collectionView.refresh()
      grid.control.value.select(0, 0)
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

  /**
   * 업데이트 시 처리
   * @param msgId
   */
   async function whenUpdated(msgId: number) {
    const msg = await ustraMessageService.getMsg(msgId)
    const selectedRow = grid.control.value.selectedRows[0]
    if (msg && selectedRow) {
      selectedRow.dataItem = $ustra.utils.core.deepMerge(selectedRow.dataItem, msg)
      grid.control.value.collectionView.refresh()
      grid.control.value.select(selectedRow.index, 0)
    }
  }

  return { msgs, load, selectionData: grid.selectionData, grid, whenAdded, whenRemoved, whenUpdated}
})()

// form 기능
const formActions = (() => {
  /**
   * 입력 데이터
   */
  let inputData: Message = reactive({})

  /**
   * 신규 여부
   */
  const isNew = ref(false)

  // validation group control
  const validationGroup = shallowRef<InstanceType<typeof UValidationGroup>>()

  async function validateMaxTitleLen() {
    if (!formActions.inputData.msgTypeId) {
      return true
    }
    const msgType = msgTypes.find(i=> i.msgTypeId == formActions.inputData.msgTypeId);
  
    if(!formActions.inputData.title || msgType.maxTitleLen == 0) return true;
    if(formActions.inputData.title.length > msgType.maxTitleLen) {
      return `제목은 ${msgType.maxTitleLen}자 이하로 입력하세요.`
    }
    return true
  }

  async function validateMaxContentLen() {
    if (!formActions.inputData.msgTypeId) {
      return true
    }
    const msgType = msgTypes.find(i=> i.msgTypeId == formActions.inputData.msgTypeId);
  
    if(!formActions.inputData.content || msgType.maxContentLen == 0) return true;
    if(formActions.inputData.content.length > msgType.maxContentLen) {
      return `본문은 ${msgType.maxContentLen}자 이하로 입력하세요.`
    }
    return true
  }

  async function validateMaxReceiverNum() {
    if (!formActions.inputData.msgTypeId) {
      return true
    }
    const msgType = msgTypes.find(i=> i.msgTypeId == formActions.inputData.msgTypeId);
  
    if(!formActions.inputData.target || msgType.maxReceiverNum == 0) return true;
    const targets = formActions.inputData.target.split(',');
    if(targets.length > msgType.maxReceiverNum) {
      return `수진자는 ${msgType.maxReceiverNum}명 이하여야합니다.`
    }
    return true
  }

  async function validateAttMaxNum() {
    const msgType = msgTypes.find(i=> i.msgTypeId == formActions.inputData.msgTypeId)
    if(msgType.attachmentMaxNum == 0) return true
    const selectedFiles = await uploader.value.selectedFiles
    if(selectedFiles.length > msgType.attachmentMaxNum){
      return `첨부파일 최대 개수는 ${msgType.attachmentMaxNum}개를 초과 할 수 없습니다.`
    }
    return true
  }

  async function validateAttFormat() {
    const msgType = msgTypes.find(i=> i.msgTypeId == formActions.inputData.msgTypeId)
    if(!msgType.attachmentFormat) return true
    const selectedFiles = await uploader.value.selectedFiles
    const isFormatErr = selectedFiles.find(i => i.type != msgType.attachmentFormat);
    if(isFormatErr){
      return `첨부파일은 ${msgType.attachmentFormat} 이외의 형식은 첨부 할 수 없습니다.`
    }
  }  

  async function validateAttMaxSz() {
    const msgType = msgTypes.find(i=> i.msgTypeId == formActions.inputData.msgTypeId)
    if(msgType.attachmentMaxSz == 0) return true
    const selectedFiles = await uploader.value.selectedFiles
    let totalSize = 0;
    selectedFiles.forEach(i => {
      totalSize += i.size;
    });
    if(totalSize > msgType.attachmentMaxSz){
      return `첨부파일 총 용량은 ${msgType.attachmentMaxSz} B를 초과 할 수 없습니다.`
    }
  }  

  async function validateSendRqDt() {
    if(!sendRqDt){
      return true
    }

    const sendRqDtObj = $ustra.utils.date.parse(sendRqDt.value, 'yyyyMMddHHmmss')
    const nowObj = new Date();
    if(sendRqDtObj < nowObj){
     return '예약 일시는 현재 시각보다 빠를 수 없습니다.'
    }
    return true
  }

  /**
   * 폼 초기화
   */
  async function init() {
    isNew.value = true
    useDeepMerge(inputData, {
      msgId: null,
      msgTypeId: null,
      msgSttCd: null,
      sendRqDt: null,
      sendRqDttm: null,
      sendCpDttm : null,
      cancelRqDttm : null,
      cancelCpDttm : null,
      resendRqNum : 0,
      title : null,
      content : null,
      source : null,
      target : null,
      cc : null,
      bcc : null,
      fileId : null,
      regUsrId : null,
      regUsrIp : null,
      regDttm : null,
    })

  }

  /**
   * 메시지 정보 조회
   * @param msgId
   */
  async function load(msgId: number) {
    await init()

    const msg = await ustraMessageService.getMsg(msgId)
    isNew.value = false
    useDeepMerge(inputData, msg)
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
        
        if (isNew.value) {
          const fileResult = await uploader.value.upload()
          saveData.fileId = fileResult.fileId;

          const msgRqVo: MessageRqVo =  {sendRqDt : sendRqDt.value, msg : saveData}
          await ustraMessageService.addMsg(msgRqVo)
          listActions.whenAdded()
          init()
        }
      },
      {
        message: '저장 중 오류가 발생하였습니다.',
      },
    )()
  }

  async function remove() {
    if (await confirm('삭제하시겠습니까?')) {
      await ustraMessageService.removeMsg(inputData.msgId)
      listActions.whenRemoved()
      await init()
    }
  }

  async function resend() {
    if (await confirm('재발송 요청을 하시겠습니까?')) {
      await ustraMessageService.resendMsg(inputData.msgId)
      listActions.whenUpdated(inputData.msgId)
    } 
  }

  async function cancel() {
    if (await confirm('취소 요청을 하시겠습니까?')) {
      await ustraMessageService.cancelMsg(inputData.msgId)
      listActions.whenUpdated(inputData.msgId)
      await init()
    }
  }


  onBeforeMount(() => init())

  return { inputData, init, validationGroup, save, isNew, load, remove, cancel, resend, 
    validateMaxTitleLen, validateMaxContentLen, validateMaxReceiverNum, validateSendRqDt, validateAttMaxNum, validateAttFormat, validateAttMaxSz }
})()

// 발송 요청
const sendRqRadioItems = reactive([
  { value: 1, text: '즉시' },
  { value: 2, text: '예약' },
])
const sendRqFlag = ref(1)
const sendRqDt = ref<string>(null)

watch(
  () => sendRqFlag.value,
  v => {
    if(sendRqFlag.value == 1){
      sendRqDt.value = null
    }
    if(sendRqFlag.value == 2){
      sendRqDt.value = $ustra.utils.date.format($ustra.utils.date.addHours(new Date(), 1), 'yyyyMMddHHmmss')
    }
  },
  {
    immediate: true,
  },
)

// 메시지 유형 초기 조회
const msgTypes = await ustraMessageTypeService.getMsgTypes({
    msgTypeId: null,
    msgTypeNm: null,
    providerNm: null
  })

// 메시지 유형 콤보박스 바인딩
const msgTypeComboItems = msgTypes.map(i=> {return {value : i.msgTypeId, text: i.msgTypeId}});
msgTypeComboItems.unshift({value : null, text: '선택'})

// 첨부파일 업로더
const uploader = ref<InstanceType<typeof UMultiFileUploader>>(null)

// 메시지 상태 조회
const msgSttCdList = useUstraCodeList('MSG_STT_CD');
const msgSttCdInfo = computed(() => msgSttCdList.find(code => code.dtlCd === formActions.inputData.msgSttCd))

// 메시지 유형 관리에서 설정한 항목 사용여부 처리
const ccUseYn = ref(false)
const bccUseYn = ref(false)
const attachmentUseYn = ref(false)
const fileGroupId = ref(null)
watch(
  () => formActions.inputData.msgTypeId,
  v => {
    if(!v){
      ccUseYn.value = false
      bccUseYn.value = false
      attachmentUseYn.value = false
    }else{
      const msgType = msgTypes.find(i=> i.msgTypeId == formActions.inputData.msgTypeId)
      ccUseYn.value = msgType.ccUseYn == 'Y'? true : false
      bccUseYn.value = msgType.bccUseYn == 'Y'? true : false
      attachmentUseYn.value = msgType.attachmentUseYn == 'Y'? true : false
      fileGroupId.value = msgType.fileGrpId
    }
  },
  {
    immediate: true,
  },
)

</script>
<script lang="ts">
export default {
  name: 'UstraManagementSystemMsg',
}
</script>
<style>
.company-col:not(.wj-state-selected):not(.wj-state-multi-selected) {
  background-color: #fafafa !important;
  font-weight: bold;
}
</style>