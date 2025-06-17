<template>
  <section class="mb-5 section-top" style="width: 100%">
    <b-message title="개요" type="is-success" has-icon :closable="false">
      유투브 재생 테스트
    </b-message>

    <div class="card">
      <header class="card-header">
        <div class="card-header-title">재생 테스트</div>
      </header>
      <div class="card-content">
        <iframe src="https://www.youtube.com/embed/hj3NNlTqIJg?playsinline=0&si=NneaeHLr9TdwKwIO"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

        <u-markdown-viewer :html="true">{{ youtube01 }}</u-markdown-viewer>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import { CustomFoComponent } from '@/components/custom-fo-component'
import UMarkdownViewer from '@ustra/nuxt/src/vue/components/ustra-markdown-viewer'

// @ts-ignore
import youtube01 from './md/youtube01.md'

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
  youtube01 = youtube01
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
