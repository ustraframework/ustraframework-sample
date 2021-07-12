<template>
  <b-navbar :fixed-top="true" :centered="true" class="docs-navbar is-spaced has-shadow">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="/img/logo.png" alt="Logo" />
      </b-navbar-item>
    </template>

    <template #start>
      <b-navbar-item :active="isActiveHome" type="div" @click="goHome">Home</b-navbar-item>
      <b-navbar-item :active="isActiveIntroduce" @click="$router.push('/introduce')">Introduce</b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <!-- <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light" @click="signIn"> Sign in </a> -->
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import { CustomFoComponent } from '@/components/custom-fo-component'
import startsWith from 'lodash/startsWith'

@Component
export default class extends CustomFoComponent {
  // #region variables
  get isActiveHome() {
    return this.$route.path === '/'
  }

  get isActiveIntroduce() {
    return startsWith(this.$route.path, '/introduce')
  }

  // #endregion
  // #region hooks
  // #endregion

  // #region methods
  signIn() {
    alert('준비 중입니다.')
  }

  goHome() {
    this.$router.push('/')
  }
  // #endregion
  // #region watches
  // #endregion
}
</script>
<style lang="scss">
a.navbar-item.is-active,
.navbar-link.is-active {
  background-color: #fafafa;
  color: #7957d5;
  font-weight: 700;
}
</style>
