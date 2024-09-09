<template>
  <section class="mb-5 section-top" style="width: 100%">
    <b-message style="margin-bottom: 30px; font-size: x-large">Welcome, Bridge Test Page</b-message>

    <div class="card">
      <header class="card-header">
        <div class="card-header-title">Status</div>
      </header>
      <div class="card-content">
        native: {{ isNative }}<br />
        android: {{isAndroid}}<br />
        iOS: {{isIOs}}

      </div>
    </div>

    <br>

    <div class="card">
      <header class="card-header">
        <div class="card-header-title">Toast</div>
      </header>
      <div class="card-content">
        <b-button @click="onToast">Toast</b-button>
      </div>
    </div>

    <br>

    <div class="card">
      <header class="card-header">
        <div class="card-header-title">Current DateTime</div>
      </header>
      <div class="card-content">
        <b-button @click="onCurrentTime">Get current time</b-button>
      </div>
    </div>

    <br>

    <div class="card">
      <header class="card-header">
        <div class="card-header-title">Security</div>
      </header>
      <div class="card-content">
        <b-button @click="openWindow">Security : Use token</b-button>
      </div>
    </div>

    <br>

    <div class="card">
      <header class="card-header">
        <div class="card-header-title">Storage</div>
      </header>
      <div class="card-content">
        <b-field label="itemKey">
          <b-input v-model="itemKey"></b-input>
        </b-field>
        <b-field label="itemValue">
          <b-input v-model="itemValue"></b-input>
        </b-field>
        <b-button @click="onStorageGetItem">Get</b-button>
        <b-button style="margin-left: 20px;" @click="onStorageSetItem">Set</b-button>
        <b-button style="margin-left: 20px;" @click="onStorageClearItem">Clear</b-button>
      </div>
    </div>

    <br>

    <div class="card">
      <header class="card-header">
        <div class="card-header-title">QR / Barcode</div>
      </header>
      <div class="card-content">
        <b-button @click="readQr">Read Qr code (or Barcode)</b-button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import UMarkdownViewer from '@ustra/nuxt/src/vue/components/ustra-markdown-viewer'
import CustomFoComponent from '~/components/custom-fo-component'

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
  isNative = () => this.$ustra.mobile.isNativeRequest
  isAndroid = () => this.$ustra.mobile.isAndroidNativeRequest
  isIOs = () => this.$ustra.mobile.isIosNativeRequest
  onToast = () => {
    this.$ustra.mobile.bridge.staticFunctions.toast('Bridge : Toast Test Message')
  }

  onCurrentTime = async () => {
    var rsp = await this.$ustra.mobile.bridge.staticFunctions.currentTime()
    this.$ustra.mobile.bridge.staticFunctions.toast('' + rsp)
  }

  openWindow = () => {
    this.$ustra.mobile.bridge.callNative({
      id: 'GPC_MB_VIEW_OPEN',
      data: {
        type: '01'
      },
      callback: async result => {
        var msg = 'Token\n\n' + result.data?.token
        this.$ustra.mobile.bridge.staticFunctions.toast(msg)
      },
      timeout: 5000,
      useToken: false,
    })
  }


  // Storage
  itemKey = ''
  itemValue = ''
  onStorageGetItem = async () => {
    this.itemValue = await this.$ustra.mobile.bridge.staticFunctions.storage().getItem(this.itemKey)
  }

  onStorageSetItem = async () => {
    const storage = await this.$ustra.mobile.bridge.staticFunctions.storage().setItem(this.itemKey, this.itemValue)
  }

  onStorageClearItem = async () => {
    await this.$ustra.mobile.bridge.staticFunctions.storage().clearItem()
  }

  // Request read qr code (or barcode)
  readQr = () => {
    this.$ustra.mobile.bridge.callNative({
      id: 'GPC_MB_CLOSE_WINDOW',
      callback: async result => {
        var msg = 'Qr code (or Barcode)\n\n' + result.data?.value
        this.$ustra.mobile.bridge.staticFunctions.toast(msg)
      },
      timeout: 0,
      useToken: false,
    })
  }
}
</script>
<style lang="scss"></style>
