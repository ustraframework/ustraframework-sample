<template>
  <v-card>
    <v-toolbar color="white">
      <v-toolbar-title><img src="@/static/img/logo.png" style="width: 150px;" alt="Logo" /></v-toolbar-title>

      <span v-if="isAuthenticated()" style="padding-right: 30px;"> {{ getUsername() }}</span>

      <v-btn v-if="!isAuthenticated()" @click="goPage('login')"><v-icon icon="mdi-login"/>로그인</v-btn>  
      <v-btn v-else="isAuthenticated()" @click="logout()"><v-icon icon="mdi-logout"/>로그아웃</v-btn>

      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          bg-color="white"
          color="blue-accent-3"
          stacked
        >
          <v-tab @click="goPage('home')" value="tab-1">
            <v-icon icon="mdi-home"/> Home
          </v-tab>

          <v-tab @click="goPage('introduce')" value="tab-2">
            <v-icon icon="mdi-information"/> Introduce
          </v-tab>

          <v-tab @click="goPage('sample')"  value="tab-3">
            <v-icon icon="mdi-alpha-s-circle"/> Sample
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
  </v-card>
</template>

<script lang="ts" setup>
const tab = ref(null)

import startsWith from 'lodash/startsWith'

const route = useRoute()
const router = useRouter()

const isActiveHome = () => {
  return route.path === '/'
}

const isActiveIntroduce = () => {
    return startsWith(route.path, '/introduce')
  }

const isActiveSample = () => {
  return startsWith(route.path, '/sample')
}

const isAuthenticated = () => {
  return $ustra.auth.isAuthenticated
}

const getUsername = () => {
  return $ustra.auth.user.displayName
}

const goPage = (pageNm) => {
  if(pageNm == 'home'){
    router.push('/')
    return
  }
  router.push(`/${pageNm}`)
}

async function logout() {
  await $ustra.api.call({
    url: '/api/auth/logout',
    method: 'POST'
  })

  await $ustra.auth.unauthenicate(true, true, '/', false)
  router.push('/')
}

watch(
  () => route.path,
  path => {
    if(isActiveHome()){
      tab.value = 'tab-1'
    }else if(isActiveIntroduce()){
      tab.value = 'tab-2'
    }else if(isActiveSample()){
      tab.value = 'tab-3'
    }
  },
  {
    immediate: true,
  },
)
</script>