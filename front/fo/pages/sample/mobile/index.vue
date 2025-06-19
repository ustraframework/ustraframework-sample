<template>
  <div class="container">
    <v-card
      subtitle="모바일 브릿지 연계 기본 가이드는 http://guide.ustraframework.kro.kr/ref-doc/03/1GyLoOpEjmPqsz2PPArR 를 참조합니다."
      width="100%"
      style="margin-top: 10px;"
    >
      <template v-slot:title>
        <span class="font-weight-black"> <v-icon icon="mdi-youtube"/> 모바일 브릿지 호출 </span>
      </template>
      <v-card-text class="pt-4">
        <VBtn variant="outlined" style="background-color: #C3EDC0; margin-right: 10px;" @click="() => callOutbound()">아웃바운드 브릿지 호출</VBtn>
        <UMarkdownViewer class="pt-4" :content="mobile01"></UMarkdownViewer>

        인바운드 브릿지는 addNativeListener 메소드를 사용하여 컴포넌트 initializing 시에 리스닝을 수행한다. 브라우저 상에서 테스트는 아래와 같이 수행할 수 있다.
        <UMarkdownViewer class="pt-4" :content="mobile02"></UMarkdownViewer>
        
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts" setup>

// @ts-ignore
import mobile01 from './md/mobile01.md'

// @ts-ignore
import mobile02 from './md/mobile02.md'

definePageMeta({
  auth: {
    required: false,
  },
})

onMounted(() => {
  $ustra.mobile.bridge.addNativeListener('IF-INBOUD-MOBILE01', data => {
    console.log('nativate inbound data', data)
  })
})

async function callOutbound() {
  $ustra.mobile.bridge.callNative({
    id: 'IF-OUTBOUND-MOBILE01',
    callback: result => {
      console.log('result', result)
    },
    timeout: 2000,
  })
}
</script>
<style scoped lang="scss">
.container {
  height: 100%;
}
</style>
