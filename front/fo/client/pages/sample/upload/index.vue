<template>
  <section class="mb-5 section-top" style="width: 100%">
    <b-message title="개요" type="is-success" has-icon :closable="false">
      Buefy의 파일 업로드 컴포넌트를 소개합니다.
    </b-message>

    <div class="card">
      <header class="card-header">
        <div class="card-header-title">파일 업로드</div>
      </header>
      <div class="card-content">
        <b-field class="file is-primary" :class="{'has-name': !!file}">
          <b-upload v-model="file" class="file-label">
            <span class="file-cta">
              <b-icon class="file-icon" icon="upload"></b-icon>
              <span class="file-label">Click to upload</span>
            </span>
            <span class="file-name" v-if="file">
        {{ file.name }}
      </span>
          </b-upload>
        </b-field>

        <u-markdown-viewer :html="true">{{ upload01 }}</u-markdown-viewer>
      </div>
    </div>

    <div class="card">
      <header class="card-header">
        <div class="card-header-title">Drag & Drop</div>
      </header>
      <div class="card-content">
        <b-field>
          <b-upload v-model="dropFiles"
                    multiple
                    drag-drop>
            <section class="section">
              <div class="content has-text-centered">
                <p>
                  <b-icon
                    icon="upload"
                    size="is-large">
                  </b-icon>
                </p>
                <p>Drop your files here or click to upload</p>
              </div>
            </section>
          </b-upload>
        </b-field>

        <div class="tags">
            <span v-for="(file, index) in dropFiles"
                  :key="index"
                  class="tag is-primary" >
                {{file.name}}
                <button class="delete is-small"
                        type="button"
                        @click="deleteDropFile(index)">
                </button>
            </span>
        </div>

        <u-markdown-viewer :html="true">{{ upload02 }}</u-markdown-viewer>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import { CustomFoComponent } from '@/components/custom-fo-component'
import UMarkdownViewer from '@ustra/nuxt/src/vue/components/ustra-markdown-viewer'

// @ts-ignore
import upload01 from './md/upload01.md'

// @ts-ignore
import upload02 from './md/upload02.md'

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
  upload01 = upload01
  upload02 = upload02
  file = null
  dropFiles = []
  deleteDropFile =    function (index) {
    this.dropFiles.splice(index, 1)
  }
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
