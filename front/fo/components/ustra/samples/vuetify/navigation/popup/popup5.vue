<template>
  <v-card>
    <template #subtitle> 버튼위치 조정 (buttonAlign : left, center, right)</template>
    <template #text>
      <VBtn @click="() => $router.push({ hash: '#popup' })">팝업 열기</VBtn>

      <UPopup v-model="showPopup" :width="800" :height="600" buttonAlign="center" title="팝업제목">
        <div>내용</div>

        <template #buttons>
          <UButton
            text="저장"
            type="primary"
            @click="
              () => {
                useGlobal()
                  .alert('저장되었습니다.')
                  .then(() => (showPopup = false))
              }
            "
          />
          <UButton
            text="닫기"
            @click="
              () => {
                useGlobal()
                  .confirm('창을 닫으시겠습니까?')
                  .then(r => {
                    if (r) showPopup = false
                  })
              }
            "
          />
        </template>
      </UPopup>

      <!-- <UMarkdownViewer :content="popup6" /> -->
    </template>
  </v-card>
</template>
<script lang="ts" setup>
import { useRoute } from '#app'
import { ref, watch } from '#ustra/nuxt'
import { UMarkdownViewer } from '#ustra/nuxt/components'
import { useGlobal } from '#ustra/nuxt/composables'

// @ts-ignore
import popup6 from './md/popup6.md'

const showPopup = ref(false)
const route = useRoute()

watch(
  route,
  v => {
    showPopup.value = v.hash === '#popup'
  },
  {
    immediate: true,
    deep: true,
  },
)
</script>
