<template>
  <v-container>
    <v-row>
      <v-col cols="7">
        <v-card class="content-box example">
          <template #title> ButtonBar + ButtonBox 사용법</template>
          <template #subtitle> </template>
          <template #text>
            <div class="sample-wrap">
              <UButtonBar :title="title" :backgroundColor="background">
                <UButtonBox :left="left" :right="right" :center="center">
                  <VBtn type="primary">버튼1</VBtn>
                </UButtonBox>
              </UButtonBar>
            </div>
          </template>
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card class="content-box props">
          <template #title>Props</template>
          <template #subtitle> </template>
          <template #text>
            <h3>ButtonBar Props</h3>
            <UFieldSet>
              <UFieldRow>
                <UField label="title">
                  <UTextBox v-model="title"></UTextBox>
                </UField>
              </UFieldRow>
              <UFieldRow>
                <UField label="backgroundColor">
                  <input type="color" v-model="background" />
                </UField>
              </UFieldRow>
            </UFieldSet>
            <h3>ButtonBar > ButtonBox Props</h3>
            <UFieldSet>
              <UFieldRow>
                <UField label="left">
                  <VBtn :type="left ? 'primary' : ' '" @click="setAlign('left')">Click</VBtn>
                </UField>
              </UFieldRow>
              <UFieldRow>
                <UField label="right">
                  <VBtn :type="right ? 'primary' : ' '" @click="setAlign('right')">Click</VBtn>
                </UField>
              </UFieldRow>
              <UFieldRow>
                <UField label="center">
                  <VBtn :type="center ? 'primary' : ' '" @click="setAlign('center')">Click</VBtn>
                </UField>
              </UFieldRow>
            </UFieldSet>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from '#ustra/nuxt'
import './style/form.scss'

const title = ref(null)
const background = ref('#f8f8f8')
const left = ref(true)
const right = ref(false)
const center = ref(false)
const setAlign = align => {
  if (align === 'left') {
    left.value = true
    right.value = false
    center.value = false
  } else if (align === 'right') {
    left.value = false
    right.value = true
    center.value = false
  } else if (align === 'center') {
    left.value = false
    right.value = false
    center.value = true
  }
}
</script>

<style scoped lang="scss"></style>
