<template>
  <div id="login-box">
    <div class="inner">
      <img src="@ustra/nuxt-dx-mng-bo/src/static/img/gsitm.png" style="margin-bottom: 25px" />
      <div class="top-text">{{ appTitle }}</div>

      <div class="login-form">
        <dx-validation-group ref="validator">
          <dx-text-box ref="idBox" v-model="inputData.userNm" :height="30" placeholder="ID" @initialized="e => e.component.focus()" @enter-key="() => $refs.passBox.instance.focus()">
            <dx-validator>
              <dx-required-rule />
            </dx-validator>
          </dx-text-box>
          <dx-text-box
            ref="passBox"
            v-model="inputData.userPw"
            :height="30"
            placeholder="Password"
            mode="password"
            :input-attr="{
              autocomplete: 'off',
            }"
            @enter-key="() => login()"
          >
            <dx-validator>
              <dx-required-rule />
            </dx-validator>
          </dx-text-box>

          <dx-button text="Login" icon="check" type="default" :height="30" width="100%" @click="login"></dx-button>
        </dx-validation-group>
        <div class="password-link"><a @click="showPasswordEditPopup = true">Change Password</a></div>
      </div>
      <div style="margin: 5px; color: #7ab8eb; text-decoration: underline">※ 테스트 시, 사용자 삭제 및 비밀번호 변경에 주의하시기 바랍니다.</div>
      <div class="bottom-text">㉿ GSITM 2020-2021</div>
    </div>
    <password-edit-popup :show.sync="showPasswordEditPopup" :usr-id="passwordUsrId" @closed="() => idBox.instance.focus()" />
    <approval-popup ref="approvalPopup" />
  </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import LoginComponent from '@ustra/nuxt-dx-mng-bo/src/components/default/login.vue'

@Component
export default class extends LoginComponent {
  // #region variables
  // #endregion
  // #region hooks
  created() {
    this.$data.inputData = {
      userNm: 'admin',
      userPw: 'admin',
    }
  }
  // #endregion
  // #region methods
  // #endregion
  // #region watches
  // #endregion
}
</script>
<style lang="scss"></style>
