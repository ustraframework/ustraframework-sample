<template>
  <VCard>
    <template #text>
      WjFlexGrid가 제공하는 기본 편집 기능에 대해 안내한다. useWijmoFlexGrid 메소드를 사용할 경우, isReadOnly 속성을 false로 설정해야 그리드의 Editing
      기능이 활성화 된다. 기본적으로 데이터 유형에 맞는 에디터를 표시하므로 데이터의 유형을 의도하는 컴포넌트 유형에 맞게 생성해야 한다. <br /><br />
      특정 컬럼의 경우, 편집을 불가능하게 설정해야 할 경우는 WjFlexGridColumn의 속성 isReadOnly를 true로 세팅한다.

      <WjFlexGrid :itemsSource="data" :initialized="grid.initialize" class="mt-2">
        <WjFlexGridColumn binding="id" header="id" :isReadOnly="true" :width="100" />
        <WjFlexGridColumn binding="country" header="country" :width="100" />
        <WjFlexGridColumn binding="sales" header="sales" :width="100" />
        <WjFlexGridColumn binding="expenses" header="expenses" :width="100" />
        <WjFlexGridColumn binding="overdue" header="overdue" :width="100" />
        <WjFlexGridColumn binding="date" header="date" :width="100" />
        <!-- <WjFlexGridColumn binding="country" header="country2" :width="100" />
        <WjFlexGridColumn binding="sales" header="sales2" :width="100" />
        <WjFlexGridColumn binding="expenses" header="expenses2" :width="100" />
        <WjFlexGridColumn binding="overdue" header="overdue2" :width="100" />
        <WjFlexGridColumn binding="date" header="date2" :width="100" />
        <WjFlexGridColumn binding="country" header="country3" :width="100" />
        <WjFlexGridColumn binding="sales" header="sales3" :width="100" />
        <WjFlexGridColumn binding="expenses" header="expenses3" :width="100" />
        <WjFlexGridColumn binding="overdue" header="overdue3" :width="100" />
        <WjFlexGridColumn binding="date" header="date3" :width="100" /> -->
      </WjFlexGrid>
    </template>
  </VCard>
</template>
<script lang="ts" setup>
import { WjFlexGrid, WjFlexGridColumn } from '#ustra/nuxt-wijmo/components'
import { useWijmoFlexGrid } from '#ustra/nuxt-wijmo/composables'

const data = ref([])
const countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece']
for (let row = 0; row < 20; row++) {
  for (let i = 0; i < countries.length; i++) {
    data.value.push({
      id: i * row + 1,
      country: countries[i] + ' ' + i,
      sales: Math.random() * 10000,
      expenses: Math.random() * 5000,
      overdue: i % 4 == 0,
      date: new Date(),
    })
  }
}

const grid = useWijmoFlexGrid({
  isReadOnly: false,
})

definePageMeta({
  auth: {
    required: false,
  },
})
</script>
