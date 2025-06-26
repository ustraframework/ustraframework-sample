<template>
  <div ref="root">
    <!-- <UButton text="Render" @click="renderButton" /> -->
    <!-- <UButton text="Render Popup" @click="renderPopup" /> -->
    <UButton text="Show Popup" @click="() => (popupNode.component.props.modelValue = true)" />
  </div>
</template>
<script lang="ts" setup>
import { VNode } from '#ustra/nuxt'
import { UButton } from '#ustra/nuxt-wijmo/components'
import component from '#ustra/nuxt/utils/component'
import TestPopup from '~/components/render/test-popup.vue'

const root = ref<HTMLDivElement>()
const destoryFns = ref<Function[]>([])
const popupNode = ref<VNode>()

const instance = getCurrentInstance()
function renderPopup() {
  const { el, vNode, destroy } = component.mount(TestPopup, instance, {
    props: {
      modelValue: false,
      'onUpdate:modelValue': value => {
        vNode.component.props.modelValue = value
      },
    },
    children: undefined,
    element: undefined,
  })
  destoryFns.value.push(destroy)
  root.value.appendChild(el)
  popupNode.value = vNode
}

onMounted(() => renderPopup())
onBeforeUnmount(() => {
  if (popupNode.value?.component) {
    popupNode.value.component.props.modelValue = false
  }
  // destoryFns.value.forEach(fn => fn())
})
// onBeforeUnmount(() => destroy())
// function renderButton() {
//   const { el } = component.mount(UButton, {
//     props: reactive({
//       text: 'Test',
//       onClick: () => alert('click'),
//     }),
//     children: undefined,
//     element: undefined,
//   })

//   root.value.appendChild(el)
// }

definePageMeta({
  layout: false,
})
</script>
