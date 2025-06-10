<template>
  <div>
    <UButton text="우편번호 찾기 (팝업)2" @click="openSearchPopup" />
    <DaumZipcodePopup
      v-model="showPopup"
      @selected="(data : DaumPostResult) => {
        $ustra.logger.info('data', data)
      inputData.zipNo = data.zonecode
      inputData.address1 = data.addr
    }"
    />

    <UFieldSet>
      <UFieldRow>
        <UField label="우편번호">
          <UTextBox type="icon" :width="100" @iconClick="() => (showPopup = true)" v-model="inputData.zipNo"></UTextBox>
          <WjInputMask v-model="inputData.address1"></WjInputMask>
          <WjInputMask v-model="inputData.address2"></WjInputMask>
        </UField>
      </UFieldRow>
    </UFieldSet>
  </div>
</template>
<script lang="ts" setup>
import { WjInputMask } from '#ustra/nuxt-wijmo/components'
import { DaumPostResult } from '#ustra/nuxt/externals/daum/post'

const inputData = reactive({
  zipNo: null,
  address1: null,
  address2: null,
})

function openSearchPopup() {
  const daum = useGlobal().daum

  new daum.Postcode({
    oncomplete: function (data) {
      $ustra.logger.info('data', data)
    },
  }).open()
}

const showPopup = ref(false)

useHead({
  script: [{ src: '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js' }],
})

definePageMeta({
  auth: {
    required: false,
  },
  layout: false,
})
</script>
