<template>
  <v-card>
    <template #subtitle>displayCode 속성으로 코드 값과 코드 명을 함께 표시할 수 있다. </template>
    <template #text>
      <UVCodeComboBox grpCd="SYS_CD" v-model="comboValue" displayNullText="전체" :displayCode="true" />

      <div>
        <v-chip class="ma-2" color="pink" label text-color="white">
          <v-icon start icon="mdi-label"></v-icon>
          comboValue : {{ comboValue }}
        </v-chip>
      </div>

      <!-- <UMarkdownViewer :content="desc"></UMarkdownViewer> -->
    </template>
  </v-card>
</template>
<script lang="ts" setup>
import { ref } from '#ustra/nuxt'
import { UMarkdownViewer } from '#ustra/nuxt/components'
import UVCodeComboBox from '#ustra/nuxt-vuetify/management/components/combo-box/u-v-code-combo-box.vue'
// @ts-ignore
import desc from './md/code-combo-box3.md'

const comboValue = ref(null)
</script>
