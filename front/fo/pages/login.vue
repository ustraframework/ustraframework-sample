<template>
  <section >
    <div class="box" style="margin: 0 200px">
      <v-text-field label="username" v-model="username"/>
      <v-text-field label="password" v-model="password"/>

      <v-card text="샘플 로그인 화면입니다. sample/sample 계정을 사용하여 로그인이 가능합니다."/>
      <UButtonBar>
        <UButton text="Login" @click="login"></UButton>
      </UButtonBar>
    </div>
  </section>
</template>
<script setup lang="ts">
import { UButtonBar } from '#components'


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
