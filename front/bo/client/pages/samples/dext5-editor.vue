<template>
  <div>
    <dx-button text="html 입력" @click="editValue = '<p>text value</p>'"></dx-button>
    <dx-button text="입력 값 확인" @click="checkEditor"></dx-button>
    <dx-button text="text 조회" @click="getText"></dx-button>
    <dx-button text="초기화" @click="editValue = ''"></dx-button>
    <dext5-editor ref="editor" v-model="editValue" :config="{ Width: '90%' }" />

    <div>입력 html : {{ editValue }}</div>
  </div>
</template>
<script lang="ts">
import { Component, Ref } from 'vue-property-decorator'
import { UstraBoComponent } from '@ustra/nuxt-mng-bo/src/components/ustra-bo-component'
import Dext5Editor from '@ustra/nuxt/src/vue/components/dext5/dext5-editor'

@Component({
  components: { Dext5Editor },
})
export default class extends UstraBoComponent {
  // #region variables
  editValue: string = ''

  @Ref() readonly editor: Dext5Editor

  // #endregion
  // #region hooks
  created() {
    this.editValue = `<p>init value</p>`
  }
  // #endregion
  // #region methods
  checkEditor() {
    if (this.editor.isEmpty()) {
      alert('입력 값이 없습니다.')
    } else {
      alert('입력 값이 있습니다.')
    }
  }

  getText() {
    alert(this.editor.getTextValue())
  }
  // #endregion
  // #region watches
  // #endregion
}
</script>
<style lang="scss"></style>
