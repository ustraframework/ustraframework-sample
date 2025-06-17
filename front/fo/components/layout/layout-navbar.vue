<template>
  <!-- <b-navbar :fixed-top="true" :centered="true" class="docs-navbar is-spaced has-shadow">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="/img/logo.png" alt="Logo" />
      </b-navbar-item>
    </template>

    <template #start>
      <b-navbar-item :active="isActiveHome" type="div" @click="goHome">Home</b-navbar-item>
      <b-navbar-item :active="isActiveIntroduce" @click="$router.push('/introduce')">Introduce</b-navbar-item>
      <b-navbar-item :active="isActiveCustomer" @click="$router.push('/customer')">Customer</b-navbar-item>
      <b-navbar-item :active="isActiveSample" @click="$router.push('/sample')">Sample</b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item v-if="isAuthenticated" type="div">{{ $ustra.auth.getTokenClaim().displayName }}</b-navbar-item>
      <b-navbar-item v-if="!isAuthenticated" @click="$router.push('/customer')">Login</b-navbar-item>
      <b-navbar-item v-if="isAuthenticated" @click="logout">Logout</b-navbar-item>
    </template>
  </b-navbar> -->
 NAVBAR
</template>
<script lang="ts">
import startsWith from 'lodash/startsWith'

const route = useRoute()
const router = useRouter()

const isActiveHome = () => {
  return route.path === '/'
}

const isActiveIntroduce = () => {
    return startsWith(route.path, '/introduce')
  }

const isActiveCustomer = () => {
  return startsWith(route.path, '/customer')
}

const isActiveSample = () => {
  return startsWith(route.path, '/sample')
}

const isAuthenticated = () => {
  return $ustra.auth.isAuthenticated
}

const signIn = () => {
    alert('준비 중입니다.')
  }

const goHome = () => {
  router.push('/')
}

export default {
  name: 'layoutNavbar',
}
</script>
<style lang="scss">
// a.navbar-item.is-active,
// .navbar-link.is-active {
//   background-color: #fafafa;
//   color: #7957d5;
//   font-weight: 700;
// }
</style>
