<template>
  <v-card color="white">
    <v-card-title class="title text-center justify-center py-6">
        <div class="logo" style="cursor: pointer;" @click="goPage()">
          <img src="@/static/img/logo.png" style="width: 150px;" alt="Logo" />
        </div>
        <div class="info">
          <span v-if="isAuthenticated()" style="padding-right: 30px; font-size: 15px;"> 
            <v-icon icon="mdi-account"/> {{ getUsername() }}
          </span>
          <v-btn variant="outlined" style="background-color: #C3EDC0;" v-if="!isAuthenticated()" @click="goPage('/login')"><v-icon icon="mdi-login"/>로그인</v-btn>  
          <v-btn variant="outlined" style="background-color: #C3EDC0;" v-else="isAuthenticated()" @click="logout()"><v-icon icon="mdi-logout"/>로그아웃</v-btn>
        </div>
    </v-card-title>

    <v-tabs
      v-model="tab"
      bg-color="transparent"
      color="#059212"
      grow
    >
      <v-tab @click="goPage()" value="tab-1">
        <v-icon icon="mdi-home"/> Home
      </v-tab>

      <v-tab @click="goPage('/introduce')" value="tab-2">
        <v-icon icon="mdi-information"/> Introduce
      </v-tab>
      
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn style="width: 30%;"
            class="align-self-center me-4"
            height="100%"
            rounded="0"
            variant="plain"
            v-bind="props"
          >
            Sample
            <v-icon icon="mdi-menu-down" end></v-icon>
          </v-btn>
        </template>

        <v-list >
          <v-list-item
            title="모바일 브릿지 호출"
            value="mobile"
            @click="goPage('/sample/mobile')"
          ></v-list-item>
          <v-list-item
            title="파일 업로드"
            value="upload"
            @click="goPage('/sample/upload')"
          ></v-list-item>
          <v-list-item
            title="YouTube 재생"
            value="youtube"
            @click="goPage('/sample/youtube')"
          ></v-list-item>
        </v-list>
      </v-menu>
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

const isAuthenticated = () => {
  return $ustra.auth.isAuthenticated
}

const getUsername = () => {
  return $ustra.auth.user.displayName
}

const goPage = (path?) => {
  if(!path){
    router.push('/')
    return
  }
  tab.value = null
  router.push(path)
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