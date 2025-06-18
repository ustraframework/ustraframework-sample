<template>
  <div style="margin: 100px 100px;">
    <v-text-field label="아이디" v-model="username"/>
    <v-text-field label="비밀번호" type="password" v-model="password"/>
    <v-card color="indigo-lighten-1" text="샘플 로그인 화면입니다. sample/sample 계정을 사용하여 로그인이 가능합니다."/>
    <UButton style="margin-top: 30px "text="로그인" @click="login"></UButton>
  </div>
</template>
<script setup lang="ts">

const router = useRouter()

const username = ref(null)
const password = ref(null)

async function login() {
  await $ustra.api.call({
    url: '/api/auth/login',
    method: 'POST',
    data: {
      userName: username.value,
      password: password.value,
    },
  })

  router.push('/')
}

definePageMeta({
  auth: {
    required: false,
  },
})
</script>
<style lang="scss"></style>
