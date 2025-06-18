<template>
  <div class="container">
    <v-card 
      style="margin: 10px;"
      color="#FFE6CC"
      subtitle="Ustra F/W"
      width="1000"
    >
      <template v-slot:title>
        <span class="font-weight-black">Forum</span>
      </template>

      <v-card-text class="bg-surface-light pt-4">
        U.STRA Framework의 Forum은 GitHub를 통하여 운영합니다. <br />
        GitHub 계정이 없으신 분들은 계정 생성 후에 프레임워크 문의 또는 요구 사항을 작성하여 주시기 바랍니다. <br /><br />

        1. GitHub Issue 이동 : <a href="https://github.com/ustraframework/ustraframework/issues" target="_blank">https://github.com/ustraframework/ustraframework/issues</a><br /><br />

        2. 이슈 사항 중 보안 상 문제가 발생하는 부분은 프레임워크 대표 이메일 주소로 자료를 첨부하여 주시면 됩니다. (ustraframe@gmail.com)
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  auth: {
    required: false,
  },
})
</script>
<style scoped lang="scss">
.container {
  height: 100%;
}
</style>