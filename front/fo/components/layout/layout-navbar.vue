<template>
  <v-card color="#99DDCC">
    <v-card-title class="title text-center justify-center py-6">
        <div class="logo" style="cursor: pointer;" @click="goPage('home')">
          <img src="@/static/img/logo.png" style="width: 150px;" alt="Logo" />
        </div>
        <div class="info">
          <span v-if="isAuthenticated()" style="padding-right: 30px; font-size: 15px;"> 
            <v-icon icon="mdi-account"/> {{ getUsername() }}
          </span>
          <v-btn variant="outlined" v-if="!isAuthenticated()" @click="goPage('login')"><v-icon icon="mdi-login"/>로그인</v-btn>  
          <v-btn variant="outlined" v-else="isAuthenticated()" @click="logout()"><v-icon icon="mdi-logout"/>로그아웃</v-btn>
        </div>
    </v-card-title>

    <v-tabs
      v-model="tab"
      bg-color="transparent"
      color="white"
      grow
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
  </v-card>
</template>

<script lang="ts" setup>
import startsWith from 'lodash/startsWith'

const tab = ref(null)
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
  tab.value = null
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
<style scoped lang="scss">
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.info {
  margin-left: auto;
}
</style>