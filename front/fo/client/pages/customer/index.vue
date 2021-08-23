<template>
  <section class="sub-page-section">
    <div class="box" style="margin: 0 200px">
      <b-field label="Name">
        <b-input v-model="userName"></b-input>
      </b-field>

      <b-field label="Password">
        <b-input type="password" v-model="password" password-reveal> </b-input>
      </b-field>

      <b-button type="is-primary" @click="login">Login</b-button>
    </div>
  </section>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import { CustomFoComponent } from '@/components/custom-fo-component'
import { HttpMethod } from '@ustra/core/src/server/http/const'

@Component
export default class extends CustomFoComponent {
  // #region variables
  userName = null
  password = null
  // #endregion
  // #region hooks
  // #endregion
  // #region methods
  async login() {
    await this.$ustra.api.call({
      url: '/api/auth/login',
      method: HttpMethod.POST,
      data: {
        userName: this.userName,
        password: this.password,
      },
    })

    this.$router.push('/')
  }
  // #endregion
  // #region watches
  // #endregion
}
</script>
<style lang="scss"></style>
