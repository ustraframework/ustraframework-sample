<template>
  <section class="mb-5 section-top" style="width: 100%">
    <b-message title="모바일 브릿지 호출" type="is-success" has-icon :closable="false">
      모바일 브릿지 연계 기본 가이드는 http://guide.ustraframework.kro.kr/ref-doc/03/1GyLoOpEjmPqsz2PPArR 를 참조합니다.
    </b-message>

    <b-button @click="callOutbound">아웃바운드 브릿지 호출</b-button> <br />
    <u-markdown-viewer :html="true">{{ mobile01 }}</u-markdown-viewer>

    <b-message :closable="false"> 인바운드 브릿지는 addNativeListener 메소드를 사용하여 컴포넌트 initializing 시에 리스닝을 수행한다. 브라우저 상에서 테스트는 아래와 같이 수행할 수 있다. </b-message>
    <u-markdown-viewer :html="true">{{ mobile02 }}</u-markdown-viewer>
  </section>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import { CustomFoComponent } from '~/components/custom-fo-component'
import UMarkdownViewer from '@ustra/nuxt/src/vue/components/ustra-markdown-viewer'

// @ts-ignore
import mobile01 from '~/pages/sample/mobile/md/mobile01.md'

// @ts-ignore
import mobile02 from '~/pages/sample/mobile/md/mobile02.md'

@Component({
  components: {
    UMarkdownViewer,
  },
})
/**
 * @vuese
 * @group component group
 * component description
 */
export default class extends CustomFoComponent {
  // #region variables
  mobile01 = mobile01
  mobile02 = mobile02
  // #endregion
  // #region hooks
  mounted() {
    this.$ustra.mobile.bridge.addNativeListener('IF-INBOUD-MOBILE01', data => {
      console.log('nativate inbound data', data)
    })
  }
  // #endregion

  // #region methods
  callOutbound() {
    this.$ustra.mobile.bridge.callNative({
      id: 'IF-OUTBOUND-MOBILE01',
      callback: result => {
        console.log('result', result)
      },
      timeout: 2000,
    })
  }
  // #endregion
  // #region watches
  // #endregion
}
</script>
<style lang="scss"></style>
